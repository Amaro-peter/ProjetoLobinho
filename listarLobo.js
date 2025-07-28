window.addEventListener("DOMContentLoaded", function () {
  function loadWolves() {
    if (!localStorage.getItem("wolves")) {
      fetch("./data/lobinhos.json")
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

  let wolves = loadWolves();
  if (!wolves) return;

  let page = 1;
  const perPage = 4;
  let nameFilter = "";
  let showAdopted = false;

  function filterWolves() {
    let filtered = wolves;
    if (showAdopted) {
      filtered = filtered.filter(w => w.adotado);
    }
    if (nameFilter) {
      filtered = filtered.filter(w => w.nome.toLowerCase().startsWith(nameFilter.toLowerCase()));
    }
    return filtered;
  }

  function renderPagination(totalPages) {
    const pagDiv = document.getElementById("pagination");
    pagDiv.innerHTML = "";

    const prev = document.createElement("span");
    prev.innerText = "<<";
    prev.style.cursor = page > 1 ? "pointer" : "default";
    prev.style.marginRight = "8px";
    prev.onclick = () => {
      if (page > 1) {
        page--;
        renderWolves();
      }
    };
    pagDiv.appendChild(prev);

    let start = 1;
    let end = Math.min(totalPages, 5);

    if (page > 3 && totalPages > 5) {
      start = page - 2;
      end = page + 2;
      if (end > totalPages) {
        end = totalPages;
        start = Math.max(1, end - 4);
      }
    }

    for (let i = start; i <= end; i++) {
      const btn = document.createElement("button");
      btn.innerText = i;
      btn.className = "pageBtn";
      btn.style.margin = "0 2px";
      if (i === page) {
        btn.style.fontWeight = "bold";
        btn.disabled = true;
      }
      btn.onclick = () => {
        page = i;
        renderWolves();
      };
      pagDiv.appendChild(btn);
    }

    if (end < totalPages) {
      const ellipsis = document.createElement("span");
      ellipsis.innerText = " ... ";
      pagDiv.appendChild(ellipsis);
    }

    const next = document.createElement("span");
    next.innerText = ">>";
    next.style.cursor = page < totalPages ? "pointer" : "default";
    next.style.marginLeft = "8px";
    next.onclick = () => {
      if (page < totalPages) {
        page++;
        renderWolves();
      }
    };
    pagDiv.appendChild(next);
  }

  function renderWolves() {
    const filteredWolves = filterWolves();
    const startIdx = (page - 1) * perPage;
    const wolvesPage = filteredWolves.slice(startIdx, startIdx + perPage);

    for (let i = 0; i < perPage; i++) {
      const card = document.getElementById("wolf" + i);
      if (wolvesPage[i]) {
        const wolf = wolvesPage[i];
        card.style.display = "";
        document.getElementById("image" + i).src = wolf.imagem;
        document.getElementById("name" + i).innerText = wolf.nome;
        document.getElementById("age" + i).innerText = `Idade: ${wolf.idade} anos`;
        document.getElementById("desc" + i).innerText = wolf.descricao;
        const btn = document.getElementById("status" + i);
        btn.className = "adoptBtn" + (wolf.adotado ? " adopted" : "");
        btn.innerText = wolf.adotado ? "Adotado" : "Adotar";
        btn.disabled = wolf.adotado;
        btn.style.backgroundColor = wolf.adotado ? "#deba59" : "#7aac3a";
        btn.onclick = () => {
          if (!wolf.adotado) {
            localStorage.setItem("selectedWolf", JSON.stringify(wolf));
            window.location.href = "./mostrarLobo.html"; // Corrigido aqui
          }
        };
      } else {
        card.style.display = "none";
      }
    }

    const total = Math.max(1, Math.ceil(filteredWolves.length / perPage));
    renderPagination(total);
  }

  document.getElementById("adoptedCheckbox").addEventListener("change", (e) => {
    showAdopted = e.target.checked;
    page = 1;
    renderWolves();
  });

  document.getElementById("search").addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      nameFilter = e.target.value.trim();
      page = 1;
      renderWolves();
    }
  });

  document.getElementById("addWolf").addEventListener("click", () => {
    window.location.href = "./addLoboPage.html";
  });

  renderWolves();
});