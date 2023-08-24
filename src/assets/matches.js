const tableMatches = document.querySelector('.table-matches')
const btnSumar = document.querySelector('.sumar')
const btnRestar = document.querySelector('.restar')
const jornada = document.querySelector('.jornada')
let contador  = parseInt(localStorage.getItem('contador')) || 1

const url = `https://livescore-football.p.rapidapi.com/soccer/matches-by-league?country_code=venezuela&league_code=primera-division&round=${contador}`;
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'cc754b3c05msh9f955300323426fp1a6b25jsn0dbe27a7f142',
        'X-RapidAPI-Host': 'livescore-football.p.rapidapi.com'
    }
};



jornada.innerText = `JORNADA ${contador}`

btnSumar.addEventListener('click',()=>{
    contador ++
    localStorage.setItem('contador', contador)
    location.reload()
})

btnRestar.addEventListener('click',()=>{
    contador --
    localStorage.setItem('contador', contador)
    location.reload()
})



async function fetchData (urlApi, options){
const response = await fetch(urlApi, options)
const data = await response.json()
return data
}

(async ()=>{
    try{
        const response = await fetchData(url, options)
        console.log(response)
        const matchResults = `${response.data.map(matches =>
        
            `
            <div class="data-matches">
            <p class="status">${matches.status}</p>
            <img class="first-logo" src="${matches.team_1.logo}" alt="">
            <p class="first-name">${matches.team_1.name}</p>
            <p class="first-result">${matches.score.full_time.team_1}</p>
            <p class="second-result">${matches.score.full_time.team_2}</p>
            <img class="second-logo" src="${matches.team_2.logo}" alt="">
            <p class="second-name">${matches.team_2.name}</p>
            </div>
            `    
          ).join("")}`
            tableMatches.innerHTML = matchResults
    }catch(e){
        console.log(e)
    }
})()

