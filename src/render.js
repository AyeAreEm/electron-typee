const stringSimilarity = require('string-similarity');
const Datastore = require('nedb');

const db = new Datastore('database.nedb');
db.loadDatabase();

const show_sentence = document.getElementById('sentence');
const input = document.getElementById('input');
const stats = document.getElementById('stats');

const words = ["general", "again", "against", "develop", "but", "interest", "time", "person", "system", "each", "most", "which", "present", "same", "child", "never", "there", "become", "other", "without", "course", "it", "hold", "leave", "still", "possible", "large", "ask", "help", "get"];
let sentence = "";

let start = 0;
let end = 0;

window.onload = () => {
    shuffle(words);

    words.slice(0, 20).forEach(makeSentence);
    show_sentence.innerHTML = sentence;

    timer();
}

function makeSentence(value, index, array) {
    sentence += `${value} `;
}

function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
}

function timer() {
    setTimeout(() => stats.innerHTML = 4, 1000);
    setTimeout(() => stats.innerHTML = 3, 2000);
    setTimeout(() => stats.innerHTML = 2, 3000);
    setTimeout(() => stats.innerHTML = 1, 4000);
    setTimeout(() => {stats.innerHTML = "go"; input.disabled = false; input.focus();const date = new Date(); start = date.getTime();}, 5000);
}

input.addEventListener('keypress', e => {
    if (e.key == "Enter") {
        const date = new Date();
        end = date.getTime();
        seconds = (end - start) / 1000;
        wpm = Math.round((input.value.length / 5) / (seconds / 60));
        
        const accuracy = Math.round(stringSimilarity.compareTwoStrings(sentence, input.value) * 100);
        stats.innerHTML = `wpm: ${wpm} <br> accuracy: ${accuracy}%`;

        db.insert({wpm: wpm, accuracy: accuracy, seconds: seconds});
    }
})