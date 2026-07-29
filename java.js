const scoredummy = [
    {
        id: 1,
        name: "Joseph",
        score: 20,
    },
    {
        id: 2,
        name: "Diana",
        score: 70,
    }
]

let scores = JSON.parse(localStorage.getItem("scoresdata")) || scoredummy

function renderdata(){
    const container = document.getElementById("scores")
    
    let scorecards = ''

    for (let score of scores){
        console.log(score)
        scorecards += `<div class="card mt-3 mb-3">
                            <div class="flex-container ">
                                <img src="userlogo.png" style="width:20px; height:20px">
                                <h5>Name: ${score.name}</h5>
                            </div>
                            <p>Score: ${score.score}</p>
                        </div>`
    }
    container.innerHTML = scorecards
}

renderdata();

const form = document.getElementById("javaform")

form.addEventListener('submit', enternewscore)

function enternewscore(event){
    event.preventDefault();
    const name = document.getElementById("newname").value;
    const score = document.getElementById("newscore").value;
    const alertint = document.getElementById("alertint")
    const alertname = document.getElementById("alertname")
    let alertintmessage = `<div class="alert alert-success" role="alert">
                               Please put an integer value
                            </div>`
    let alertnamemessage = `<div class="alert alert-success" role="alert">
                               Please put a name
                            </div>`

    const isname = name !== "";
    const isscore = score !== "" && Number.isInteger(Number(score));

    if (isscore && isname){
        const newobject = {
            id: scores.length + 1,
            name: name,
            score: Number(score),
        }

        scores.push(newobject);
        renderdata();

        form.reset();
        alertint.innerHTML = ''
        alertname.innerHTML = ''

        localStorage.setItem('scoresdata', JSON.stringify(scores))
        addscore();
        
    } else{
        if(!isname){
            console.log("noname")
            alertname.innerHTML = alertnamemessage
        } 

        if(!isscore){
            console.log("noint")
            alertint.innerHTML = alertintmessage
        }
    }
}

const reseter = document.getElementById("resetbutton")
reseter.addEventListener('click', reset)
function reset(event){
    localStorage.clear();
    renderdata();

    form.reset();
    document.getElementById("alertint").innerHTML = "";
    document.getElementById("alertname").innerHTML = "";
    addscore();
}

function addscore(){
    const showscore = document.getElementById("textscore")
    let totalscore = 0
    for (let score of scores){
        totalscore += score.score
    }
    showscore.textContent = totalscore
}   

addscore();