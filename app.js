$("#toggle").click(function() {
  $("#sidebar-wrapper").toggleClass("hide");
  $(".menu-wrapper").toggleClass("hide");
  setTimeout(function() {
    if (!$("#sidebar-wrapper").hasClass("hide")) {
      $("#sidebar-wrapper").addClass("show");
    } else $("#sidebar-wrapper").removeClass("show");
  }, 500);
});

var formatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2
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
    }
  ],
  utilidad: 30,
  disponible: []
};

const proyecto_dos = {
  id: 2,
  nombre: "Proyecto 2",
  costo_total: 2000000,
  pagos_recibidos: [
    {
      monto: 50000,
      fecha: "10/12/2019"
    },
    {
      monto: 7000,
      fecha: "10/12/2019"
    },
    {
      monto: 10000,
      fecha: "10/12/2019"
    },
    {
      monto: 33400,
      fecha: "10/12/2019"
    }
  ],
  pagos_tentativos: [
    {
      monto: 25000,
      fecha: "20/03/2020"
    },
    {
      monto: 40000,
      fecha: "20/04/2020"
    }
  ],
  gastos: [
    {
      ejecutivo: "Pedro",
      concepto: "Avión",
      fechag: "15/12/2019",
      montog: 30000
    },
    {
      ejecutivo: "Juan",
      concepto: "Provedor",
      fechag: "11/12/2019",
      montog: 70000
    }
  ],
  utilidad: 20,
  disponible: []
};

const proyecto_tres = {
  id: 3,
  nombre: "Proyecto 3",
  costo_total: 3000000,
  pagos_recibidos: [
    {
      monto: 30000,
      fecha: "10/12/2019"
    },
    {
      monto: 6000,
      fecha: "10/12/2019"
    },
    {
      monto: 60000,
      fecha: "10/12/2019"
    },
    {
      monto: 63400,
      fecha: "10/12/2019"
    }
  ],
  pagos_tentativos: [
    {
      monto: 5000,
      fecha: "20/03/2020"
    },
    {
      monto: 20000,
      fecha: "20/04/2020"
    }
  ],
  gastos: [
    {
      ejecutivo: "Pedro",
      concepto: "Avión",
      fechag: "15/12/2019",
      montog: 20000
    },
    {
      ejecutivo: "Juan",
      concepto: "Provedor",
      fechag: "11/12/2019",
      montog: 90000
    }
  ],
  utilidad: 40,
  disponible: []
};

const arregloProyectos = [proyecto_uno, proyecto_dos, proyecto_tres];

// revisar reduce
// ${proyecto_uno.pagos_recibidos.reduce(
//     (a, b) => a.monto + b.monto
//   )}

const menu = document.getElementById("menu");

const cargaMenu = () => {
  // orden de ultimo a id a menor
  const arrSort = arregloProyectos.sort((a, b) => b.id - a.id);
  // agarro los ultimos n elementos para mostrar
  arrSort.splice(6);
  menu.innerHTML = arrSort
    .map(proyecto => {
      return `
    <li class="nav-item">
      <a class="nav-link active" data-id="${proyecto.id}">${proyecto.nombre}</a>
    </li>
    `;
    })
    .join("");
};

cargaMenu();
cargaEventosClickMenu();

function sumaPagos(arrPagos) {
  var suma = 0;
  arrPagos.forEach(pago => {
    suma += pago.monto;
  });
  return suma.toFixed(2);
}

function sumaGastos(arrGastos) {
  var suma = 0;
  arrGastos.forEach(gasto => {
    suma += gasto.montog;
  });
  return suma;
}

function montoDisponible(costo, utilidad, arrGastos) {
  var montoi = costo * ((100 - utilidad) / 100);
  var gastos = sumaGastos(arrGastos);
  var disponible = montoi - gastos;
  return disponible;
}

// function declaration
// function cargaproyecto () {

// }

// funciont expression
// const cargaProyecto = function () {

// }

// function expression con arrow function
// const cargaProyecto = () => {}
function cargaEventosClickMenu() {
  const linkProyectos = document.querySelectorAll(".nav-link").forEach(item => {
    item.addEventListener("click", event => {
      const id_proyecto = item.dataset.id;
      cargaProyecto(id_proyecto);
    });
  });
}

function formatMoney(number, decPlaces, decSep, thouSep) {
  (decPlaces = isNaN((decPlaces = Math.abs(decPlaces))) ? 2 : decPlaces),
    (decSep = typeof decSep === "undefined" ? "." : decSep);
  thouSep = typeof thouSep === "undefined" ? "," : thouSep;
  var sign = number < 0 ? "-" : "";
  var i = String(
    parseInt((number = Math.abs(Number(number) || 0).toFixed(decPlaces)))
  );
  var j = (j = i.length) > 3 ? j % 3 : 0;
  var k = (k = i.length) > 6 ? k % 6 : 0;

  return (
    "$ " +
    sign +
    (j ? i.substr(0, j) + thouSep : "") +
    i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
    (decPlaces
      ? decSep +
        Math.abs(number - i)
          .toFixed(decPlaces)
          .slice(2)
      : "")
  );
}

const generarProyectoContainer = proyecto_elegido => {
  return `
<div class="card">
    <div class="card-header">
      <h4>General
      <img class="float-right" src="images/editar.svg" alt="add" height="20" width="20">
      </h4>
    </div>
    <div class="card-body">
        <strong>Costo total:</strong> ${formatter.format(
          proyecto_elegido.costo_total
        )} <br>
        <strong>Pagos recibidos:</strong> ${formatter.format(
          sumaPagos(proyecto_elegido.pagos_recibidos)
        )} <br>
        <strong>Gastos:</strong> ${formatter.format(
          sumaGastos(proyecto_elegido.gastos)
        )} <br>
        <strong>Utilidad proyectada:</strong> ${proyecto_elegido.utilidad}%<br>
        <strong>Monto disponible:</strong> ${formatter.format(
          montoDisponible(
            proyecto_elegido.costo_total,
            proyecto_elegido.utilidad,
            proyecto_elegido.gastos
          ),
          2,
          ".",
          ","
        )}
    </div>
</div>
`;
};

const generarPagosContainer = proyecto_elegido => {
  return `
<div class="card">
    <div class="card-header">
      <h4>Pagos
      <img class="float-right" src="images/mas.svg" alt="add" height="25" width="25">
      </h4>
    </div>
    <div class="card-body">
      <h5>Hechos <div class="float-right">${(
        (sumaPagos(proyecto_elegido.pagos_recibidos) * 100) /
        proyecto_elegido.costo_total
      ).toFixed(2)}%
        </div></h5>
        Total: ${formatter.format(
          sumaPagos(proyecto_elegido.pagos_recibidos)
        )}<br>
        ${proyecto_elegido.pagos_recibidos
          .map(pago => {
            return `<strong>${pago.fecha}</strong>: ${formatter.format(
              pago.monto
            )}<br>`;
          })
          .join("")}
      <h5>Tentativos</h5>
        ${proyecto_elegido.pagos_tentativos
          .map(pago => {
            return `<strong>${pago.fecha}</strong>: ${formatter.format(
              pago.monto
            )}<br>`;
          })
          .join("")}
          
    </div>
</div>
`;
};

const generarGastosContainer = proyecto_elegido => {
  return `
<div class="card">
    <div class="card-header">
      <h4>Gastos
      <img class="float-right" src="images/mas.svg" alt="add" height="25" width="25">
      </h4>
    </div>
    <div class="card-body">
      ${proyecto_elegido.gastos
        .map(gasto => {
          return `<strong>${gasto.ejecutivo} - ${gasto.concepto}</strong><br>
          ${gasto.fechag}: ${formatter.format(gasto.montog)}<br>
          `;
        })
        .join("")}
    </div>
</div>
`;
};

const cargaProyecto = id_proyecto_click => {
  var proyecto_elegido = arregloProyectos[0];
  // const proyecto_elegido = arregloProyectos.find(obj => obj.id === id_proyecto_click)
  // const proyecto_elegido = arregloProyectos.find(function(obj){
  //   return obj.id === id_proyecto_click
  // })
  for (var i = 0; i < arregloProyectos.length; i++) {
    if (arregloProyectos[i].id === Number(id_proyecto_click)) {
      proyecto_elegido = arregloProyectos[i];
    }
  }

  if (proyecto_elegido === "undefined") {
    console.log("No se encontró");
    return;
  }
  document.getElementById(
    "titulo"
  ).innerHTML = `<div> ${proyecto_elegido.nombre}</div>`;
  document.getElementById("proyecto").innerHTML = generarProyectoContainer(
    proyecto_elegido
  );
  document.getElementById("pagos").innerHTML = generarPagosContainer(
    proyecto_elegido
  );
  document.getElementById("gastos").innerHTML = generarGastosContainer(
    proyecto_elegido
  );
};

// añadir proyecto
const altaProyecto = (nombre, costo_total, utilidad) => {
  const proyecto = new Proyecto(nombre, costo_total, utilidad);
  arregloProyectos.push(proyecto);
  cargaMenu();
  cargaEventosClickMenu();
};

const formaAlta = document.getElementById("forma-alta");
formaAlta.addEventListener("submit", e => {
  e.preventDefault();
  const nombre = document.getElementsByName("nombre")[0].value;
  const costo_total = document.getElementsByName("costo_total")[0].value;
  const utilidad = document.getElementsByName("utilidad")[0].value;
  altaProyecto(nombre, costo_total, utilidad);
});

function Proyecto(nombre = "Proyecto nuevo", costo_total = 0, utilidad = 100) {
  ultimoIndice = arregloProyectos.length;
  this.id = arregloProyectos[ultimoIndice - 1].id + 1;
  (this.nombre = nombre),
    (this.costo_total = costo_total),
    (this.pagos_recibidos = []),
    (this.pagos_tentativos = []),
    (this.gastos = []),
    (this.utilidad = utilidad),
    (this.disponible = []);
}
