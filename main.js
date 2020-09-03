import Pokemon from './pokemon.js';
import { random, randomMinMax } from './utils.js';
import { pokemons } from './pokemons.js';
import generateLog from './logs.js';


const randomPokemon1 = pokemons[random(5) - 1];
const randomPokemon2 = pokemons[random(5) - 1];

const player1 = new Pokemon ({
  ...randomPokemon1,
  selectors: 'player1',
});
console.log(player1);

const player2 = new Pokemon ({
  ...randomPokemon2,
  selectors: 'player2',
});

const $control = document.querySelector('.control');

player1.attacks.forEach((item) => {
  console.log(item);
  const $btn = document.createElement('button');
  $btn.classList.add('button');
  $btn.innerText = item.name;
  const clickCount = countClick(item.maxCount, $btn);
  $control.appendChild($btn);
  $btn.addEventListener('click', () => {
    console.log('Click button', $btn.innerText);
    clickCount();
    const dmg = randomMinMax(item.minDamage, item.maxDamage)
    player2.changeHP(dmg);
    addLog(player2, dmg);

    if (player2.hp.current <= 0) {
      player2 = new Pokemon ({
        ...randomPokemon2,
        selectors: 'player2',
      });
    }
  })
});

function countClick(counter, el){
  const innerText = el.innerText;
  el.innerText = `${innerText} (${counter})`;
  return function(){
    counter -= 1;
    el.innerText = `${innerText} (${counter})`;
    return counter;
  }
}

const $logs = document.querySelector('#logs');
function addLog(person, count) {
  const log = person === player2 ? generateLog(person, player1, count) : generateLog(person, player2, count);

  const $p = document.createElement('p');
  $p.innerText = log;
  $logs.insertBefore($p, $logs.children[0]);
}