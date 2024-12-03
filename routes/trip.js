const express = require('express');
const router = express.Router();
const Trip = require('../models/trips');  // Đảm bảo đường dẫn đúng

// Route GET danh sách chuyến tàu
router.get('/', async (req, res) => {
    try {
        const trips = await Trip.find();  // Lấy tất cả chuyến tàu từ MongoDB
        res.render('trip', { trips: trips });  // Gửi dữ liệu chuyến tàu vào view
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi lấy dữ liệu chuyến tàu');
    }
});

// Route GET form thêm chuyến tàu
router.get('/add', (req, res) => {
    res.render('addTrip'); // Render form để thêm chuyến tàu mới
});

// Route POST thêm chuyến tàu
router.post('/add', async (req, res) => {
    try {
        const { name, from, to, departureTime } = req.body;

        // Tạo chuyến tàu
        const newTrip = new Trip({
            name,
            from,
            to,
            departureTime
        });

        // Lưu chuyến tàu vào MongoDB
        await newTrip.save();

        // Sau khi thêm thành công, chuyển hướng về trang danh sách chuyến tàu
        res.redirect('/trips');
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi thêm chuyến tàu');
    }
});

// Route GET form sửa chuyến tàu
router.get('/edit/:id', async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);  // Tìm chuyến tàu theo ID
        if (!trip) {
            return res.status(404).send('Chuyến tàu không tồn tại');
        }
        res.render('editTrip', { trip });  // Render form sửa chuyến tàu
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi lấy chuyến tàu để sửa');
    }
});

// Route POST cập nhật chuyến tàu
router.post('/update/:id', async (req, res) => {
    try {
        const { name, from, to, departureTime } = req.body;
        
        // Cập nhật chuyến tàu trong MongoDB
        const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, {
            name,
            from,
            to,
            departureTime
        }, { new: true });

        if (!updatedTrip) {
            return res.status(404).send('Chuyến tàu không tồn tại');
        }

        res.redirect('/trips');  // Sau khi cập nhật thành công, chuyển hướng về danh sách chuyến tàu
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi cập nhật chuyến tàu');
    }
});

// Route POST xóa chuyến tàu
router.post('/delete/:id', async (req, res) => {
    try {
        const trip = await Trip.findByIdAndDelete(req.params.id);  // Xóa chuyến tàu theo ID
        if (!trip) {
            return res.status(404).send('Chuyến tàu không tồn tại');
        }
        res.redirect('/trips');  // Sau khi xóa thành công, chuyển hướng về trang danh sách chuyến tàu
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi xóa chuyến tàu');
    }
});

module.exports = router;
