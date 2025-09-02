import mongoose from 'mongoose';

export const connectDB = async (uri) => {
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connect(uri, {
      dbName: uri.split('/').pop()?.split('?')[0] || 'civilguruji_leads'
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};
