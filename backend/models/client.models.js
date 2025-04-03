import mongoose, {Schema} from "mongoose";

const clientSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true, 
        },
        contactNo: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        destination: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        NoOfAdults: {
            type: Number,
            required: true,
        },
        NoOfChildren: {
            type: Number,
            required: true,
        },
        NoOfChildrenBelowFive: {
            type: Number,
            required: true,
        },
        TripDuration: {
            type: String,
            required: true,
            trim: true, 
        },
        StartingPoint:{
            type: String,
            required: true,
            trim: true, 
        },
        EndingPoint: {
            type: String,
            required: true,
            trim: true, 
        },
        PreferredHotelCategory: {
            type: String,
            required: true,
            trim: true, 
        },
        Budget: {
            type: Number,
            required: true,
            trim: true, 
        },
        DateOfInquiry: {
            type: Date,
            required: true,
        },
        TravelDate: {
            type: Date,
            required: true,
        },

    },
    {
        timestamps: true
    }
)



export const Client = mongoose.model("Client", clientSchema)