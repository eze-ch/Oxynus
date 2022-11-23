const modalIndex = document.querySelector("#ind-modal");
const openModalIndex = document.querySelector("#indLogoCircle");
const closeModalIndex = document.querySelector("#buttonClose-indModal");


openModalIndex.addEventListener("click", () => {
    modalIndex.classList.add("active");
    console.log("Abrir");
}) 

closeModalIndex.addEventListener("click", () => {
    modalIndex.classList.remove("active");
    console.log("Cerrar");
})
