import ConfigureCard from "@/app/(page)/user/premium/components/configure-card";

function Page() {
  return (
    <div className={"container mx-auto mt-10"}>
      <h2 className={"text-2xl text-white"}>Your Level card</h2>
      <span>Modify your level card to have a unique style!</span>

      <ConfigureCard />
    </div>
  );
}

export default Page;
