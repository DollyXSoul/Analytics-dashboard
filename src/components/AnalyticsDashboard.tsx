"use client";

import { analytics } from "@/utils/analytics";
import { BarChart, Card } from "@tremor/react";
import ReactCountryFlag from "react-country-flag";

interface AnalyticsDashboardProps {
  avgVisitorsPerDay: string;
  visitorsToday: number;
  timeseriesPageViews: Awaited<ReturnType<typeof analytics.retrieveDays>>;
  topCountries: [string, number][];
}

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
          <p className="text-tremor-default text-dark-tremor-content">
            Visitors today
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
        ) : null}
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
