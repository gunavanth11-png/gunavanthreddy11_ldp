let localScore =
    Number(localStorage.getItem("localScore")) || 0;

let sessionScore =
    Number(sessionStorage.getItem("sessionScore")) || 0;

document.getElementById("localScore").innerText = localScore;
document.getElementById("sessionScore").innerText = sessionScore;

const incrementScore = () => {
    localScore++;
    sessionScore++;

    localStorage.setItem("localScore", localScore);
    sessionStorage.setItem("sessionScore", sessionScore);

    document.getElementById("localScore").innerText = localScore;
    document.getElementById("sessionScore").innerText = sessionScore;
};
