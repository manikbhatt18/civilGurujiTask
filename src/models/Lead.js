import mongoose from 'mongoose';

const STATUS = ['new', 'in-progress', 'closed'];

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: ''
    },
    status: {
      type: String,
      enum: STATUS,
      default: 'new',
      index: true
    }
  },
  { timestamps: true }
);

// helpful indexes for search/filter
LeadSchema.index({ name: 'text', email: 'text', phone: 'text', message: 'text' });

export const Lead = mongoose.model('Lead', LeadSchema);
export const LEAD_STATUS = STATUS;
