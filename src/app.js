const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const siswaRoutes = require('./routes/siswaRoutes');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check / Root Info
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Backend API CRUD Data Siswa is running',
    version: '1.0.0',
    documentation: '/api/siswa'
  });
});

// Routes
app.use('/api/siswa', siswaRoutes);

// Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
