// src/components/UpdateForm.jsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {}
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch existing data
  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/client/get-query/${id}`
        );
        reset(data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load query.");
      }
    };
    fetchQuery();
  }, [id, reset]);

  const onSubmit = async (formData) => {
    setLoading(true);
    setError("");
    setSuccessMessage("");
    try {
      await axios.put(
        `http://localhost:8000/api/v1/client/update-query/${id}`,
        formData
      );
      setSuccessMessage("Form submitted successfully.");
      // Optionally navigate back after a delay
      // setTimeout(() => navigate("/queries"), 1500);
    } catch (err) {
      console.error(err);
      setError("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Update Query</h1>
          {error && <p className="text-red-600 mb-2">{error}</p>}
          {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                {...register("client.fullName")}
                className="w-full border px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="contactNo">Contact No</label>
              <input
                id="contactNo"
                {...register("client.contactNo")}
                className="w-full border px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="destination">Destination</label>
              <input
                id="destination"
                {...register("destination")}
                className="w-full border px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="status">Status</label>
              <input
                id="status"
                {...register("status")}
                type="text"
                className="w-full border px-3 py-2"
                placeholder="e.g., New, In Progress, Quotation"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="NoOfAdults">Number of Adults</label>
                <input
                  id="NoOfAdults"
                  {...register("NoOfAdults")}
                  type="number"
                  className="w-full border px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="NoOfChildren">Number of Children</label>
                <input
                  id="NoOfChildren"
                  {...register("NoOfChildren")}
                  type="number"
                  className="w-full border px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="NoOfChildrenBelowFive">Children Below 5</label>
                <input
                  id="NoOfChildrenBelowFive"
                  {...register("NoOfChildrenBelowFive")}
                  type="number"
                  className="w-full border px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="TripDuration">Trip Duration</label>
              <input
                id="TripDuration"
                {...register("TripDuration")}
                type="text"
                placeholder="e.g., 7 Days"
                className="w-full border px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="StartingPoint">Starting Point</label>
                <input
                  id="StartingPoint"
                  {...register("StartingPoint")}
                  type="text"
                  className="w-full border px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="EndingPoint">Ending Point</label>
                <input
                  id="EndingPoint"
                  {...register("EndingPoint")}
                  type="text"
                  className="w-full border px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="PreferredHotelCategory">Preferred Hotel Category</label>
              <input
                id="PreferredHotelCategory"
                {...register("PreferredHotelCategory")}
                type="text"
                placeholder="e.g., 3-Star, 4-Star, etc."
                className="w-full border px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="Budget">Budget (₹)</label>
              <input
                id="Budget"
                {...register("Budget")}
                type="number"
                className="w-full border px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="DateOfInquiry">Date of Inquiry</label>
                <input
                  id="DateOfInquiry"
                  {...register("DateOfInquiry")}
                  type="date"
                  className="w-full border px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="TravelDate">Travel Date</label>
                <input
                  id="TravelDate"
                  {...register("TravelDate")}
                  type="date"
                  className="w-full border px-3 py-2"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>

  );
};

export default UpdateForm;
