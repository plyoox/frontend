import Link from "next/link";

interface Props {
  className?: string;
}

function GettingStarted({ className }: Props) {
  return (
    <div className={`w-full rounded-lg bg-pl-secondary p-8 md:p-16 lg:max-w-[545px] ${className}`}>
      <h2 className="text-3xl font-bold tracking-wide text-white">Get started</h2>
      <div className="text-base">
        <div>
          <span className="mr-2 text-2xl font-bold text-pl-accent">1.</span>
          <span>
            Login with{" "}
            <Link
              className="relative z-10 inline-flex flex-col justify-end font-bold text-white before:absolute before:-z-10 before:block before:h-1/3 before:w-full before:bg-pl-blurple before:duration-200 hover:before:h-1/2"
              href="#"
            >
              Discord
            </Link>
          </span>
        </div>
        <div>
          <span className="mr-2 text-2xl font-bold text-pl-accent">2.</span>
          <span>Select a server</span>
        </div>
        <div>
          <span className="mr-2 text-2xl font-bold text-pl-accent">3.</span>
          <span>Modifying to your liking</span>
        </div>
      </div>
    </div>
  );
}

export default GettingStarted;
