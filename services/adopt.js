const urlParams = new URLSearchParams(window.location.search)
const id = parseInt(urlParams.get('id'))

const wolfTitle = document.getElementById('wolf-title');
const wolfId = document.getElementById('wolf-id');
const adoptForm = document.getElementById('adopt-form');

function loadWolves() {
    if (!localStorage.getItem("wolves")) {
        fetch("../data/lobinhos.json")
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("wolves", JSON.stringify(data));
                window.location.reload();
            })
            .catch(err => console.error("Erro ao carregar lobinhos.json:", err));
        return null;
    } else {
        return JSON.parse(localStorage.getItem("wolves"));
    }
}

const wolves = loadWolves();
const wolf = wolves.find((wolf) => wolf.id === id);

if (wolf) {
    wolfTitle.textContent = `Adote o(a) ${wolf.nome}`;
    wolfId.textContent = `ID: ${wolf.id}`;

    adoptForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (wolf.adotado) {
            alert(`O lobo ${wolf.nome} já foi adotado!`);
            return;
        }

        const nomeDono = document.getElementById('user-name').value;
        const idadeDono = parseInt(document.getElementById('user-age').value);
        const emailDono = document.getElementById('user-email').value;

        if (!nomeDono || !idadeDono || !emailDono) {
            alert('Por favor, preencha todos os campos do formulário.');
            return;
        }

        wolf.adotado = true;
        wolf.nomeDono = nomeDono;
        wolf.idadeDono = idadeDono;
        wolf.emailDono = emailDono;

        const updatedWolves = wolves.map(w => w.id === id ? wolf : w);
        localStorage.setItem('wolves', JSON.stringify(updatedWolves));

        alert(`Parabéns! O lobo ${wolf.nome} foi adotado com sucesso!`);
        adoptForm.reset();
        window.location.href=`adopt.html?id=${id}`
    });
} else {
    console.error("Lobo não encontrado!");
}