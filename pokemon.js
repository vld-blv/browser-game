import { random } from './utils.js';

class Selectors {
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressBar = document.getElementById(`progressbar-${name}`);
    this.elName = document.getElementById(`name-${name}`);
    this.elImg = document.getElementById(`img-${name}`);
    this.selector = name;
  }
};

class Pokemon extends Selectors {
  constructor({ name, img, hp, type, selectors, attacks = [] }) {
    super(selectors);

    this.name = name;
    this.img = img;
    this.hp = {
      current: hp,
      total: hp,
    };
    this.type = type;
    this.attacks = attacks;

    this.renderName();
    this.renderImg();
    this.renderHP();
  }
  
  renderName() {
    this.elName.innerText = this.name;
  }
  renderImg() {
    this.elImg.src = this.img;
  }

  changeHP(count, cb) {
    this.hp.current -= count;
  
    if (this.hp.current <= count) {
      this.hp.current = 0;
    }

    this.renderHP();
    cb && cb(count);
  }

  renderHP() {
    this.renderHPLife();
    this.renderProgressBarHP();
  }

  renderHPLife() {
    const { elHP, hp: { total, current } } = this;
    elHP.innerText = current + '/' + total;
  }

  renderProgressBarHP() {
    const { elProgressBar, hp:{ total, current } } = this;
    const percent = current / total * 100;
    elProgressBar.style.width = percent + `%`;
    /*
    if ((percent <= 60)&&(percent > 20)) elProgressbar.classList.add('low');
    else if (percent <= 20) elProgressbar.classList.add('critical');
    */
  }
};

function getPokemon(selector, pokemons) {
  const pokemon = pokemons[random(pokemons.length) - 1];
 
  return new Pokemon({
      ...pokemon,
      selectors: selector,
  });
}

export {
  Pokemon,
  getPokemon,
};
