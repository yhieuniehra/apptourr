// app.js
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Kết nối MongoDB
const mongoURI = 'mongodb+srv://hra101237:12345@apinode.wjba8.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log('Error connecting to MongoDB Atlas:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Đảm bảo Express phục vụ các tệp tĩnh (CSS, JS, ảnh, v.v.)
app.use(express.static('public'));


// Cấu hình flash messages
app.use(flash());

// Cấu hình thư mục chứa views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Import routes
const authRoutes = require('./routes/auth');
const tripRoutes = require('./routes/trip');

// Sử dụng route auth.js
app.use('/', authRoutes);

// Middleware bảo vệ route trips
app.use('/trips', (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login'); // Nếu chưa đăng nhập, chuyển hướng tới login
  }
  next();
}, tripRoutes);

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});