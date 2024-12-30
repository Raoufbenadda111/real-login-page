const express = require('express');
const bcrypt = require('bcryptjs'); // استيراد مكتبة bcryptjs
const router = express.Router();
const User = require('../models/user'); // تعديل المسار إذا كان ملف user في مجلد models

// مسار GET لصفحة التسجيل
router.get('/register', (req, res) => {
    res.render('register'); // عرض صفحة التسجيل
});

// مسار GET لصفحة تسجيل الدخول
router.get('/login', (req, res) => {
    res.render('login'); // عرض صفحة تسجيل الدخول
});

// مسار POST للتسجيل
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // تشفير كلمة المرور
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send("User registered successfully!");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// مسار POST لتسجيل الدخول
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("Invalid credentials");
        }

        // مقارنة كلمات المرور
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send("Invalid credentials");
        }

        res.send("Login successful!");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
