import { random } from './utils.js';

function generateLog(firstPerson, secondPerson, count) {
    const {name: name1, hp: { current, total } } = firstPerson;
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
    makeP(`${logs[random(logs.length - 1)]} -${count} [${current}/${total}]`);
}

function makeP(text) {
  const $p = document.createElement('p');
  $p.innerText = text;
  
  const $logs = document.querySelector('#logs');
  $logs.insertBefore($p, $logs.children[0]);
}

function losing(player) {
  if (player.selector === 'player1') {
      makeP(`Ваш ${player.name} проиграл!`);
  } else {
      makeP(`Противник ${player.name} проиграл!`);
  }
}

function newEnemy(player) {
  makeP(`Новый противник - ${player.name}`);
}

function draw() {
  makeP(`Ничья!`);
}

function endGame(killCount) {
  makeP(`Игра окончена! Побеждено вражеских покемонов: ${killCount}`);
}

function clear() {
  const log = document.querySelectorAll('#logs p');
  log.forEach((item) => item.remove());
}

export {
  generateLog,
  makeP,
  losing,
  newEnemy,
  draw,
  clear,
  endGame,
};
