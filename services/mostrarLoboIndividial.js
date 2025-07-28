const imageElement = document.getElementById("image");
const nameElement = document.getElementById("name");
const descriptionElement = document.getElementById("description");

const selectedWolf = localStorage.getItem("selectedWolf");
const wolf = selectedWolf ? JSON.parse(selectedWolf) : null;

if (wolf) {
    imageElement.src = wolf.imagem || "./assets/lobinhoImage.png";
    nameElement.textContent = wolf.nome || "WolfName";
    descriptionElement.textContent = wolf.descricao || "";
}

document.getElementById("adopt").addEventListener("click", () => {
    if (wolf) {
        localStorage.setItem("id", wolf.id);
    }
    window.location.href = "./adopt.html";
});

document.getElementById("delete").addEventListener("click", () => {
    if (wolf) {
        const storedList = localStorage.getItem("wolves");
        let wolfList = storedList ? JSON.parse(storedList) : [];
        wolfList = wolfList.filter(w => w.id !== wolf.id);
        localStorage.setItem("wolves", JSON.stringify(wolfList));
    }
    window.location.href = "./nossosLobinhos.html";
});