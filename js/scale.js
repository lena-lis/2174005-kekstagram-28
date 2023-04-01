const DEFAULT_SCALE = 100;
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleFieldElement = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

let currentScaleValue = parseInt(scaleFieldElement.value, 10);

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleFieldElement.value = `${value}%`;
};

const decreaseScale = () => {
  currentScaleValue -= SCALE_STEP;
  if (currentScaleValue < MIN_SCALE) {
    currentScaleValue = MIN_SCALE;
  }
  scaleImage(currentScaleValue);
};

const increaseScale = () => {
  currentScaleValue += SCALE_STEP;
  if (currentScaleValue > MAX_SCALE) {
    currentScaleValue = MAX_SCALE;
  }
  scaleImage(currentScaleValue);
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

smallerButtonElement.addEventListener('click', decreaseScale);
biggerButtonElement.addEventListener('click', increaseScale);

export {resetScale};
