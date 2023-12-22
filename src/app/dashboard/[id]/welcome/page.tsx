import WelcomeContainer from "@/components/dashboard/welcome/welcome-container";

export const metadata = {
  title: "Moderation",
};

function Page() {
  return (
    <>
      <h1 className={"text-2xl font-semibold"}>Welcome</h1>
      <WelcomeContainer />
    </>
  );
}

export default Page;
