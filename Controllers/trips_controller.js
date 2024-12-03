const Trip = require('../models/trip'); // Đảm bảo đường dẫn chính xác

// Lấy tất cả chuyến du lịch và render
exports.getTrips = async (req, res) => {
    try {
        const trips = await Trip.find(); // Lấy tất cả chuyến du lịch từ MongoDB
        res.render('trip', { trips: trips }); // Render trang chuyến du lịch với dữ liệu chuyến đi
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi lấy dữ liệu chuyến du lịch');
    }
};

// Hiển thị form để thêm chuyến du lịch mới
exports.addTripForm = (req, res) => {
    res.render('addTrip'); // Render form để thêm chuyến du lịch mới
};

// Xử lý thêm chuyến du lịch mới
exports.addTrip = async (req, res) => {
    const { name, from, to, departureTime, image } = req.body; // Lấy dữ liệu từ form, bao gồm URL hình ảnh
    try {
        const newTrip = new Trip({
            name,
            from,
            to,
            departureTime,
            image, // Lưu trữ URL hình ảnh
        });

        await newTrip.save(); // Lưu chuyến du lịch mới vào cơ sở dữ liệu
        res.redirect('/trips'); // Chuyển hướng về danh sách chuyến du lịch
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi thêm chuyến du lịch');
    }
};

// Hiển thị form để chỉnh sửa chuyến du lịch
exports.editTripForm = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id); // Tìm chuyến du lịch theo ID
        res.render('editTrip', { trip: trip }); // Render form sửa với dữ liệu chuyến du lịch
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi lấy chuyến du lịch để sửa');
    }
};

// Xử lý cập nhật chuyến du lịch
exports.updateTrip = async (req, res) => {
    const { name, from, to, departureTime, image } = req.body; // Lấy dữ liệu cập nhật
    try {
        await Trip.findByIdAndUpdate(req.params.id, {
            name,
            from,
            to,
            departureTime,
            image, // Cập nhật hình ảnh nếu có thay đổi
        });
        res.redirect('/trips'); // Chuyển hướng về danh sách chuyến du lịch
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi cập nhật chuyến du lịch');
    }
};

// Xử lý xóa chuyến du lịch
exports.deleteTrip = async (req, res) => {
    try {
        await Trip.findByIdAndDelete(req.params.id); // Xóa chuyến du lịch theo ID
        res.redirect('/trips'); // Chuyển hướng về danh sách chuyến du lịch
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi xóa chuyến du lịch');
    }
};
