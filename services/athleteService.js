const BASE_URL_ATHLETES = 'http://localhost:5000/api/athletes';

async function getAthletes() {
    try {
        const response = await fetch(BASE_URL_ATHLETES);
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch athletes');
    }
}

async function getAthleteById(athleteId) {
    try {
        const response = await fetch(`${BASE_URL_ATHLETES}/${athleteId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching athlete by ID:', error);
        throw new Error('Failed to fetch athlete by ID');
    }
}

async function getAthletesByTournamentId(tournamentId) {
    try {
        const response = await fetch(`${BASE_URL_ATHLETES}/tournament/${tournamentId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching athletes by tournament ID:', error);
        throw new Error('Failed to fetch athletes by tournament ID');
    }
}

async function registerAthlete(athleteData, token) {
    try {
        const response = await fetch(BASE_URL_ATHLETES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Añadido encabezado de autorización
            },
            body: JSON.stringify(athleteData),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error registering athlete:', error);
        throw new Error('Failed to register athlete');
    }
}

async function updateAthlete(athleteId, athleteData, token) {
    try {
        const response = await fetch(`${BASE_URL_ATHLETES}/${athleteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(athleteData)
        });
        if (!response.ok) {
            throw new Error('Failed to update athlete');
        }
        return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to update athlete');
    }
}

async function deleteAthlete(athleteId, token) {
    try {
        const response = await fetch(`${BASE_URL_ATHLETES}/${athleteId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to delete athlete');
        }
        return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to delete athlete');
    }
}