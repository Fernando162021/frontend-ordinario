document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
        alert('No estás autenticado. Por favor, inicia sesión.');
        window.location.href = 'login.html';
        return;
    }

    try {
        const tournaments = await getTournamentsByUser(userId, token);

        const tableBody = document.getElementById('userTournamentTableBody');
        const updateForm = document.getElementById('updateTournamentForm');
        const createForm = document.getElementById('createTournamentForm');
        const createBtn = document.getElementById('createTournamentBtn');
        const cancelUpdateBtn = document.getElementById('cancelUpdateBtn');
        const cancelCreateBtn = document.getElementById('cancelCreateBtn');

        createBtn.addEventListener('click', () => {
            createForm.style.display = 'block';
            updateForm.style.display = 'none';
            createBtn.style.display = 'none';
        });

        cancelUpdateBtn.addEventListener('click', () => {
            updateForm.style.display = 'none';
            createBtn.style.display = 'block';
        });
    
        cancelCreateBtn.addEventListener('click', () => {
            createForm.style.display = 'none';
            createBtn.style.display = 'block';
        });

        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }

        tournaments.forEach(tournament => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', tournament._id);
            row.innerHTML = `
                <td>${tournament.tournamentName}</td>
                <td>${tournament.country}</td>
                <td>${tournament.city}</td>
                <td>${formatDate(tournament.startDate)}</td>
                <td>${formatDate(tournament.registrationEnd)}</td>
                <td>
                    <button class="btn btn-primary update-btn" data-id="${tournament._id}">Actualizar</button>
                    <button class="btn btn-danger delete-btn" data-id="${tournament._id}">Eliminar</button>
                    <button class="btn btn-warning register-btn" data-id="${tournament._id}">Registrar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        const registerButtons = document.querySelectorAll('.register-btn');
        registerButtons.forEach(button => {
            button.addEventListener('click', () => {
            const tournamentId = button.getAttribute('data-id');
            redirectToTournament(tournamentId);
            });
        });

        function redirectToTournament(tournamentId) {
            window.location.href = 'tournament.html?id=' + tournamentId;
        }

        tableBody.addEventListener('click', async (event) => {
            const deleteBtn = event.target.closest('.delete-btn');

            if (deleteBtn) {
                const tournamentId = deleteBtn.dataset.id;
                
                const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este torneo?');
                if (confirmDelete) {
                    try {
                        await deleteTournament(tournamentId, token);
                        alert('Torneo eliminado exitosamente.');
                        
                        deleteBtn.closest('tr').remove();
                    } catch (error) {
                        console.error('Error:', error);
                        alert('Error: No se pudo eliminar el torneo. Inténtelo de nuevo más tarde.');
                    }
                }
            }
        });

        tableBody.addEventListener('click', async (event) => {
            const updateBtn = event.target.closest('.update-btn');

            if (updateBtn) {
                const tournamentId = updateBtn.dataset.id;

                try {
                    const tournament = await getTournamentById(tournamentId);

                    document.getElementById('updateTournamentId').value = tournament._id;
                    document.getElementById('updateTournamentName').value = tournament.tournamentName;
                    document.getElementById('updateCountry').value = tournament.country;
                    document.getElementById('updateCity').value = tournament.city;
                    document.getElementById('updateStartDate').value = formatDate(tournament.startDate);
                    document.getElementById('updateRegistrationEnd').value = formatDate(tournament.registrationEnd);

                    createBtn.style.display = 'none';
                    updateForm.style.display = 'block';
                } catch (error) {
                    console.error('Error:', error);
                    alert('Error: No se pudo cargar el torneo para actualizar. Inténtelo de nuevo más tarde.');
                }
            }
        });

        updateForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const tournamentId = document.getElementById('updateTournamentId').value;
            const updatedTournament = {
                tournamentName: document.getElementById('updateTournamentName').value,
                country: document.getElementById('updateCountry').value,
                city: document.getElementById('updateCity').value,
                startDate: document.getElementById('updateStartDate').value,
                registrationEnd: document.getElementById('updateRegistrationEnd').value,
            };

            try {
                await updateTournament(tournamentId, updatedTournament, token);
                alert('Torneo actualizado exitosamente.');
                
                location.reload();
            } catch (error) {
                console.error('Error:', error);
                alert('Error: No se pudo actualizar el torneo. Inténtelo de nuevo más tarde.');
            }
        });

        createForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const newTournament = {
                tournamentName: document.getElementById('createTournamentName').value,
                country: document.getElementById('createCountry').value,
                city: document.getElementById('createCity').value,
                startDate: document.getElementById('createStartDate').value,
                registrationEnd: document.getElementById('createRegistrationEnd').value,
            };

            try {
                await createTournament(newTournament, token);
                alert('Torneo creado exitosamente.');
                
                location.reload();
            } catch (error) {
                console.error('Error:', error);
                alert('Error: No se pudo crear el torneo. Inténtelo de nuevo más tarde.');
            }
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Error: No se pudieron cargar los registros Inténtelo de nuevo más tarde.');
    }
});
