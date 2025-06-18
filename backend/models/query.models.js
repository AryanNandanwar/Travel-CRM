import mongoose, {Schema} from "mongoose";

const querySchema = new Schema(
    {
        client: {
            type: Schema.Types.ObjectId,
            ref: 'Client',
            required: true,
        },
        followup:[{
            type: Schema.Types.ObjectId,
            ref: 'FollowUp'  
        }],
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
        status: {
            type: String,
            default: "New",
        }

    },
    {
        timestamps: true
    }
)



export const Query = mongoose.model("Query", querySchema)