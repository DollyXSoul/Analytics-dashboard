"use client";

import { analytics } from "@/utils/analytics";
import { BarChart, Card } from "@tremor/react";
import ReactCountryFlag from "react-country-flag";
import { ArrowUpRight, ArrowRight, ArrowDownRight } from "lucide-react";

interface AnalyticsDashboardProps {
  avgVisitorsPerDay: string;
  visitorsToday: number;
  timeseriesPageViews: Awaited<ReturnType<typeof analytics.retrieveDays>>;
  topCountries: [string, number][];
}

const Badge = ({ percentage }: { percentage: number }) => {
  const isPositive = percentage > 0;
  const isNeutral = percentage === 0;
  const isNegative = percentage < 0;

  if (isNaN(percentage)) return null;

  const positiveClassname = "bg-green-900/25 text-green-400 ring-green-400/25";
  const neutralClassname = "bg-green-900/25 text-zinc-400 ring-zinc-400/25";
  const negativeClassname = "bg-green-900/25 text-red-400 ring-red-400/25";

  return (
    <span
      className={`inline-flex gap-1 items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
        isPositive
          ? positiveClassname
          : isNegative
          ? negativeClassname
          : neutralClassname
      }`}
    >
      {isPositive ? <ArrowUpRight className="h-3 w-3" /> : null}
      {isNeutral ? <ArrowRight className="h-3 w-3" /> : null}
      {isNegative ? <ArrowDownRight className="h-3 w-3" /> : null}
      {percentage.toFixed(0)}%
    </span>
  );
};

const AnalyticsDashboard = ({
  avgVisitorsPerDay,
  visitorsToday,
  timeseriesPageViews,
  topCountries,
}: AnalyticsDashboardProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid w-full mx-auto grid-cols-1 sm:grid-cols-2 gap-6">
        <Card>
          <p className="text-tremor-default text-dark-tremor-content">
            Avg. visitors/day
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {avgVisitorsPerDay}
          </p>
        </Card>

        <Card>
          <p className="flex gap-2.5 text-tremor-default text-dark-tremor-content">
            Visitors today
            <Badge
              percentage={(visitorsToday / Number(avgVisitorsPerDay) - 1) * 100}
            />
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {visitorsToday}
          </p>
        </Card>
      </div>

      <Card className="flex flex-col sm:grid grid-cols-4 gap-6">
        <h2 className="w-full text-dark-tremor-content-strong text-center sm:left-left font-semibold text-xl">
          This weeks top visitors:
        </h2>

        <div className="col-span-3 flex items-center justify-between flex-wrap gap-8">
          {topCountries?.map(([countryCode, visitors]) => {
            return (
              <div
                key={countryCode}
                className="flex items-center gap-3 text-dark-tremor-content-strong"
              >
                <p className="hidden sm:block text-tremor-content">
                  {countryCode}
                </p>

                <ReactCountryFlag
                  className="text-5xl sm:text-3xl"
                  svg
                  countryCode={countryCode}
                />

                <p className="text-tremor-content sm:text-dark-tremor-content-strong">
                  {visitors}
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        {timeseriesPageViews ? (
          <>
            <h2 className="text-xl font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong text-left">
              Number of visitors in a Week
            </h2>
            <BarChart
              data={timeseriesPageViews.map((day) => ({
                name: day.date,
                Visitors: day.events.reduce((acc, curr) => {
                  return acc + Object.values(curr)[0]!;
                }, 0),
              }))}
              allowDecimals={false}
              index="name"
              categories={["Visitors"]}
              showAnimation
            />
          </>
        ) : null}
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
