document.addEventListener('DOMContentLoaded', () => {
    
    const bootScreen = document.getElementById('boot-screen');
    const desktopContainer = document.getElementById('desktop-container');

    // Change whenever you want to
    const BOOT_DURATION = 1500;
    
    function startBoot(){
        if(desktopContainer){
            desktopContainer.classList.add('hidden');
        }
        if(bootScreen){
            bootScreen.style.display = 'block';
        }

        setTimeout(() => {
            if(bootScreen){
                bootScreen.style.display = 'none';
            }

            if(desktopContainer){
                desktopContainer.classList.remove('hidden');
            }
        }, BOOT_DURATION);
    }

    window.addEventListener('message', (event) => {
        // verify the origin in production: if(event.origin !== 'url') return;

        if(event.data === 'start-os-boot'){
            startBoot();
        }
    })
    
    
    
    
    const desktopIcons = document.querySelectorAll('.desktop-icon');
    const closeButtons = document.querySelectorAll('.close-btn');


    // Open window on icon click
    desktopIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const projectId = icon.getAttribute('data-project');
            const targetWindow = document.getElementById(`${projectId}-window`);

            if(targetWindow){
                targetWindow.style.display = 'block';
                bringToFront(targetWindow);
            }
        })
    })

    // Close window on close button click
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const windowToClose = e.target.closest('.project-window');
            if(windowToClose){
                windowToClose.style.display = 'none';
            }
        })
    })


    // Auxiliary function to bring a window to the front
    // by adjusting its z-index
    function bringToFront(targetWindow){
        let maxZIndex = 1000;
        document.querySelectorAll('.project-window').forEach(win => {
            const z = parseInt(win.style.zIndex) || 1000;
            if(z > maxZIndex){
                maxZIndex = z;
            }
        })
        targetWindow.style.zIndex = maxZIndex + 1;
    }


    // Drag and drop window functionality
    document.querySelectorAll('.project-window').forEach(windowElement => {
        const titleBar = windowElement.querySelector('.window-title-bar');
        let isDragging = false;
        let offset = { x: 0, y: 0};
        titleBar.addEventListener('mousedown', (e) => {
            isDragging = true;
            offset.x = e.clientX - windowElement.getBoundingClientRect().left;
            offset.y = e.clientY - windowElement.getBoundingClientRect().top;
            bringToFront(windowElement);
        })



        document.addEventListener('mousemove', (e) => {
            if(!isDragging) return;
            // Move the window based on mouse and offset position
            windowElement.style.left = `${e.clientX - offset.x}px`;
            windowElement.style.top = `${e.clientY - offset.y}px`;
        })

        document.addEventListener('mouseup', (e) => {
            isDragging = false;
        })

    })


    function updateClock(){
        const clockElement = document.getElementById("live-clock");
        if(!clockElement) return;

        const now = new Date();

        const timeString = now.toLocaleTimeString('pt-BR',{
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).replace(' ', ' ');

        const time24h = now.toLocaleTimeString('pt-BR',{
            hour: '2-digit',
            minute: '2-digit'
        })
        clockElement.textContent = time24h;
    }

    updateClock();

    setInterval(updateClock, 1000);

    // HANDLE MENU
    const startButton = document.querySelector('.taskbar__start-button');
    const startMenu = document.getElementById('start-menu');

    startButton.addEventListener('click', () => {
        const isHidden = startMenu.style.display === 'none' || startMenu.style.display === '';

        if(isHidden){
            startMenu.style.display = 'flex';
        }
        else{
            startMenu.style.display = 'none';
        }
    })


    document.addEventListener('click', (e) => {
        if(e.target !== startButton && !startButton.contains(e.target)&&
           e.target !== startMenu && !startMenu.contains(e.target)){
            startMenu.style.display = 'none';
           }
    })

    const shutdownButton = document.querySelector('.menu-shutdown');
    shutdownButton.addEventListener('click', (e) => {
        e.preventDefault();

        window.parent.postMessage('shutdown-os-request', '*');

        // remove later
        document.getElementById('start-menu').style.display = 'none';
    })



})


