document.addEventListener('DOMContentLoaded', async () => {
    try {
        const tournaments = await getAllTournaments();

        const tableBody = document.getElementById('tournamentTableBody');

        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }

        tournaments.forEach(tournament => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', tournament._id);

            const tournamentNameLink = document.createElement('a');
            tournamentNameLink.setAttribute('href', `tournament_athletes.html?id=${tournament._id}`);
            tournamentNameLink.textContent = tournament.tournamentName;

            const nameCell = document.createElement('td');
            nameCell.appendChild(tournamentNameLink);
            row.appendChild(nameCell);

            row.innerHTML += `
                <td>${tournament.country}</td>
                <td>${tournament.city}</td>
                <td>${formatDate(tournament.startDate)}</td>
                <td>${formatDate(tournament.registrationEnd)}</td>
            `;
            tableBody.appendChild(row);
        });
        
        const adminTournamentsBtn = document.getElementById('adminTournamentsBtn');

        adminTournamentsBtn.addEventListener('click', () => {
            const token = localStorage.getItem('token');

            if (!token) {
                alert('Debes iniciar sesión para administrar los torneos');
                window.location.href = 'login.html';
            } else {
                window.location.href = 'tournaments.html';
            }
        });

    } catch (error) {
        console.error('Error:', error);
        alert('Error: No se pudieron cargar los torneos. Inténtelo de nuevo más tarde.');
    }
});
