import React from "react";
import { CalendarIcon } from "@heroicons/react/outline";


// Updated dummy data to include all the fields from your Mongoose schema
const queries = [
  {
    id: 1,
    fullName: "John Doe",
    contactNo: "9999999999",
    destination: "Bali",
    NoOfAdults: 2,
    NoOfChildren: 1,
    NoOfChildrenBelowFive: 0,
    TripDuration: "7 Days",
    StartingPoint: "City A",
    EndingPoint: "City B",
    PreferredHotelCategory: "3-Star",
    Budget: 60000,
    DateOfInquiry: "2025-03-25",
    TravelDate: "2025-04-10",
    status: "New",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    contactNo: "8888888888",
    destination: "Kashmir",
    NoOfAdults: 2,
    NoOfChildren: 0,
    NoOfChildrenBelowFive: 0,
    TripDuration: "5 Days",
    StartingPoint: "City C",
    EndingPoint: "City D",
    PreferredHotelCategory: "4-Star",
    Budget: 40000,
    DateOfInquiry: "2025-03-20",
    TravelDate: "2025-04-15",
    status: "In Progress",
  },
  {
    id: 3,
    fullName: "Michael Brown",
    contactNo: "7777777777",
    destination: "Bali",
    NoOfAdults: 2,
    NoOfChildren: 2,
    NoOfChildrenBelowFive: 1,
    TripDuration: "6 Days",
    StartingPoint: "City E",
    EndingPoint: "City F",
    PreferredHotelCategory: "5-Star",
    Budget: 50000,
    DateOfInquiry: "2025-03-18",
    TravelDate: "2025-04-05",
    status: "Quotation",
  },
];

const QueryTable = () => {
  return (
    <div className="bg-white rounded-md shadow-md p-4">
      {/* Filter Row */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-2">
          <label htmlFor="startDate" className="text-sm font-medium">
            Start Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="startDate"
              className="border rounded-md px-3 py-1 text-sm"
            />
            <CalendarIcon className="h-4 w-4 absolute right-2 top-2 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="endDate" className="text-sm font-medium">
            End Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="endDate"
              className="border rounded-md px-3 py-1 text-sm"
            />
            <CalendarIcon className="h-4 w-4 absolute right-2 top-2 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="queryId" className="text-sm font-medium">
            QueryId
          </label>
          <input
            type="text"
            id="queryId"
            placeholder="QueryId"
            className="border rounded-md px-3 py-1 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="subject" className="text-sm font-medium">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Subject"
            className="border rounded-md px-3 py-1 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="status" className="text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            className="border rounded-md px-3 py-1 text-sm bg-white"
          >
            <option value="">All</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Quotation">Quotation</option>
            <option value="Sent">Sent</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="ops" className="text-sm font-medium">
            Select OPS
          </label>
          <select
            id="ops"
            className="border rounded-md px-3 py-1 text-sm bg-white"
          >
            <option value="">All OPS</option>
            <option value="ops1">Ops 1</option>
            <option value="ops2">Ops 2</option>
            {/* Add more OPS as needed */}
          </select>
        </div>
        <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm">
          Search
        </button>
      </div>

      {/* Table */}
      <table className="w-full table-auto">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-2">Inquiry Details</th>
            <th className="text-left py-2 px-2">Client Details</th>
            <th className="text-left py-2 px-2">Trip Details</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((query) => (
            <tr key={query.id} className="border-b hover:bg-gray-50">
              {/* Inquiry Details */}
              <td className="py-2 px-2 align-top">
                <p className="text-sm text-gray-700">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      query.status === "New"
                        ? "bg-yellow-100 text-yellow-700"
                        : query.status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : query.status === "Quotation"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {query.status}
                  </span>
                </p>
                <p className="text-xs text-gray-500">
                  Inquiry Date:{" "}
                  {new Date(query.DateOfInquiry).toLocaleDateString()}
                </p>
              </td>

              {/* Client Details */}
              <td className="py-2 px-2 align-top">
                <p className="font-medium text-gray-700">{query.fullName}</p>
                <p className="text-sm text-gray-500">
                  Contact: {query.contactNo}
                </p>
                <p className="text-sm text-gray-500">
                  Destination: {query.destination}
                </p>
              </td>

              {/* Trip Details */}
              <td className="py-2 px-2 align-top">
                <p className="text-sm text-gray-700">
                  <strong>Adults:</strong> {query.NoOfAdults},{" "}
                  <strong>Children:</strong> {query.NoOfChildren},{" "}
                  <strong>Under 5:</strong> {query.NoOfChildrenBelowFive}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Trip Duration:</strong> {query.TripDuration}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Route:</strong> {query.StartingPoint} -{" "}
                  {query.EndingPoint}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Hotel:</strong> {query.PreferredHotelCategory}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Budget:</strong> Rs {query.Budget}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Travel Date:</strong>{" "}
                  {new Date(query.TravelDate).toLocaleDateString()}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueryTable;
