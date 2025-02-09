document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const togglePasswordIcons = document.querySelectorAll(".toggle-password");

    togglePasswordIcons.forEach(icon => {
        icon.addEventListener("click", function () {
            const passwordInput = this.previousElementSibling;
            passwordInput.type = passwordInput.type === "password" ? "text" : "password";
            this.classList.toggle("fa-eye-slash");
        });
    });


    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("register-username").value.trim();
            const password = document.getElementById("register-password").value.trim();

            if (!username || !password) {
                showAlert("Vui lòng nhập đầy đủ thông tin!", "error");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];
            if (users.find(user => user.username === username)) {
                showAlert("Tên tài khoản đã tồn tại!", "error");
                return;
            }

            users.push({ username, password });
            localStorage.setItem("users", JSON.stringify(users));

            showAlert("Đăng ký thành công! Chuyển hướng đến trang đăng nhập...", "success");
            setTimeout(() => window.location.href = "login.html", 2000);
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("login-username").value.trim();
            const password = document.getElementById("login-password").value.trim();

            if (!username || !password) {
                showAlert("Vui lòng nhập tên tài khoản và mật khẩu!", "error");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];
            let user = users.find(user => user.username === username && user.password === password);

            if (!user) {
                showAlert("Tên tài khoản hoặc mật khẩu không đúng!", "error");
                return;
            }

            localStorage.setItem("loggedInUser", username);
            showAlert("Đăng nhập thành công! Đang chuyển hướng...", "success");
            setTimeout(() => window.location.href = "index.html", 2000);
        });
    }
});


function showAlert(message, type) {
    const alertBox = document.createElement("div");
    alertBox.className = `alert ${type}`;
    alertBox.textContent = message;
    document.body.appendChild(alertBox);

    setTimeout(() => alertBox.remove(), 3000);
}