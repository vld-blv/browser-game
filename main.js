const $btnKick = document.getElementById(`btn-kick`);
const $btnWhip = document.getElementById(`btn-whip`);

const $logs = document.querySelector('#logs');


const character = {
  name: `Pikachu`,
  defaultHP: 300,
  damageHP: 300,
  elHP: document.getElementById(`health-character`),
  elProgressBar: document.getElementById(`progressbar-character`),

  renderHPLife: renderHPLife,
  renderProgressBarHP: renderProgressBarHP,
  renderHP: renderHP,
  changeHP: changeHP,

};

const enemy = {
  name: `Charmander`,
  defaultHP: 300,
  damageHP: 300,
  elHP: document.getElementById(`health-enemy`),
  elProgressBar: document.getElementById(`progressbar-enemy`),

  renderHPLife: renderHPLife,
  renderProgressBarHP: renderProgressBarHP,
  renderHP: renderHP,
  changeHP: changeHP,

};

$btnKick.addEventListener(`click`, () => {
  console.log(`Kick`);
  character.changeHP(random(25));
  enemy.changeHP(random(25));
});

$btnWhip.addEventListener(`click`, () => {
  console.log(`Whip`);
  enemy.changeHP(random(10));
});

function init() {
  console.log(`Start Game!`);
  character.renderHP();
  enemy.renderHP();
}

function renderHPLife() {
  this.elHP.innerText = this.damageHP + ` / ` + this.defaultHP;
}

function renderProgressBarHP() {
  this.elProgressBar.style.width = this.damageHP / this.defaultHP * 100 + `%`;
}

function renderHP() {
  this.renderHPLife();
  this.renderProgressBarHP();
}

function changeHP(count) {
  this.damageHP -= count;

  const log = this === enemy ? generateLog(this, character, count) : generateLog(this, enemy, count);
  console.log(log);

  const $p = document.createElement('p');
  $p.innerText = log;
  $logs.insertBefore($p, $logs.children[0]);

  if (this.damageHP <= count) {
    this.damageHP = 0;
    alert(`Бедный ${this.name} проиграл бой :(`);
    $btnKick.disabled = true;
    $btnWhip.disabled = true;
  }
  this.renderHP();
}

function random(num) {
  return Math.ceil(Math.random() * num);
}

function generateLog(firstPerson, secondPerson, count) {
  const {name: name1, defaultHP, damageHP} = firstPerson;
  const {name: name2} = secondPerson;

  const logs = [
    `${name1} вспомнил что-то важное, но неожиданно ${name2}, не помня себя от испуга, ударил в предплечье врага.`,
    `${name1} поперхнулся, и за это ${name2} с испугу приложил прямой удар коленом в лоб врага.`,
    `${name1} забылся, но в это время наглый ${name2}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
    `${name1} пришел в себя, но неожиданно ${name2} случайно нанес мощнейший удар.`,
    `${name1} поперхнулся, но в это время ${name2} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
    `${name1} удивился, а ${name2}, пошатнувшись, влепил подлый удар.`,
    `${name1} высморкался, но неожиданно ${name2} провел дробящий удар.`,
    `${name1} пошатнулся, и внезапно наглый ${name2} беспричинно ударил в ногу противника.`,
    `${name1} расстроился, как вдруг, неожиданно ${name2} случайно влепил стопой в живот соперника.`,
    `${name1} пытался что-то сказать, но вдруг, неожиданно ${name2} со скуки разбил бровь сопернику.`,
  ];
  return `${logs[random(logs.length - 1)]} -${count} [${damageHP}/${defaultHP}]`;
}

init();
