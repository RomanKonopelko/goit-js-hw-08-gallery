import pictures from "./gallery-items.js";

const galleryRef = document.querySelector(".js-gallery");
const modalRef = document.querySelector(".lightbox");
const modalContent = document.querySelector(".lightbox__content");
const modalPicRef = document.querySelector(".lightbox__image");
const modalCloseBtn = document.querySelector('[data-action="close-lightbox"]');
const overlayRef = document.querySelector(".lightbox__overlay");
const btnLeft = document.createElement("button");
const btnRigth = document.createElement("button");

setPictures(galleryRef, pictures);

galleryRef.addEventListener("click", (event) => {
  event.preventDefault();
  const picLink = event.target.dataset.source;
  const picAlt = event.target.alt;
  const picIndex = +event.target.dataset.index;
  modalContent.append(btnLeft, btnRigth);
  btnRigth.classList.add("slider_rigth");
  btnLeft.classList.add("slider_left");

  if (event.target.nodeName === "UL") {
    return;
  }

  addOpenTag(picLink, picAlt, picIndex);
  btnRigth.addEventListener("click", clickLeftRigthPicture);
  btnLeft.addEventListener("click", clickLeftRigthPicture);
  window.addEventListener("keydown", escapePress);

  window.addEventListener("keydown", leftRigthPicture);

  overlayRef.addEventListener("click", overlayPress);

  modalCloseBtn.addEventListener("click", removeListenerTags);
});

function removeOpenTag() {
  modalRef.classList.remove("is-open");
  btnRigth.classList.remove("slider_rigth");
  btnLeft.classList.remove("slider_left");
  modalPicRef.src = "";
  modalPicRef.alt = "";
}

function addOpenTag(picLink, picAlt, picIndex) {
  modalRef.classList.add("is-open");
  modalPicRef.src = picLink;
  modalPicRef.alt = picAlt;
  modalPicRef.dataset.index = picIndex;
}

function setPictures(ul, pics) {
  const galleryArr = pics.map((pic, index) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const img = document.createElement("img");
    img.classList.add("gallery__image");
    img.setAttribute("data-index", index);
    img.setAttribute("data-source", pic.original);
    img.src = pic.preview;
    img.alt = pic.description;
    a.classList.add("gallery__link");
    a.href = pic.original;
    li.classList.add("gallery__item");
    a.append(img);
    li.append(a);
    return li;
  });

  return ul.append(...galleryArr);
}

function removeEventListener() {
  window.removeEventListener("keydown", leftRigthPicture);
  window.removeEventListener("keydown", escapePress);
  overlayRef.removeEventListener("click", overlayPress);
  modalCloseBtn.removeEventListener("click", removeListenerTags);
}

function nextPicture(index, step) {
  let currentIndex = index + step;
  if (currentIndex < 0) {
    currentIndex = galleryRef.childNodes.length - 1;
  } else if (currentIndex === galleryRef.childNodes.length) {
    currentIndex = 0;
  }
  let currentPicture = galleryRef.childNodes[currentIndex].childNodes[0].firstChild;
  modalPicRef.src = currentPicture.dataset.source;
  modalPicRef.alt = currentPicture.alt;
  modalPicRef.dataset.index = currentIndex;
}

function escapePress(event) {
  if (event.key === "Escape") {
    removeOpenTag();
  }
}

function overlayPress(event) {
  if (event.target === event.currentTarget) {
    removeOpenTag();
  }
}

function removeListenerTags() {
  removeOpenTag();
  removeEventListener();
}
function clickLeftRigthPicture(event) {
  if (event.target === btnRigth) {
    nextPicture(+modalPicRef.dataset.index, +1);
  } else if (event.target === btnLeft) {
    nextPicture(+modalPicRef.dataset.index, -1);
  }
}
function leftRigthPicture(event) {
  if (event.key === "ArrowRight") {
    nextPicture(+modalPicRef.dataset.index, +1);
  } else if (event.key === "ArrowLeft") {
    nextPicture(+modalPicRef.dataset.index, -1);
  }
}
