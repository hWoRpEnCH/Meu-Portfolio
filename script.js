// ------------------------- Header hide/show on scroll control -------------------------
const header = document.getElementById('smart-header'); 
let lastScrollY = window.scrollY;

function handleScroll(){
   const currentScrollY = window.scrollY;

   // If the iframe is running, this function will not execute.
   if(document.body.classList.contains('no-scroll')) return;


   if(currentScrollY < lastScrollY){
      
      header.classList.remove('hidden'); 
   }
   else if(currentScrollY > header.offsetHeight){
      
      header.classList.add('hidden');
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
const revealImage = document.querySelector('.reveal-area__image'); 

if(hoverContainer && revealArea && revealImage)
{
   const updateContainerSize = () => {
      const containerWidth = hoverContainer.offsetWidth;
      const containerHeight = hoverContainer.offsetHeight;
      hoverContainer.style.setProperty('--hover-container-width', `${containerWidth}px`);
      hoverContainer.style.setProperty('--hover-container-height', `${containerHeight}px`);
   }


   window.addEventListener('resize', updateContainerSize);
   document.addEventListener('DOMContentLoaded', updateContainerSize);
   updateContainerSize();


   hoverContainer.addEventListener('mousemove', (e) => {
      const x = e.clientX - hoverContainer.getBoundingClientRect().left;
      const y = e.clientY - hoverContainer.getBoundingClientRect().top;

      const revealAreaHalfWidth = revealArea.offsetWidth / 2;
      const revealAreaHalfHeight = revealArea.offsetHeight / 2;

      revealArea.style.left = `${x - revealAreaHalfWidth}px`;
      revealArea.style.top = `${y - revealAreaHalfHeight}px`;

      revealImage.style.left = `${-x + revealAreaHalfWidth}px`;
      revealImage.style.top = `${-y + revealAreaHalfHeight}px`;
   })

   hoverContainer.addEventListener('mouseleave', () => {
      revealArea.style.left = `-9999px`;
      revealArea.style.top = `-9999px`;
   })
}



// ------------------------- Me and Jimmy Image Interactivity -------------------------


// ------------------------- Iframe win95 Expansion-------------------------

const osFrame = document.getElementById('os-frame');
const mainHeader = document.getElementById('smart-header');
const body = document.body;
const osSection = document.getElementById('os-project-section');

const iframeWrapper = document.querySelector('.iframe-interactive-wrapper');
const spotlightOverlay = document.getElementById('spotlight-overlay');

if(iframeWrapper && spotlightOverlay){
   iframeWrapper.addEventListener('mouseenter', () => {
      spotlightOverlay.classList.add('spotlight-overlay-on')
   });

   iframeWrapper.addEventListener('mouseleave', () => {
      spotlightOverlay.classList.remove('spotlight-overlay-on');
   })

   iframeWrapper.addEventListener('click', expandOS);
}
function expandOS(){

   body.classList.add('no-scroll');
   mainHeader.classList.add('hidden');

   window.scrollTo({ top: 100, behavior: 'smooth' });
   //if(osSection){
    //  osSection.scrollIntoView({behavior: 'auto'})
  // }

   osFrame.contentWindow.postMessage('start-os-boot', '*');

   osFrame.classList.remove('os-frame-minimized');
   osFrame.classList.add('os-frame-expanded');
}




function minimizeOS(){
   osFrame.classList.remove('os-frame-expanded');
   osFrame.classList.add('os-frame-minimized');

   setTimeout(() => {
      mainHeader.classList.remove('hidden');
      body.classList.remove('no-scroll');


      // scroll to project section
      if(osSection){
         osSection.scrollIntoView({behavior: 'smooth'});
      }
   }, 200);
}

window.addEventListener('message', (event) => {
   if(event.data === 'shutdown-os-request'){
      minimizeOS();
   }


})