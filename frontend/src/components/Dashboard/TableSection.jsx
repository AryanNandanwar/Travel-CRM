import React from "react";

function TablesSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Recent Tasks & Follow-ups */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Recent Tasks & Follow-ups</h3>
        <ul className="space-y-2">
          <li className="p-2 bg-gray-50 rounded flex justify-between">
            <span>Task Completed #202</span>
            <span className="text-green-600 font-bold">Done</span>
          </li>
          <li className="p-2 bg-gray-50 rounded flex justify-between">
            <span>Follow-up #203</span>
            <span className="text-yellow-600 font-bold">Pending</span>
          </li>
          <li className="p-2 bg-gray-50 rounded flex justify-between">
            <span>Task #204</span>
            <span className="text-red-600 font-bold">Overdue</span>
          </li>
        </ul>
      </div>

      {/* Scheduled Payments */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Scheduled Payments</h3>
        <ul className="space-y-2">
          <li className="p-2 bg-gray-50 rounded flex justify-between">
            <span>Payment #001</span>
            <span className="text-gray-800">₹10,000</span>
          </li>
          <li className="p-2 bg-gray-50 rounded flex justify-between">
            <span>Payment #002</span>
            <span className="text-gray-800">₹25,000</span>
          </li>
          <li className="p-2 bg-gray-50 rounded flex justify-between">
            <span>Payment #003</span>
            <span className="text-gray-800">₹7,500</span>
          </li>
        </ul>
      </div>

      {/* Login Users */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Login Users</h3>
        <ul className="space-y-2">
          <li className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/32"
              alt="User1"
              className="h-8 w-8 rounded-full"
            />
            <span>Monika Tiwari</span>
          </li>
          <li className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/32"
              alt="User2"
              className="h-8 w-8 rounded-full"
            />
            <span>John Doe</span>
          </li>
          <li className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/32"
              alt="User3"
              className="h-8 w-8 rounded-full"
            />
            <span>Jane Smith</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TablesSection;
                                                                                                      