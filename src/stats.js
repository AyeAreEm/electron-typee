const Datastore = require('nedb');

const highWpm = document.getElementById('highestWpm');
const avgWpm = document.getElementById('avgWpm');
const avgAccuracy = document.getElementById('avgAccuracy');

const db = new Datastore('database.nedb');
db.loadDatabase();

db.find({}, (err, data) => {
    if (err) {
        console.error(err);
    }

    //highest wpm
    const wpms = data.map(o => {return o.wpm});
    highWpm.innerHTML = `highest wpm: ${Math.max.apply(Math, wpms)}`;

    // average wpm
    let total_wpm = 0;

    for (let i = 0; i < wpms.length; i++) {
        total_wpm += wpms[i];
    }

    const avg_wpm = total_wpm / wpms.length;
    avgWpm.innerHTML = `average wpm: ${avg_wpm.toFixed(1)}`;

    // average accuracy
    const acc = data.map(o => {return o.accuracy})
    let total_acc = 0;

    for (let i = 0; i < acc.length; i++) {
        total_acc += acc[i];
    }

    const avg_acc = total_acc / acc.length;
    avgAccuracy.innerHTML = `average accuracy: ${avg_acc.toFixed(1)}`;
});
