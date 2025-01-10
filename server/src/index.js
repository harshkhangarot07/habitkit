const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const habitRoutes = require('./routes/habits');

dotenv.config();

const app = express();

app.use(cors({origin: 'https://tasktracker-kiz5c3zzk-hxrshs-projects.vercel.app/login ',
 methods: ['GET', 'POST'],
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const port = process.env.PORT || 4040;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
