import { analytics } from "@/utils/analytics";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { getDate } from "@/utils";

const Page = async () => {
  const TRACKINK_DAYS = 7;
  const pageviews = await analytics.retrieveDays("pageview", TRACKINK_DAYS);

  const totalPageViews = pageviews.reduce((acc, curr) => {
    return (
      acc +
      curr.events.reduce((acc, curr) => {
        return acc + Object.values(curr)[0]!;
      }, 0)
    );
  }, 0);

  const avgVisitorsPerDay = (totalPageViews / TRACKINK_DAYS).toFixed(1);

  const visitorsToday = pageviews
    .filter((ev) => ev.date === getDate())
    .reduce((acc, curr) => {
      return (
        acc +
        curr.events.reduce((acc, curr) => acc + Object.values(curr)[0]!, 0)
      );
    }, 0);

  return (
    <div className="min-h-screen w-full py-12 flex justify-center items-center">
      <div className="relative w-full max-w-6xl mx-auto text-white">
        <AnalyticsDashboard
          visitorsToday={visitorsToday}
          avgVisitorsPerDay={avgVisitorsPerDay}
        />
      </div>
    </div>
  );
};

export default Page;
