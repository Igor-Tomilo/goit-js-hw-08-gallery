import gallery from './gallery-items.js';

const galleryListRef = document.querySelector('ul.js-gallery');
const modaleWindowRef = document.querySelector('div.js-lightbox');
const modaleImageRef = document.querySelector('img.lightbox__image');
const closeModaleBtnRef = document.querySelector('button[data-action]');
const modaleOverlayRef = document.querySelector('div.lightbox__overlay');

galleryListRef.insertAdjacentHTML('beforeend', addImages(gallery));

galleryListRef.addEventListener('click', getOriginalImage);

closeModaleBtnRef.addEventListener('click', closeModaleWindow);
modaleOverlayRef.addEventListener('click', closeModaleWindow);

function addImages(array) {
  let dataIndex = 0;
  return array.reduce((acc, image) => {
    acc += `<li class="gallery__item">
        <a
          class = "gallery__link"
          href=${image.original}
        >
          <img
            class="gallery__image"
            src=${image.preview}
            data-source=${image.original}
            data-index=${dataIndex}
            alt="${image.description}"
          />
        </a>
      </li >`;
    dataIndex++;
    return acc;
  }, '');
}

function getOriginalImage(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') return;

  const originalImage = event.target.dataset.source;
  const altImage = event.target.alt;
  const dataIndex = event.target.dataset.index;
  openModaleWindow(originalImage, altImage, dataIndex);
}

function keyDownModuleWindow(event) {
  if (!modaleWindowRef.classList.contains('is-open')) return;

  if (event.code === 'Escape') return closeModaleWindow();

  if (event.code === 'ArrowRight') return pressRightModaleImage();

  if (event.code === 'ArrowLeft') return pressLeftModaleImage();
}

function openModaleWindow(image, alt, index) {
  modaleWindowRef.classList.add('is-open');
  modaleImageRef.src = image;
  modaleImageRef.alt = alt;
  modaleImageRef.dataset.index = index;

  window.addEventListener('keydown', event => keyDownModuleWindow(event));
}

function closeModaleWindow() {
  modaleWindowRef.classList.remove('is-open');
  modaleImageRef.src = '';
  modaleImageRef.alt = '';
  delete modaleImageRef.dataset.index;
  isModaleOpen = false;

  window.removeEventListener('keydown', event => keyDownModuleWindow(event));
}

function pressRightModaleImage() {
  const galleryItemsRef = document.querySelectorAll('img.gallery__image');
  if (+modaleImageRef.dataset.index === galleryItemsRef.length - 1) {
    modaleImageRef.src = galleryItemsRef[0].dataset.source;
    modaleImageRef.alt = galleryItemsRef[0].alt;
    modaleImageRef.dataset.index = 0;
  } else {
    modaleImageRef.src =
      galleryItemsRef[+modaleImageRef.dataset.index + 1].dataset.source;
    modaleImageRef.alt = galleryItemsRef[+modaleImageRef.dataset.index + 1].alt;
    modaleImageRef.dataset.index = +modaleImageRef.dataset.index + 1;
  }
}

function pressLeftModaleImage() {
  const galleryItemsRef = document.querySelectorAll('img.gallery__image');
  if (+modaleImageRef.dataset.index === 0) {
    modaleImageRef.src =
      galleryItemsRef[galleryItemsRef.length - 1].dataset.source;
    modaleImageRef.alt = galleryItemsRef[galleryItemsRef.length - 1].alt;
    modaleImageRef.dataset.index = galleryItemsRef.length - 1;
  } else {
    modaleImageRef.src =
      galleryItemsRef[+modaleImageRef.dataset.index - 1].dataset.source;
    modaleImageRef.alt = galleryItemsRef[+modaleImageRef.dataset.index - 1].alt;
    modaleImageRef.dataset.index = +modaleImageRef.dataset.index - 1;
  }
}
