let wolvesList = JSON.parse(localStorage.getItem("wolves") || "[]");
let wolfId = Number(localStorage.getItem("id"));

const imgWolf = document.querySelector(".wolf-image");
const title = document.querySelector("#wolf-title");
const idText = document.querySelector("#wolf-id");
const form = document.querySelector("#adopt-form");

const wolf = wolvesList.find(w => w.id === wolfId);

if (wolf && wolf.imagem) {
    imgWolf.src = wolf.imagem;
} else {
    imgWolf.src = localStorage.getItem("imagem");
}

title.textContent = "Adote o(a) " + (wolf ? wolf.nome : localStorage.getItem("nome"));
idText.textContent = "ID: " + wolfId;

function adoptWolf(event) {
    event.preventDefault();

    const name = document.querySelector("#user-name").value.trim();
    const age = document.querySelector("#user-age").value.trim();
    const email = document.querySelector("#user-email").value.trim();

    if (!name || !age || !email) {
        alert("Você esqueceu de preencher algum campo");
        return;
    }

    if (wolf) {
        wolf.nomeDono = name;
        wolf.idadeDono = age;
        wolf.emailDono = email;
        wolf.adotado = true;
        localStorage.setItem("wolves", JSON.stringify(wolvesList));
    }

    form.reset();
    window.location.href = "./nossosLobinhos.html";
}

form.addEventListener("submit", adoptWolf);