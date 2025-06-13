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
    // Si activity est fourni et a la bonne structure, on l'utilise, sinon fallback sur un tableau vide
    const data =
      this.props.activity &&
      this.props.activity.data &&
      Array.isArray(this.props.activity.data.sessions)
        ? this.props.activity.data.sessions.map((session, idx) => ({
            name: (idx + 1).toString(),
            uv: session.calories,
            pv: session.kilogram,
            amt: session.calories, // ou autre champ si besoin
          }))
        : [];

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
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
    );
  }
}
