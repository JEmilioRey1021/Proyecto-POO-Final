let hoteles = {};
document.addEventListener("DOMContentLoaded", () => {
  const btnGuardar = document.getElementById("btn-guardar");
  btnGuardar.addEventListener("click", (boton) => {
    boton.stopPropagation();
    guardarhotel();
    redirgiralInicio();
  });
});

const redirgiralInicio = ()=>{
    const url = location.href;
    const newUrl = url.replace("RegistrarHotel", "index");
    return window.location.assign(newUrl);
}
const guardarhotel = () => {
  if (localStorage.getItem("hoteles") && localStorage.getItem("hoteles") != null) {
    hoteles = JSON.parse(localStorage.getItem("hoteles"));
  }
  const nombrehotelstring = document.getElementById("hotelnombre").value || "";
  const ubicacionhotelstring =
    document.getElementById("hotelubicacion").value || "";
  const canthabitacionsencillaint =
    document.getElementById("cantHabitacionSencilla").value || 0;
  const canthabitaciondobleint =
    document.getElementById("cantHabitacionDoble").value || 0;
  const canthabitacionsuiteint =
    document.getElementById("cantHabitacionSuites").value || 0;
  const capacidadhotelint =
    canthabitacionsencillaint * 2 +
    canthabitaciondobleint * 4 +
    canthabitacionsuiteint * 6;

  const nuevohotel = {
    id:Date.now(), 
    NombreHotel: nombrehotelstring,
    Ubicacionhotel: ubicacionhotelstring,
    HabitacionesSencillas: canthabitacionsencillaint,
    HabitacionesDobles: canthabitaciondobleint,
    HabitacionesSuite: canthabitacionsuiteint,
    CapacidadHotel: capacidadhotelint,
    Disponibilidad: capacidadhotelint,
    Reservado: 0,
  };
  hoteles[nuevohotel.id] = { ...nuevohotel };
  localStorage.setItem("hoteles", JSON.stringify(hoteles));
};
