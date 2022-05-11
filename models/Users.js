import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true, default: false},
    active:   { type: Boolean, required: true, default: true},


});

export const User = mongoose.model('User', userSchema);