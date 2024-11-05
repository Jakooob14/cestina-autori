let author;

let correctCount = 0;
let incorrectCount = 0;

window.onload = async function() {
    await NewAuthor();
    UpdateCounters();
};

document.getElementById("submit").addEventListener("click", async function() {
    let input = document.getElementById("input");
    let submit = document.getElementById("submit");
    
    let style;
    let delay = 1000;


    if (replaceUnicodeChars(author.name).split(" ").some(name => replaceUnicodeChars(input.value).toLowerCase().split(" ").includes(name.toLowerCase()))) {
        style = "btn-success";
        Correct();
    } else {
        style = "btn-danger";
        Incorrect();
        submit.innerHTML = author.name;
        delay = 3000;
    }

    input.value = "";

    submit.classList.add(style);
    submit.disabled = true;
    setTimeout(async function() {
        submit.classList.remove(style);
        submit.disabled = false;
        await NewAuthor();
    }, delay);
});

function replaceUnicodeChars(str) {
    const unicodeToAsciiMap = {
        'è': 'e',
        'é': 'e',
        'ě': 'e',
        'š': 's',
        'č': 'c',
        'ř': 'r',
        'ž': 'z',
        'ý': 'y',
        'á': 'a',
        'í': 'i',
        'ó': 'o',
        'ú': 'u',
        'ů': 'u',
        'ť': 't',
        'ď': 'd',
        'ň': 'n'
    };

    return str.split('').map(char => unicodeToAsciiMap[char] || char).join('');
}

async function NewAuthor() {
    let title = document.getElementById("title");
    document.getElementById("submit").innerHTML = "Ověřit";

    let data = await fetch('./authors.json')
        .then((response) => response.json());

    let randomAuthor = data[Math.floor(Math.random() * data.length)];
    author = randomAuthor;
    title.innerHTML = author.works[Math.floor(Math.random() * author.works.length)];
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function Correct() {
    document.cookie = "correct=" + (parseInt(getCookie("correct") || 0) + 1) + ";";
    UpdateCounters();
}

function Incorrect() {
    document.cookie = "incorrect=" + (parseInt(getCookie("incorrect") || 0) + 1) + ";";
    UpdateCounters();
}

function UpdateCounters() {
    document.getElementById("correctCount").innerHTML = getCookie("correct") || 0;
    document.getElementById("incorrectCount").innerHTML = getCookie("incorrect") || 0;
}