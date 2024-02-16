document.getElementById('f1Form').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const season = document.getElementById('season').value;
    const round = document.getElementById('round').value;
    const apiUrl = `https://ergast.com/api/f1/${season}/${round}/driverStandings.json`;

    axios.get(apiUrl)
        .then(response => {
            const standings = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            updateTable(standings);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function updateTable(standings) {
    const tableBody = document.getElementById('f1Data').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; 

    standings.forEach(driverStanding => {
        const row = tableBody.insertRow();
        
        const positionCell = row.insertCell(0);
        positionCell.textContent = driverStanding.position;

        const driverCell = row.insertCell(1);
        driverCell.textContent = `${driverStanding.Driver.givenName} ${driverStanding.Driver.familyName}`;

        const nationalityCell = row.insertCell(2);
        nationalityCell.textContent = driverStanding.Driver.nationality;

        const constructorCell = row.insertCell(3);
        constructorCell.textContent = driverStanding.Constructors[0].name;

        const pointsCell = row.insertCell(4);
        pointsCell.textContent = driverStanding.points;
    });
}

