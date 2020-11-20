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
   
    window.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            removeOpenTag()
        }
    })

    window.addEventListener('keydown', rigthPicture)
   
    window.addEventListener('keydown', leftPicture)
    
    overlayRef.addEventListener('click', event => { 
        if (event.target === event.currentTarget) { 
            removeOpenTag()
        }
    })
   
    modalCloseBtn.addEventListener('click', () => {
        removeOpenTag()
        removeEventListener()
    })
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

function removeEventListener() { 
    window.removeEventListener('keydown')
    overlayRef.removeEventListener('click')
    modalCloseBtn.removeEventListener('click')
}

function nextPicture(index, step) { 
    let currentIndex = index + step
    if (currentIndex < 0) {
        currentIndex = galleryRef.childNodes.length - 1
    } else if (currentIndex === galleryRef.childNodes.length) { 
        currentIndex = 0
    }
    let currentPicture = galleryRef.childNodes[currentIndex].childNodes[0].firstChild
    modalPicRef.src = currentPicture.dataset.source
    modalPicRef.alt = currentPicture.alt
    modalPicRef.dataset.index = currentIndex
}

function rigthPicture(event) {
    if (event.key === 'ArrowRight') { 
        nextPicture(+modalPicRef.dataset.index, +1)
    }
}
 
function leftPicture(event) { 
    if (event.key === 'ArrowLeft') { 
        nextPicture(+modalPicRef.dataset.index, -1)
    }
}