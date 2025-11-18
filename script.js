// ------------------------- Header hide/show on scroll control -------------------------
const header = document.getElementById('smart-header');
let lastScrollY = window.scrollY;

function handleScroll(){
    const currentScrollY = window.scrollY;

    if(currentScrollY < lastScrollY){
        header.classList.remove('header-hidden');
    }
    else if(currentScrollY > header.offsetHeight){
        header.classList.add('header-hidden');
    }

    lastScrollY = currentScrollY;
}

window.addEventListener('scroll', handleScroll);
// ------------------------- Header hide/show on scroll control -------------------------

// ------------------------- Fade in transition on elements -------------------------

const contentToFade = document.querySelector('.content-fade-in');

function fadeInContent(){
    contentToFade.classList.add("content-visible");
}

document.addEventListener('DOMContentLoaded', fadeInContent);



// ------------------------- Fade in transition on elements -------------------------



// ------------------------- Me and Jimmy Image Interactivity -------------------------
const hoverContainer = document.querySelector('.image-hover-container');
const revealArea = document.querySelector('.reveal-area');
const revealImage = document.querySelector('.reveal-image');

if(hoverContainer && revealArea && revealImage)
{
    hoverContainer.addEventListener('mousemove', (e) => {
        const x = e.clientX - hoverContainer.getBoundingClientRect().left;
        const y = e.clientY - hoverContainer.getBoundingClientRect().top;

        const revealAreaHalfWidth = revealArea.offsetWidth / 2;
        const revealAreaHalfHeight = revealArea.offsetHeight / 2;

        revealArea.style.left = `${x - revealAreaHalfWidth}px`;
        revealArea.style.top = `${y - revealAreaHalfHeight}px`;

        revealImage.style.left = `-${x - revealAreaHalfWidth}px`;
        revealImage.style.top = `-${y - revealAreaHalfHeight}px`;
    })

    hoverContainer.addEventListener('mouseleave', () => {
        revealArea.style.left = `-9999px`;
        revealArea.style.top = `-9999px`;
    })
}

// ------------------------- Me and Jimmy Image Interactivity -------------------------
