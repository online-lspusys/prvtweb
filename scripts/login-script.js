document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  var storedUser = JSON.parse(localStorage.getItem('user'));

  if (storedUser && username === storedUser.username && password === storedUser.password) {
    window.location.href = 'home.html';
  } else {
    document.getElementById('error-msg').textContent = 'Invalid username or password';
  }
});
