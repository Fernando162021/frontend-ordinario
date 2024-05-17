document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
  
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await login({ email, password });
        
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response._id);
  
        loginMessage.textContent = 'Inicio de sesión exitoso';
        loginMessage.style.color = 'green';

        window.location.href = 'index.html';

      } catch (error) {
        console.error('Error:', error);
        loginMessage.textContent = 'Error: No se pudo iniciar sesión. Verifique sus credenciales e inténtelo de nuevo.';
        loginMessage.style.color = 'red';
      }
    });
  });  