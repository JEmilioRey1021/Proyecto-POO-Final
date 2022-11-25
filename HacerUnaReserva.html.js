const templatedCard = document.getElementById("template-card").content;
const cards = document.getElementById("cards");
const fragment = document.createDocumentFragment();
const items = document.getElementById("items");
const templateCarrito = document.getElementById("template-carrito").content;
const templateFooter = document.getElementById("template-footer").content;
const footer = document.getElementById("footer");
const checkout = document.getElementById("checkout");
let hotel = "";
let carrito = {}; //objeto
let hoteles = {};

document.addEventListener("DOMContentLoaded", () => {
  cargarParametros();
  cargarHabitaciones();
  cargarCarrito();
});

const cargarCarrito = ()=>{
    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"));
        mostrarCarrito();
      }
};

const cargarParametros = () => {
    const url = window.location.href;
    const hotelid = url.split("?")[1].split("=")[1];
    if (localStorage.getItem("hoteles")) {
      hoteles = JSON.parse(localStorage.getItem("hoteles"));
    }
    if(hoteles){
      const nombre = hoteles[hotelid].NombreHotel; 
      const elemento = document.getElementById("NombreHotelSpan");
      elemento.textContent = nombre;
    }
  };
  
cards.addEventListener('click',(boton)=>{
  agregarCarrito(boton);
});

items.addEventListener('click',(boton)=>{
    accionBotonCarrito(boton);
});

checkout.addEventListener('click',()=>{
    redirigirCheckOut(); 
});

const redirigirCheckOut = ()=>{
    const url = window.location.href;
    const newUrl = url.replace('HacerUnaReserva','CheckOut');
    window.location.assign(newUrl);
};

const redirigirPaginaInicio = ()=>{
  const url = window.location.href;
  const newUrl = url.replace('HacerUnaReserva','index');
  window.location.assign(newUrl);
};


const accionBotonCarrito = (boton)=>{
    if (boton.target.classList.contains("btn-info")) {
        const habitacion = carrito[boton.target.dataset.id];
        habitacion.cantidad++;
        carrito[boton.target.dataset.id] = { ...habitacion };
        mostrarCarrito();
      }
    
      if (boton.target.classList.contains("btn-danger")) {
        const habitacion = carrito[boton.target.dataset.id];
        habitacion.cantidad--;
        if (habitacion.cantidad === 0) {
          //borrar carrito
          delete carrito[boton.target.dataset.id];
        }
        mostrarCarrito();
      }
      boton.stopPropagation();

};
const agregarCarrito = (boton)=>{
    console.log(boton);
    if (boton.target.classList.contains("btn-dark")) {
        agregarHabitacionACarrito(boton.target.parentElement);
      }
      boton.stopPropagation();
};

const agregarHabitacionACarrito = (elemento)=>{
    const habitacion = {
        id: elemento.querySelector("h5").textContent,
        nombre: elemento.querySelector("h5").textContent,
        precio: elemento.querySelector(".precio").textContent,
        cantidad: 1
      };
      if (carrito.hasOwnProperty(habitacion.nombre)) {
        habitacion.cantidad = carrito[habitacion.nombre].cantidad + 1;
      }
      console.log(habitacion)
      carrito[habitacion.nombre] = { ...habitacion };
      mostrarCarrito();
}

const mostrarCarrito = ()=>{
    items.innerHTML = '';
    console.log(carrito);
    Object.values(carrito).forEach((habitacion) => {
        templateCarrito.querySelector(".habitacion").textContent = habitacion.nombre;
        templateCarrito.querySelector(".cantidad").textContent = habitacion.cantidad;
        templateCarrito.querySelector(".btn-info").dataset.id = habitacion.nombre;
        templateCarrito.querySelector(".btn-danger").dataset.id = habitacion.nombre;
        templateCarrito.querySelector(".total").textContent =
          habitacion.cantidad * habitacion.precio;
        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
      });
      items.appendChild(fragment);
      mostrarPiePaginaCarrito();
      guardarCarrito();
}

const guardarCarrito = ()=>{
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const mostrarPiePaginaCarrito = ()=>{
    footer.innerHTML = "";
  if (Object.keys(carrito).length === 0) {
    footer.innerHTML = ` 
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `;
    return; //para que deje vaciar el carrito y no siga haciendo la tarea
  }

  const cantidadTotal = Object.values(carrito).reduce(
    (acumulador, { cantidad }) => acumulador + cantidad,0
  );
  const montoTotal = Object.values(carrito).reduce(
    (acumulador, { cantidad, precio }) => acumulador + (cantidad * precio),
    0
  );

  templateFooter.querySelector(".CantidadTotalCarrito").textContent = cantidadTotal;
  templateFooter.querySelector(".MontoTotalCarrito").textContent = montoTotal;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

  const btnVaciar = document.getElementById("vaciar-carrito");
  btnVaciar.addEventListener("click", () => {
    carrito = {};
    mostrarCarrito();
  });
}

const mostrarHabitaciones = (data)=>{
    data.forEach((habitacion)=>{
        templatedCard.querySelector("h5").textContent = habitacion.Nombre;
        templatedCard.querySelector("p").textContent = habitacion.Descripcion;
        templatedCard.querySelector(".precio").textContent = habitacion.Precio;
        templatedCard
          .querySelector("img")
          .setAttribute("src", habitacion.Imagen);
        templatedCard.querySelector(".btn-dark").setAttribute("id", habitacion.Nombre);
        const clone = templatedCard.cloneNode(true);
        fragment.appendChild(clone);
    })
    cards.appendChild(fragment);
}

const cargarHabitaciones = async ()=>{
    try {
        const res = await fetch("api/data.json");
        const data = await res.json();
        console.log(data);
        mostrarHabitaciones(data);
      } catch (error) {
        console.log(error);
      }
}

