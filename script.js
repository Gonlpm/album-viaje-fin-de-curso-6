const fotos = [
    "IMG-20260626-WA0008.jpg",
    "IMG-20260626-WA0013.jpg",
    "IMG-20260626-WA0033.jpg",
    "IMG-20260626-WA0035.jpg",
    "PXL_20260622_094042221.jpg",
    "PXL_20260623_060513918.jpg",
    "PXL_20260623_083020642.jpg",
    "PXL_20260623_083021630.jpg",
    "PXL_20260623_190356901.jpg",
    "PXL_20260623_190435262.jpg",
    "PXL_20260624_093000889.jpg",
    "PXL_20260625_145654541.jpg",
    "PXL_20260625_145655334.jpg",
    "PXL_20260625_145658607.jpg",
    "PXL_20260626_090825299.jpg",
    "Screenshot_20260622-151712~2.png"
];

const galeria = document.getElementById("galeria");
const numeroFotos = document.getElementById("numeroFotos");

const visor = document.getElementById("visor");
const fotoGrande = document.getElementById("fotoGrande");
const contador = document.getElementById("contador");

const cerrar = document.getElementById("cerrar");
const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");

let fotoActual = 0;

numeroFotos.textContent = fotos.length;

fotos.forEach((nombre, indice) => {

    const img = document.createElement("img");

    img.src = "./" + nombre;
    img.alt = "Foto " + (indice + 1);

    img.addEventListener("click", () => {
        abrirVisor(indice);
    });

    galeria.appendChild(img);
});

function abrirVisor(indice) {

    fotoActual = indice;

    fotoGrande.src = "./" + fotos[fotoActual];

    contador.textContent =
        (fotoActual + 1) + " / " + fotos.length;

    visor.classList.add("activo");
}

function cerrarVisor() {
    visor.classList.remove("activo");
}

cerrar.addEventListener("click", cerrarVisor);

siguiente.addEventListener("click", () => {

    fotoActual++;

    if (fotoActual >= fotos.length) {
        fotoActual = 0;
    }

    fotoGrande.src = "./" + fotos[fotoActual];

    contador.textContent =
        (fotoActual + 1) + " / " + fotos.length;
});

anterior.addEventListener("click", () => {

    fotoActual--;

    if (fotoActual < 0) {
        fotoActual = fotos.length - 1;
    }

    fotoGrande.src = "./" + fotos[fotoActual];

    contador.textContent =
        (fotoActual + 1) + " / " + fotos.length;
});

visor.addEventListener("click", (e) => {

    if (e.target === visor) {
        cerrarVisor();
    }
});

document.addEventListener("keydown", (e) => {

    if (!visor.classList.contains("activo")) {
        return;
    }

    if (e.key === "ArrowRight") {
        siguiente.click();
    }

    if (e.key === "ArrowLeft") {
        anterior.click();
    }

    if (e.key === "Escape") {
        cerrarVisor();
    }
});

let inicioX = 0;

visor.addEventListener("touchstart", (e) => {
    inicioX = e.touches[0].clientX;
});

visor.addEventListener("touchend", (e) => {

    const finalX = e.changedTouches[0].clientX;
    const diferencia = finalX - inicioX;

    if (Math.abs(diferencia) < 50) {
        return;
    }

    if (diferencia < 0) {
        siguiente.click();
    } else {
        anterior.click();
    }
});
