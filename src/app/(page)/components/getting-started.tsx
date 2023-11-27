import Link from "next/link";

interface Props {
  className?: string;
}

function GettingStarted({ className }: Props) {
  return (
    <div className={`bg-pl-secondary p-8 rounded-lg md:p-16 lg:max-w-[545px] w-full ${className}`}>
      <h2 className="font-bold text-white text-3xl tracking-wide">Get started</h2>
      <div className="text-base">
        <div>
          <span className="text-2xl text-pl-accent font-bold mr-2">1.</span>
          <span>
            Login with{" "}
            <Link
              className="relative z-10 inline-flex flex-col justify-end font-bold before:bg-pl-blurple before:h-1/3 before:w-full before:block before:absolute hover:before:h-1/2 before:-z-10 before:duration-200"
              href="#"
            >
              Discord
            </Link>
          </span>
        </div>
        <div>
          <span className="text-2xl text-pl-accent font-bold mr-2">2.</span>
          <span>Select a server</span>
        </div>
        <div>
          <span className="text-2xl text-pl-accent font-bold mr-2">3.</span>
          <span>Modifying to your liking</span>
        </div>
      </div>
    </div>
  );
}

export default GettingStarted;
