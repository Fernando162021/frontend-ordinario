const BASE_URL_TOURNAMENTS = 'http://localhost:5000/api/tournaments';

async function getAllTournaments() {
    try {
        const response = await fetch(BASE_URL_TOURNAMENTS);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch tournaments');
    }
}

async function getTournamentById(tournamentId) {
    try {
        const response = await fetch(`${BASE_URL_TOURNAMENTS}/${tournamentId}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch tournament by ID');
      }
}

async function getTournamentsByUser(userId, token) {
    try {
        const response = await fetch(`${BASE_URL_TOURNAMENTS}/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch tournaments by user');
      }
}

async function createTournament(tournamentData, token) {
    try {
        const response = await fetch(BASE_URL_TOURNAMENTS, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(tournamentData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to create tournament');
    }
}

async function updateTournament(tournamentId, newData, token) {
    try {
        const response = await fetch(`${BASE_URL_TOURNAMENTS}/${tournamentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to update tournament');
    }
}

async function deleteTournament(tournamentId, token) {
    try {
        const response = await fetch(`${BASE_URL_TOURNAMENTS}/${tournamentId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          return 'Tournament deleted successfully';
        } else {
          throw new Error('Failed to delete tournament');
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to delete tournament');
    }
}