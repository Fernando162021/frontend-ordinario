const BASE_URL_USERS = 'http://localhost:5000/api/users';

async function register(userData) {
    try {
        const response = await fetch(`${BASE_URL_USERS}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to register user');
    }
}

async function login(credentials) {
    try {
        const response = await fetch(`${BASE_URL_USERS}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to login user');
    }
}

async function getUserData(token) {
    try {
      const response = await fetch(`${BASE_URL_USERS}/data`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to fetch user data');
    }
}