// ==========================================================================
// PHẦN 3: XỬ LÝ JS THAO TÁC DOM & BẮT LỖI FORM LIÊN HỆ (VALIDATION)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Lấy các phần tử (Elements) từ DOM bằng ID
    const contactForm = document.getElementById('contactForm');
    const fullnameInput = document.getElementById('fullname');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const errorMsg = document.getElementById('errorMsg');

    // 2. Lắng nghe sự kiện Submit của Form
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Ngăn trình duyệt reload lại trang mặc định

            // Lấy giá trị và cắt bỏ khoảng trắng thừa 2 đầu (trim)
            const fullname = fullnameInput.value.trim();
            const phone = phoneInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            // --- QUY TẮC KIỂM TRA DỮ LIỆU (VALIDATION RULES) ---

            // Quy tắc 1: Kiểm tra Họ và tên (Không được bỏ trống)
            if (fullname === '') {
                showError('Vui lòng nhập họ và tên của bạn.');
                fullnameInput.focus();
                return;
            }

            // Quy tắc 2: Kiểm tra Số điện thoại VN (Đủ 10 số, bắt đầu bằng 03, 05, 07, 08, 09)
            const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
            if (!phoneRegex.test(phone)) {
                showError('Số điện thoại không hợp lệ! Phải đủ 10 chữ số (ví dụ: 0912345678).');
                phoneInput.focus();
                return;
            }

            // Quy tắc 3: Kiểm tra định dạng Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('Địa chỉ email không hợp lệ. Vui lòng kiểm tra lại!');
                emailInput.focus();
                return;
            }

            // Quy tắc 4: Kiểm tra Nội dung lời nhắn (Tối thiểu 10 ký tự)
            if (message.length < 10) {
                showError('Lời nhắn quá ngắn! Vui lòng nhập tối thiểu 10 ký tự.');
                messageInput.focus();
                return;
            }

            // --- XỬ LÝ KHI DỮ LIỆU HỢP LỆ ---
            clearError();
            alert(`Cảm ơn ${fullname}! Thông tin liên hệ của bạn đã được gửi thành công.`);
            
            // Xóa sạch dữ liệu trong Form sau khi gửi thành công
            contactForm.reset();
        });
    }

    // Hàm hiển thị thông báo lỗi ra thẻ DOM (#errorMsg)
    function showError(message) {
        if (errorMsg) {
            errorMsg.innerText = message;
            errorMsg.style.color = '#dc3545';
            errorMsg.style.marginTop = '10px';
        }
    }

    // Hàm xóa thông báo lỗi
    function clearError() {
        if (errorMsg) {
            errorMsg.innerText = '';
        }
    }
});