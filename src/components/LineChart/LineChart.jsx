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
import { useState } from "react";
import styles from "./LineChart.module.scss";

// Reçoit les données de sessions moyennes via la prop averageSessions
const Example = ({ averageSessions }) => {
  const toolTipeStyles = {
    color: "black",
  };

  // État pour la position de la souris plutôt que pour les données
  const [mousePosition, setMousePosition] = useState(null);

  // Si averageSessions est fourni et a la bonne structure, on l'utilise, sinon fallback sur un tableau vide
  const data =
    averageSessions &&
    averageSessions.data &&
    Array.isArray(averageSessions.data.sessions)
      ? averageSessions.data.sessions.map((session, idx) => ({
          // On peut mapper les jours à des lettres si besoin, sinon garder session.day
          name: ["L", "M", "M", "J", "V", "S", "D"][idx] || session.day,
          Temps: session.sessionLength,
        }))
      : [];

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.title}>Durée moyenne des sessions</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={300}
          height={100}
          data={data}
          onMouseMove={(e) => {
            if (e.activeCoordinate) {
              setMousePosition(e.activeCoordinate.x);
            }
          }}
          onMouseLeave={() => {
            setMousePosition(null);
          }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
            </linearGradient>
          </defs>
          {mousePosition !== null && (
            <rect
              x={mousePosition}
              y={0}
              width="100%"
              height="100%"
              fill="rgba(0, 0, 0, 0.1)"
            />
          )}
          <XAxis
            dataKey="name"
            stroke="white"
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            itemStyle={toolTipeStyles}
            labelFormatter={() => ""}
            content={({ payload, active }) =>
              active && payload && payload.length ? (
                <div
                  className={styles.customTooltip}
                  style={{
                    background: "#fff",
                    borderRadius: "1rem",
                    padding: "8px 12px",
                  }}
                >
                  <span>{`${payload[0].value} min`}</span>
                </div>
              ) : null
            }
          />
          <Line
            type="monotone"
            dataKey="Temps"
            stroke="url(#lineGradient)"
            dot={false}
            strokeWidth={2}
            isAnimationActive={false} // Désactive l'animation de la ligne
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

Example.demoUrl = "https://codesandbox.io/p/sandbox/tiny-line-chart-5f5vq6";

export default Example;
