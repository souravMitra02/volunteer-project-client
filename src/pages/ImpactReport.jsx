import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Water", volunteers: 80, impact: 2400 },
  { name: "Education", volunteers: 120, impact: 3200 },
  { name: "Health", volunteers: 95, impact: 2900 },
  { name: "Environment", volunteers: 70, impact: 2100 },
  { name: "Food", volunteers: 100, impact: 3000 },
  { name: "Disaster Relief", volunteers: 60, impact: 1800 },
];

// Pie chart data (you can customize these values)
const pieData = [
  { name: "Education", value: 3200 },
  { name: "Health", value: 2900 },
  { name: "Environment", value: 2100 },
  { name: "Water", value: 2400 },
  { name: "Food", value: 3000 },
  { name: "Disaster Relief", value: 1800 },
];

const COLORS = [
  "#4f46e5",
  "#f97316",
  "#a78bfa",
  "#fb923c",
  "#c7d2fe",
  "#fdba74",
];

const ImpactReport = () => {
  return (
    <section className="bg-gradient-to-b from-indigo-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-screen py-24 px-6 transition-colors duration-500 mt-10 mb-10">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-5xl font-extrabold text-indigo-900 dark:text-indigo-300 mb-6 tracking-tight drop-shadow-md"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Impact Report
        </motion.h2>

        <motion.p
          className="text-lg text-indigo-700 dark:text-indigo-200 max-w-3xl mx-auto mb-16 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Here's a visual summary of the impact our volunteers made across
          different sectors, showing the breadth and depth of our commitment.
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row gap-10 md:gap-20 justify-center items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ minHeight: 420 }}
        >
          {/* Pie Chart */}
          <div className="w-full max-w-sm h-80 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 flex flex-col items-center justify-center">
            <h3 className="text-indigo-900 dark:text-indigo-300 text-2xl font-semibold mb-4">
              Impact Distribution
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => value.toLocaleString()}
                  contentStyle={{
                    backgroundColor: "#4338ca",
                    borderRadius: "8px",
                    border: "none",
                    color: "white",
                    fontWeight: "600",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="w-full max-w-4xl h-80 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 30, right: 40, left: 20, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="4 6"
                  stroke="#e0e7ff"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#4f46e5"
                  tick={{ fontWeight: "600", fill: "#4338ca" }}
                />
                <YAxis
                  stroke="#4f46e5"
                  tick={{ fontWeight: "600", fill: "#4338ca" }}
                  width={40}
                />
                <Tooltip
                  cursor={{ fill: "rgba(79, 70, 229, 0.1)" }}
                  contentStyle={{
                    backgroundColor: "#4338ca",
                    borderRadius: "8px",
                    border: "none",
                    color: "white",
                    fontWeight: "600",
                  }}
                />
                <Legend
                  verticalAlign="top"
                  wrapperStyle={{ fontWeight: "700", color: "#4338ca" }}
                />
                <Bar
                  dataKey="volunteers"
                  fill="url(#volGradient)"
                  radius={[10, 10, 0, 0]}
                  barSize={30}
                />
                <Bar
                  dataKey="impact"
                  fill="url(#impactGradient)"
                  radius={[10, 10, 0, 0]}
                  barSize={30}
                />
                <defs>
                  <linearGradient id="volGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#a5b4fc" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="impactGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#fed7aa" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          className="mt-20 max-w-4xl mx-auto text-left text-indigo-900 dark:text-indigo-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-semibold mb-6 tracking-wide">
            Summary Highlights
          </h3>
          <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed">
            <li>Over 500+ active volunteers participated in the last year.</li>
            <li>More than 12,000 people directly impacted by our initiatives.</li>
            <li>
              Significant focus on education, healthcare and environmental
              awareness.
            </li>
            <li>Successful relief campaigns during recent natural disasters.</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactReport;
