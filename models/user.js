import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String },
    username: { type: String, required: true },
    profilepic: { type: String },
    coverpic: { type: String },
    razorpayid : {type :String},
    razorpaysecret : {type : String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Use `mongoose.models` to check if the model already exists
const User = models.User || model("User", UserSchema);

export default User;
