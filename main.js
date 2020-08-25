const $btnKick = document.getElementById('btn-kick');
const $btnWhip = document.getElementById('btn-whip');

const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-character'),
  elProgressBar: document.getElementById('progressbar-character'),

  renderHPLife: renderHPLife,
  renderProgressBarHP: renderProgressBarHP,
  renderHP: renderHP,

};

const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-enemy'),
  elProgressBar: document.getElementById('progressbar-enemy'),

  renderHPLife: renderHPLife,
  renderProgressBarHP: renderProgressBarHP,
  renderHP: renderHP,

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
  character.renderHP();
  enemy.renderHP();
}

function renderHPLife() {
  this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
}

function renderProgressBarHP() {
  this.elProgressBar.style.width = this.damageHP + '%';
}

function renderHP() {
  this.renderHPLife();
  this.renderProgressBarHP();
}

function changeHP(count, person) {
  if (person.damageHP < count) {
    person.damageHP = 0;
    alert(`Бедный ${person.name} проиграл бой :(`);
    $btnKick.disabled = true;
    $btnWhip.disabled = true;
  } else person.damageHP -= count;

  person.renderHP();
}

function random(num) {
  return Math.ceil(Math.random() * num);
}

init();
