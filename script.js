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
    
    // El nuevo elemento del anime
    const animeButton = document.getElementById('anime-button');

    if (btn && musica && animeButton) {
        btn.addEventListener('click', () => {
            if (musica.paused) {
                // --- MUSICA ON ---
                musica.play();
                icono.innerText = "PAUSE";
                btn.classList.add('playing');
                
                // === NUEVO: MUESTRA EL ANIME ===
                animeButton.classList.remove('hidden-anime');
                
                // Explosión de notas
                for (let i = 0; i < 25; i++) { 
                    setTimeout(crearNota, i * 40); 
                }
            } else {
                // --- MUSICA OFF ---
                musica.pause();
                icono.innerText = "PLAY ♫";
                btn.classList.remove('playing');
                
                // === NUEVO: OCULTA EL ANIME ===
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

    // --- 4. ACTIVACIÓN DEL CARRUSEL ---
    // (Asegúrate de que 'stretch' esté en NEGATIVO para apilar)
    var swiper = new Swiper(".mySwiperCards", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        coverflowEffect: {
            rotate: 0,
            stretch: -120, // Ajusta esto para apilar más o menos
            depth: 200,
            modifier: 1,
            slideShadows: true,
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });
});