import Image from "next/image";

interface Props {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: Props) => {
  return (
    <div className="flex items-center w-full justify-center">
      <div className="flex flex-col items-center justify-center border max-w-xl rounded-2xl p-4 shadow-2xl">
        <Image
          src="/logo.svg"
          alt="empty"
          width={100}
          height={100}
          className="block dark:hidden"
        />
        <Image
          src="/light-logo.svg"
          alt="empty"
          width={100}
          height={100}
          className="hidden dark:block"
        />
        <div className="flex flex-col gap-y-4 max-w-md mx-auto text-center">
          <h6 className="text-lg font-medium">{title}</h6>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};
