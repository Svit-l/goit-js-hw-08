// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
const gallery = document.querySelector('.gallery');

const markup = galleryItems
  .map(
    ({ preview, original, description }) => `<li class="gallery__link">
            <a class="gallery__item" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    alt="${description}"
                    title="${description}"
                />
            </a>
        </li>`,
  )
  .join('');
gallery.insertAdjacentHTML('beforeend', markup);

function selectImg(event) {
  event.preventDefault();
}

const lightbox = new SimpleLightbox('.gallery a', {
  //   captionsData: "alt",
  captionDelay: 250,
  doubleTapZoom: 1.5,
  scrollZoomFactor: 0.25,
  fadeSpeed: 400,
});

lightbox.on('show.slightbox');

gallery.addEventListener('click', selectImg);

console.log(galleryItems);
