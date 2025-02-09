import { Schema } from 'mongoose';
import { TBloodGroup } from '../interface/bloodGroup.interface';



export const bloodGroupSchema =new Schema<TBloodGroup>({
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    requird: [true, 'Blood group is required'],
  },
});

