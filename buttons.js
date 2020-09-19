const $control = document.querySelector('.control');

function makeBtn(btnText) {
  const $btn = document.createElement('button');
  $btn.classList.add('button');
  $btn.innerText = btnText;
  $control.appendChild($btn);
  return $btn;
}

function countClick (maxCount, btn) {
  const innerText = btn.innerText;
  btn.innerText = `${innerText} (${maxCount})`;
  return function() {
    maxCount -= 1;
    btn.innerText = `${innerText} (${maxCount})`;
    if (maxCount <= 0) btn.disabled = true;
  }
}

function deleteBtns () {
  const $allButtons = document.querySelectorAll('.control .button');
  $allButtons.forEach((item) => item.remove());
}

export {
  makeBtn,
  countClick,
  deleteBtns,
};
