class Selectors {
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressBar = document.getElementById(`progressbar-${name}`);
  }
};

class Pokemon extends Selectors {
  constructor({ name, hp, type, selectors }) {
    super(selectors);

    this.name = name;
    this.hp = {
      current: hp,
      total: hp,
    };
    this.type = type;

    this.renderHP();
  }
  
  changeHP = (count, cb) => {
    this.current -= count;
  
    if (this.current <= count) {
      this.current = 0;
    }

    this.renderHP();
    cb && cb(count);
  }

  renderHP = () => {
    this.renderHPLife();
    this.renderProgressBarHP();
  }

  renderHPLife = () => {
    const { elHP, hp: { total, current } } = this;
    elHP.innerText = current + '/' + total;
  }

  renderProgressBarHP = () => {
    const { elProgressBar, hp:{ total, current } } = this;  
    elProgressBar.style.width = current / total * 100 + `%`;
  }
};

export default Pokemon;