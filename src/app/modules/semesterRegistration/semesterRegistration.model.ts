import { model, Schema } from 'mongoose';
import { TSemesterRegistration } from './semesterRegistration.interface';

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type:Schema.Types.ObjectId,
      required:true,
      ref: 'academic-semesters'
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
    maxCredit: {
      type: Number,
      required: true,
    },
    minCredit: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Upcomming', 'Ongoing', 'Ended'],
      required: true,
      default: "Upcomming"
    },
  },
  {
    timestamps: true,
  },
);

export const SemesterRegistration = model<TSemesterRegistration>(
  'semester-registrations',
  semesterRegistrationSchema,
);
