import { renderPhotos } from './thumbnail.js';
import { isEscapeKey } from './util.js';

const COMMENTS_PER_PORTION = 5;

const bodyElement = document.querySelector('body');
const thumbnailsElement = document.querySelector('.pictures');
const bigPictureElement = document.querySelector('.big-picture');
const bigImage = bigPictureElement.querySelector('.big-picture__img img');
const bigImageLikesCount = bigPictureElement.querySelector('.likes-count');
const bigImageCaption = bigPictureElement.querySelector('.social__caption');
const bigImageCancel = bigPictureElement.querySelector('.big-picture__cancel');

const commentsElement = bigPictureElement.querySelector('.social__comments');
const commentElement = commentsElement.querySelector('.social__comment');
const commentsCount = bigPictureElement.querySelector('.social__comment-count');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');

const imageFiltersElement = document.querySelector('.img-filters');

let commentsShown = 0;
let comments = [];

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const openUserModal = () => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeUserModal () {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  commentsShown = 0;
  document.removeEventListener('keydown', onDocumentKeydown);
}

const showComment = ({ avatar, name, message }) => {
  const newComment = commentElement.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;
  return newComment;
};

const renderComments = () => {
  commentsShown += COMMENTS_PER_PORTION;

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = showComment(comments[i]); //переназвать константу
    fragment.append(commentElement);
  }

  commentsElement.innerHTML = '';
  commentsElement.append(fragment);
  commentsCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

function onCommentsLoaderClick () {
  renderComments();
}

const showBigPicture = ({url, likes, description}) => {
  openUserModal();
  bigImage.src = url;
  bigImageLikesCount.textContent = likes;
  bigImageCaption.textContent = description;
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

const onThumbnailClick = (evt) => {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');
  if (!thumbnail) {
    return;
  }
  evt.preventDefault();

  const picture = data.find(
    (item) => item.id === +(thumbnail.dataset.thumbnailId)
  );

  comments = Array.from(picture.comments);
  renderComments(comments);
  showBigPicture(picture);
};

const showPhotos = (data) => {
  renderPhotos(data);
  thumbnailsElement.addEventListener('click', onThumbnailClick);
  imageFiltersElement.classList.remove('img-filters--inactive');
};

bigImageCancel.addEventListener('click', () =>
  closeUserModal()
);

export {showPhotos};
