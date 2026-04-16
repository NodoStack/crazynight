window.addEventListener('load', () => {
    
    // --- 1. MÚSICA Y NOTAS ---
    const musica = document.getElementById('musicaBanda');
    const btn = document.getElementById('btnMusica');
    const icono = document.getElementById('iconoMusica');
    const animeButton = document.getElementById('anime-button');

    if (btn && musica) {
        btn.addEventListener('click', () => {
            if (musica.paused) {
                musica.play();
                icono.innerText = "PAUSE";
                btn.classList.add('playing');
                if(animeButton) animeButton.classList.remove('hidden-anime');
                for (let i = 0; i < 25; i++) { setTimeout(crearNota, i * 40); }
            } else {
                musica.pause();
                icono.innerText = "PLAY ♫";
                btn.classList.remove('playing');
                if(animeButton) animeButton.classList.add('hidden-anime');
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
        document.body.appendChild(nota);
        setTimeout(() => { nota.remove(); }, 1500);
    }

    // --- 2. SWIPER (Book de fotos) ---
    if (document.querySelector(".mySwiperCards")) {
        var swiper = new Swiper(".mySwiperCards", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            loop: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            coverflowEffect: { rotate: 0, stretch: -100, depth: 150, modifier: 1, slideShadows: false },
        });
    }

    // --- 3. INICIAR SISTEMA DE GIRA (CONTADOR Y AGENDA) ---
    iniciarGiraYContador();
    renderizarAgenda();

}); // <--- AQUÍ SE CIERRA EL WINDOW LOAD (ERROR CORREGIDO)

// --- LÓGICA DE CONTADOR FIJO ---
// Seteamos la nueva fecha: 19 de Abril a las 23:30hs
const FECHA_PROXIMO_SHOW = "2026-04-19T23:30:00"; 

function iniciarGiraYContador() {
    iniciarContadorFijo(FECHA_PROXIMO_SHOW);
    
    const titulo = document.getElementById('titulo-show');
    const infoLugar = document.getElementById('info-lugar');
    const flyerImg = document.getElementById('flyer-dinamico');

    if(titulo) titulo.innerText = "PRÓXIMO SHOW ⚡";
    if(infoLugar) infoLugar.innerText = "19 DE ABRIL | LUZBELITO (CÓRDOBA)";
   
}

function iniciarContadorFijo(fechaDestino) {
    const target = new Date(fechaDestino).getTime();

    const intervaloContador = setInterval(() => {
        const ahora = new Date().getTime();
        const distancia = target - ahora;
        const relojDiv = document.getElementById('reloj-regresivo');
        const cartelVivo = document.getElementById('cartel-en-vivo');

        if (!relojDiv) return;

        // Si es la hora del show (durante 4 horas)
        if (distancia <= 0 && distancia > -(4 * 60 * 60 * 1000)) {
            relojDiv.style.display = "none";
            if(cartelVivo) cartelVivo.style.display = "block";
            return;
        }

        // Si ya terminó el show
        if (distancia < -(4 * 60 * 60 * 1000)) {
            relojDiv.innerHTML = "<h2 style='color:#888;'>¡LLEGÓ EL DÍA!</h2>";
            clearInterval(intervaloContador);
            return;
        }

        // Cálculos del tiempo
        document.getElementById('dias').innerText = Math.floor(distancia / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById('horas').innerText = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById('minutos').innerText = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById('segundos').innerText = Math.floor((distancia % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }, 1000);
}

// --- SECCIÓN AGENDA ACTUALIZADA ---
const todasLasFechas = [
    { fecha: "2026-03-26", lugar: "LUZBELITO", ciudad: "CÓRDOBA", flyer: "img/lzbe2.jpeg" },
    { fecha: "2026-04-10", lugar: "OCEANARIO CLUB", ciudad: "BS.AS.", flyer: "img/bs2.png" },
    { fecha: "2026-04-11", lugar: "LIVERPOOL BAR", ciudad: "BS.AS.", flyer: "img/bs1.png" },
    { fecha: "2026-04-19", lugar: "LUZBELITO", ciudad: "CÓRDOBA", flyer: "img/lzbe2.jpeg" }
];

function renderizarAgenda() {
    const contenedor = document.getElementById('contenedor-fechas');
    if (!contenedor) return;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); 

    let html = "";
    const meses = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

    todasLasFechas.forEach(show => {
        const p = show.fecha.split('-');
        const fShow = new Date(parseInt(p[0]), parseInt(p[1]) - 1, parseInt(p[2]));
        const yaPaso = fShow < hoy;

        html += `
            <div class="card-fecha ${yaPaso ? 'pasado' : 'proximo'}">
                <div class="fecha-badge">
                    <span>${p[2]}</span>
                    <small>${meses[parseInt(p[1]) - 1]}</small>
                </div>
                <img src="${show.flyer}" class="flyer-min" alt="${show.lugar}" onclick="abrirLightbox(this.src)">
                <div class="info-texto">
                    <h4>${show.lugar}</h4>
                    <p>${show.ciudad}</p>
                    ${yaPaso 
                        ? '<span class="status">SHOW REALIZADO ✔</span>' 
                        : '<span class="status-vivo">PRÓXIMAMENTE 🤘</span>'}
                </div>
            </div>`;
    });
    contenedor.innerHTML = html;
}

// =========================================
// FUNCIONES PARA CONTROLAR EL LIGHTBOX: CAJA OCULTA
// =========================================

function abrirLightbox(srcImagen) {
    const lightbox = document.getElementById('lightbox-tour');
    const lightboxImg = document.getElementById('lightbox-img-principal');
    
    if(!lightbox || !lightboxImg) return;
    
    // Seteamos la imagen
    lightboxImg.src = srcImagen;
    
    // Mostramos el overlay con clase active
    lightbox.style.display = 'flex'; 
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);
    
    // Bloquear scroll
    document.body.style.overflow = 'hidden';
}

function cerrarLightbox() {
    const lightbox = document.getElementById('lightbox-tour');
    if(!lightbox) return;

    lightbox.classList.remove('active');
    
    // Esperamos a que termine la animación para ocultar el div
    setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// EVITAR QUE SE CIERRE AL TOCAR LA IMAGEN
// Solo se cierra si tocás el fondo NEGRO o la X
document.addEventListener('click', function(e) {
    const lightbox = document.getElementById('lightbox-tour');
    if (!lightbox || !lightbox.classList.contains('active')) return;

    // Si el clic es en el fondo (fuera de la imagen) o en la X, cerramos
    if (e.target.id === 'lightbox-tour' || e.target.classList.contains('lightbox-cerrar')) {
        cerrarLightbox();
    }
});