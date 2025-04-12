import React from "react";

const statusData = [
  { label: "New", count: 43, bgColor: "bg-yellow-500" },
  { label: "In Progress", count: 91, bgColor: "bg-blue-500" },
  { label: "Quotation", count: 103, bgColor: "bg-purple-500" },
  { label: "Sent", count: 52, bgColor: "bg-green-500" },
  { label: "Cancelled", count: 23, bgColor: "bg-red-500" },
  { label: "Lost", count: 34, bgColor: "bg-gray-500" },
];

const StatusCards = () => {
  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-4">
        {statusData.map((item) => (
          <div
            key={item.label}
            className={`flex flex-col items-center justify-center rounded-md p-4 text-white ${item.bgColor}`}
          >
            <span className="text-sm font-medium">{item.label}</span>
            <span className="text-2xl font-bold">{item.count}</span>
          </div>
        ))}
      </div>

      {/* Add a Query Button */}
      <div className="flex justify-end mb-4">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow">
          Add a Query
        </button>
      </div>
    </div>
  );
};

export default StatusCards;
