console.log('--- admin-script.js: Iniciado carregamento ---');

// Remova a linha de importação. Toastify já estará disponível globalmente.
// Se você ABSOLUTAMENTE precisa importar como módulo, a sintaxe seria:
// import * as Toastify from 'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.js';
// Mas para a maioria dos casos de uso, ele já estará em window.Toastify.

// Elementos do formulário
const addItemForm = document.getElementById('addItemForm');
const itemNomeInput = document.getElementById('itemNome');
const itemDescricaoInput = document.getElementById('itemDescricao');
const itemPrecoInput = document.getElementById('itemPreco');
const itemImagemInput = document.getElementById('itemImagem');
const itemAltInput = document.getElementById('itemAlt');
const itemTipoSelect = document.getElementById('itemTipo');
const cardapioList = document.getElementById('cardapioList');

// Carregar dados do localStorage ou usar arrays vazios se não houver
let produtos = JSON.parse(localStorage.getItem('produtosCardapio')) || [];
let bebidas = JSON.parse(localStorage.getItem('bebidasCardapio')) || [];

// Função para salvar os dados no localStorage
function saveCardapio() {
    localStorage.setItem('produtosCardapio', JSON.stringify(produtos));
    localStorage.setItem('bebidasCardapio', JSON.stringify(bebidas));
}

// Função para renderizar os itens na lista administrativa
function renderCardapioList() {
    cardapioList.innerHTML = ''; // Limpa a lista antes de renderizar
    
    [...produtos, ...bebidas].forEach((item, index) => {
        const itemType = produtos.includes(item) ? 'produto' : 'bebida';
        const listItem = document.createElement('div');
        listItem.classList.add('flex', 'items-center', 'justify-between', 'bg-gray-50', 'p-3', 'rounded-md', 'shadow-sm', 'border-b', 'border-gray-200');
        
        listItem.innerHTML = `
            <div class="flex-1">
                <p class="font-bold text-lg">${item.nome} <span class="text-sm text-gray-500">(${itemType === 'produto' ? 'Pastel' : 'Bebida'})</span></p>
                <p class="text-sm text-gray-600">${item.descricao || 'Sem descrição'}</p>
                <p class="text-md font-semibold text-purple-700">R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
            </div>
            <button class="remove-item-btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-4" 
                    data-type="${itemType}" data-index="${index}" aria-label="Remover ${item.nome}">
                Remover
            </button>
        `;
        cardapioList.appendChild(listItem);
    });
}

// Event Listener para adicionar novo item
addItemForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const newItem = {
        nome: itemNomeInput.value,
        descricao: itemDescricaoInput.value,
        preco: parseFloat(itemPrecoInput.value),
        imagem: itemImagemInput.value || './assets/fallback.jpg', // Fallback para imagem
        alt: itemAltInput.value || itemNomeInput.value,
    };
    const itemType = itemTipoSelect.value;

    if (itemType === 'produto') {
        produtos.push(newItem);
    } else if (itemType === 'bebida') {
        bebidas.push(newItem);
    } else {
        Toastify({
            text: "Por favor, selecione um tipo válido (Pastel ou Bebida).",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            style: { background: "#f97316" }, // Laranja
        }).showToast();
        return;
    }

    saveCardapio(); // Salva as alterações no localStorage
    renderCardapioList(); // Atualiza a lista na página
    addItemForm.reset(); // Limpa o formulário

    Toastify({
        text: `${newItem.nome} adicionado ao cardápio!`,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: { background: "#16a34a" }, // Verde
    }).showToast();
});

// Event Listener para remover item (delegação de eventos)
cardapioList.addEventListener('click', function(event) {
    const removeBtn = event.target.closest('.remove-item-btn');
    if (removeBtn) {
        const type = removeBtn.dataset.type;
        const indexToRemove = parseInt(removeBtn.dataset.index);
        
        let removedItemName = '';

        if (type === 'produto') {
            removedItemName = produtos[indexToRemove].nome;
            produtos.splice(indexToRemove, 1);
        } else if (type === 'bebida') {
            removedItemName = bebidas[indexToRemove].nome;
            bebidas.splice(indexToRemove, 1);
        }
        
        saveCardapio();
        renderCardapioList(); // Re-renderiza para atualizar os índices
        
        Toastify({
            text: `${removedItemName} removido do cardápio.`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            style: { background: "#ef4444" }, // Vermelho
        }).showToast();
    }
});

// Renderizar a lista inicial quando a página carrega
document.addEventListener('DOMContentLoaded', renderCardapioList);