import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

// Reçoit les données de sessions moyennes via la prop averageSessions
const Example = ({ averageSessions }) => {
  const toolTipeStyles = {
    color: "black",
  };

  // Si averageSessions est fourni et a la bonne structure, on l'utilise, sinon fallback sur un tableau vide
  const data =
    averageSessions &&
    averageSessions.data &&
    Array.isArray(averageSessions.data.sessions)
      ? averageSessions.data.sessions.map((session, idx) => ({
          // On peut mapper les jours à des lettres si besoin, sinon garder session.day
          name: ["L", "M", "M", "J", "V", "S", "D"][idx] || session.day,
          time: session.sessionLength,
        }))
      : [];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <XAxis
          dataKey="name"
          stroke="white"
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          itemStyle={toolTipeStyles}
          labelFormatter={() => {
            return ``;
          }}
          formatter={(value) => {
            return `${value} min`;
          }}
        />
        <Line
          type="monotone"
          dataKey="time"
          stroke="white"
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

Example.demoUrl = "https://codesandbox.io/p/sandbox/tiny-line-chart-5f5vq6";

export default Example;
