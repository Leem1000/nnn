function displayProducts(){
    const contProd = document.querySelector(".contenedor-productos");
    database.forEach(item =>{
        contProd.innerHTML += `

        <article class="cartola" >
        <!-- imagen del producto -->
        <div class="contenedor-img">
            <img src="${item.imagesSrc}" alt="">
        </div>
        <!-- Nombre y descripción del producto -->
        <div class="div-info">
            <h2 class="nombre-prod">${item.name}</h2>
            <hr class="separador">
            <p class="descripcion-prod">${item.description}</p>
        </div>
        <!-- Precio del producto y boton para mas detalles y boton para agregar al carrito -->
        <div class="div-precio">
            <p class="precio">${item.price}</p>
        </div>
        <div class="div-botones">
            <button class="boton detalles-button" onclick="masDetalles(${item.id})" >Mas Informacion</button>
            <button class="boton agregarCarrito"  onclick= "addToCart(${item.id})">Agregar al Carrito</button>

        </div>
          </article>
        
        `
    })
}
displayProducts();


//Función para aumentar cantidad
function increaseQuantity(productId){
    const item = cart.find(item  => item.id === productId);
    if(item){
        item.quantity++;
        totalPrice += item.price;
        updateCart();
    }
}
//Función para disminuir cantidad
function decreaseQuantity(productId){
    const item = cart.find(item => item.id === productId);
    if(item && item.quantity > 1){
        item.quantity--;
        totalPrice -= item.price;
        updateCart();
    }
}
function removeItemfromCart(id){
    const index = cart.findIndex(item  => item.id === id);
    if( index !== -1){
        const removeItem = cart.splice(index, 1)[0];
        totalPrice -= removeItem.price*removeItem.quantity;
        totalItems -= removeItem.quantity;

        updateCart();
      
    }  

   
    

}


function vaciarCarrito(){
    cart = [];
    document.querySelector('.cartContador .cantidadTotal').innerHTML = 0
    updateCart();

}

// mostrar carrito

let cart = [];
let totalPrice = 0;
let totalItems = 0;

//función para añadir un producto al carrito
function addToCart(productId){
    const product = database.find(item => item.id === productId);
    const existingItem = cart.find(item => item.id ===productId);
    if(existingItem){
        existingItem.quantity++;
    }else{
        cart.push({...product, quantity:1});
    }
    totalPrice += product.price;
    updateCart();
}
// función para pintar carrito en pantalla y actualizar carrito

function updateCart(){
    totalItems = 0;
    totalPrice = 0;
    const cartList = document.querySelector("#carrito-body");
   
    cartList.innerHTML = '';

    cart.forEach(prod => {
        const itemSubtotal = prod.price*prod.quantity;
        totalItems += prod.quantity;
        totalPrice += prod.price*prod.quantity

        cartList.innerHTML += `
        <tr class="carrito-prod">
        <!-- celda de imagen de producto en el carrito -->
        <td class="imgCarrito">
            <div class="contenedor-img">
            <img src="${prod.imagesSrc}" alt="">
        </div>
        </td>
        <td id="producto">${prod.name}</td> 

        <td> <button class="button menos"  onclick="decreaseQuantity(${prod.id} )">-</button>
        <span class= "number">${prod.quantity}</span>
        <button class="button mas" onclick="increaseQuantity(${prod.id} )">+</button>  </td>
        <td class="precio-tabla" id="precio-uni">${prod.price}</td>
        <td class="precio-tabla" id="precio-total-prod">$${ (prod.price*prod.quantity).toFixed(2)   }</td>
        <td>  <button  class=" btn-danger" type="button" onclick= "removeItemfromCart(${prod.id})"> <img src="images/tachito.png" alt=""></button></td>
          </tr>
        `
        const contFootCarrito = document.querySelector("#footer-carrito-tabla")
       
       
        contFootCarrito.innerHTML = `
        <tr class="none">
        <td class="border-bottom-left"colspan=2 > <button id="vaciar-tabla" class="button" onclick= "vaciarCarrito()">Vaciar Carrito</button>      </td>
        <td class="cantTotal"colspan=1 >${totalItems}</td>
        <td class="negrita">Precio Total</td>
        <td id="total-a-pagar" class="precio-tabla border-bottom-right negrita">${totalPrice.toFixed(2)}</td>
        <td class="border-bottom-right negrita"</td>
    
        </tr>
        `


    })
    document.querySelector('.cartContador .cantidadTotal').innerHTML = totalItems
    document.querySelector('.cantTotal').textContent = totalItems
    document.querySelector('#total-a-pagar').textContent = `$${totalPrice.toFixed(2)}`

}




// aunebtar y disminuir cantida en mas detalles
let det = [];
let ttotalPrice = 0;

function masDetalles(productId){
    // console.log(id);
     const product = database.find(item => item.id ===productId );
     const existingItem = det.find(item => item.id === productId);
     if (existingItem) {
        existingItem.quantity++;
    } else {
        det.push({ ...product, quantity: 1 });
    }
    ttotalPrice += product.price;

    // console.log(det)
     mostrarDetItem()
 }


function mostrarDetItem(){


    const contDetalles = document.querySelector('.container-detalles');
    contDetalles.innerHTML = ''
    det.forEach(item =>{
        const itemSubtotal = item.price*item.quantity;
        contDetalles.innerHTML+= `

        <div class="preview">
       
             
        <div class="detalles">
        <button class="closeDet" onclick="removeItem(${item.id})">X</button>
           
           
          
           <div class="bloques">
               <div class="bloque1">

                    <!-- imagen del producto -->
                    <div class="contenedorimg">
                     <img src="${item.imagesSrc}" alt="">
                     <h2 class="nombre-prod">${item.name}</h2>
                    </div> 
                    <!-- Nombre y descripción del producto -->


                    <!-- <div class="divinfo">
                     <h2 class="nombre-prod">Nombre Producto</h2>
                    <hr class="separador">
                    </div> -->

               </div>
               <div class="bloque2"> 

                   <p class="descripcion-prod">${item.description}</p>
                     <!-- Precio del producto y boton para mas detalles y boton para agregar al carrito -->
                     <div class="divprecio-boton">
                   <p class="precio">${item.price}</p>
                   </div>

                   <div>
                   <button class="aumenDismi" onclick="ddecreaseQuantity(${item.id})">-</button>
                  
                   <span>${item.quantity}</span>
                  
                   <button class="aumenDismi" onclick="iincreaseQuantity(${item.id})">+</button>
                   </div>

                   
                   <div class="precio-tabla" id="precio-total-prod">${ (item.price*item.quantity).toFixed(2)   }</div>
               </div> 

           </div>


           <div class="botoness">
               <button class="boton MasInfo" onclick= "continuarComprando(${item.id})">continuar comprando</button>
               <button class="boton agregarCarrito" onclick= "addFromDetToCart(${item.id})">Agregar al Carrito</button>
               </div> 

             </div>

   </div>
        
        `
    })
    contDetalles.style.display = 'flex'
   
   
   

}
// Función para aumentar cantidad
function iincreaseQuantity(productId) {
    const item = det.find(item => item.id === productId);
    if (item) {
        item.quantity++;
        totalPrice += item.price;
        mostrarDetItem();
    }
}

// Función para disminuir cantidad
function ddecreaseQuantity(productId) {
    const item = det.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        totalPrice -= item.price;
        mostrarDetItem();
    }
}



function removeItem(id){
    const contDetalles = document.querySelector('.container-detalles');
    console.log(id)
    det = det.filter(item => item && item.id !== id)
    contDetalles.style.display = 'none';
   
  
  
  
}

function addFromDetToCart(id){

    addToCart(id);
    removeItem(id)

}

function continuarComprando(id){
    removeItem(id)
}

