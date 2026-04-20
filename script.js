// =========================================================
// 🚀 CONFIGURACIÓN DE PRÓXIMOS SHOWS (MODIFICAR AQUÍ)
// =========================================================

// 1. FECHA DEL CONTADOR (Formato: AAAA-MM-DDTHH:MM:SS)
const FECHA_PROXIMO_SHOW = "2026-04-23T23:30:00"; 

// 2. TEXTOS DEL ENCABEZADO
const TITULO_DINAMICO = "PRÓXIMO SHOW ⚡";
const LUGAR_DINAMICO = "🔥 23 DE ABRIL | LUZBELITO POOL BAR (CÓRDOBA) 🔥";

// 3. IMÁGENES DE LOS FLYERS (Si hay uno solo, poné el mismo en ambos o dejá el 2 vacío)
const FLYER_PRINCIPAL = "img/jueves.jpeg";
const FLYER_SECUNDARIO = "img/2504.jpeg"; // <--- Cambiá este cuando tengas el segundo
const FLYER_SECUNDARIO_TEXTO= "25 DE ABRRIL | BAD COMPANY (TILLARD 1224) "

// 4. LISTA DE LA AGENDA (La que aparece abajo de todo)
const todasLasFechas = [
    { fecha: "2026-03-26", lugar: "LUZBELITO", ciudad: "CÓRDOBA", flyer: "img/lzbe2.jpeg" },
    { fecha: "2026-04-10", lugar: "OCEANARIO CLUB", ciudad: "BS.AS.", flyer: "img/bs2.png" },
    { fecha: "2026-04-11", lugar: "LIVERPOOL BAR", ciudad: "BS.AS.", flyer: "img/bs1.png" },
    { fecha: "2026-04-19", lugar: "LUZBELITO", ciudad: "CÓRDOBA", flyer: "img/19-04.jpeg" },

    // --- NUEVAS FECHAS ACTIVAS ---
    { 
        fecha: "2026-04-23", 
        lugar: "LUZBELITO POOL BAR", 
        ciudad: "CÓRDOBA", 
        flyer: "img/jueves.jpeg" 
    },
    { 
        fecha: "2026-04-25", 
        lugar: "BAD COMPANY - TILLARD 1224", 
        ciudad: "CÓRDOBA", 
        flyer: "img/2504.jpeg" 
    }
];

// =========================================================
// ⚙️ LÓGICA DEL SISTEMA (NO TOCAR SI NO ES NECESARIO)
// =========================================================

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
        new Swiper(".mySwiperCards", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            loop: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            coverflowEffect: { rotate: 0, stretch: -100, depth: 150, modifier: 1, slideShadows: false },
        });
    }

    // --- 3. INICIAR SISTEMA DE GIRA ---
    iniciarGiraYContador();
    renderizarAgenda();
});

function iniciarGiraYContador() {
    iniciarContadorFijo(FECHA_PROXIMO_SHOW);
    
    const titulo = document.getElementById('titulo-show');
    const infoLugar = document.getElementById('info-lugar');
    const flyer1 = document.getElementById('flyer-dinamico');
    const flyer2 = document.getElementById('flyer-dinamico-2');
    const refContenedor = document.getElementById('lista-referencias');

    if(titulo) titulo.innerText = TITULO_DINAMICO;
    if(infoLugar) infoLugar.innerText = LUGAR_DINAMICO;
    if(flyer1) flyer1.src = FLYER_PRINCIPAL;
    if(flyer2) flyer2.src = FLYER_SECUNDARIO;

    // INYECTO LAS VARIABLES  en el HTML
    if(refContenedor) {
        refContenedor.innerHTML = `
            <div class="linea-ref">
                <i class="fas fa-calendar-day"></i>
                <span>${LUGAR_DINAMICO.replace(/🔥/g, '')}</span> 
            </div>
            <div class="linea-ref">
                <i class="fas fa-calendar-day"></i>
                <span>${FLYER_SECUNDARIO_TEXTO}</span>
            </div>
        `;
    }
}

function iniciarContadorFijo(fechaDestino) {
    const target = new Date(fechaDestino).getTime();

    const intervaloContador = setInterval(() => {
        const ahora = new Date().getTime();
        const distancia = target - ahora;
        const relojDiv = document.getElementById('reloj-regresivo');
        const cartelVivo = document.getElementById('cartel-en-vivo');

        if (!relojDiv) return;

        if (distancia <= 0 && distancia > -(4 * 60 * 60 * 1000)) {
            relojDiv.style.display = "none";
            if(cartelVivo) cartelVivo.style.display = "block";
            return;
        }

        if (distancia < -(4 * 60 * 60 * 1000)) {
            relojDiv.innerHTML = "<h2 style='color:#f00; font-size: 1.5rem;'>¡MANTENIENDO VIVA LA LLAMA!</h2>";
            clearInterval(intervaloContador);
            return;
        }

        document.getElementById('dias').innerText = Math.floor(distancia / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById('horas').innerText = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById('minutos').innerText = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById('segundos').innerText = Math.floor((distancia % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }, 1000);
}

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
                <div class="fecha-badge"><span>${p[2]}</span><small>${meses[parseInt(p[1]) - 1]}</small></div>
                <img src="${show.flyer}" class="flyer-min" onclick="abrirLightbox(this.src)">
                <div class="info-texto">
                    <h4>${show.lugar}</h4><p>${show.ciudad}</p>
                    ${yaPaso ? '<span class="status">SHOW REALIZADO ✔</span>' : '<span class="status-vivo">PRÓXIMAMENTE 🤘</span>'}
                </div>
            </div>`;
    });
    contenedor.innerHTML = html;
}

function abrirLightbox(srcImagen) {
    const lb = document.getElementById('lightbox-tour');
    const img = document.getElementById('lightbox-img-principal');
    if(!lb || !img) return;
    img.src = srcImagen;
    lb.style.display = 'flex'; 
    setTimeout(() => lb.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
}

function cerrarLightbox() {
    const lb = document.getElementById('lightbox-tour');
    if(!lb) return;
    lb.classList.remove('active');
    setTimeout(() => { lb.style.display = 'none'; document.body.style.overflow = 'auto'; }, 300);
}

document.addEventListener('click', (e) => {
    const lb = document.getElementById('lightbox-tour');
    if (lb && lb.classList.contains('active') && (e.target.id === 'lightbox-tour' || e.target.classList.contains('lightbox-cerrar'))) {
        cerrarLightbox();
    }
});