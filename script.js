/* =========================================================
   ELEMENTOS
========================================================= */

const body = document.body;

const magicButton =
    document.getElementById("magicButton");

const buttonText =
    document.getElementById("buttonText");

const particles =
    document.getElementById("particles");

const stars =
    document.getElementById("stars");


let bloomed = false;


/* =========================================================
   GENERAR ESTRELLAS
========================================================= */

function createStars() {

    const amount = 55;

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const star =
            document.createElement("div");

        star.classList.add("star");


        const size =
            Math.random() * 2.5 + 1;


        star.style.width =
            `${size}px`;

        star.style.height =
            `${size}px`;


        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;


        star.style.animationDelay =
            `${Math.random() * 4}s`;

        star.style.animationDuration =
            `${2 + Math.random() * 4}s`;


        stars.appendChild(star);

    }

}


/* =========================================================
   EXPLOSIÓN DE PARTÍCULAS
========================================================= */

function createFlowerExplosion() {

    const amount = 55;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement("span");

        particle.classList.add("particle");


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            120 +
            Math.random() *
            320;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


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
            `${1.5 + Math.random() * 1.7}s`
        );


        const size =
            3 +
            Math.random() *
            7;


        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;


        particles.appendChild(particle);


        setTimeout(() => {

            particle.remove();

        }, 3500);

    }

}


/* =========================================================
   CORAZONES FLOTANTES
========================================================= */

function createFloatingHeart() {

    /*
        Los corazones solamente aparecen
        DESPUÉS de que Pia hace florecer la flor.
    */

    if (!bloomed) {
        return;
    }


    const heart =
        document.createElement("span");

    heart.classList.add(
        "love-particle"
    );


    const symbols = [
        "♥",
        "✦",
        "•",
        "✧",
        "♥"
    ];


    heart.innerText =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];


    heart.style.left =
        `${Math.random() * 100}%`;


    heart.style.setProperty(
        "--size",
        `${10 + Math.random() * 17}px`
    );


    heart.style.setProperty(
        "--time",
        `${6 + Math.random() * 5}s`
    );


    document.body.appendChild(
        heart
    );


    setTimeout(() => {

        heart.remove();

    }, 12000);

}


/* =========================================================
   FLORECER
========================================================= */

function bloomFlower() {

    /*
        Primera pulsación:
        - abre la flor
        - muestra el mensaje
        - lanza partículas
    */

    if (!bloomed) {

        bloomed = true;


        body.classList.add(
            "bloomed"
        );


        buttonText.textContent =
            "Para vos, Pia 💛";


        /*
            Primera explosión de partículas
        */

        createFlowerExplosion();


        /*
            Segunda explosión ligeramente después
            para acompañar la apertura de los pétalos.
        */

        setTimeout(() => {

            createFlowerExplosion();

        }, 800);


        /*
            Cuando terminó gran parte de la animación,
            bajamos suavemente hasta la dedicatoria.
        */

        setTimeout(() => {

            document
                .getElementById(
                    "messageCard"
                )
                .scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

        }, 2300);

    }

    /*
        Si ya floreció y vuelve a tocar el botón,
        simplemente aparecen nuevas partículas.
    */

    else {

        createFlowerExplosion();

    }

}


/* =========================================================
   EVENTOS
========================================================= */

/*
    IMPORTANTE:

    La única forma de ejecutar bloomFlower()
    es presionando este botón.

    Ya NO existe ningún temporizador automático.
*/

magicButton.addEventListener(
    "click",
    bloomFlower
);


/* ==========================================================
   INICIALIZACIÓN
========================================================= */

createStars();


/* =========================================================
   PARTÍCULAS FLOTANTES

   El intervalo existe desde el comienzo,
   pero createFloatingHeart() verifica "bloomed".

   Por lo tanto, mientras Pia no pulse el botón,
   no aparece ningún corazón flotante.
========================================================= */

setInterval(
    createFloatingHeart,
    900
);


/* =========================================================
   NO HAY FLORECIMIENTO AUTOMÁTICO

   La flor permanecerá cerrada indefinidamente
   hasta que se presione "Hacer florecer".
========================================================= */