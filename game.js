import { getPokemon } from './pokemon.js';
import { pokemons } from './pokemons.js';
import {makeBtn, countClick, deleteBtns} from './buttons.js';
import * as log from './logs.js';
import { randomMinMax } from './utils.js';

class Game {
  constructor () {
    this.player1;
    this.player2;
    this.killCount;
    this.availablePlayers;
    this.startGame();
  }

  startGame = () => {
    deleteBtns();

    this.availablePlayers = pokemons.slice();
    this.player1 = getPokemon('player1', this.availablePlayers);
    this.player2 = getPokemon('player2', this.availablePlayers);
    this.killCount = 0;

    this.player1.attacks.forEach(attack => {
      const $btn = makeBtn(`${attack.name}`);
      const clickCount = countClick(attack.maxCount, $btn);
      
      $btn.addEventListener('click', () => {
        clickCount();
        this.generateLog(this.player2, this.player1, attack);
        this.generateLog(this.player1, this.player2, this.player2.attacks[0]);
        this.checkLosing();
      });
    });
  }

  restartGame = () => {
      deleteBtns();
      log.endGame(this.killCount);

      const $btn = makeBtn('New Game');
  
      $btn.addEventListener('click', () => {
          log.clear();
          this.startGame();
      });
  }

  checkLosing = () => {
      const { player1, player2 } = this;
      
      if (player1.hp.current === 0 && player2.hp.current === 0) {
          log.draw();
          this.restartGame();
          return;
      }
      if (player1.hp.current === 0) {
          log.losing(player1);
          this.restartGame();
      }
      if (player2.hp.current === 0) {
          log.losing(player2);
          this.player2 = getPokemon('player2', this.availablePlayers);
          log.newEnemy(this.player2);
          this.killCount += 1;
      }
  }

  generateLog = (player1, player2, attack) => {
      player1.changeHP(randomMinMax(attack.minDamage, attack.maxDamage), function(count) {
          log.generateLog(player1, player2, count);
      });
  }
}

export default Game;