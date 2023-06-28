/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Schema, Document } from 'mongoose';

export interface Task extends Document {
  title: string;
  description: string;
  completed: boolean;
  student: string;
  date: string;
  id_student: string;
  file: any;
}

export const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  student: { type: String, required: true },
  date: { type: String, required: true },
  id_student: { type: String, required: true },
  file: { type: String, require: true },
});
