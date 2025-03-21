/**
 * Lotería Mexicana (Versión adaptada para GitHub Pages)
 * Inicio -> Seleccionar carta -> Mostrar -> Reproducir -> Descartar -> Histórico -> Esperar -> Repetir o Finalizar
 */

// Obtener el nombre del repositorio para construir las rutas correctamente
const nombreRepositorio = location.pathname.split('/')[1];
const esGitHubPages = location.hostname.includes('github.io');
const rutaBase = esGitHubPages ? `/${nombreRepositorio}` : '';

// Datos de las cartas de la lotería con sus nombres
const CARTAS_LOTERIA = [
    { id: 1, nombre: "El gallo", frase: "Canta al amanecer", complemento: "aunque nadie lo quiera ver" },
    { id: 2, nombre: "El diablito", frase: "Hace travesuras", complemento: "y ríe con locuras" },
    { id: 3, nombre: "La dama", frase: "Elegante y bonita", complemento: "baila hasta quedar cansadita" },
    { id: 4, nombre: "El catrín", frase: "Vestido con estilo", complemento: "pero nunca trae ni un filo" },
    { id: 5, nombre: "El paraguas", frase: "Te protege de la lluvia", complemento: "menos cuando se te olvida" },
    { id: 6, nombre: "La sirena", frase: "Vive en el mar y canta", complemento: "y al marinero encanta" },
    { id: 7, nombre: "La escalera", frase: "Para subir muy alto", complemento: "sin miedo a dar un salto" },
    { id: 8, nombre: "La botella", frase: "Guarda líquidos sabrosos", complemento: "para amigos cariñosos" },
    { id: 9, nombre: "El barril", frase: "Grande y lleno de algo rico", complemento: "pero cuidado, no abuses, chico" },
    { id: 10, nombre: "El árbol", frase: "Tiene hojas y da sombra", complemento: "y si trepas, no te caigas en broma" },
    { id: 11, nombre: "El melón", frase: "Fruta redonda y dulce", complemento: "pa' que tu panza se impulse" },
    { id: 12, nombre: "El valiente", frase: "No le teme a nada", complemento: "ni al picante de la tostada" },
    { id: 13, nombre: "El gorrito", frase: "Se usa en la cabeza", complemento: "te tapa hasta la pereza" },
    { id: 14, nombre: "La muerte", frase: "Tiene huesos y no camina", complemento: "pero baila en la cantina" },
    { id: 15, nombre: "La pera", frase: "Fruta verde con forma rara", complemento: "más sabrosa si está cara" },
    { id: 16, nombre: "La bandera", frase: "Tres colores muy queridos", complemento: "que nos tienen muy unidos" },
    { id: 17, nombre: "El bandolón", frase: "Instrumento para serenata", complemento: "que al amor retrata" },
    { id: 18, nombre: "El violoncello", frase: "Grande y musical", complemento: "y muy especial" },
    { id: 19, nombre: "La garza", frase: "Ave alta y delgada", complemento: "camina muy parada" },
    { id: 20, nombre: "El pájaro", frase: "Pequeño y canta bonito", complemento: "alegrando con su grito" },
    { id: 21, nombre: "La mano", frase: "Tiene cinco dedos", complemento: "y aplaude sin tener miedos" },
    { id: 22, nombre: "La bota", frase: "Zapato alto y fuerte", complemento: "que pisando tiene suerte" },
    { id: 23, nombre: "La luna", frase: "Sale en la noche", complemento: "mientras el sol se va en coche" },
    { id: 24, nombre: "El cotorro", frase: "Habla y es verde", complemento: "chismea aunque no se acuerde" },
    { id: 25, nombre: "El borracho", frase: "Camina de lado", complemento: "porque anda bien mareado" },
    { id: 26, nombre: "El negrito", frase: "Baila con ritmo", complemento: "y lo hace con optimismo" },
    { id: 27, nombre: "El corazón", frase: "Late y siente amor", complemento: "y llora con dolor" },
    { id: 28, nombre: "La sandía", frase: "Fruta grande y jugosa", complemento: "refrescante y deliciosa" },
    { id: 29, nombre: "El tambor", frase: "Hace ruido al tocarlo", complemento: "y nadie puede callarlo" },
    { id: 30, nombre: "El camarón", frase: "Nada hacia atrás", complemento: "cuando escapa del disfraz" },
    { id: 31, nombre: "Las jaras", frase: "Flechas que apuntan lejos", complemento: "donde viven los conejos" },
    { id: 32, nombre: "El músico", frase: "Toca instrumentos bonitos", complemento: "alegrando a los amiguitos" },
    { id: 33, nombre: "La araña", frase: "Teje su telaraña", complemento: "para atrapar la mañana" },
    { id: 34, nombre: "El soldado", frase: "Valiente con uniforme", complemento: "en postura firme y enorme" },
    { id: 35, nombre: "La estrella", frase: "Brilla en el cielo", complemento: "y la vemos desde el suelo" },
    { id: 36, nombre: "El cazo", frase: "Para cocinar rico", complemento: "y llenar bien el hocico" },
    { id: 37, nombre: "El mundo", frase: "Planeta donde vivimos", complemento: "que cuidamos y queremos" },
    { id: 38, nombre: "El apache", frase: "Baila con plumas", complemento: "saltando hasta las alturas" },
    { id: 39, nombre: "El nopal", frase: "Planta con espinas", complemento: "pero rica en vitaminas" },
    { id: 40, nombre: "El alacrán", frase: "Pica con la cola", complemento: "y no juega ni a la rola" },
    { id: 41, nombre: "La rosa", frase: "Flor bonita y con espinas", complemento: "te pincha si la arruinas" },
    { id: 42, nombre: "La calavera", frase: "Cara sin piel", complemento: "siempre riendo fiel" },
    { id: 43, nombre: "La campana", frase: "Suena fuerte y claro", complemento: "te despierta sin reparo" },
    { id: 44, nombre: "El cantarito", frase: "Recipiente de barro", complemento: "agua fresca sin catarro" },
    { id: 45, nombre: "El venado", frase: "Animal con cuernos", complemento: "que corre hasta en los inviernos" },
    { id: 46, nombre: "El sol", frase: "Calienta durante el día", complemento: "hasta freírte la alegría" },
    { id: 47, nombre: "La corona", frase: "Usada por reyes y reinas", complemento: "brilla más que las estrellas" },
    { id: 48, nombre: "La chalupa", frase: "Pequeña barca en el agua", complemento: "que navega sin paraguas" },
    { id: 49, nombre: "El pino", frase: "Árbol verde todo el año", complemento: "perfecto sin hacer daño" },
    { id: 50, nombre: "El pescado", frase: "Nada en el agua", complemento: "pero escapa sin paraguas" },
    { id: 51, nombre: "La palma", frase: "Árbol alto cerca del mar", complemento: "donde hamacas vas a colgar" },
    { id: 52, nombre: "La maceta", frase: "Recipiente para plantas", complemento: "que adornan hasta gargantas" },
    { id: 53, nombre: "El arpa", frase: "Instrumento grande con cuerdas", complemento: "que te calma si te acuerdas" },
    { id: 54, nombre: "La rana", frase: "Salta y croa", complemento: "más que un niño que se asoma" }
];

// Estado del juego
let estadoJuego = {
    juegoActivo: false,          // Indica si el juego está en marcha
    juegoPausado: false,         // Indica si el juego está pausado
    cartasDisponibles: [],       // Cartas disponibles para seleccionar
    cartasMostradas: [],         // Cartas ya mostradas
    tiempoUltimoClick: 0,        // Tiempo del último clic (para detectar triple clic)
    contadorClicks: 0,           // Contador de clics rápidos
    tiempoEntreClicks: 500,      // Tiempo máximo entre clics para considerarse múltiples (en ms)
    timeoutSiguienteCarta: null, // Referencia al timeout para la siguiente carta
    imagenesCargadas: false,     // Indicador de que las imágenes han sido precargadas
    imagenesPrecargadas: {},     // Caché de imágenes precargadas
    tiempoEntreCambios: 5000,    // Tiempo entre cambios de carta en milisegundos
    wakeLock: null               // Para guardar la referencia al wake lock
};

// Elementos de la interfaz
const elementosInterfaz = {
    imagenCartaActual: null,    // Imagen de la carta actual
    contenedorHistorial: null,  // Contenedor de cartas del historial
};

// Rutas de archivos de imágenes
const RUTA_IMAGENES_CARTAS = `${rutaBase}/cartas/`;
const IMAGEN_BIENVENIDA = `${rutaBase}/cartas/instrucciones.PNG`;
const IMAGEN_FINAL = `${rutaBase}/cartas/fin.PNG`;

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', inicializarAplicacion);

function inicializarAplicacion() {
    console.log('Inicializando aplicación en ruta base:', rutaBase);

    // Obtener referencias a elementos de la interfaz
    elementosInterfaz.imagenCartaActual = document.getElementById('carta-actual');
    elementosInterfaz.contenedorHistorial = document.querySelector('.cartas-historial');

    // Configurar síntesis de voz
    configurarSintetizadorVoz();

    // Precargar imágenes en segundo plano
    precargarImagenes();

    // Mostrar imagen de presentación con instrucciones
    elementosInterfaz.imagenCartaActual.src = IMAGEN_BIENVENIDA;
    elementosInterfaz.imagenCartaActual.onerror = manejarErrorCargaImagen;
    mostrarCartaConEfecto();

    // Configurar escuchador de eventos para la imagen principal
    elementosInterfaz.imagenCartaActual.addEventListener('click', manejarClickCarta);

    // Configurar escuchadores para deslizamientos
    configurarDetectorDeslizamiento();

    // Hacer que la imagen sea interactiva visualmente
    elementosInterfaz.imagenCartaActual.style.cursor = 'pointer';

    // Agregar botón de reinicio para dispositivos móviles
    agregarBotonReinicio();

    // Agregar Service Worker para PWA
    registrarServiceWorker();

    // Verificar si hay actualizaciones disponibles
    verificarActualizaciones();

    // Manejar eventos de visibilidad del documento
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && estadoJuego.juegoActivo && !estadoJuego.juegoPausado) {
            solicitarWakeLock();
        }
    });
}

// Registrar Service Worker para funcionamiento offline
function registrarServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register(`${rutaBase}/sw.js`)
                .then(registration => {
                    console.log('Service Worker registrado con éxito:', registration.scope);
                })
                .catch(error => {
                    console.log('Error al registrar el Service Worker:', error);
                });
        });
    }
}

// Precargar imágenes para evitar retrasos
function precargarImagenes() {
    // Crear array de promesas para cargar las imágenes
    const promesasImagenes = [];
    
    // Función para cargar una imagen y devolver una promesa
    const cargarImagen = (ruta) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                estadoJuego.imagenesPrecargadas[ruta] = img;
                resolve(img);
            };
            img.onerror = () => {
                console.warn(`No se pudo cargar la imagen: ${ruta}`);
                reject(new Error(`Error al cargar imagen: ${ruta}`));
            };
            img.src = ruta;
        });
    };
    
    // Cargar imagen de bienvenida y final
    promesasImagenes.push(cargarImagen(IMAGEN_BIENVENIDA));
    promesasImagenes.push(cargarImagen(IMAGEN_FINAL));
    
    // Cargar las imágenes de las cartas
    CARTAS_LOTERIA.forEach(carta => {
        const rutaImagen = `${RUTA_IMAGENES_CARTAS}${carta.id}.jpg`;
        promesasImagenes.push(cargarImagen(rutaImagen));
    });
    
    // Manejar todas las promesas
    Promise.allSettled(promesasImagenes)
        .then(resultados => {
            const imagenesCargadas = resultados.filter(r => r.status === 'fulfilled').length;
            console.log(`Imágenes precargadas: ${imagenesCargadas}/${promesasImagenes.length}`);
            estadoJuego.imagenesCargadas = true;
        });
}

// Manejar errores de carga de imágenes
function manejarErrorCargaImagen() {
    console.error(`Error al cargar la imagen: ${this.src}`);
    // Intentar cargar una imagen alternativa o mostrar un mensaje de error
    this.src = `${rutaBase}/cartas/error.jpg`;
    // Si tampoco se puede cargar la imagen de error, mostrar un mensaje en el elemento
    this.onerror = function() {
        this.style.display = 'none';
        const mensajeError = document.createElement('div');
        mensajeError.textContent = 'Error al cargar la imagen';
        mensajeError.style.padding = '20px';
        mensajeError.style.backgroundColor = '#f8d7da';
        mensajeError.style.color = '#721c24';
        mensajeError.style.borderRadius = '5px';
        this.parentNode.appendChild(mensajeError);
    };
}

// Inicializar el sintetizador de voz
function configurarSintetizadorVoz() {
    // Comprobar si el navegador soporta síntesis de voz
    if (!window.speechSynthesis) {
        console.warn('La síntesis de voz no está disponible en este navegador');
    } else {
        // Cargar voces disponibles (necesario para algunos navegadores)
        window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.getVoices();
        };
    }
}

// Manejar clics en la carta principal
function manejarClickCarta() {
    const tiempoActual = new Date().getTime();
    
    // Verificar si es un clic rápido (para detectar triple clic)
    if (tiempoActual - estadoJuego.tiempoUltimoClick < estadoJuego.tiempoEntreClicks) {
        estadoJuego.contadorClicks++;
        
        // Si es un triple clic, reiniciar el juego
        if (estadoJuego.contadorClicks >= 3) {
            reiniciarJuego();
            estadoJuego.contadorClicks = 0;
            estadoJuego.tiempoUltimoClick = tiempoActual;
            return;
        }
    } else {
        // Reiniciar contador si pasó demasiado tiempo entre clics
        estadoJuego.contadorClicks = 1;
    }
    
    estadoJuego.tiempoUltimoClick = tiempoActual;
    
    // Lógica principal basada en el estado del juego
    if (!estadoJuego.juegoActivo) {
        // Si el juego no está activo, comenzarlo
        comenzarJuego();
    } else if (estadoJuego.juegoPausado) {
        // Si está pausado, continuar
        continuarJuego();
    } else {
        // Si está activo y no pausado, pausar
        pausarJuego();
    }
}

// Iniciar el juego de lotería
function comenzarJuego() {
    estadoJuego.juegoActivo = true;
    estadoJuego.juegoPausado = false;

    // Solicitar que la pantalla no se apague
    solicitarWakeLock();
    
    // Reiniciar el estado del juego
    estadoJuego.cartasDisponibles = [...CARTAS_LOTERIA];
    estadoJuego.cartasMostradas = [];
    
    // Limpiar historial visual
    elementosInterfaz.contenedorHistorial.innerHTML = '';
    
    // Comenzar el proceso de selección y muestra de cartas
    elegirYMostrarCartaAleatoria();
}

// Pausar el juego
function pausarJuego() {
    estadoJuego.juegoPausado = true;
    
    // Cancelar el timeout para la siguiente carta
    if (estadoJuego.timeoutSiguienteCarta) {
        clearTimeout(estadoJuego.timeoutSiguienteCarta);
        estadoJuego.timeoutSiguienteCarta = null;
    }
}

// Continuar el juego después de una pausa
function continuarJuego() {
    estadoJuego.juegoPausado = false;
    
    // Programar la siguiente carta
    estadoJuego.timeoutSiguienteCarta = setTimeout(() => {
        elegirYMostrarCartaAleatoria();
    }, 2000);
}

// Reiniciar completamente el juego
function reiniciarJuego() {
    // Cancelar cualquier timeout pendiente
    if (estadoJuego.timeoutSiguienteCarta) {
        clearTimeout(estadoJuego.timeoutSiguienteCarta);
        estadoJuego.timeoutSiguienteCarta = null;
    }

    // Liberar el wake lock
    liberarWakeLock();
    
    // Reiniciar estado
    estadoJuego.juegoActivo = false;
    estadoJuego.juegoPausado = false;
    
    // Mostrar imagen de bienvenida/instrucciones
    ocultarCartaConEfecto(() => {
        elementosInterfaz.imagenCartaActual.src = IMAGEN_BIENVENIDA;
        mostrarCartaConEfecto();
    });
    
    // Limpiar historial
    elementosInterfaz.contenedorHistorial.innerHTML = '';
}

// Seleccionar y mostrar una carta aleatoria
function elegirYMostrarCartaAleatoria() {
    // Si el juego está pausado, no continuar
    if (estadoJuego.juegoPausado) return;

    // Verificar si quedan cartas disponibles
    if (estadoJuego.cartasDisponibles.length === 0) {
        terminarJuego();
        return;
    }

    // Seleccionar una carta al azar del mazo disponible
    const indiceAleatorio = Math.floor(Math.random() * estadoJuego.cartasDisponibles.length);
    const cartaSeleccionada = estadoJuego.cartasDisponibles.splice(indiceAleatorio, 1)[0];

    // Registrar en el historial de cartas mostradas
    estadoJuego.cartasMostradas.push(cartaSeleccionada);

    // Mostrar la carta con efecto de desvanecimiento
    ocultarCartaConEfecto(() => {
        const rutaCarta = `${RUTA_IMAGENES_CARTAS}${cartaSeleccionada.id}.jpg`;
        elementosInterfaz.imagenCartaActual.src = rutaCarta;
        mostrarCartaConEfecto();

        // Añadir al historial visual
        agregarCartaAlHistorial(cartaSeleccionada.id, rutaCarta);

        // Pronunciar la carta con frases según el tiempo de cambio
        cantarNombreCarta(cartaSeleccionada);

        // Programar la siguiente carta (guardando referencia para poder cancelar)
        estadoJuego.timeoutSiguienteCarta = setTimeout(() => {
            elegirYMostrarCartaAleatoria();
        }, estadoJuego.tiempoEntreCambios);
    });
}

// Finalizar el juego de lotería
function terminarJuego() {
    estadoJuego.juegoActivo = false;
    estadoJuego.juegoPausado = false;

    // Liberar el wake lock
    liberarWakeLock();
    
    // Mostrar imagen de finalización del juego
    ocultarCartaConEfecto(() => {
        elementosInterfaz.imagenCartaActual.src = IMAGEN_FINAL;
        mostrarCartaConEfecto();
    });
}

// Añadir carta al historial visual
function agregarCartaAlHistorial(idCarta, rutaCarta) {
    // Crear elemento de imagen para el historial
    const imagenCartaHistorial = document.createElement('img');
    imagenCartaHistorial.src = rutaCarta || `${RUTA_IMAGENES_CARTAS}${idCarta}.jpg`;
    imagenCartaHistorial.classList.add('carta-historial');
    imagenCartaHistorial.onerror = manejarErrorCargaImagen;
    
    // Añadir al inicio del historial visual
    elementosInterfaz.contenedorHistorial.prepend(imagenCartaHistorial);
    
    // Aplicar animación de aparición gradual
    setTimeout(() => {
        imagenCartaHistorial.style.opacity = '1';
    }, 100);
}

// Pronunciar el nombre de la carta con síntesis de voz
function cantarNombreCarta(carta) {
    // Si la síntesis de voz no está disponible, terminar sin error
    if (!window.speechSynthesis) return;

    // Cancelar cualquier pronunciación en curso
    window.speechSynthesis.cancel();

    // Determinar qué pronunciar según el tiempo entre cambios
    let textoPronunciar = '';

    if (estadoJuego.tiempoEntreCambios >= 5000) {
        // Dice frase, complemento y nombre
        textoPronunciar = `${carta.frase}. ${carta.complemento}. ${carta.nombre}`;
    } else if (estadoJuego.tiempoEntreCambios >= 3000) {
        // Solo dice frase y nombre
        textoPronunciar = `${carta.frase}. ${carta.nombre}`;
    } else {
        // Solo dice el nombre
        textoPronunciar = carta.nombre;
    }

    // Crear mensaje para pronunciar y configurarlo
    const mensajeVoz = new SpeechSynthesisUtterance(textoPronunciar);

    // Intentar encontrar una voz en español mexicano
    const voces = window.speechSynthesis.getVoices();
    const vozEspanolMexicano = voces.find(voz => voz.lang === 'es-MX') ||
        voces.find(voz => voz.lang.includes('es')) ||
        voces[0];

    if (vozEspanolMexicano) {
        mensajeVoz.voice = vozEspanolMexicano;
        mensajeVoz.lang = 'es-MX';
    }

    // Ajustar la velocidad para las frases y complementos (más rápido)
    // y normal o más lento para el nombre
    if (estadoJuego.tiempoEntreCambios >= 3000) {
        mensajeVoz.rate = 1.2; // Un poco más rápido para frases y complementos
    } else {
        mensajeVoz.rate = 1.0; // Normal para solo el nombre
    }

    // Reproducir la pronunciación
    window.speechSynthesis.speak(mensajeVoz);
}

// Efectos visuales de transición
function ocultarCartaConEfecto(accionAlTerminar) {
    elementosInterfaz.imagenCartaActual.style.opacity = '0';
    setTimeout(accionAlTerminar, 300);
}

function mostrarCartaConEfecto() {
    elementosInterfaz.imagenCartaActual.style.opacity = '1';
}

// Detectar cuando la app está instalada como PWA
window.addEventListener('appinstalled', (event) => {
    console.log('Aplicación instalada como PWA');
    // Guardar una preferencia en localStorage para personalizar la experiencia
    localStorage.setItem('loteriaInstalada', 'true');
});

// Detectar si la app se está ejecutando en modo standalone (PWA instalada)
if (window.matchMedia('(display-mode: standalone)').matches || 
    window.navigator.standalone === true) {
    console.log('La aplicación se está ejecutando como PWA instalada');
}

// Función para solicitar pantalla completa
function solicitarPantallaCompleta() {
    // Verificar si está disponible la API de pantalla completa
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

// Solicitar pantalla completa al hacer clic en cualquier parte de la pantalla
document.addEventListener('click', function () {
    // Solo solicitar pantalla completa si no estamos en modo PWA instalada
    // ya que en ese caso, el manifest.json con display:fullscreen debería funcionar
    if (!window.matchMedia('(display-mode: standalone)').matches &&
        !window.navigator.standalone) {
        solicitarPantallaCompleta();
    }
}, { once: true }); // once:true para que solo se ejecute una vez

// También intenta solicitar pantalla completa al cargar la página en dispositivos móviles
document.addEventListener('DOMContentLoaded', function () {
    // Detección de dispositivo móvil
    const esMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (esMobile) {
        // En dispositivos móviles, intentar pantalla completa tras un breve retraso
        setTimeout(solicitarPantallaCompleta, 1000);
    }
});

// Intentar entrar en pantalla completa cuando se instala la PWA
window.addEventListener('appinstalled', () => {
    setTimeout(solicitarPantallaCompleta, 500);
});

// Detector de deslizamiento para cambiar el tiempo
function configurarDetectorDeslizamiento() {
    let touchStartY = 0;
    let lastY = 0;
    let isSliding = false;
    let acumuladorTiempo = 0;
    let timerID = null;

    // Inicio del toque
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
        lastY = touchStartY;
        isSliding = true;
        acumuladorTiempo = 0;

        // Inicia el monitoreo continuo si se mantiene el deslizamiento
        timerID = setInterval(() => {
            if (acumuladorTiempo !== 0) {
                // Ajusta el tiempo basado en la acumulación de deslizamiento
                const cambioSegundos = Math.floor(acumuladorTiempo / 50);
                if (cambioSegundos !== 0) {
                    estadoJuego.tiempoEntreCambios += cambioSegundos * 1000;
                    // Limitar tiempo mínimo a 1 segundo
                    estadoJuego.tiempoEntreCambios = Math.max(1000, estadoJuego.tiempoEntreCambios);
                    // Mostrar el nuevo tiempo
                    mostrarIndicadorTiempo(estadoJuego.tiempoEntreCambios / 1000);
                    acumuladorTiempo = 0;
                }
            }
        }, 200); // Actualizar cada 200ms para una respuesta fluida
    }, false);

    // Durante el deslizamiento
    document.addEventListener('touchmove', (e) => {
        if (!isSliding) return;

        const currentY = e.changedTouches[0].screenY;
        const delta = lastY - currentY;
        acumuladorTiempo += delta;
        lastY = currentY;

        // Prevenir desplazamiento de la página si estamos ajustando el tiempo
        if (Math.abs(acumuladorTiempo) > 30) {
            e.preventDefault();
        }
    }, { passive: false });

    // Fin del toque
    document.addEventListener('touchend', () => {
        isSliding = false;
        if (timerID) {
            clearInterval(timerID);
            timerID = null;
        }
    }, false);

    // Cancelación del toque
    document.addEventListener('touchcancel', () => {
        isSliding = false;
        if (timerID) {
            clearInterval(timerID);
            timerID = null;
        }
    }, false);
}

// Mostrar indicador visual del nuevo tiempo
function mostrarIndicadorTiempo(segundos) {
    // Crear o reutilizar el indicador
    let indicador = document.getElementById('indicador-tiempo');

    if (!indicador) {
        indicador = document.createElement('div');
        indicador.id = 'indicador-tiempo';
        document.body.appendChild(indicador);
    }

    // Solo actualizar el contenido y la visibilidad
    indicador.textContent = segundos;
    indicador.style.opacity = '1';

    // Limpiar cualquier temporizador anterior
    if (indicador.hideTimer) {
        clearTimeout(indicador.hideTimer);
    }

    // Configurar un nuevo temporizador para ocultar
    indicador.hideTimer = setTimeout(() => {
        indicador.style.opacity = '0';
    }, 2000);
}

// Solicitar que la pantalla no se apague
async function solicitarWakeLock() {
    if ('wakeLock' in navigator) {
        try {
            estadoJuego.wakeLock = await navigator.wakeLock.request('screen');
            console.log('Wake Lock activado');

            // Agregar listener para reactivar si se libera (por ejemplo, al cambiar de app)
            estadoJuego.wakeLock.addEventListener('release', () => {
                console.log('Wake Lock liberado');
                // Intentar reactivar cuando el usuario vuelva a la app
                if (estadoJuego.juegoActivo && !estadoJuego.juegoPausado) {
                    solicitarWakeLock();
                }
            });
        } catch (error) {
            console.error('No se pudo activar el Wake Lock:', error);
        }
    } else {
        console.warn('Wake Lock API no soportada en este navegador');
    }
}

// Liberar el wake lock cuando sea necesario
function liberarWakeLock() {
    if (estadoJuego.wakeLock) {
        estadoJuego.wakeLock.release()
            .then(() => {
                estadoJuego.wakeLock = null;
                console.log('Wake Lock liberado manualmente');
            });
    }
}

// Verifica y actualiza
function verificarActualizaciones() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then(registration => {
            if (registration) {
                registration.update();
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // Se ha descargado una nueva versión
                            if (confirm('Hay una nueva versión disponible. ¿Quieres actualizar ahora?')) {
                                window.location.reload();
                            }
                        }
                    });
                });
            }
        });
    }
}