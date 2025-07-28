document.addEventListener("DOMContentLoaded", function () {
    let wolvesList = localStorage.getItem("wolves");
    let wolves = [];
    if (wolvesList) {
        wolves = JSON.parse(wolvesList);
    }

    const saveButton = document.querySelector(".btnSave");

    function addWolf() {
        let name = document.querySelector("#inputWolfName").value;
        let age = document.querySelector("#inputWolfAge").value;
        let imageLink = document.querySelector("#inputPhotoLink").value;
        let description = document.querySelector("#textareaDescription").value;

        let maxId = wolves.length > 0 ? Math.max(...wolves.map(w => w.id)) : 0;

        let newWolf = {
            id: maxId + 1,
            nome: name,
            idade: Number(age),
            descricao: description,
            imagem: imageLink,
            adotado: false
        };

        wolves.unshift(newWolf);
        localStorage.setItem("wolves", JSON.stringify(wolves));
    }

    saveButton.addEventListener("click", () => {
        let name = document.querySelector("#inputWolfName").value;
        let age = document.querySelector("#inputWolfAge").value;
        let imageLink = document.querySelector("#inputPhotoLink").value;
        let description = document.querySelector("#textareaDescription").value;

        if (!name || !age || !imageLink || !description) {
            alert("Por favor, preencha todos os campos.");
        } else {
            addWolf();
            document.querySelector("#inputWolfName").value = "";
            document.querySelector("#inputWolfAge").value = "";
            document.querySelector("#inputPhotoLink").value = "";
            document.querySelector("#textareaDescription").value = "";
            alert("Lobinho adicionado com sucesso!");
        }
    });
}); 
