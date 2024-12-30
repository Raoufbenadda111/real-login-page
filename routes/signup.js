const express = require('express');
const bcrypt = require('bcryptjs'); // لتشفير كلمة المرور
const router = express.Router();
const User = require('../models/user'); // استيراد نموذج المستخدم

// عرض صفحة التسجيل
router.get('/signup', (req, res) => {
    res.render('signup'); // عرض صفحة التسجيل
});

// معالجة طلب التسجيل
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // التأكد من أن البريد الإلكتروني غير مستخدم مسبقاً
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email is already registered. Please log in.');
        }

        // تشفير كلمة المرور
        const hashedPassword = await bcrypt.hash(password, 10);

        // إنشاء مستخدم جديد
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
        res.redirect('/login');
    } catch (err) {
        res.status(500).send('An error occurred during registration. Please try again.');
    }
});

module.exports = router;
