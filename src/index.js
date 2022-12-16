import './css/common.css';
import { fetchImages } from './js/fetchImages.js';
import { cardDetailsMarkup } from './js/cardDetailsMarkup.js';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const endSearch = document.querySelector('.end-gallery');

loadMoreBtn.classList.add('is-hidden');
endSearch.classList.add('is-hidden');

let galleryImg = new simpleLightbox('.gallery a', { enableKeyboard: true });

gallery.innerHTML = '';
let name = '';
let page = 0;
let totalPages = 0;
let perPage = 40;

form.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', onMoreBtn);

// onScroll();
// onToTopBtn();

function onSearchForm(event) {
  event.preventDefault();
  window.scrollTo({ top: 0 });
  page = 1;
  name = event.currentTarget.searchQuery.value.trim();
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');
  endSearch.classList.add('is-hidden');

  if (name === '') {
    return emptyName();
  }

  fetchImages(name, page, perPage)
    .then(data => {
      endSearch.classList.add('is-hidden');
      gallery.innerHTML = '';

      if (data.totalHits === 0) {
        notFoundImages();
      } else {
        gallery.insertAdjacentHTML('beforeend', cardDetailsMarkup(data.hits));
        imagesFound(data);
        galleryImg.refresh();

        if (data.totalHits > perPage) {
          loadMoreBtn.classList.remove('is-hidden');
        }
      }
    })
    .catch(error => console.log(error));
  // .finally(() => {
  //   form.reset();
  // });
}
function onMoreBtn() {
  page += 1;
  // galleryImg.destroy();

  fetchImages(name, page, perPage)
    .then(data => {
      gallery.insertAdjacentHTML('beforeend', cardDetailsMarkup(data.hits));
      galleryImg.refresh();

      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });

      totalPages = Math.ceil(data.totalHits / perPage);

      if (page >= totalPages) {
        loadMoreBtn.classList.add('is-hidden');
        endOfSearch();
      }
    })
    .catch(error => console.log(error));
}

function emptyName() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function notFoundImages() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function imagesFound(data) {
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

function endOfSearch() {
  Notiflix.Notify.info(
    `We're sorry, but you've reached the end of search results.`,
    {
      position: 'center-bottom',
      width: '420px',
    }
  );
}
