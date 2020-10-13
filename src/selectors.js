class Selectors {
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressBar = document.getElementById(`progressbar-${name}`);
    this.elName = document.getElementById(`name-${name}`);
    this.elImg = document.getElementById(`img-${name}`);
    this.selector = name;
  }
}

export default Selectors;
