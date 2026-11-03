// ==========================================================================
// PHẦN 4: TÍCH HỢP FETCH API (ASYNC/AWAIT) & LOCALSTORAGE
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo các tính năng Phần 4 khi trang web tải xong
    initThemeFromLocalStorage();
    fetchProjectsData();
});

/* --------------------------------------------------------------------------
   1. SỬ DỤNG LOCALSTORAGE: LƯU TRẠNG THÁI GIAO DIỆN (DARK/LIGHT THEME)
   -------------------------------------------------------------------------- */

// Hàm kiểm tra và áp dụng Theme từ LocalStorage khi nạp trang
function initThemeFromLocalStorage() {
    const savedTheme = localStorage.getItem('portfolio_theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Hàm chuyển đổi và lưu Theme vào LocalStorage
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    
    // Lưu lựa chọn của người dùng vào LocalStorage
    localStorage.setItem('portfolio_theme', isDark ? 'dark' : 'light');
    console.log(`Đã lưu cấu hình giao diện: ${isDark ? 'Dark Mode' : 'Light Mode'}`);
}


/* --------------------------------------------------------------------------
   2. SỬ DỤNG FETCH API (ASYNC/AWAIT): TẢI DỮ LIỆU ĐỘNG TỪ MÁY CHỦ
   -------------------------------------------------------------------------- */

// Hàm bất đồng bộ (async/await) lấy danh sách dữ liệu từ API
async function fetchProjectsData() {
    const projectsContainer = document.getElementById('projectsContainer');
    
    try {
        // Gọi Fetch API tới Server (Ví dụ API mẫu JSONPlaceholder)
        const response = await fetch('[suspicious link removed]');
        
        // Kiểm tra nếu phản hồi không thành công (Status != 200)
        if (!response.ok) {
            throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
        }

        // Chuyển đổi dữ liệu phản hồi về dạng JSON
        const apiData = await response.json();

        // Đổ dữ liệu động vừa lấy về ra giao diện HTML (DOM Manipulation)
        renderProjectsList(apiData);

    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu qua Fetch API:', error);
        // Giữ nguyên dữ liệu tĩnh sẵn có nếu xảy ra lỗi kết nối
    }
}

// Hàm render dữ liệu Fetch API thành thẻ HTML
function renderProjectsList(data) {
    const projectsContainer = document.getElementById('projectsContainer');
    if (!projectsContainer) return;

    // Duyệt qua mảng dữ liệu lấy từ API và chèn vào DOM
    data.forEach((item, index) => {
        const article = document.createElement('article');
        article.className = 'project-card';
        article.innerHTML = `
            <h3>Dự án API #${index + 1}: ${item.title.substring(0, 25)}...</h3>
            <p>${item.body.substring(0, 90)}...</p>
        `;
        projectsContainer.appendChild(article);
    });
}