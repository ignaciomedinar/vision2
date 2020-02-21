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

let arregloProyectos = [];
// cargar proyectos y actualizar menu
const loadProjects = projectos => {
  arregloProyectos = [...projectos];
  cargaMenu();
  cargaEventosClickMenu();
};

// solicitar los proyectos al API
const getProjects = () => {
  var url = "http://localhost:8080/api/proyectos";
  fetch(url)
    .then(res => res.json())
    .catch(error => console.error("Error:", error))
    .then(response => loadProjects(response.data));
};

getProjects();

// añadir nuevo proyecto
const altaProyecto = (nombre, costo_total, utilidad) => {
  const proyecto = new Proyecto(nombre, costo_total, utilidad);
  createProject(proyecto);
  cargaMenu();
  cargaEventosClickMenu();
};

// API para crear un nuevo proyecto
const createProject = project => {
  var url = "http://localhost:8080/api/proyectos";
  const data = JSON.stringify(project);
  console.log(data);
  fetch(url, {
    method: "POST", // or 'PUT'
    body: data, // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .catch(error => console.error("Error:", error))
    .then(response => {
      formaAlta.reset()
      getProjects();
    });
};

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

function cargaEventosClickMenu() {
  const linkProyectos = document.querySelectorAll(".nav-link").forEach(item => {
    item.addEventListener("click", event => {
      const id_proyecto = item.dataset.id;
      cargaProyecto(id_proyecto);
    });
  });
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

const formaAlta = document.getElementById("forma-alta");
formaAlta.addEventListener("submit", e => {
  e.preventDefault();
  const nombre = document.getElementsByName("nombre")[0].value;
  const costo_total = document.getElementsByName("costo_total")[0].value;
  const utilidad = document.getElementsByName("utilidad")[0].value;
  altaProyecto(nombre, costo_total, utilidad);
});

function Proyecto(nombre = "Proyecto nuevo", costo_total = 0, utilidad = 100) {
  this.nombre = nombre;
  this.costo_total = Number(costo_total);
  this.utilidad = Number(utilidad);
}
