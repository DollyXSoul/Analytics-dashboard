import { analytics } from "@/utils/analytics";

const Page = async () => {
  const pageView = await analytics.retrieve("pageView", "26/02/2024");

  return <p>{JSON.stringify(pageView)}</p>;
};

export default Page;
