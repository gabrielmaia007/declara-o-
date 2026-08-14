const paginas = document.querySelectorAll(".pagina");

const numero = document.getElementById("numero");

let atual = 0;


/* =========================
   VIRAR PÁGINA
========================= */

function proxima() {

    if (atual >= paginas.length - 1) {
        return;
    }

    /* Página atual vira */

    paginas[atual]
        .classList
        .remove("ativa");

    paginas[atual]
        .classList
        .add("virada");


    /* Avança */

    atual++;


    /* Mostra próxima página */

    paginas[atual]
        .classList
        .remove("esperando");

    paginas[atual]
        .classList
        .add("ativa");


    /* Atualiza contador */

    numero.textContent =
        atual + 1;


    /* Explosão de corações */

    criarCoracoes();
}


/* =========================
   RECOMEÇAR
========================= */

function reiniciar() {

    paginas.forEach(
        pagina => {

            pagina.classList.remove(
                "ativa",
                "virada"
            );

            pagina.classList.add(
                "esperando"
            );

        }
    );


    atual = 0;


    paginas[0]
        .classList
        .remove("esperando");

    paginas[0]
        .classList
        .add("ativa");


    numero.textContent = "1";
}


/* =========================
   CRIAR CORAÇÃO
========================= */

function criarCoracao() {

    const coracao =
        document.createElement("div");


    coracao.className =
        "flutuante";


    coracao.textContent =
        "♥";


    coracao.style.left =
        Math.random() * 100 + "vw";


    coracao.style.fontSize =
        (Math.random() * 25 + 12) + "px";


    document.body.appendChild(
        coracao
    );


    setTimeout(() => {

        coracao.remove();

    }, 5000);
}


/* =========================
   VÁRIOS CORAÇÕES
========================= */

function criarCoracoes() {

    for (
        let i = 0;
        i < 8;
        i++
    ) {

        setTimeout(
            criarCoracao,
            i * 100
        );

    }
}


/* =========================
   CORAÇÕES AUTOMÁTICOS
========================= */

setInterval(() => {

    criarCoracao();

}, 1800);


/* =========================
   TECLADO
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "ArrowRight" ||
            event.key === "Enter"
        ) {

            proxima();

        }

    }
);


/* =========================
   ESTRELAS
========================= */

for (
    let i = 0;
    i < 35;
    i++
) {

    const estrela =
        document.createElement("div");


    estrela.className =
        "estrela";


    estrela.style.left =
        Math.random() * 100 + "vw";


    estrela.style.top =
        Math.random() * 100 + "vh";


    estrela.style.animationDelay =
        Math.random() * 3 + "s";


    document.body.appendChild(
        estrela
    );
}
