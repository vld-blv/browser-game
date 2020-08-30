function $getElById(id) {
  return document.getElementById(id);
}

const $btnKick = $getElById(`btn-kick`);
const $btnWhip = $getElById(`btn-whip`);

const $logs = document.querySelector('#logs');


const character = {
  name: `Pikachu`,
  defaultHP: 300,
  damageHP: 300,
  elHP: $getElById(`health-character`),
  elProgressBar: $getElById(`progressbar-character`),

  renderHPLife: renderHPLife,
  renderProgressBarHP: renderProgressBarHP,
  renderHP: renderHP,
  changeHP: changeHP,

};

const enemy = {
  name: `Charmander`,
  defaultHP: 300,
  damageHP: 300,
  elHP: $getElById(`health-enemy`),
  elProgressBar: $getElById(`progressbar-enemy`),

  renderHPLife: renderHPLife,
  renderProgressBarHP: renderProgressBarHP,
  renderHP: renderHP,
  changeHP: changeHP,

};

function countClick(){
  let counter = 0;
  return function(button, maxClickCount = 6){
    counter += 1;
    console.log(`Использований умения ${button.text || button.innerText}: ${counter}`);  
    button.text = button.text || button.innerText;

    button.innerText = `${button.text} [${maxClickCount - counter}]`; 

    if (counter >= maxClickCount) button.disabled = true;
  }
}

const kickCount = countClick();
const whipCount = countClick();

$btnKick.addEventListener(`click`, () => {
  character.changeHP(random(25));
  enemy.changeHP(random(25));
  kickCount($btnKick);
});

$btnWhip.addEventListener(`click`, () => {
  enemy.changeHP(random(10));
  whipCount($btnWhip, 10);
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
