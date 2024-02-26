import { analytics } from "@/utils/analytics";

const Page = async () => {
  const pageView = await analytics.retrieveDays("pageview", 2);

  return <p>{JSON.stringify(pageView)}</p>;
};

export default Page;
