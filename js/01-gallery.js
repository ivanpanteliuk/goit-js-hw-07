import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryListEl = document.querySelector('.gallery');
const galleryItemsMarkup = makeGalleryCollectionMarkup(galleryItems);

function makeGalleryCollectionMarkup(items) {
  return items.map(({ preview, original, description } = {}) =>
    `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
    />
    </a>
    </div>`
    )
    .join('');
}

galleryListEl.insertAdjacentHTML('afterbegin', galleryItemsMarkup);

galleryListEl.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const instance = basicLightbox.create(
    `
    <img src="${event.target.dataset.source}" width="800" height="600">
    `,
    {
      onShow: instance => window.addEventListener('keydown', closeModal),
      onClose: instance => window.removeEventListener('keydown', closeModal),
    },
  );

    instance.show();
    
    function closeModal(event) {
      if (event.code === 'Escape') instance.close();
    }
}

