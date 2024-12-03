const express = require('express');
const router = express.Router();

// Route GET đăng nhập
router.get('/login', (req, res) => {
    res.render('login', { message: req.flash('message') });  // Truyền message vào view
});

// Route POST đăng nhập
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Kiểm tra thông tin đăng nhập
    if (username !== 'admin' || password !== '12345') {
        req.flash('message', 'Thông tin đăng nhập không chính xác');
        return res.redirect('/login');  // Quay lại trang login với thông báo
    }

    // Nếu đăng nhập thành công, lưu trạng thái vào session
    req.session.isLoggedIn = true;
    res.redirect('/trips');
});

module.exports = router;