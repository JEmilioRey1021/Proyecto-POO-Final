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
