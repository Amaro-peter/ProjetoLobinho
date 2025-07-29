function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setWolfCard(index, wolf) {
    const img = document.getElementById(`image${index}`);
    if (img) {
        img.src = wolf.imagem && wolf.imagem.trim() !== "" ? wolf.imagem : "./assets/lobinhoImage.png";
        img.onerror = function () {
            this.onerror = null;
            this.src = "./assets/lobinhoImage.png";
        };
    }
    const name = document.getElementById(`name${index}`);
    if (name) name.textContent = wolf.nome || "Nome não informado";
    const age = document.getElementById(`age${index}`);
    if (age) age.textContent = wolf.idade ? `Idade: ${wolf.idade} anos` : "Idade não informada";
    const desc = document.getElementById(`desc${index}`);
    if (desc) desc.textContent = wolf.descricao || "Descrição não informada.";
}

function renderExampleWolves() {
    let wolves = [];
    const storageKey = "wolves";
    if (localStorage.getItem(storageKey)) {
        try {
            wolves = JSON.parse(localStorage.getItem(storageKey));
        } catch (e) {
            localStorage.removeItem(storageKey);
            window.location.reload();
            return;
        }
    } else {
        fetch("./data/lobinhos.json")
            .then(res => res.json())
            .then(data => {
                localStorage.setItem(storageKey, JSON.stringify(data));
                window.location.reload();
            })
            .catch(() => {
                setWolfCard(0, {});
                setWolfCard(1, {});
            });
        return;
    }

    if (!Array.isArray(wolves) || wolves.length < 2) {
        setWolfCard(0, {});
        setWolfCard(1, {});
        return;
    }

    let idx1 = getRandomInt(0, wolves.length - 1);
    let idx2;
    do {
        idx2 = getRandomInt(0, wolves.length - 1);
    } while (idx2 === idx1);

    setWolfCard(0, wolves[idx1]);
    setWolfCard(1, wolves[idx2]);
}

window.addEventListener("DOMContentLoaded", renderExampleWolves);