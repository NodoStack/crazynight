window.addEventListener('load', () => {
    
    // --- 1. LÓGICA DEL SPLASH SCREEN ---
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

// --- LÓGICA DE CUENTA REGRESIVA INTELIGENTE ---
const fechaObjetivo = new Date('March 26, 2026 23:00:00').getTime();

const actualizarReloj = setInterval(() => {
    const ahora = new Date().getTime();
    const distancia = fechaObjetivo - ahora;

    // Si todavía falta tiempo, calculamos y mostramos
    if (distancia > 0) {
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        // Actualizamos el HTML (con el .toString().padStart para que siempre haya 2 números)
        document.getElementById('dias').innerText = dias.toString().padStart(2, '0');
        document.getElementById('horas').innerText = horas.toString().padStart(2, '0');
        document.getElementById('minutos').innerText = minutos.toString().padStart(2, '0');
        document.getElementById('segundos').innerText = segundos.toString().padStart(2, '0');
    } 
    // SI YA PASÓ LA HORA (Las 23:00 del 26 de marzo)
    else {
        clearInterval(actualizarReloj); // Detenemos el reloj
        const seccion = document.getElementById('seccion-contador');
        
        if (seccion) {
            // Lo ocultamos con estilo
            seccion.style.transition = "opacity 1s ease";
            seccion.style.opacity = "0";
            setTimeout(() => {
                seccion.style.display = 'none'; // Desaparece del código visual
            }, 1000);
        }
    }
}, 1000);

// --- LÓGICA DE EVENTOS EN TIEMPO REAL :VIVO ---
function controlarEventosEnVivo() {
    const ahora = new Date();
    const dia = ahora.getDate();
    const mes = ahora.getMonth(); // Marzo es 2
    const hora = ahora.getHours();
    const minutos = ahora.getMinutes(); // Agregamos los minutos

    const cartelVivo = document.getElementById('cartel-en-vivo');

    // CONDICIÓN PARA PRUEBA: 21 de Marzo (mes 2) entre las 14:40 y las 14:42
    if (dia === 21 && mes === 2 && hora === 15 && (minutos >= 1 && minutos < 40)) {
        if (cartelVivo) {
            cartelVivo.style.display = 'block';
            console.log("¡CRAZY NIGHT EN VIVO!"); // Para que lo veas en la consola (F12)
        }
    } else {
        if (cartelVivo) {
            cartelVivo.style.display = 'none';
        }
    }
}

// IMPORTANTE: Asegúrate de que esta función se ejecute cada 1 minuto para chequear el tiempo
setInterval(controlarEventosEnVivo, 10000); // Chequea cada 10 segundos
controlarEventosEnVivo(); // Ejecuta una vez al cargar la página

// Ejecutamos la función apenas carga y luego cada 1 minuto
controlarEventosEnVivo();
setInterval(controlarEventosEnVivo, 60000);

//REDES SOCIALES:
document.querySelectorAll('.icono-social').forEach(boton => {
    boton.addEventListener('mousemove', (e) => {
        // En móviles desactivamos el magnetismo para evitar tirones
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
}); // CIERRE FINAL DEL WINDOW LOAD

