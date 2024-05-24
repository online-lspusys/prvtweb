document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
  
    var user = {
      username: username,
      email: email,
      password: password
    };
  
    localStorage.setItem('user', JSON.stringify(user));
  
    window.location.href = 'index.html';
});
  