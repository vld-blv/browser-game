import Pokemon from './pokemon.js';
import random from './utils.js';


const character = new Pokemon ({
  name: 'Pikachu',
  hp: 300,
  type: 'electric',
  selectors: 'character',
});

const enemy = new Pokemon ({
  name: 'Charmander',
  hp: 350,
  type: 'fire',
  selectors: 'enemy',
});

console.log(character);
console.log(enemy);

function $getElById(id) {
  return document.getElementById(id);
}


const $btnKick = $getElById(`btn-kick`);
const $btnWhip = $getElById(`btn-whip`);

const $logs = document.querySelector('#logs');

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
  character.changeHP(random(100), function(count) {
    //console.log('hello', count);
    console.log(generateLog(character, enemy, count));
  });
  enemy.changeHP(random(25), function(count) {
    //console.log('hello', count);
    console.log(generateLog(enemy, character, count));
  });
  kickCount($btnKick, 50);
});

$btnWhip.addEventListener(`click`, () => {
  enemy.changeHP(random(10), function(count) {
    //console.log('hello', count);
    console.log(generateLog(enemy, character, count));
  });
  whipCount($btnWhip, 10);
});

/*
function addLog(person, count) {
  const log = person === enemy ? generateLog(person, character, count) : generateLog(person, enemy, count);

  const $p = document.createElement('p');
  $p.innerText = log;
  $logs.insertBefore($p, $logs.children[0]);
}
*/

function generateLog(firstPerson, secondPerson, count) {
  const {name: name1, current, total} = firstPerson;
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
  return `${logs[random(logs.length - 1)]} -${count} [${current}/${total}]`;
}
