
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
        nome: "Pastel de Queijo",
        descricao: "Massa crocante com recheio generoso de queijo muçarela derretido, perfeito para os amantes de queijo!",
        preco: 9.00,
        imagem: "./assets/pastelqueijo.png",
        alt: "Pastel de Queijo"
      }
    ];
    export const bebidas =[
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

    /*
    const formProduto = document.getElementById('form-produto');

    const containerBebidas = document.getElementById('bebidas');
    const formBebidas = document.getElementById('form-bebidas');
*/
    // Função para renderizar todos os produtos
   export function renderizarProdutos() {
      const container = document.getElementById('produtos');
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


// Função para renderizar todos as bibidas
    export function renderizarBebidas() {
      const containerBebidas = document.getElementById('bebidas');
      let bebidasHTML = '';
      bebidas.forEach(bebidas => {
        bebidasHTML += `
  <div class="flex gap-2">
    <img 
      src="${bebidas.imagem || './assets/fallback.jpg'}" 
      alt="${bebidas.alt}"
      class="w-28 h-28 rounded-md hover:scale-110 hover:-rotate-2 duration-300"
    />
    <div>
      <p class="font-bold">${bebidas.nome}</p>
      <p class="text-sm">${bebidas.descricao}</p>
      <div class="flex items-center gap-2 justify-between mt-3">
        <p class="font-bold text-lg">R$ ${bebidas.preco.toFixed(2).replace('.', ',')}</p>
        <button 
          class="bg-gray-900 px-5 rounded add-to-cart-btn"
          data-name="${bebidas.nome}"
          data-price="${bebidas.preco}"
          aria-label="Adicionar ${bebidas.nome} ao carrinho"
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


    // Renderizar produtos iniciais
    renderizarProdutos();
    renderizarBebidas();


const menu = document.getElementById("menu")
//const bebidas = document.getElementById("bebidas")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const CloseModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")
let cart = [];
window.cart = cart;

//Abrir o modal do carrinho
cartBtn.addEventListener("click", function(){
  updateCartModal();
  cartModal.style.display = "flex"
  
})

// Fechar o modal quando clicar fora
cartModal.addEventListener("click", function(event){
  if(event.target === cartModal){
    cartModal.style.display = "none"
  }
})

CloseModalBtn.addEventListener("click", function(){
  cartModal.style.display = "none"
})

menu.addEventListener("click", function(event){
  //console.log(event.target)

  let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
      const name = parentButton.getAttribute("data-name")
      const price = parseFloat(parentButton.getAttribute("data-price"))
      addToCart(name,price)
      // adicionar no carrinho
    }
})

//função para adicionar o carrinho

function addToCart (name, price){
  
  const existingItem = cart.find( item => item.name === name)

  if(existingItem){
    // se item ja existe, aumente apenas a quantidade +1
    existingItem.quantity += 1;
    
  }else{
    cart.push({
    name,
    price,
    quantity: 1,
  })
  }

  updateCartModal()
}

  

// Atualiza carrinho
function updateCartModal(){
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item =>{
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")
    cartItemElement.innerHTML = `
    <div class="flex items-center justify-between">
      <div>
        <div>
          <p class = "font-medium">${item.name}</p>
          <p> Qtd: ${item.quantity}</p>
          <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
        </div>

        <button class="remove-from-cart-btn" data-name="${item.name}">
            Remover
          </button>

      </div>

    `
    total += item.price * item.quantity;

    cartItemsContainer.appendChild(cartItemElement)
  })

cartTotal.textContent = total.toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL"
});

cartCounter.innerHTML = cart.length;

}
   
    
  // função para remover o item do carrinho
  cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
       const name = event.target.getAttribute("data-name")

       removeItemCart(name);
    }
  })

  function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
      const item = cart[index];

      if(item.quantity > 1){
        item.quantity-= 1;
        updateCartModal();
        return;
      }
      
      cart.splice(index,1)
      updateCartModal();
    }
  }

  addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
      addressInput.classList.remove("border-red-500")
      addressWarn.classList.add("hidden")
    }
  })

  checkoutBtn.addEventListener("click", function(){

    const isOpen = checkRestaurantOpen(0);
    if(!isOpen){
      Toastify({
        text: "Ops o restaurante está fechado!",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#ef4444",
        },
      }).showToast();

      return;
    }
    if(cart.length === 0) return;
    if(addressInput.value ===""){
      addressWarn.classList.remove("hidden")
      addressInput.classList.add("border-red-500")
      return;
    }
    //enviar o pedido para whatsapp
    const cartItems = cart.map((item) => {
      return(
        ` ${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} |`
      )
    }).join("")

      const message = encodeURIComponent(cartItems)
      const phone = "5584987170217"

      window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")

      cart.length = 0;
      updateCartModal();
  })

  function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 20 && hora < 22;

  }

  const spanItem= document.getElementById("date-span")
  const isOpen = checkRestaurantOpen();

  if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
  }else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
  }