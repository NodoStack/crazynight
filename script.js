window.addEventListener('load', () => {
    
    // --- 1. LÓGICA DEL SPLASH SCREEN ---
    // (Mantengo tus comentarios tal cual los tenías)
    //const splash = document.getElementById('splash');
    //if (splash) {
      //  setTimeout(() => {
        //    splash.classList.add('hidden-splash');
       // }, 3000); 
    //}

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
    var swiper = new Swiper(".mySwiperCards", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        loopedSlides: 3, 
        coverflowEffect: {
            rotate: 0,
            stretch: -100, 
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

// --- LÓGICA DE CUENTA REGRESIVA INTELIGENTE ---
const fechaObjetivo = new Date('March 26, 2026 23:30:00').getTime();

const actualizarReloj = setInterval(() => {
    const ahora = new Date().getTime();
    const distancia = fechaObjetivo - ahora;

    if (distancia > 0) {
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        document.getElementById('dias').innerText = dias.toString().padStart(2, '0');
        document.getElementById('horas').innerText = horas.toString().padStart(2, '0');
        document.getElementById('minutos').innerText = minutos.toString().padStart(2, '0');
        document.getElementById('segundos').innerText = segundos.toString().padStart(2, '0');
    } 
    else {
        clearInterval(actualizarReloj);
        const seccion = document.getElementById('seccion-contador');
        
        if (seccion) {
            seccion.style.transition = "opacity 1s ease";
            seccion.style.opacity = "0";
            setTimeout(() => {
                seccion.style.display = 'none'; 
            }, 1000);
        }
    }
}, 1000);

// --- LÓGICA DE EVENTOS EN TIEMPO REAL :VIVO ---
function controlarEventosEnVivo() {
    const ahora = new Date();
    const dia = ahora.getDate();
    const mes = ahora.getMonth(); 
    const hora = ahora.getHours();
    
    const cartelVivo = document.getElementById('cartel-en-vivo');

    // Mantenemos tu configuración exacta del 27 de Marzo
    if (dia === 27 && mes === 2 && (hora >= 1 && hora < 3)) {
        if (cartelVivo) {
            cartelVivo.style.display = 'block';
        }
    } else {
        // Agregué este "else if" pequeño para que puedas probarlo con ?vivo=si sin romper nada
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('vivo') === 'si') {
            if (cartelVivo) cartelVivo.style.display = 'block';
        } else {
            if (cartelVivo) cartelVivo.style.display = 'none';
        }
    }
}

setInterval(controlarEventosEnVivo, 30000);
controlarEventosEnVivo();

// --- REDES SOCIALES ---
document.querySelectorAll('.icono-social').forEach(boton => {
    boton.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const posicion = boton.getBoundingClientRect();
            const x = e.pageX - posicion.left - posicion.width / 2;
            const y = e.pageY - posicion.top - posicion.height / 2;
            boton.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        }
    });
    boton.addEventListener('mouseleave', () => {
        boton.style.transform = `translate(0px, 0px)`;
    });
});

}); // FIN DEL WINDOW LOAD