import { Types } from "mongoose";
import { TUserName } from "../../interface/userName";
import { TGender } from "../../interface/gender";
import { TBloodGroup } from "../../interface/bloodGroup.interface";

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  designation: string;
  gender: TGender;
  dateOfBirth: Date;
  bloodGroup: TBloodGroup;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  isDeleted: boolean;
};
