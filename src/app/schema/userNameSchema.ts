import { Schema } from "mongoose";
import { TUserName } from "../interface/userName";

export const userNameSchema = new Schema<TUserName>({
    firstName: {
      type: String,
      trim: true,
      maxlength: [10, 'First name should be within 10 character'],
      required: [true, 'First name is required'],
    },
    middleName: {
      type: String,
      trim: true,
      maxlength: [16, 'Mid name should be within 16 character'],
      required: [true, 'Middle name is required'],
    },
    lastName: {
      type: String,
      maxlength: [10, 'Last name should be within 10 character'],
      required: [true, 'Last name is required'],
    },
  });