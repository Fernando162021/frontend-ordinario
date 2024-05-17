function getTournamentIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('Tournament ID from URL:', id);
    return id;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

async function displayAthletes() {
    const tournamentId = getTournamentIdFromURL();
    if (!tournamentId) {
        console.error('No tournament ID found in URL');
        return;
    }

    try {
        const athletes = await getAthletesByTournamentId(tournamentId);
        console.log('Fetched athletes:', athletes);

        const tableBody = document.getElementById('athletes-table-body');

        tableBody.innerHTML = '';

        if (athletes.length === 0) {
            console.log('No athletes found for this tournament'); 
        }

        athletes.forEach(athlete => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${athlete.athleteName}</td>
                <td>${athlete.country}</td>
                <td>${athlete.city}</td>
                <td>${formatDate(athlete.bornDate)}</td>
                <td>${athlete.gender ? 'Masculino' : 'Femenino'}</td>
                <td>${athlete.weightDivision}</td>
                <td>
                    <button class="btn btn-danger delete-btn" data-id="${athlete._id}">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', handleDeleteAthlete);
        });

    } catch (error) {
        console.error('Error fetching athletes:', error);
    }
}

async function handleRegisterAthlete(event) {
    event.preventDefault();
    
    const tournamentId = getTournamentIdFromURL();
    if (!tournamentId) {
        console.error('No tournament ID found in URL');
        return;
    }

    const athleteData = {
        athleteName: document.getElementById('athleteName').value,
        country: document.getElementById('country').value,
        city: document.getElementById('city').value,
        bornDate: document.getElementById('bornDate').value,
        gender: document.getElementById('gender').value === 'true',
        weightDivision: document.getElementById('weightDivision').value,
        tournamentId: tournamentId
    };

    const token = localStorage.getItem('token');

    console.log(athleteData);

    try {
        const response = await registerAthlete(athleteData, token);
        console.log('Athlete registered successfully:', response);
        alert('Atleta registrado con éxito');
        document.getElementById('register-athlete-form').reset();
        document.getElementById('register-athlete-form').style.display = 'none';
        document.getElementById('register-athlete-btn').style.display = 'block';
        displayAthletes();
    } catch (error) {
        console.error('Error registering athlete:', error);
        alert('Error al registrar atleta');
    }
}

async function handleDeleteAthlete(event) {
    const athleteId = event.target.getAttribute('data-id');
    const token = localStorage.getItem('token');

    if (confirm('¿Estás seguro de que quieres eliminar este atleta?')) {
        try {
            await deleteAthlete(athleteId, token);
            console.log('Athlete deleted successfully');
            alert('Atleta eliminado con éxito');
            displayAthletes();
        } catch (error) {
            console.error('Error deleting athlete:', error);
            alert('Error al eliminar atleta');
        }
    }
}

function handleCancelRegistration(event) {
    event.preventDefault();
    document.getElementById('register-athlete-form').reset();
    document.getElementById('register-athlete-form').style.display = 'none';
    document.getElementById('register-athlete-btn').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    displayAthletes();

    const registerAthleteBtn = document.getElementById('register-athlete-btn');
    const registerAthleteForm = document.getElementById('register-athlete-form');
    const cancelBtn = document.getElementById('cancel-register-btn');

    registerAthleteBtn.addEventListener('click', () => {
        registerAthleteForm.style.display = 'block';
        registerAthleteBtn.style.display = 'none';
    });

    registerAthleteForm.addEventListener('submit', handleRegisterAthlete);
    cancelBtn.addEventListener('click', handleCancelRegistration);
});