import Selectors from './selectors.js';
import random from './utils.js';

class Pokemon extends Selectors {
  constructor({
    id, name, img, hp, type, selectors, attacks = [],
  }) {
    super(selectors);

    this.id = id;
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

    if (this.hp.current <= 0) {
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
    elHP.innerText = `${current}/${total}`;
  }

  renderProgressBarHP() {
    const { elProgressBar, hp: { total, current } } = this;
    const percent = (current / total) * 100;
    elProgressBar.style.width = `${percent}%`;
    if ((percent <= 60) && (percent > 20)) elProgressBar.classList.add('low');
    else if (percent <= 20) elProgressBar.classList.add('critical');
    else elProgressBar.classList.remove('low', 'critical');
  }
}

function getPokemon(selector, pokemons) {
  const pokemon = pokemons.splice(random(pokemons.length - 1), 1)[0];

  return new Pokemon({
    ...pokemon,
    selectors: selector,
  });
}

export default getPokemon;
