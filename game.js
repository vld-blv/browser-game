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

  async startGame() {
    deleteBtns();

    const responce = await fetch ('https://reactmarathon-api.netlify.app/api/pokemons');
    this.availablePlayers = await responce.json();
    this.player1 = getPokemon('player1', this.availablePlayers);
    this.player2 = getPokemon('player2', this.availablePlayers);
    this.killCount = 0;

    this.player1.attacks.forEach(attack => {
      const $btn = makeBtn(`${attack.name}`);
      const clickCount = countClick(attack.maxCount, $btn);
      
      $btn.addEventListener('click', () => {
        clickCount();
        this.generateLog(this.player1, this.player2, attack, () => {
          this.checkLosing();
        });
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

  async generateLog(player1, player2, attack) {
    const responce = await fetch(`https://reactmarathon-api.netlify.app/api/fight?player1id=${player1.id}&attackId=${attack.id}&player2id=${player2.id}`);
    const damage = await responce.json();

    
    player1.changeHP(damage.kick.player2, function(count) {
      log.generateLog(player1, player2, count);
    });

    player2.changeHP(damage.kick.player1, function(count) {
      log.generateLog(player2, player1, count);
    });
  }
}

export default Game;