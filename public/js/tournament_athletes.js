document.addEventListener('DOMContentLoaded', async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const tournamentId = urlParams.get('id');

        const tournament = await getTournamentById(tournamentId);

        const tournamentNameHeading = document.getElementById('tournamentName');
        tournamentNameHeading.textContent = tournament.tournamentName;

        const athletes = await getAthletesByTournamentId(tournamentId);

        const tableBody = document.getElementById('athleteTableBody');

        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
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
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error:', error);
        alert('Error: No se pudieron cargar los datos del torneo y los atletas asociados. Inténtelo de nuevo más tarde.');
    }
});
