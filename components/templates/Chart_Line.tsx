import useDeviceDimensions from "@/hooks/useDeviceDimensions";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { twMerge } from "tailwind-merge";

export interface Chart_LineProps {
  lines: {
    values: { x: string; y: number }[];
    label: string;
    color?: string;
  }[];
}

const Chart_Line: React.FC<Chart_LineProps> = ({ lines }) => {
  const { isMobile } = useDeviceDimensions();

  const labels = lines.map(({ label, color }) => ({ name: label, color }));
  const transformedData: Record<string, number | string>[] = [];

  for (const line of lines) {
    for (const { x, y } of line.values) {
      const existingData = transformedData.find((d) => d.name === x);
      if (existingData) {
        existingData[line.label] = y;
      } else {
        transformedData.push({ name: x, [line.label]: y });
      }
    }
  }

  return (
    <div className="csc wf hf">
      <div className={twMerge(isMobile ? "w-80 h-48" : "w-144 h-72")}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={transformedData}
            margin={{
              right: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" className="t25" />
            <YAxis className="t25" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1A1D1E",
                borderRadius: "0.75rem",
              }}
              trigger="hover"
            />
            <Legend />
            {labels.map(({ name, color }, index) => (
              <Line
                key={name}
                type="monotone"
                dataKey={name}
                stroke={color || "#82ca9d"}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart_Line;
