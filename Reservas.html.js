const cards = document.getElementById("cards");
const fragment = document.createDocumentFragment();
const items = document.getElementById("items");
const templateCarrito = document.getElementById("template-carrito").content;
const templateFooter = document.getElementById("template-footer").content;
const footer = document.getElementById("footer");
let hotel = "";
let carrito = {}; //objeto
let hoteles = {};
let reservas = {}; 
let checkout = {}; 
document.addEventListener("DOMContentLoaded", () => {
  cargarReserva(); 
});

const cargarReserva = ()=>{
    if (localStorage.getItem("reservas")) {
        reservas = JSON.parse(localStorage.getItem("reservas"));
        const reservaid = mostrarReservas(); 
        mostrarCarrito(reservaid); 
      }
};

const mostrarReservas = ()=>{
  if(reservas){
    const reserva = Object.values(reservas)[0];{
      const reservaNombrestring = document.getElementById("reservaNombre");
      const reservaNombreFacturastring =
        document.getElementById("reservaNombreFactura");
      const reservaNitstring =
        document.getElementById("reservaNit");
      const reservaDireccionstring =
        document.getElementById("reservaDireccion");
      const reservaCorreostring =
        document.getElementById("reservaCorreo");
      const reservaTelefonoint =
        document.getElementById("reservaTelefono");  
  
      reservaNombrestring.textContent = reserva.reservaNombre;
      reservaNombreFacturastring.textContent = reserva.reservaNombreFactura; 
      reservaNitstring.textContent = reserva.reservaNit; 
      reservaDireccionstring.textContent = reserva.reservaDireccion; 
      reservaCorreostring.textContent = reserva.reservaCorreo; 
      reservaTelefonoint.textContent = reserva.reservaTelefono;
      return reserva.id; 
    }
  }
}


const mostrarCarrito = (reservaid)=>{
    items.innerHTML = '';
    if (localStorage.getItem("checkout")) {
      checkout = JSON.parse(localStorage.getItem("checkout"));
    }    
    Object.values(checkout).forEach((item) => {
      if(item.reservaid == reservaid){
        templateCarrito.querySelector(".habitacion").textContent = item.nombre;
        templateCarrito.querySelector(".cantidad").textContent = item.cantidad;
        templateCarrito.querySelector(".total").textContent = item.cantidad * item.precio;
        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
      }
      });
      items.appendChild(fragment);
      mostrarPiePaginaCarrito();
}

const mostrarPiePaginaCarrito = ()=>{
    footer.innerHTML = "";
  if (Object.keys(checkout).length === 0) {
    footer.innerHTML = ` 
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `;
    return; //para que deje vaciar el carrito y no siga haciendo la tarea
  }

  const cantidadTotal = Object.values(checkout).reduce(
    (acumulador, { cantidad }) => acumulador + cantidad,0
  );
  const montoTotal = Object.values(checkout).reduce(
    (acumulador, { cantidad, precio }) => acumulador + (cantidad * precio),
    0
  );

  templateFooter.querySelector(".CantidadTotalCarrito").textContent = cantidadTotal;
  templateFooter.querySelector(".MontoTotalCarrito").textContent = montoTotal;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

 
}


