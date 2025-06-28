"use client";

import Image from "next/image";

import { z } from "zod";
import { OctagonAlertIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const SignInView = () => {
  const rounter = useRouter();

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);

    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          setPending(false);
          rounter.push("/");
        },
        onError: ({ error }) => {
          setError(error.message);
        },
      }
    );
  };

  return (
    <div className="h-screen w-full flex">
      <div className="relative hidden md:flex flex-col items-center justify-center overflow-hidden basis-[55%] max-w-[55%]">
        <Image
          src="/bg.jpg"
          alt="background"
          fill
          className="object-cover z-0"
          priority
          sizes="55vw"
        />
        <div className="relative z-10 flex flex-col items-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={92}
            height={92}
            className="h-[92px] w-[92px] drop-shadow-lg"
          />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-background p-3 basis-[45%] max-w-[45%]">
        <div className="w-full max-w-md bg-white/70 rounded-2xl">
          <div className="grid p-0">
            <Form {...form}>
              <form className="p-6" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold text-neutral-900">
                      Welcome Back
                    </h1>
                    <p className="text-neutral-500 text-balance">
                      Login to your account
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john@mail.com"
                              className="h-11 px-4 rounded-lg bg-white/80 border border-neutral-200 shadow focus:shadow-md transition-all duration-200 placeholder:text-neutral-400 text-neutral-900"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                className="h-11 px-4 rounded-lg bg-white/80 border border-neutral-200 shadow focus:shadow-md transition-all duration-200 placeholder:text-neutral-400 text-neutral-900 outline-none pr-10"
                                {...field}
                              />
                              <button
                                type="button"
                                tabIndex={-1}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                                onClick={() => setShowPassword((v) => !v)}
                              >
                                {showPassword ? (
                                  <EyeIcon className="w-5 h-5" />
                                ) : (
                                  <EyeOffIcon className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {!!error && (
                    <Alert className="bg-destructive/10 border-none">
                      <OctagonAlertIcon className="h-4 w-4 !text-destructive"></OctagonAlertIcon>
                      <AlertTitle>{error}</AlertTitle>
                    </Alert>
                  )}
                  <Button
                    type="submit"
                    className="w-full h-11 rounded-xl bg-neutral-900 text-white font-semibold shadow-lg hover:bg-neutral-800 transition-all duration-200 focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer"
                    disabled={pending}
                  >
                    Login
                  </Button>
                  <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                      Or continue with
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-white/80 border border-neutral-200 shadow hover:bg-neutral-100 transition-all duration-200 cursor-pointer"
                      disabled={pending}
                    >
                      <Image
                        src="/google.svg"
                        alt="Google"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-white/80 border border-neutral-200 shadow hover:bg-neutral-100 transition-all duration-200 cursor-pointer"
                      disabled={pending}
                    >
                      <Image
                        src="/github.svg"
                        alt="GitHub"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      Github
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account{" "}
                    <Link
                      href="/sign-up"
                      className="underline underline-offset-4"
                    >
                      Sign-up
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
