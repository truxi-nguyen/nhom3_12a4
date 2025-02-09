document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".point");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.3 });

    elements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = "translateY(20px)";
        observer.observe(el);
    });
});
function searchLocation() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const points = document.querySelectorAll(".point");

    points.forEach(point => {
        const title = point.querySelector("h3").innerText.toLowerCase();
        point.style.display = title.includes(searchInput) ? "block" : "none";
    });
}

document.addEventListener("DOMContentLoaded", function () {
    let loginBtn = document.getElementById("login-btn");
    let loggedInUser = localStorage.getItem("loggedInUser");

    function updateLoginButton() {
        if (loggedInUser) {
            loginBtn.innerText = "Đăng Xuất";
            loginBtn.href = "#";
            loginBtn.removeEventListener("click", logoutFunction);
            loginBtn.addEventListener("click", logoutFunction);
        } else {
            loginBtn.innerText = "Đăng Nhập";
            loginBtn.href = "login.html";
            loginBtn.removeEventListener("click", logoutFunction);
        }
    }

    function logoutFunction() {
        Swal.fire({
            title: "Bạn có chắc muốn đăng xuất?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Đăng xuất",
            cancelButtonText: "Hủy",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("loggedInUser");
                loggedInUser = null; // Cập nhật trạng thái đăng nhập
                updateLoginButton();
                Swal.fire("Đã đăng xuất!", "", "success");
            }
        });
    }

    updateLoginButton();
});


document.addEventListener("DOMContentLoaded", function () {
    let loginStatus = document.getElementById("login-status");
    let loggedInUser = localStorage.getItem("loggedInUser");

    loginStatus.innerHTML = loggedInUser
        ? `Chào <strong>${loggedInUser}</strong>, bạn có thể đánh giá bên dưới!`
        : `Bạn cần <a href="login.html">đăng nhập</a> để đánh giá.`;

    const reviewForm = document.getElementById("review-form");
    const reviewText = document.getElementById("review-text");
    const reviewsContainer = document.querySelector(".review-list");

    let savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];

    function displayReviews() {
        reviewsContainer.innerHTML = "";
        savedReviews.forEach((review, index) => {
            let reviewDiv = document.createElement("div");
            reviewDiv.className = "review";
            reviewDiv.innerHTML = `
                <strong>${review.user}:</strong>
                <p>${review.text}</p>
                ${review.user === loggedInUser ? `<button class="delete-review" data-index="${index}">Xóa</button>` : ""}
            `;
            reviewsContainer.appendChild(reviewDiv);
        });

        document.querySelectorAll(".delete-review").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                
                Swal.fire({
                    title: "Bạn có chắc chắn muốn xóa đánh giá?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Xóa",
                    cancelButtonText: "Hủy",
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6"
                }).then((result) => {
                    if (result.isConfirmed) {
                        savedReviews.splice(index, 1);
                        localStorage.setItem("reviews", JSON.stringify(savedReviews));
                        displayReviews();
                        Swal.fire("Đã xóa!", "Đánh giá đã bị xóa.", "success");
                    }
                });
            });
        });
    }

    displayReviews();

    reviewForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!loggedInUser) {
            Swal.fire("Thông báo", "Bạn cần đăng nhập để đánh giá!", "info");
            return;
        }

        let reviewContent = reviewText.value.trim();
        if (reviewContent) {
            let newReview = { user: loggedInUser, text: reviewContent };
            savedReviews.push(newReview);
            localStorage.setItem("reviews", JSON.stringify(savedReviews));

            reviewText.value = "";
            displayReviews();
            Swal.fire("Thành công!", "Đánh giá của bạn đã được thêm!", "success");
        } else {
            Swal.fire("Lỗi!", "Vui lòng nhập nội dung đánh giá!", "error");
        }
    });
});

// Phân trang
document.addEventListener("DOMContentLoaded", function () {
    let itemsPerPage = 3;
    let currentPage = 1;
    let items = document.querySelectorAll(".point");
    let totalPages = Math.ceil(items.length / itemsPerPage);

    function showPage(page) {
        items.forEach((item, index) => {
            item.style.display =
                index >= (page - 1) * itemsPerPage && index < page * itemsPerPage
                    ? "block"
                    : "none";
        });

        document.getElementById("page-info").textContent = `Trang ${page}`;
        document.getElementById("prev-page").disabled = page === 1;
        document.getElementById("next-page").disabled = page === totalPages;
    }

    document.getElementById("prev-page").addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    document.getElementById("next-page").addEventListener("click", function () {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });

    showPage(currentPage);
});


document.addEventListener("DOMContentLoaded", function () {
    const tourForm = document.getElementById("tour-form");

    tourForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {
            Swal.fire("Thông báo", "Bạn cần đăng nhập để đặt tour!", "info");
            return;
        }

        const destination = document.getElementById("destination").value;
        const numberOfPeople = document.getElementById("people").value;
        const numberOfDays = document.getElementById("days").value;
        const date = document.getElementById("date").value;
        const bookingTime = new Date().toLocaleString(); 

        if (destination && numberOfPeople > 0 && numberOfDays > 0 && date) {
            let bookedTours = JSON.parse(localStorage.getItem("bookedTours")) || [];
            bookedTours.push({
                user: loggedInUser,
                destination,
                numberOfPeople,
                numberOfDays,
                date,
                bookingTime
            });
            localStorage.setItem("bookedTours", JSON.stringify(bookedTours));

            Swal.fire("Thành công!", "Tour của bạn đã được đặt!", "success");
            tourForm.reset();
        } else {
            Swal.fire("Lỗi!", "Vui lòng nhập đầy đủ thông tin hợp lệ.", "error");
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
});
