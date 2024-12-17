//Navbar

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');

                // Seleccionar el enlace y verificar si existe
                const linkActivo = document.querySelector('header nav a[href*=' + id + ']');
                if (linkActivo) {
                    linkActivo.classList.add('active');
                }
            });
        }
    });
};


//Fondo Scroll Navbar

window.addEventListener('DOMContentLoaded', function () {
    var menu = document.querySelector('header');
    var logos = document.querySelectorAll('.logo i, .logo, .tiempo');
    var logoText = document.querySelector('.logo-text'); // Selecciona el texto del logo
    var logoImage = document.getElementById('scrollImage'); // Selecciona la imagen del logo

    // Inicialmente oculta la imagen del logo
    logoImage.style.display = 'none';


    function checkScrollPosition() {
        var scrollPosition = window.scrollY;

        if (scrollPosition > 0) {
            menu.classList.add('background');
            logos.forEach(function (logo) {
                logo.style.color = '#353227';

            });

            // Oculta el texto y muestra la imagen del logo
            if (logoText) logoText.style.display = 'none'; // Asegura que el texto desaparezca
            logoImage.style.display = 'block'; // Muestra la imagen
        } else {
            menu.classList.remove('background');
            logos.forEach(function (logo) {
                logo.style.color = 'white';
            });

            // Muestra el texto y oculta la imagen del logo
            if (logoText) logoText.style.display = 'inline'; // Muestra el texto nuevamente
            logoImage.style.display = 'none'; // Oculta la imagen
        }
    }
    checkScrollPosition();
    window.addEventListener('scroll', checkScrollPosition);
});



//Formulario

const formulario = document.querySelector("#formulario");
//crear evento
formulario.addEventListener("submit", validarFormulario);
//funciones

function validarFormulario(e) {
    e.preventDefault();
    const NOMBRE = document.querySelector("#name").value;
    var solotexto = "^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$";
    if (NOMBRE.match(solotexto) == null) { return alert("El nombre debe ser tipo texto"); }

    const EMAIL = document.querySelector("#e-mail").value;
    var ValidaEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if (EMAIL.match(ValidaEmail == null)) { return alert("El correo electronico debe tener el formato aaaa@email.com"); }
    const TELEFONO = document.querySelector("#telefono").value;
    if (!(/^\d{10}$/.test(TELEFONO))) { return alert("El telefono debe ser numerico y de 10 números de largo"); }
    const ASUNTO = document.querySelector("#asunto").value;
    if (ASUNTO.match(solotexto) == null) { return alert("El asunto debe ser tipo texto"); }
    const MENSAJE = document.querySelector("#msj").value;
    if (MENSAJE.match(solotexto) == null) { return alert("El mensaje debe ser tipo texto"); }

    var templateParams = {
        name: NOMBRE,
        email: EMAIL,
        telefono: TELEFONO,
        asunto: ASUNTO,
        msj: MENSAJE
    };

    enviarMail(templateParams);

}



// function enviarMail(templateParams) {
//     const PUBLIC_KEY = 'vzXI7eKkzUIcK3Qfd';
//     const contact_service = 'service_t5bk7vh';
//     const contact_form = 'template_um8gjrn';
//     emailjs.init(PUBLIC_KEY);
//     emailjs.send(contact_service, contact_form, templateParams)
//         .then(function () {
//             console.log('ENVIADO...');
//             document.getElementById("formulario").reset();
//             return alert("El correo electronico fue enviado");


//         }
//             , function (error) {
//                 return alert("El correo electronico no fue enviado");
//             });
// }


function enviarMail(templateParams) {
    const formspreeURL = "https://formspree.io/f/xrbgerdd"; 

    // Enviar la solicitud usando fetch()
    fetch(formspreeURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(templateParams)
    })
    .then(function (response) {
        if (response.ok) {
            console.log('ENVIADO...');
            document.getElementById("formulario").reset();
            alert("Hemos recibido su contacto, muy pronto nos comunicaremos con usted.");
        } else {
            alert("El correo electrónico no fue enviado");
        }
    })
    .catch(function (error) {
        console.error("Error:", error);
        alert("El correo electrónico no fue enviado");
    });
}



// Menu Hamburguesa
const nav = document.querySelector('#nav');
const abrir = document.querySelector('#abrir');
const cerrar = document.querySelector('#cerrar');

abrir.addEventListener('click', () => {
    nav.classList.add('visible');
})

cerrar.addEventListener('click', () => {
    nav.classList.remove('visible');
})


//Carrusel
const cantcabanias = document.querySelector('.contenedor-delicatessen').children.length;
//declaración de vectores
const carouselImages = [];
const carouselButtons = [];
const transf = [];
let currentImageIndex = [];
// carga de vectores de cada cabaña
for (let nrocabania = 0; nrocabania < cantcabanias; nrocabania++) {
    currentImageIndex.push(0);
    carouselImages.push(document.querySelectorAll('#cabania' + nrocabania + ' .carousel-images img'));
    carouselButtons.push(document.querySelectorAll('#cabania' + nrocabania + ' button'));
    transf.push(document.querySelector('#cabania' + nrocabania + ' .carousel-images'));
}
function showImage(imageIndex, nrocabania) {
    let mitad = document.querySelector('#cabania' + nrocabania + ' .carousel-bkg img').width / 2;
    carouselImages[nrocabania][currentImageIndex[nrocabania]].classList.remove('active');
    carouselImages[nrocabania][imageIndex].classList.add('active');
    let anchobox = -100;
    let oper = imageIndex * anchobox;
    //posiciona el item actual al centro
    // transf[nrocabania].style.transform = 'translateX(' + (oper + mitad + (anchobox/2)) + 'px )';
    //actualiza el fondo con el item elegido
    fondo = document.querySelector('#cabania' + nrocabania + ' #img-bkg');
    fondo.src = carouselImages[nrocabania][imageIndex].src;
    currentImageIndex[nrocabania] = imageIndex;

    //Se regula la opacidad de cada slide para que las más alejadas no obstruyan la lectura
    for (let index = 0; index < carouselImages[nrocabania].length; index++) {
        const imagen = carouselImages[nrocabania][index];
        let distancia = Math.abs(index - currentImageIndex[nrocabania]);
        opacidad = (1 - (distancia / carouselImages[nrocabania].length)) * .5;
        imagen.style.opacity = opacidad;
    }
}
//Carga acciones de eventos de cada carrusel de cabaña
for (let nrocabania = 0; nrocabania < cantcabanias; nrocabania++) {
    carouselButtons[nrocabania][0].addEventListener('click', () => {
        if (currentImageIndex[nrocabania] === 0) {
            showImage(carouselImages[nrocabania].length - 1, nrocabania);
        } else {
            showImage(currentImageIndex[nrocabania] - 1, nrocabania);
        }
    });
    carouselButtons[nrocabania][1].addEventListener('click', () => {
        if (currentImageIndex[nrocabania] === carouselImages[nrocabania].length - 1) {
            showImage(0, nrocabania);
        } else {
            showImage(currentImageIndex[nrocabania] + 1, nrocabania);
        }
    });
    //actualiza el carrusel para mostrar la primer imagen
    showImage(0, nrocabania);

}





// Carrito
// Array de productos
const productos = [
    { id: 1, nombre: "Edio Tasting", precio: 200000, imagen: "./imagenes/edio-tasting.jpg" },
    { id: 2, nombre: "Wine Pairing", precio: 250000, imagen: "./imagenes/wine_food_pairing.jpg" },
    { id: 3, nombre: "Commisioner Tour", precio: 300000, imagen: "./imagenes/commisioner-tour.jpg" },
    { id: 4, nombre: "Henrietta Stich", precio: 180000, imagen: "./imagenes/henrietta_stich_cider.jpg" },
    { id: 5, nombre: "Joan Apple Bakery", precio: 150000, imagen: "./imagenes/joan_apple_bakery.jpeg" },
    { id: 6, nombre: "Vineyards", precio: 220000, imagen: "./imagenes/edio_vineyards.jpg" }
];

// Carrito de compras
let carrito = [];

// Función para mostrar los productos en la sección Vineyards
function mostrarProductos() {
    console.log("Cargando productos...");
    const contenedorVineyards = document.querySelector(".contenedor-vineyards");

    if (!contenedorVineyards) {
        console.error("El contenedor .contenedor-vineyards no existe en el HTML.");
        return;
    }

    console.log("Contenedor encontrado. Cargando productos...");

    contenedorVineyards.innerHTML = "";

    productos.forEach(producto => {
        console.log(`Producto: ${producto.nombre}, Precio: ${producto.precio}`);
        const productoHTML = `
            <div class="carta">
                <div class="cara frente">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <h6>${producto.nombre}</h6>
                    <p>$ ${producto.precio}</p>
                    <button class="bx bx-cart-alt" onclick="agregarAlCarrito(${producto.id})"></button>
                </div>
            </div>
        `;
        contenedorVineyards.insertAdjacentHTML("beforeend", productoHTML);
    });
}



// Función para agregar productos al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(item => item.id === id);
    carrito.push(producto);
    actualizarCarrito();
}

// Función para actualizar la sección del carrito
function actualizarCarrito() {
    const carritoHTML = document.querySelector("#lista-carrito");
    const totalHTML = document.querySelector("#total-carrito");
    const contadorCarrito = document.querySelector("#contador-carrito");
    const seccionCarrito = document.querySelector("#carrito"); // Sección carrito

    carritoHTML.innerHTML = ""; // Limpiar el carrito visual
    let total = 0;

    // Generar la lista de productos
    carrito.forEach((producto, index) => {
        total += producto.precio;

        const li = document.createElement("li");
        li.innerHTML = `
            ${producto.nombre} - $${producto.precio}
            <button class="btn" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        carritoHTML.appendChild(li);
    });

    // Mostrar total
    totalHTML.textContent = `Total a Pagar: $ ${total}`;

    // Mostrar/ocultar la sección del carrito
    if (carrito.length > 0) {
        seccionCarrito.style.display = "block";
        contadorCarrito.style.display = "block";
        contadorCarrito.textContent = carrito.length;
    } else {
        seccionCarrito.style.display = "none";
        contadorCarrito.style.display = "none";
    }
}




// Función para eliminar productos del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Evento para borrar todo el carrito
document.querySelector("#boton-borrar").addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
});

// Evento para "Ir a Pagar"
document.querySelector("#boton-pagar").addEventListener("click", () => {
    alert(`Gracias por su compra. Total a pagar: $ ${carrito.reduce((acc, p) => acc + p.precio, 0)}`);
    carrito = [];
    actualizarCarrito();
});

// Mostrar los productos al cargar la página
mostrarProductos();







