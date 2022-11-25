let reservas ={};
let hotel = ""; 
document.addEventListener("DOMContentLoaded", () => {
  const btnGuardar = document.getElementById("btn-guardar");
  btnGuardar.addEventListener("click", (boton) => {
    boton.stopPropagation();
    cargarParametros(); 
    const reservaid = guardarReserva();
    guardarCheckout(reservaid); 
    console.log("redirigiralInicio"); 
    redirgiralInicio();
  });
});

const cargarParametros = () => {
  const url = window.location.href;
  const hotelid = url.split("?")[1].split("=")[1];
  hotel = hotelid;
};

const redirgiralInicio = ()=>{
    const url = location.href;
    const newUrl = url.replace("CheckOut", "index");
    return window.location.assign(newUrl);
}
const guardarReserva = () => {
  if (localStorage.getItem("reserva") && localStorage.getItem("reserva") != null) {
    reservas = JSON.parse(localStorage.getItem("reserva"));
  }
  const reservaNombrestring = 
    document.getElementById("reservaNombre").value || "";
  const reservaNombreFacturastring =
    document.getElementById("reservaNombreFactura").value || "";
  const reservaNitstring =
    document.getElementById("reservaNit").value || "";
  const reservaDireccionstring =
    document.getElementById("reservaDireccion").value || "";
  const reservaCorreostring =
    document.getElementById("reservaCorreo").value || "";
  const reservaTelefonoint =
    document.getElementById("reservaTelefono").value || 0;

  const nuevaReserva = {
    id:Date.now(), 
    reservaNombre:reservaNombrestring,
    reservaNombreFactura: reservaNombreFacturastring,
    reservaNit: reservaNitstring,
    reservaDireccion: reservaDireccionstring,
    reservaCorreo: reservaCorreostring,
    reservaTelefono: reservaTelefonoint,
  };
  reservas[nuevaReserva.id] = { ...nuevaReserva };// tome el resto de todos los elementos que hayan y copieme todo el contenido. 
  localStorage.setItem("reservas", JSON.stringify(reservas)); //lave, valor
  return nuevaReserva.id; 
};

let acumulador = 0; 
let carrito = {}; 
const guardarCheckout = (reservaid)=>{
    // localStorage.setItem("checkout",JSON.stringify(carrito));
    if(localStorage.getItem("carrito") ){
      carrito = JSON.parse(localStorage.getItem("carrito"));
    }

  //asociar el id de la reserva con el detalle del checkout
  Object.values(carrito).forEach((item) =>{
    item.reservaid = reservaid; 
  });
  localStorage.setItem("checkout",JSON.stringify(carrito)); //guarde la info modificada de carrito en chekcout
    Object.values(carrito).forEach((habitacion) =>{ //objeto a arreglo
      if(habitacion.nombre=='Sencilla'){
        acumulador += (habitacion.cantidad*2);
      }
      else if(habitacion.nombre=='Doble'){
        acumulador += (habitacion.cantidad*4);
      }
      else{
        acumulador += (habitacion.cantidad*6);
      }
    } 
    ); 
     
    console.log(acumulador)
    if(localStorage.getItem("hoteles") ){
      hoteles = JSON.parse(localStorage.getItem("hoteles"));
    }
    console.log(hoteles); 
    const hotelSeleccionado =  hoteles[hotel];
    if(hotelSeleccionado){
      hotelSeleccionado.Disponibilidad = hoteles[hotel].Disponibilidad - acumulador;
      hotelSeleccionado.Reservado = hoteles[hotel].Reservado + acumulador;
      hoteles[hotel] = { ...hotelSeleccionado };
      carrito = {};
      localStorage.setItem("carrito",JSON.stringify(carrito));
      localStorage.setItem("hoteles",JSON.stringify(hoteles));
    }
    
    
};