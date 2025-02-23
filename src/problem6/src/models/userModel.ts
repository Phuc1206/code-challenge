import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  score: number;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  score: { type: Number, default: 0 },
});

export default mongoose.model<IUser>('User', UserSchema);
