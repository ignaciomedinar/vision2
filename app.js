$("#toggle").click(function() {
  $("#sidebar-wrapper").toggleClass("hide");
  $(".menu-wrapper").toggleClass("hide");
  setTimeout(function() {
    if (!$("#sidebar-wrapper").hasClass("hide")) {
      $("#sidebar-wrapper").addClass("show");
    } else $("#sidebar-wrapper").removeClass("show");
  }, 500);
});

const proyecto_uno = {
  id: 1,
  costo_total: 0,
  pagos_recibidos: [
    {
      monto: 10000,
      fecha: "10/12/2019"
    },
    {
      monto: 5000,
      fecha: "10/12/2019"
    },
    {
      monto: 40000,
      fecha: "10/12/2019"
    },
    {
      monto: 23400,
      fecha: "10/12/2019"
    }
  ],
  gastos: [],
  utilidad: 0,
  disponible: []
};

function formateaComoDinero(valor) {
  return `$ ${valor}`;
}

// revisar reduce
// ${proyecto_uno.pagos_recibidos.reduce(
//     (a, b) => a.monto + b.monto
//   )}

function sumaGastos(arrGastos) {
  var suma = 0;
  arrGastos.forEach(gasto => {
    suma += gasto.monto;
  });
  return suma;
}

const proyectoContainer = `
<div class="card">
    <div class="card-header">
    <h2>Proyecto ${proyecto_uno.id}</h2>
    <h4 class="text-center text-uppercase">general</h4>
        <img class="float-right" src="images/add2.svg" alt="add" height="30" width="30">
    </div>
    <div class="card-body">
        Costo total: ${formateaComoDinero(proyecto_uno.costo_total)} <br>
        Pagos recibidos: $ ${sumaGastos(proyecto_uno.pagos_recibidos)} <br>
        Gastos: 
    </div>
</div>
`;

const pagosContainer = `
<div class="card">
    <div class="card-header">
        <h2>Proyecto ${proyecto_uno.id}</h2>
        <h4 class="text-center text-uppercase">pagos</h4>
        <img class="float-right" src="images/add2.svg" alt="add" height="30" width="30">
    </div>
    <div class="card-body">
        ${proyecto_uno.pagos_recibidos
          .map(pago => {
            return `<strong>${pago.fecha}</strong>: ${formateaComoDinero(
              pago.monto
            )}<br>`;
          })
          .join("")}
    </div>
</div>
`;

const cargaProyecto = () => {
  document.getElementById("proyecto").innerHTML = proyectoContainer;
  document.getElementById("pagos").innerHTML = pagosContainer;
};

const linkProyectos = document.querySelectorAll(".nav-link").forEach(item => {
  item.addEventListener("click", event => {
    cargaProyecto();
  });
});
