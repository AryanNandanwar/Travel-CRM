import mongoose, {Schema} from "mongoose";

const clientSchema = new Schema(
    {
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
        query: [{
            type: Schema.Types.ObjectId,
            ref: 'Query',
        }
    ],  
    },
    {
        timestamps: true
    }
)



export const Client = mongoose.model("Client", clientSchema)