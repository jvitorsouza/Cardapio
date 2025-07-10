/*
export const produtos = [
    {
        nome: "Pastel de Carne de Sol",
        descricao: "Massa crocante recheada com carne de sol desfiada, refogada com temperos frescos.",
        preco: 11.00,
        imagem: "./assets/pastelcarne.avif",
        alt: "Pastel de Carne"
    },
    {
        nome: "Pastel de Frango",
        descricao: "Delicioso pastel frito, com massa crocante e recheio suculento de frango desfiado.",
        preco: 10.00,
        imagem: "./assets/pastelfrango.jpg",
        alt: "Pastel de Frango"
    },
    {
        nome: "Pastel de Queijo",
        descricao: "Massa crocante com recheio generoso de queijo muçarela derretido, perfeito para os amantes de queijo!",
        preco: 9.00,
        imagem: "./assets/pastelqueijo.png",
        alt: "Pastel de Queijo"
    },
    {
        nome: "Pastel de Queijo", // Item duplicado, considere usar IDs únicos se for o caso
        descricao: "Massa crocante com recheio generoso de queijo muçarela derretido, perfeito para os amantes de queijo!",
        preco: 9.00,
        imagem: "./assets/pastelqueijo.png",
        alt: "Pastel de Queijo"
    }
];
export const bebidas = [
    {
        nome: "Refrigerante Coca lata",
        descricao: "Geladinha",
        preco: 5.00,
        imagem: "./assets/refri-1.png",
        alt: "coca lata"
    },
    {
        nome: "Refrigerante Guarana",
        descricao: "Geladinha",
        preco: 5.00,
        imagem: "./assets/refri-2.png",
        alt: "guarana"
    }
];
*/
// Remova as declarações diretas de 'produtos' e 'bebidas' se você vai carregá-las do localStorage
// export const produtos = [...];
// export const bebidas = [...];

// No seu script.js principal, no início do arquivo:
let produtos = JSON.parse(localStorage.getItem('produtosCardapio')) || [
    // Se não houver nada no localStorage, defina alguns produtos padrão aqui
    // Ex: { nome: "Pastel de Carne de Sol", descricao: "...", preco: 11.00, imagem: "./assets/pastelcarne.avif", alt: "Pastel de Carne" },
];
let bebidas = JSON.parse(localStorage.getItem('bebidasCardapio')) || [
    // Ex: { nome: "Refrigerante Coca lata", descricao: "...", preco: 5.00, imagem: "./assets/refri-1.png", alt: "coca lata" },
];

// As funções renderizarProdutos() e renderizarBebidas() permanecem as mesmas
// pois elas já usam as variáveis globais 'produtos' e 'bebidas'.

// ... (Restante do seu script.js permanece igual) ...

// Função para renderizar todos os produtos
export function renderizarProdutos() {
    const container = document.getElementById('produtos');
    if (!container) {
        console.error("Elemento 'produtos' não encontrado. Verifique seu HTML.");
        return;
    }
    let produtosHTML = '';
    produtos.forEach(produto => {
        produtosHTML += `
            <div class="flex gap-2">
                <img 
                    src="${produto.imagem || './assets/fallback.jpg'}" 
                    alt="${produto.alt}"
                    class="w-28 h-28 rounded-md hover:scale-110 hover:-rotate-2 duration-300"
                />
                <div>
                    <p class="font-bold">${produto.nome}</p>
                    <p class="text-sm">${produto.descricao}</p>
                    <div class="flex items-center gap-2 justify-between mt-3">
                        <p class="font-bold text-lg">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
                        <button 
                            class="bg-gray-900 px-5 rounded add-to-cart-btn"
                            data-name="${produto.nome}"
                            data-price="${produto.preco}"
                            aria-label="Adicionar ${produto.nome} ao carrinho"
                        >
                            <i class="fa fa-cart-plus text-lg text-white"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = produtosHTML;
}

// Função para renderizar todas as bebidas
export function renderizarBebidas() {
    const containerBebidas = document.getElementById('bebidas');
    if (!containerBebidas) {
        console.error("Elemento 'bebidas' não encontrado. Verifique seu HTML.");
        return;
    }
    let bebidasHTML = '';
    bebidas.forEach(bebida => { // Renomeado 'bebidas' para 'bebida' no loop para clareza
        bebidasHTML += `
            <div class="flex gap-2">
                <img 
                    src="${bebida.imagem || './assets/fallback.jpg'}" 
                    alt="${bebida.alt}"
                    class="w-28 h-28 rounded-md hover:scale-110 hover:-rotate-2 duration-300"
                />
                <div>
                    <p class="font-bold">${bebida.nome}</p>
                    <p class="text-sm">${bebida.descricao}</p>
                    <div class="flex items-center gap-2 justify-between mt-3">
                        <p class="font-bold text-lg">R$ ${bebida.preco.toFixed(2).replace('.', ',')}</p>
                        <button 
                            class="bg-gray-900 px-5 rounded add-to-cart-btn"
                            data-name="${bebida.nome}"
                            data-price="${bebida.preco}"
                            aria-label="Adicionar ${bebida.nome} ao carrinho"
                        >
                            <i class="fa fa-cart-plus text-lg text-white"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    containerBebidas.innerHTML = bebidasHTML;
}

// Renderizar produtos iniciais assim que o script é carregado
renderizarProdutos();
renderizarBebidas();

// Variáveis de elementos HTML (melhor verificar se existem para evitar null)
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const CloseModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

let cart = [];
window.cart = cart; // Deixa o carrinho acessível no console do navegador

// --- Event Listeners ---

// Abrir o modal do carrinho
if (cartBtn) {
    cartBtn.addEventListener("click", function() {
        updateCartModal(); // Atualiza o modal ao abrir
        cartModal.style.display = "flex";
    });
}

// Fechar o modal quando clicar fora dele
if (cartModal) {
    cartModal.addEventListener("click", function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = "none";
        }
    });
}

// Fechar o modal no botão de fechar
if (CloseModalBtn) {
    CloseModalBtn.addEventListener("click", function() {
        cartModal.style.display = "none";
    });
}

// Delegação de eventos para adicionar itens ao carrinho (em qualquer botão .add-to-cart-btn)
document.addEventListener("click", function(event) {
    let parentButton = event.target.closest(".add-to-cart-btn");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        addToCart(name, price);

        Toastify({ // Notificação de sucesso
            text: `${name} adicionado ao carrinho!`,
            duration: 2000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#16a34a", // Tailwind green-600
            },
        }).showToast();
    }
});

// --- Funções do Carrinho ---

// Função para adicionar o item ao carrinho
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        });
    }
    updateCartModal(); // Atualiza o modal sempre após adicionar
}

// Atualiza o conteúdo e total do carrinho
function updateCartModal() {
    if (!cartItemsContainer || !cartTotal || !cartCounter) {
        console.error("Um ou mais elementos do carrinho não foram encontrados. Verifique os IDs no HTML.");
        return; // Sai da função para evitar erros
    }

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col", "border-b", "pb-2"); // Adicionado border-b e pb-2

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between w-full">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                </div>
                <button class="remove-from-cart-btn bg-red-500 text-white px-2 py-1 rounded text-xs" data-name="${item.name}">
                    Remover
                </button>
            </div>
        `;
        total += item.price * item.quantity;
        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length; // Ou a soma das quantidades: cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Função para remover o item do carrinho
if (cartItemsContainer) { // Adicionar verificação para cartItemsContainer
    cartItemsContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("remove-from-cart-btn")) {
            const name = event.target.getAttribute("data-name");
            removeItemCart(name);
            Toastify({ // Notificação de remoção
                text: `${name} removido do carrinho.`,
                duration: 2000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#ef4444", // Cor vermelha para remoção
                },
            }).showToast();
        }
    });
}

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        const item = cart[index];

        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart.splice(index, 1); // Remove o item completamente do array
        }
        updateCartModal(); // Atualiza o modal após a remoção ou ajuste de quantidade
    }
}

// --- Checkout e Validação ---

if (addressInput) { // Adicionar verificação para addressInput
    addressInput.addEventListener("input", function(event) {
        let inputValue = event.target.value;
        if (inputValue !== "") {
            addressInput.classList.remove("border-red-500");
            if (addressWarn) { // Verificar se addressWarn existe
                addressWarn.classList.add("hidden");
            }
        }
    });
}

if (checkoutBtn) { // Adicionar verificação para checkoutBtn
    checkoutBtn.addEventListener("click", function() {
        const isOpen = checkRestaurantOpen();
        if (!isOpen) {
            Toastify({
                text: "Ops! O restaurante está fechado no momento. Nosso horário: Sex, Sáb, Dom - 18:00 às 22:00.",
                duration: 4000, // Aumentar duração para mensagem mais longa
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#ef4444",
                },
            }).showToast();
            return;
        }

        if (cart.length === 0) {
            Toastify({
                text: "Seu carrinho está vazio. Adicione itens para fazer um pedido!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#ef4444",
                },
            }).showToast();
            return;
        }

        if (addressInput.value === "") {
            if (addressWarn) { // Verificar se addressWarn existe
                addressWarn.classList.remove("hidden");
            }
            addressInput.classList.add("border-red-500");
            Toastify({
                text: "Por favor, digite seu endereço completo.",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#f97316", // Cor laranja para aviso
                },
            }).showToast();
            return;
        }

        // Enviar o pedido para whatsapp
        const cartItemsText = cart.map((item) => {
            return `*${item.name}* Qtd: (${item.quantity}) Preço: R$${(item.price * item.quantity).toFixed(2).replace('.', ',')}`;
        }).join("\n"); // Usar "\n" para que cada item fique em uma nova linha no WhatsApp

        const totalOrder = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const message = encodeURIComponent(
            `*NOVO PEDIDO:*\n\n${cartItemsText}\n\n*Total: R$${totalOrder.toFixed(2).replace('.', ',')}*\nEndereço: ${addressInput.value}\n\nObrigado pela preferência!`
        );
        const phone = "5584987170217"; // Seu número de telefone

        window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

        cart.length = 0; // Limpa o carrinho
        updateCartModal(); // Atualiza o modal após o pedido
        addressInput.value = ""; // Limpa o campo de endereço
        addressInput.classList.remove("border-red-500"); // Remove a borda vermelha
        if (addressWarn) { // Verificar se addressWarn existe
            addressWarn.classList.add("hidden"); // Esconde o aviso
        }
    });
}

// --- Verificação de Horário de Funcionamento ---

// Função para verificar se o restaurante está aberto (dia e hora)
function checkRestaurantOpen() {
    const data = new Date();
    const diaDaSemana = data.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    const hora = data.getHours();

    // Verificar se é Sexta (5), Sábado (6) ou Domingo (0)
    const isWorkingDay = (diaDaSemana === 5 || diaDaSemana === 6 || diaDaSemana === 0);

    // Verificar o horário de funcionamento (18:00 às 22:00)
    const isWorkingHours = (hora >= 18 && hora < 22); // Das 18:00 até 21:59

    return isWorkingDay && isWorkingHours;
}

// Atualiza o status de "aberto/fechado" no cabeçalho
const spanItem = document.getElementById("date-span");

if (spanItem) { // Verifique se o elemento existe
    const isOpenNow = checkRestaurantOpen();
    const data = new Date();
    const diaSemanaAtual = data.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado

    let displayText = "";
    // Nomes dos dias da semana para display
    const daysOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    if (isOpenNow) {
        spanItem.classList.remove("bg-red-500");
        spanItem.classList.add("bg-green-600");
        displayText = `Estamos abertos! Hoje: ${daysOfWeek[diaSemanaAtual]} - 18:00 às 22:00`;
    } else {
        spanItem.classList.remove("bg-green-600");
        spanItem.classList.add("bg-red-500");
        // Ajuste a mensagem para informar quando abre se estiver fechado
        if (diaSemanaAtual === 5 && data.getHours() < 18) { // Sexta antes das 18h
             displayText = "Abre hoje às 18:00 (Sexta)";
        } else if (diaSemanaAtual === 6 && data.getHours() < 18) { // Sábado antes das 18h
            displayText = "Abre hoje às 18:00 (Sábado)";
        } else if (diaSemanaAtual === 0 && data.getHours() < 18) { // Domingo antes das 18h
            displayText = "Abre hoje às 18:00 (Domingo)";
        } else if (diaSemanaAtual < 5 || diaSemanaAtual === 1 || diaSemanaAtual === 2 || diaSemanaAtual === 3 || diaSemanaAtual === 4) { // De Segunda a Quinta
            displayText = "Fechado (Abre Sex, Sáb, Dom - 18:00 às 22:00)";
        } else { // Fechado mas já passou o horário
            displayText = "Fechado (Abre amanhã ou na próxima Sexta às 18:00)";
        }
    }
    spanItem.querySelector('span').textContent = displayText;
}