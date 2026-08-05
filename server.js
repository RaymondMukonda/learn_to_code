import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import session from 'express-session';
import passport from './config/passport.js';
import swaggerUi from 'swagger-ui-express';

import connectDB from './config/db.js';

import studentRoutes from './routes/studentRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Session middleware
app.use(
  session({
    secret: 'cse341-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Load Swagger JSON
const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json', 'utf8'));

// Swagger route
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      withCredentials: true
    }
  })
);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'CRUD CSE341 API is running',
    database: 'crud-cse341',
    documentation: '/api-docs',
    login: '/auth/github',
    logout: '/auth/logout'
  });
});

// Auth routes
app.use('/auth', authRoutes);

// API routes
app.use('/students', studentRoutes);
app.use('/subjects', subjectRoutes);
app.use('/teachers', teacherRoutes);
app.use('/courses', courseRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: 'Something went wrong',
    error: err.message
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
