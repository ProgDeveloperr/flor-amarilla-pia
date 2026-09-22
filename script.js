/* =========================================================
   ELEMENTOS
========================================================= */

const body =
    document.body;

const magicButton =
    document.getElementById("magicButton");

const sparkButton =
    document.getElementById("sparkButton");

const surprise =
    document.getElementById("surprise");

const particles =
    document.getElementById("particles");

const stars =
    document.getElementById("stars");


let bloomed = false;


/* =========================================================
   ESTRELLAS
========================================================= */

function createStars() {

    const total = 65;


    for (
        let i = 0;
        i < total;
        i++
    ) {

        const star =
            document.createElement("span");


        star.classList.add("star");


        const size =
            1 +
            Math.random() * 2.6;


        star.style.width =
            `${size}px`;

        star.style.height =
            `${size}px`;


        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;


        star.style.setProperty(
            "--time",
            `${2.5 + Math.random() * 4}s`
        );


        star.style.animationDelay =
            `${Math.random() * 4}s`;


        stars.appendChild(star);

    }

}


/* =========================================================
   EXPLOSIÓN DE LUZ
========================================================= */

function createExplosion(
    amount = 60
) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement("span");


        particle.classList.add(
            "particle"
        );


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            130 +
            Math.random() *
            340;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        const size =
            3 +
            Math.random() *
            7;


        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;


        particle.style.setProperty(
            "--x",
            `${x}px`
        );


        particle.style.setProperty(
            "--y",
            `${y}px`
        );


        particle.style.setProperty(
            "--duration",
            `${1.4 + Math.random() * 1.7}s`
        );


        particles.appendChild(
            particle
        );


        setTimeout(
            () => {

                particle.remove();

            },
            3500
        );

    }

}


/* =========================================================
   SÍMBOLOS FLOTANTES
========================================================= */

function createFloatingSymbol() {

    if (!bloomed) {
        return;
    }


    const symbol =
        document.createElement("span");


    symbol.classList.add(
        "float-symbol"
    );


    const symbols = [
        "♥",
        "✦",
        "✧",
        "•",
        "♥",
        "✦"
    ];


    symbol.textContent =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];


    symbol.style.left =
        `${Math.random() * 100}%`;


    symbol.style.setProperty(
        "--size",
        `${9 + Math.random() * 15}px`
    );


    symbol.style.setProperty(
        "--duration",
        `${7 + Math.random() * 5}s`
    );


    symbol.style.setProperty(
        "--drift",
        `${-35 + Math.random() * 70}px`
    );


    document.body.appendChild(
        symbol
    );


    setTimeout(
        () => {

            symbol.remove();

        },
        13000
    );

}


/* =========================================================
   FLORECER
========================================================= */

function bloomFlower() {

    /*
        Solamente la primera pulsación
        ejecuta la experiencia completa.
    */

    if (bloomed) {

        createExplosion(45);

        return;

    }


    bloomed = true;


    /*
        Hacemos visible el contenido
        para lectores de pantalla.
    */

    surprise.setAttribute(
        "aria-hidden",
        "false"
    );


    /*
        Activamos todas las animaciones CSS.
    */

    body.classList.add(
        "bloomed"
    );


    /*
        Primera explosión.
    */

    setTimeout(
        () => {

            createExplosion(65);

        },
        350
    );


    /*
        Segunda explosión cuando
        la flor está terminando de abrirse.
    */

    setTimeout(
        () => {

            createExplosion(40);

        },
        1250
    );


    /*
        Bajamos suavemente hasta la flor.
    */

    setTimeout(
        () => {

            surprise.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        },
        700
    );

}


/* =========================================================
   BOTÓN PRINCIPAL
========================================================= */

magicButton.addEventListener(
    "click",
    bloomFlower
);


/* =========================================================
   BOTÓN DE MAGIA EXTRA
========================================================= */

sparkButton.addEventListener(
    "click",
    () => {

        createExplosion(55);

    }
);


/* =========================================================
   INICIALIZACIÓN
========================================================= */

createStars();


/*
    Estos símbolos intentan generarse cada cierto tiempo,
    pero la función verifica primero si "bloomed" es true.

    Por lo tanto:

    MIENTRAS NO SE TOQUE EL BOTÓN,
    NO APARECE NADA.
*/

setInterval(
    createFloatingSymbol,
    950
);


/*
    IMPORTANTE:

    No existe ningún setTimeout()
    que ejecute bloomFlower() automáticamente.

    La única llamada a bloomFlower()
    ocurre en el click del botón principal.

    Por lo tanto la flor puede permanecer
    cerrada 5 segundos, 5 minutos o 5 horas.

    Solo florece cuando Pia pulse:

    "Hacer florecer"
*/