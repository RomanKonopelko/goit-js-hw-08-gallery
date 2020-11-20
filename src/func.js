import pictures from "./gallery-items.js"

const galleryRef = document.querySelector('.js-gallery')
const modalRef = document.querySelector('.lightbox')
const modalPicRef = document.querySelector('.lightbox__image')
const modalCloseBtn = document.querySelector('[data-action="close-lightbox"]')
const overlayRef = document.querySelector('.lightbox__overlay')

setPictures(galleryRef, pictures)



galleryRef.addEventListener('click', event => {
    event.preventDefault()
    const picLink = event.target.dataset.source
    const picAlt = event.target.alt
    const picIndex = +event.target.dataset.index
    console.log(picIndex);
    
    if (event.target.nodeName === 'UL') { 
        return
    }
    addOpenTag(picLink, picAlt, picIndex)
})

overlayRef.addEventListener('click', event => { 
    if (event.target === event.currentTarget) { 
        removeOpenTag()
    }
})

modalCloseBtn.addEventListener('click', () => {
    removeOpenTag()
})

window.addEventListener('keydown', event => {
    let index = +modalPicRef.dataset.index
    let followPic = galleryRef.childNodes[index].childNodes[0].firstChild
    if (event.key === 'Escape') {
        removeOpenTag()
    }
    if (index === 8) { 
index -= 9
    }
    if (event.key === 'ArrowRight') {
        // console.log(index);
        index += 1
        // console.log(index);
        modalPicRef.dataset.index = index
        followPic = galleryRef.childNodes[index].childNodes[0].firstChild
        // console.log(followPic);
        // console.log(modalPicRef.dataset.index);
        modalPicRef.src = followPic.dataset.source
    }
    
    if (event.key === 'ArrowLeft') { 
        index -= 1
        followPic = galleryRef.childNodes[index].childNodes[0].firstChild
        modalPicRef.dataset.index = index
        modalPicRef.src = followPic.dataset.source
    }
})


function removeOpenTag() { 
    modalRef.classList.remove('is-open')
    modalPicRef.src = ''
    modalPicRef.alt = ''
}

function addOpenTag(picLink, picAlt, picIndex) { 
    modalRef.classList.add('is-open')
    modalPicRef.src = picLink
    modalPicRef.alt = picAlt
    modalPicRef.dataset.index = picIndex
}

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

