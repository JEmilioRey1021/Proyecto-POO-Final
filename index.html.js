let hoteles = {};
const templatehoteles = document.getElementById("template-hoteles").content;
const items = document.getElementById("items");
const fragment = document.createDocumentFragment();

document.addEventListener("DOMContentLoaded", () => {
  cargarHoteles();
});

const cargarHoteles = () => {
  if (localStorage.getItem("hoteles")) {
    hoteles = JSON.parse(localStorage.getItem("hoteles") || "[]");
  }
  const url = window.location.href;
  const newUrl = url.replace('index','HacerUnaReserva');
  const fullUrl = newUrl+'?NH='
  items.innerHTML = '';
  Object.values(hoteles).forEach((hotel) => {
    templatehoteles.querySelector(".nombreHotel").textContent = hotel.NombreHotel;
    templatehoteles.querySelector(".ubicacion").textContent = hotel.Ubicacionhotel;
    templatehoteles.querySelector(".cantidassimples").textContent = hotel.HabitacionesSencillas;
    templatehoteles.querySelector(".cantidaddobles").textContent = hotel.HabitacionesDobles;
    templatehoteles.querySelector(".cantidaddobles").textContent = hotel.HabitacionesSuite;
    templatehoteles.querySelector(".capacidad").textContent = hotel.CapacidadHotel;
    templatehoteles.querySelector(".disponibilidad").textContent = hotel.Disponibilidad;
    const urlConParametros = fullUrl+hotel.id;
    templatehoteles.querySelector(".botonreservar").href = urlConParametros;
    const clone = templatehoteles.cloneNode(true);

    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
};
