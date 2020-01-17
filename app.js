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
  nombre: "Proyecto 1",
  costo_total: 1000000,
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
  pagos_tentativos: [
    {
      monto: 15000,
      fecha: "20/03/2020"
    },
    {
      monto: 30000,
      fecha: "20/04/2020"
    }
  ],
  gastos: [
    {
      ejecutivo: "Pedro",
      concepto: "Avión",
      fechag: "15/12/2019",
      montog: 10000
    },
    {
      ejecutivo: "Juan",
      concepto: "Provedor",
      fechag: "11/12/2019",
      montog: 80000
    },
  ],
  utilidad: 30,
  disponible: []
};

function formateaComoDinero(valor) {
  return `$ ${valor}`;
}

// revisar reduce
// ${proyecto_uno.pagos_recibidos.reduce(
//     (a, b) => a.monto + b.monto
//   )}

function sumaPagos(arrPagos) {
  var suma = 0;
  arrPagos.forEach(pago => {
    suma += pago.monto;
  });
  return suma;
}

function sumaGastos(arrGastos) {
  var suma = 0;
  arrGastos.forEach(gasto => {
    suma += gasto.montog;
  });
  return suma;
}

function montoDisponible(costo,utilidad,arrGastos){
  var montoi = costo * ((100-utilidad)/100);
  var gastos = sumaGastos(arrGastos);
  var disponible = montoi - gastos;
  return disponible;
}

const proyectoContainer = `
<div class="card">
    <div class="card-header">
      <h4>General
      <img class="float-right" src="images/editar.svg" alt="add" height="20" width="20">
      </h4>
    </div>
    <div class="card-body">
        <strong>Costo total:</strong> ${formatMoney(proyecto_uno.costo_total)} <br>
        <strong>Pagos recibidos:</strong> ${formatMoney(sumaPagos(proyecto_uno.pagos_recibidos))} <br>
        <strong>Gastos:</strong> ${formatMoney(sumaGastos(proyecto_uno.gastos))} <br>
        <strong>Utilidad proyectada:</strong> ${proyecto_uno.utilidad}%<br>
        <strong>Monto disponible:</strong> ${formatMoney(montoDisponible(proyecto_uno.costo_total,proyecto_uno.utilidad,proyecto_uno.gastos),2,".",",")}
    </div>
</div>
`;

const pagosContainer = `
<div class="card">
    <div class="card-header">
      <h4>Pagos
      <img class="float-right" src="images/mas.svg" alt="add" height="25" width="25">
      </h4>
    </div>
    <div class="card-body">
      <h5>Hechos <div class="float-right">${sumaPagos(proyecto_uno.pagos_recibidos)*100/proyecto_uno.costo_total}%
        </div></h5>
        Total: ${formatMoney(sumaPagos(proyecto_uno.pagos_recibidos))}<br>
        ${proyecto_uno.pagos_recibidos
          .map(pago => {
            return `<strong>${pago.fecha}</strong>: ${formatMoney(
              pago.monto
            )}<br>`;
          })
          .join("")}
      <h5>Tentativos</h5>
        ${proyecto_uno.pagos_tentativos
          .map(pago => {
            return `<strong>${pago.fecha}</strong>: ${formatMoney(
              pago.monto
            )}<br>`;
          })
          .join("")}
          
    </div>
</div>
`;

const gastosContainer = `
<div class="card">
    <div class="card-header">
      <h4>Gastos
      <img class="float-right" src="images/mas.svg" alt="add" height="25" width="25">
      </h4>
    </div>
    <div class="card-body">
      ${proyecto_uno.gastos
        .map(gasto => {
          return `<strong>${gasto.ejecutivo} - ${(gasto.concepto)}</strong><br>
          ${gasto.fechag}: ${formatMoney(
            gasto.montog
          )}<br>
          `;
        })
        .join("")}
    </div>
</div>
`;

const cargaProyecto = () => {
  document.getElementById("titulo").innerHTML = `<div> ${proyecto_uno.nombre}</div>`;
  document.getElementById("proyecto").innerHTML = proyectoContainer;
  document.getElementById("pagos").innerHTML = pagosContainer;
  document.getElementById("gastos").innerHTML = gastosContainer;
};

const linkProyectos = document.querySelectorAll(".nav-link").forEach(item => {
  item.addEventListener("click", event => {
    cargaProyecto();
  });
});

function formatMoney(number, decPlaces, decSep, thouSep) {
  decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
  decSep = typeof decSep === "undefined" ? "." : decSep;
  thouSep = typeof thouSep === "undefined" ? "," : thouSep;
  var sign = number < 0 ? "-" : "";
  var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
  var j = (j = i.length) > 3 ? j % 3 : 0;
  var k = (k = i.length) > 6 ? k % 6 : 0;
  
  return "$ " + sign +
    (j ? i.substr(0, j) + thouSep : "") +
    i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
    (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
  }