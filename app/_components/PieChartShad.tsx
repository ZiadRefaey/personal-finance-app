"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

export function PieChartShad({ data }: any) {
  const chartData = data.map(
    (obj: { name: string; maximum: number; color: string; spent: number }) => ({
      budget: obj.name,
      spent: obj.spent,
      maximum: obj.maximum,
      fill: `var(--${obj.color})`,
    })
  );
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: ".",
      color: `var(--green)`,
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  const totalSpending = React.useMemo(() => {
    return chartData.reduce((acc: number, curr: any) => acc + curr.spent, 0);
  }, [chartData]);
  const totalBudget = React.useMemo(() => {
    return chartData.reduce((acc: number, curr: any) => acc + curr.maximum, 0);
  }, [chartData]);

  return (
    <div className="size-[290px] flex items-center justify-center 2xl:size-[340px] p-0 ">
      <CardContent className="flex-1 p-0 ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-full p-0"
        >
          <PieChart className="">
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="spent"
              nameKey="budget"
              innerRadius={90}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-primary text-preset-1 mb-2"
                        >
                          ${totalSpending.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 32}
                          className="fill-secondary text-preset-5"
                        >
                          of ${totalBudget} limit
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
}
