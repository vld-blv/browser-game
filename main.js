const $btnKick = document.getElementById('btn-kick');
const $btnWhip = document.getElementById('btn-whip');

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressBar: document.getElementById('progressbar-character'),

};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressBar: document.getElementById('progressbar-enemy'),

};

$btnKick.addEventListener('click', () => {
    console.log('Kick');
    changeHP(random(25), character);
    changeHP(random(25), enemy);
});

$btnWhip.addEventListener('click', () => {
    console.log('Whip');
    changeHP(random(10), enemy);
});

function init() {
    console.log('Start Game!');
    renderHP(character);
    renderHP(enemy);
}

init();

function renderHPLile(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressBarHP(person) {
    person.elProgressBar.style.width = person.damageHP + '%';
}

function renderHP(person) {
    renderHPLile(person);
    renderProgressBarHP(person);
}

function changeHP(count, person) {
    if (person.damageHP < count) {
        person.damageHP = 0;
        alert(`Бедный ${person.name} проиграл бой :(`);
        $btnKick.disabled = true;
        $btnWhip.disabled = true;
    } else person.damageHP -= count;

    renderHP(person);
}

function random(num) {
    return Math.ceil(Math.random() * num);
}