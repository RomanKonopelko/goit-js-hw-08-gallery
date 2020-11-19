import pictures from "./gallery-items.js"

const galleryRef = document.querySelector('.js-gallery')
const modalRef = document.querySelector('.lightbox')
const modalPicRef = document.querySelector('.lightbox__image')
const modalCloseBtn = document.querySelector('[data-action="close-lightbox"]')
const overlayRef = document.querySelector('.lightbox__overlay')
setPictures(galleryRef, pictures)


function setPictures(ul, pics) { 
    const galleryArr = pics.map(pic => { 
        const li = document.createElement('li')
        const a = document.createElement('a')
        const img = document.createElement('img')
        img.classList.add('gallery__image')
        img.setAttribute('data-index', pics.indexOf(pic))
        img.setAttribute('data-source', pic.original)
        img.src = pic.preview
        img.alt = pic.description
        a.classList.add('gallery__link')
        a.href = pic.original
        li.classList.add('gallery__item')
        a.append(img)
        li.append(a)
        return li
    }) 
return ul.append(...galleryArr)
}

galleryRef.addEventListener('click', event => {
    event.preventDefault()
    const picLink = event.target.dataset.source
    const picAlt = event.target.alt
    const picIndex = +event.target.dataset.index

    if (event.target.nodeName === 'UL') { 
    return
    }

    modalRef.classList.add('is-open')
    modalPicRef.src = picLink
    modalPicRef.alt = picAlt
    modalPicRef.index = picIndex
    console.dir(event.target);

})

overlayRef.addEventListener('click', event => { 
    if (event.target === event.currentTarget) { 
        modalRef.classList.remove('is-open')
         modalPicRef.src = ''
    modalPicRef.alt = ''
    }
})
modalCloseBtn.addEventListener('click',() => {
    modalRef.classList.remove('is-open')
    modalPicRef.src = ''
    modalPicRef.alt = ''
})

window.addEventListener('keydown', event => { 
    if (event.key === 'Escape') { 
        modalRef.classList.remove('is-open')
         modalPicRef.src = ''
    modalPicRef.alt = ''
    }

    if (event.key === 'ArrowRight') { 
        console.log(modalPicRef.index);
        modalPicRef.index += 1
    }
    console.log(event.key);
})

