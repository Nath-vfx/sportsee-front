import React, { PureComponent } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

// Reçoit les données de performance via la prop performance
const KIND_TRANSLATION = {
  1: "Cardio",
  2: "Energie",
  3: "Endurance",
  4: "Force",
  5: "Vitesse",
  6: "Intensité",
};

function formatPerformanceData(performance) {
  if (
    !performance ||
    !performance.data ||
    !Array.isArray(performance.data.data) ||
    !performance.data.kind
  ) {
    return [];
  }
  // Map chaque entrée pour avoir { subject, value }
  return performance.data.data.map((item) => ({
    subject:
      KIND_TRANSLATION[item.kind] ||
      performance.data.kind[item.kind] ||
      item.kind,
    value: item.value,
  }));
}

export default class Example extends PureComponent {
  render() {
    const data = formatPerformanceData(this.props.performance);

    return (
      <ResponsiveContainer>
        <RadarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" ticks={false} />
          <Radar
            name="Performance"
            dataKey="value"
            fill="#f00"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
}
