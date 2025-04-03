import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  FunnelChart,
  Funnel,
  LabelList,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const barData = [
  { month: "Jan", queries: 200 },
  { month: "Feb", queries: 450 },
  { month: "Mar", queries: 350 },
  { month: "Apr", queries: 600 },
  { month: "May", queries: 700 },
  { month: "Jun", queries: 500 },
];

const funnelData = [
  { value: 100, name: "NEW LEADS" },
  { value: 80, name: "ACTIVE LEADS" },
  { value: 50, name: "ACTIVE ENQUIRIES" },
  { value: 30, name: "IN PROCESS" },
  { value: 10, name: "COMPLETED" },
];

const pieData = [
  { name: "Online", value: 400 },
  { name: "Offline", value: 300 },
  { name: "Referral", value: 300 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

function ChartSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Bar Chart Card */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Query Details</h3>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={barData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="queries" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Funnel Chart Card */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Lead Status</h3>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <FunnelChart>
              <Funnel dataKey="value" data={funnelData} isAnimationActive>
                <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie/Donut Chart Card */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Query Source</h3>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ChartSection;
