import React from "react";
import { useForm } from "react-hook-form";

const QueryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted Query:", data);
    // Here you can call your API to save the query
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-6">Submit Your Query</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Client Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="fullName">
                Full Name
              </label>
              <input
                id="fullName"
                {...register("fullName", { required: "Full Name is required" })}
                type="text"
                className="border rounded-md w-full px-3 py-2"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="contactNo">
                Contact Number
              </label>
              <input
                id="contactNo"
                {...register("contactNo", { required: "Contact number is required" })}
                type="text"
                className="border rounded-md w-full px-3 py-2"
              />
              {errors.contactNo && (
                <p className="text-red-500 text-xs mt-1">{errors.contactNo.message}</p>
              )}
            </div>
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="destination">
              Destination
            </label>
            <input
              id="destination"
              {...register("destination", { required: "Destination is required" })}
              type="text"
              className="border rounded-md w-full px-3 py-2"
            />
            {errors.destination && (
              <p className="text-red-500 text-xs mt-1">{errors.destination.message}</p>
            )}
          </div>

          {/* Trip Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="NoOfAdults">
                Number of Adults
              </label>
              <input
                id="NoOfAdults"
                {...register("NoOfAdults", {
                  required: "This field is required",
                  valueAsNumber: true,
                })}
                type="number"
                className="border rounded-md w-full px-3 py-2"
              />
              {errors.NoOfAdults && (
                <p className="text-red-500 text-xs mt-1">{errors.NoOfAdults.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="NoOfChildren">
                Number of Children
              </label>
              <input
                id="NoOfChildren"
                {...register("NoOfChildren", {
                  required: "This field is required",
                  valueAsNumber: true,
                })}
                type="number"
                className="border rounded-md w-full px-3 py-2"
              />
              {errors.NoOfChildren && (
                <p className="text-red-500 text-xs mt-1">{errors.NoOfChildren.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="NoOfChildrenBelowFive">
                Children Below 5
              </label>
              <input
                id="NoOfChildrenBelowFive"
                {...register("NoOfChildrenBelowFive", {
                  required: "This field is required",
                  valueAsNumber: true,
                })}
                type="number"
                className="border rounded-md w-full px-3 py-2"
              />
              {errors.NoOfChildrenBelowFive && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.NoOfChildrenBelowFive.message}
                </p>
              )}
            </div>
          </div>

          {/* Trip Duration */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="TripDuration">
              Trip Duration
            </label>
            <input
              id="TripDuration"
              {...register("TripDuration", { required: "Trip Duration is required" })}
              type="text"
              placeholder="e.g., 7 Days"
              className="border rounded-md w-full px-3 py-2"
            />
            {errors.TripDuration && (
              <p className="text-red-500 text-xs mt-1">{errors.TripDuration.message}</p>
            )}
          </div>

          {/* Route */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="StartingPoint">
                Starting Point
              </label>
              <input
                id="StartingPoint"
                {...register("StartingPoint", { required: "Starting Point is required" })}
                type="text"
                className="border rounded-md w-full px-3 py-2"
              />
              {errors.StartingPoint && (
                <p className="text-red-500 text-xs mt-1">{errors.StartingPoint.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="EndingPoint">
                Ending Point
              </label>
              <input
                id="EndingPoint"
                {...register("EndingPoint", { required: "Ending Point is required" })}
                type="text"
                className="border rounded-md w-full px-3 py-2"
              />
              {errors.EndingPoint && (
                <p className="text-red-500 text-xs mt-1">{errors.EndingPoint.message}</p>
              )}
            </div>
          </div>

          {/* Preferred Hotel Category */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="PreferredHotelCategory">
              Preferred Hotel Category
            </label>
            <input
              id="PreferredHotelCategory"
              {...register("PreferredHotelCategory", {
                required: "Preferred Hotel Category is required",
              })}
              type="text"
              placeholder="e.g., 3-Star, 4-Star, etc."
              className="border rounded-md w-full px-3 py-2"
            />
            {errors.PreferredHotelCategory && (
              <p className="text-red-500 text-xs mt-1">{errors.PreferredHotelCategory.message}</p>
            )}
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="Budget">
              Budget (₹)
            </label>
            <input
              id="Budget"
              {...register("Budget", {
                required: "Budget is required",
                valueAsNumber: true,
              })}
              type="number"
              className="border rounded-md w-full px-3 py-2"
            />
            {errors.Budget && (
              <p className="text-red-500 text-xs mt-1">{errors.Budget.message}</p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="DateOfInquiry">
                Date of Inquiry
              </label>
              <input
                id="DateOfInquiry"
                {...register("DateOfInquiry", { required: "This field is required" })}
                type="date"
                className="border rounded-md w-full px-3 py-2"
              />
              {errors.DateOfInquiry && (
                <p className="text-red-500 text-xs mt-1">{errors.DateOfInquiry.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="TravelDate">
                Travel Date
              </label>
              <input
                id="TravelDate"
                {...register("TravelDate", { required: "This field is required" })}
                type="date"
                className="border rounded-md w-full px-3 py-2"
              />
              {errors.TravelDate && (
                <p className="text-red-500 text-xs mt-1">{errors.TravelDate.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
            >
              Submit Query
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QueryForm;
