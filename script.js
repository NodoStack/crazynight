window.addEventListener('load', () => {
    
    // --- 1. LÓGICA DEL SPLASH SCREEN ---
    const splash = document.getElementById('splash');
    if (splash) {
        setTimeout(() => {
            splash.classList.add('hidden-splash');
        }, 3000); 
    }

    // --- 2. LÓGICA DE MÚSICA, EFECTOS Y ANIME ---
    const musica = document.getElementById('musicaBanda');
    const btn = document.getElementById('btnMusica');
    const icono = document.getElementById('iconoMusica');
    const animeButton = document.getElementById('anime-button');

    if (btn && musica && animeButton) {
        btn.addEventListener('click', () => {
            if (musica.paused) {
                // ACTIVAR MÚSICA
                musica.play();
                icono.innerText = "PAUSE";
                btn.classList.add('playing');
                animeButton.classList.remove('hidden-anime');
                
                // Explosión de notas musicales
                for (let i = 0; i < 25; i++) { 
                    setTimeout(crearNota, i * 40); 
                }
            } else {
                // PAUSAR MÚSICA
                musica.pause();
                icono.innerText = "PLAY ♫";
                btn.classList.remove('playing');
                animeButton.classList.add('hidden-anime');
            }
        });
    }

    function crearNota() {
        const notas = ['♫', '♪', '∮', '♩'];
        const nota = document.createElement('div');
        nota.classList.add('nota-musical');
        nota.innerText = notas[Math.floor(Math.random() * notas.length)];
        
        const btnRect = btn.getBoundingClientRect();
        nota.style.left = (btnRect.left + btnRect.width / 2) + 'px';
        nota.style.top = (btnRect.top + btnRect.height / 2) + 'px';
        
        const xDir = (Math.random() - 0.5) * 400;
        const yDir = (Math.random() - 0.5) * 400;
        
        nota.style.setProperty('--x', xDir);
        nota.style.setProperty('--y', yDir);
        nota.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(nota);
        setTimeout(() => { nota.remove(); }, 1500);
    }

   

    
    // --- 3. ACTIVACIÓN DEL CARRUSEL (Swiper) ---
    // Importante: El HTML debe tener la librería Swiper ANTES que este script.
    var swiper = new Swiper(".mySwiperCards", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        loopedSlides: 3, 
        coverflowEffect: {
            rotate: 0,
            stretch: -100, // Ajusta esto para encimar más o menos las fotos
            depth: 150,     
            modifier: 1,
            slideShadows: false, 
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

}); // CIERRE FINAL DEL WINDOW LOAD