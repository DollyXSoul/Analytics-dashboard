"use client";

import { Card } from "@tremor/react";

interface AnalyticsDashboardProps {
  avgVisitorsPerDay: string;
  visitorsToday: number;
}

const AnalyticsDashboard = ({
  avgVisitorsPerDay,
  visitorsToday,
}: AnalyticsDashboardProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid w-full mx-auto grid-cols-1 sm-grid-cols-2 gap-6">
        <Card className="w-full">
          <p className="text-tremor-default text-dark-tremor-content">
            Avg. visitors/day
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {avgVisitorsPerDay}
          </p>
        </Card>

        <Card className="w-full">
          <p className="text-tremor-default text-dark-tremor-content">
            Visitors today
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {visitorsToday}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
