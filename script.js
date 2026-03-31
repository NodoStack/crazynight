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
    var swiper = new Swiper(".mySwiperCards", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        coverflowEffect: { rotate: 0, stretch: -100, depth: 150, modifier: 1, slideShadows: false },
    });

    // --- 3. INICIAR SISTEMA DE GIRA ---
    iniciarGiraYContador();

});

// --- LÓGICA DE GIRA (Flyers rotan, Contador queda fijo) ---
const datosGira = [
    {
        titulo: "TOUR BS.AS. ⚡",
        lugar: "10 DE ABRIL | EL TEATRO (BSAS)",
        imagen: "img/bs1.png" 
    },
    {
        titulo: "TOUR BS.AS. ⚡",
        lugar: "11 DE ABRIL | UNICLUB (BSAS)",
        imagen: "img/bs2.png" 
    }
];

// FECHA FIJA: Siempre apunta al primer show de la gira
const FECHA_PROXIMO_SHOW = "2026-04-10T22:00:00"; 

let indiceFlyer = 0;

function iniciarGiraYContador() {
    // 1. Iniciar el contador una sola vez (apuntando al 10 de abril)
    iniciarContadorFijo(FECHA_PROXIMO_SHOW);

    // 2. Iniciar la rotación de flyers cada 6 segundos
    setInterval(() => {
        indiceFlyer = (indiceFlyer + 1) % datosGira.length;
        actualizarSoloFlyer();
    }, 6000);
}

function actualizarSoloFlyer() {
    const info = datosGira[indiceFlyer];
    const flyerImg = document.getElementById('flyer-dinamico');
    
    // Transición suave
    flyerImg.style.opacity = "0";
    
    setTimeout(() => {
        document.getElementById('titulo-show').innerText = info.titulo;
        document.getElementById('info-lugar').innerText = info.lugar;
        flyerImg.src = info.imagen;
        flyerImg.style.opacity = "1";
    }, 500);
}

function iniciarContadorFijo(fechaDestino) {
    const target = new Date(fechaDestino).getTime();

    setInterval(() => {
        const ahora = new Date().getTime();
        const distancia = target - ahora;
        const relojDiv = document.getElementById('reloj-regresivo');
        const cartelVivo = document.getElementById('cartel-en-vivo');

        // BLINDAJE EN VIVO (Si hoy es 10 de abril y estamos en horario)
        if (distancia <= 0 && distancia > -(4 * 60 * 60 * 1000)) {
            relojDiv.style.display = "none";
            if(cartelVivo) cartelVivo.style.display = "block";
            return;
        }

        // SI YA PASÓ EL SHOW DEL 10 (Aca podrías cambiar la fecha al 11 manualmente si querés)
        if (distancia < -(4 * 60 * 60 * 1000)) {
            relojDiv.innerHTML = "<h2 style='color:#888;'>¡LLEGÓ EL DÍA!</h2>";
            return;
        }

        // ACTUALIZAR NÚMEROS (Fijo al 10 de abril)
        document.getElementById('dias').innerText = Math.floor(distancia / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById('horas').innerText = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById('minutos').innerText = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById('segundos').innerText = Math.floor((distancia % (1000 * 60)) / 1000).toString().padStart(2, '0');
        
    }, 1000);
}
//=====================================
//SECCION FECHAS PASADAS
// ACÁ AGREGÁS TODAS LAS FECHAS DEL AÑO (Pasadas y Futuras)
//===================================
const todasLasFechas = [
    {
        fecha: "2026-03-26",
        lugar: "LUZBELITO",
        ciudad: "CÓRDOBA",
        flyer: "img/lzbe2.jpeg"
    },
    {
        fecha: "2026-04-10",
        lugar: "EL TEATRO",
        ciudad: "BS.AS.",
        flyer: "img/bs1.png"
    },
    {
        fecha: "2026-04-11",
        lugar: "UNICLUB",
        ciudad: "BS.AS.",
        flyer: "img/bs2.png"
    }
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
                <img src="${show.flyer}" class="flyer-min">
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
document.addEventListener('DOMContentLoaded', renderizarAgenda);

// Función auxiliar para que la fecha se vea linda (Ej: 10 ABR)
function formatearFecha(fechaStr) {
    const meses = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
    const d = new Date(fechaStr);
    return `<span>${d.getDate() + 1}</span><small>${meses[d.getMonth()]}</small>`;
}

// Ejecutar al cargar
document.addEventListener('DOMContentLoaded', renderizarAgenda);

