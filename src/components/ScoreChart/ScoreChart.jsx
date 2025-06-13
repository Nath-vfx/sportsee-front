import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Legend,
  Rectangle,
} from "recharts";

// La prop userData doit contenir le score sous userData.data.score ou userData.data.todayScore
function getScoreFromUserData(userData) {
  if (!userData || !userData.data) return 0;
  // Certains backends renvoient "score", d'autres "todayScore"
  return userData.data.score || userData.data.todayScore || 0;
}

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, innerRadius, outerRadius, startAngle, fill, payload } = props;
  return (
    <g>
      <Rectangle
        x={cx - 96}
        y={cy - 96}
        width={96 * 2}
        height={96 * 2}
        fill="#FFFFFF"
        radius={96}
        z={-2}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        cornerRadius={16}
        startAngle={startAngle}
        endAngle={(payload.value / 100) * 360}
        fill={fill}
      />
      <text
        x={24}
        y={36}
        dy={8}
        textAnchor="start"
        fill="#282D30"
        fontSize={26}
        fontWeight={900}
        fontFamily="Roboto"
      >
        Score
      </text>
      <text
        x={cx}
        y={cy - 12}
        dy={8}
        textAnchor="middle"
        fill="#282D30"
        fontSize={26}
        fontWeight={900}
        fontFamily="Roboto"
      >
        {payload.value}%
      </text>
      <text
        x={cx}
        y={cy + 12}
        dy={8}
        textAnchor="middle"
        fill="#74798C"
        fontFamily="Roboto"
        fontWeight={500}
        fontSize={16}
      >
        de votre objectif
      </text>
    </g>
  );
};

export default class Example extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/s/pie-chart-with-customized-active-shape-y93si";

  state = {
    activeIndex: 0,
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    // On récupère le score réel depuis la prop userData
    const score = Math.round(getScoreFromUserData(this.props.userData) * 100);
    const data = [{ name: "Score", value: score }];

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={360} height={360}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={96}
            outerRadius={108}
            startAngle={0}
            fill="#f00"
            dataKey="value"
            onMouseEnter={this.onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
