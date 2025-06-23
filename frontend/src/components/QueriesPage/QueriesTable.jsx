import React, { useState, useEffect } from "react";
import { CalendarIcon, PencilAltIcon, TrashIcon, DocumentAddIcon } from "@heroicons/react/outline";
import axios from "axios";
import { Link } from "react-router-dom";

const QueryTable = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // For example, you might pass filters along with the request.
  // Here, we assume no filters are applied.
  const fetchQueries = async () => {
    try {
      // Replace with the correct backend URL and port if different.
      const response = await axios.get("http://localhost:8000/api/v1/client/get-all-queries", {});
      
      // Adjust based on your API response structure.
      // Here we assume the queries are contained in response.data.data.
      setQueries(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching queries. Please try again later.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/client/delete-query/${id}`);
      setQueries((prev) => prev.filter((q) => q._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-md shadow-md p-4">
        Loading queries...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-md shadow-md p-4 text-red-600">
        {error}
      </div>
    );
  }

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
            Name
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
            Destination
          </label>
          <input
            type="text"
            id="destination"
            placeholder="Destination"
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
            <th className="text-left py-2 px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((query) => (
            <tr key={query._id} className="border-b hover:bg-gray-50">
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
                <p className="text-sm text-gray-700">
                
                  Trip ID:
                  {query.trip_id}
                </p>
                <p className="text-xs text-gray-500">
                  Inquiry Date:{" "}
                  {new Date(query.DateOfInquiry).toLocaleDateString()}
                </p>
                

              </td>

              {/* Client Details */}
              <td className="py-2 px-2 align-top">
                <p className="font-medium text-gray-500">Name: {query.client.fullName}</p>
                <p className="text-sm text-gray-500">
                  Contact: {query.client.contactNo}
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

              {/* Actions */}
                <td className="py-2 px-2 align-top flex gap-3">
                  <Link to={`/updateform/${query._id}`}>
                    <PencilAltIcon
                    className="h-5 w-5 text-blue-500 cursor-pointer"
                  />
                  </Link>
                  <TrashIcon
                    className="h-5 w-5 text-red-500 cursor-pointer"
                    onClick={() => handleDelete(query._id)}
                  />
                  <Link to={`/follow-up/${query._id}`}>
                    <DocumentAddIcon
                    className="h-5 w-5 text-blue-500 cursor-pointer"
                  />
                  </Link>
                  
                </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueryTable;