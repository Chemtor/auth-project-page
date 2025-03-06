const API_URL = 'http://localhost:8080/api'; // Địa chỉ backend

// Đăng ký người dùng
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password, role: 'user' }),
  });

  if (response.ok) {
    alert('Registration successful! Please login.');
    window.location.href = 'login.html';
  } else {
    alert('Registration failed. Please try again.');
  }
});

// Đăng nhập
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('token', data.accessToken); // Lưu token vào localStorage
    window.location.href = 'dashboard.html';
  } else {
    alert('Login failed. Please check your credentials.');
  }
});

// Hiển thị thông tin người dùng trên dashboard
const token = localStorage.getItem('token');
if (token && window.location.pathname.includes('dashboard.html')) {
  fetch(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('userInfo').textContent = `Welcome, ${data.username} (${data.role})`;
    })
    .catch(() => {
      alert('Failed to fetch user info.');
    });
}

// Đăng xuất
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
});

document.getElementById('showRegisterForm').addEventListener('click', function(event) {
  event.preventDefault();
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  loginForm.style.display = 'none';
  registerForm.style.display = 'flex';
});

document.getElementById('showLoginForm').addEventListener('click', function(event) {
  event.preventDefault();
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  loginForm.style.display = 'flex';
  registerForm.style.display = 'none';
});