const tableLeguae = document.querySelector('.Table-leguae')
const url = 'https://livescore-football.p.rapidapi.com/soccer/league-table?country_code=venezuela&league_code=primera-division';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cc754b3c05msh9f955300323426fp1a6b25jsn0dbe27a7f142',
		'X-RapidAPI-Host': 'livescore-football.p.rapidapi.com'
	}
};

async function fetchData (urlApi, options){
  const response = await fetch(urlApi,options)
  const data = await response.json()
  return data
}
(async()=>{
  try{
    const response = await fetchData(url, options)
    console.log(response)
    const table = `${response.data.total.map(team=>
      `<div class="data-teams">
      <p class="rank-team"> ${team.rank} </p> 
      <img class="logo-team"src="${team.team_logo}" alt=""> 
      <p class="name-team">${team.team_name}</p>
      <p class="games-played">${team.games_played}</p>
      <p class="games-won">${team.won}</p>
      <p class="games-draw">${team.draw}</p>
      <p class="games-lost">${team.lost}</p>
      <p class="goals-for">${team.goals_for}</p>
      <p class="goals_against">${team.goals_against}</p>
      <p class="goals_diff">${team.goals_diff}</p>
      <p class="team-points">${team.points}</p>
      </div>`
      ).join('')}`
      tableLeguae.innerHTML = table
  }catch(e){
    console.log(e)
  }
})()


