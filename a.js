// Lọc địa điểm theo từ khóa tìm kiếm
function searchLocation() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const points = document.querySelectorAll(".point");

    points.forEach(point => {
        const title = point.querySelector("h3").innerText.toLowerCase();
        if (title.includes(searchInput)) {
            point.style.display = "block";
        } else {
            point.style.display = "none";
        }
    });
}


// Thêm đánh giá vào danh sách

   
    
    document.addEventListener("DOMContentLoaded", function () {
        let loginBtn = document.getElementById("login-btn");
        let loggedInUser = localStorage.getItem("loggedInUser");

        if (loggedInUser) {
            loginBtn.innerText = "Đăng Xuất";
            loginBtn.href = "#"; // Không chuyển trang khi nhấn
            loginBtn.addEventListener("click", function () {
                localStorage.removeItem("loggedInUser");
                alert("Bạn đã đăng xuất!");
                window.location.reload(); // Tải lại trang để cập nhật giao diện
            });
        } else {
            loginBtn.innerText = "Đăng Nhập";
            loginBtn.href = "login.html"; // Chuyển đến trang đăng nhập
        }
    });
    
    document.addEventListener("DOMContentLoaded", function () {
        let loginStatus = document.getElementById("login-status");
        let loggedInUser = localStorage.getItem("loggedInUser");

        if (loggedInUser) {
            loginStatus.innerHTML = `Chào <strong>${loggedInUser}</strong>, bạn có thể đánh giá bên dưới!`;
        } else {
            loginStatus.innerHTML = `Bạn cần <a href="login.html">đăng nhập</a> để đánh giá.`;
        }
    });

    document.getElementById("review-form").addEventListener("submit", function (e) {
        e.preventDefault();
        
        let loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {
            alert("Bạn cần đăng nhập để đánh giá!");
            return;
        }

        let reviewText = document.getElementById("review-text").value;
        let reviewsContainer = document.getElementById("reviews");

        if (reviewText.trim()) {
            let reviewDiv = document.createElement("div");
            reviewDiv.className = "review";
            reviewDiv.innerHTML = `<strong>${loggedInUser}:</strong> ${reviewText}`;

            reviewsContainer.appendChild(reviewDiv);
            document.getElementById("review-text").value = ""; // Xóa nội dung nhập vào
            alert("Đánh giá của bạn đã được thêm!");
        } else {
            alert("Vui lòng nhập nội dung đánh giá!");
        }
    });
    
document.addEventListener("DOMContentLoaded", function () {
    const pointsPerPage = 3; // Số lượng địa điểm trên mỗi trang
    let currentPage = 1; 

    const points = document.querySelectorAll(".point");
    const totalPages = 4; // Tổng số trang là 3

    const pageInfo = document.getElementById("page-info");
    const prevBtn = document.getElementById("prev-page");
    const nextBtn = document.getElementById("next-page");

    function showPage(page) {
        let startIndex = (page - 1) * pointsPerPage;
        let endIndex = startIndex + pointsPerPage;

        points.forEach((point, index) => {
            point.style.display = (index >= startIndex && index < endIndex) ? "block" : "none";
        });

        pageInfo.textContent = `Trang ${page} / ${totalPages}`;

        prevBtn.disabled = (page === 1);
        nextBtn.disabled = (page === totalPages);
    }

    prevBtn.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    nextBtn.addEventListener("click", function () {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });

    showPage(currentPage);
});
document.addEventListener("DOMContentLoaded", function () {
    const tourForm = document.getElementById("tour-form");
    const tourMessage = document.getElementById("tour-message");

    tourForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {
            alert("Bạn cần đăng nhập để đặt tour!");
            return;
        }

        const destination = document.getElementById("destination").value;
        const numberOfPeople = document.getElementById("people").value;
        const numberOfDays = document.getElementById("days").value;
        const date = document.getElementById("date").value;

        if (destination && numberOfPeople > 0 && numberOfDays > 0 && date) {
            let bookedTours = JSON.parse(localStorage.getItem("bookedTours")) || [];
            bookedTours.push({
                user: loggedInUser,
                destination,
                numberOfPeople,
                numberOfDays,
                date
            });
            localStorage.setItem("bookedTours", JSON.stringify(bookedTours));

            tourMessage.style.display = "block";
            setTimeout(() => tourMessage.style.display = "none", 3000);
            tourForm.reset();
        } else {
            alert("Vui lòng nhập đầy đủ thông tin hợp lệ.");
        }
    });
}); 
