document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
  
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await register({ name, email, password });
        
        alert('Usuario registrado exitosamente');
        window.location.href = 'login.html';
      } catch (error) {
        console.error('Error:', error);
        alert('Error: No se pudo registrar el usuario. Inténtelo de nuevo más tarde.');
      }
    });
  });  