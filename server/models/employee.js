// employeeModel.js
import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ['Working', 'OnVacation', 'LunchTime', 'BusinessTrip'],
    default: 'Working',
    required: true
  },
  image: { type: String, required: true },
});

export const Employee = mongoose.model('Employee', employeeSchema);
