import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from "recharts";

// Reçoit les données d'activité via la prop activity
export default class Example extends PureComponent {
  render() {
    const data =
      this.props.activity &&
      this.props.activity.data &&
      Array.isArray(this.props.activity.data.sessions)
        ? this.props.activity.data.sessions.map((session, idx) => ({
            name: (idx + 1).toString(),
            uv: session.calories,
            pv: session.kilogram,
            amt: session.calories,
          }))
        : [];

    // Responsive : 280px max sur petits écrans, sinon 320px
    const isSmallScreen = window.innerWidth <= 1024;
    const maxHeight = isSmallScreen ? 280 : 320;

    const containerStyle = {
      width: "100%",
      height: "100%",
      maxHeight: maxHeight,
      background: "#fff",
      borderRadius: "1rem",
      boxSizing: "border-box",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    return (
      <div style={containerStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 24,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis orientation="right" />
            <Tooltip />
            <Bar
              name="Poids (kg)"
              dataKey="pv"
              fill="black"
              barSize={7}
              radius={[10, 10, 0, 0]}
            />
            <Bar
              name="Calories Brûlées (kcal)"
              dataKey="uv"
              fill="red"
              barSize={7}
              radius={[10, 10, 0, 0]}
            />
            <Legend
              align="right"
              verticalAlign="top"
              iconType="circle"
              height={58}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
