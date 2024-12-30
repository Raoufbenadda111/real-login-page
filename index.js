const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// إعداد قاعدة البيانات
mongoose.connect('mongodb://127.0.0.1:27017/firstDb_project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// إعدادات التطبيق
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// المسارات
app.use('/auth', require('./routes/auth')); // مسارات تسجيل الدخول
app.use('/', require('./routes/signup'));   // مسارات التسجيل

app.get('/test', (req, res) => {
  res.send('Test route is working!');
});

// تشغيل الخادم
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
