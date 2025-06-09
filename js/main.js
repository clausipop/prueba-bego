let inputOrderNumber = document.getElementById('inputOrderNumber'),
  btnTimePickup = document.getElementById('btnTimePickup'),
  contenidoContenedor = document.getElementById('contenidoContenedor'),
  seccionSeparador = document.getElementById('seccionSeparador');

  const input = document.getElementById('inputOrderNumber');
  const sugerenciasBox = document.getElementById('sugerencias');
  ;


//buscar palabra dentro de un arreglo
function buscarPalabraEnArreglo(palabra, array) {
  return array.find((elemento) => elemento === palabra);
}

let todasLasOrdenes = [];

// Obtener órdenes una vez
const obtenerOrdenes = () => {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      const response = JSON.parse(xhr.responseText);
      if (response.status === 200 && Array.isArray(response.result)) {
        todasLasOrdenes = response.result;

        for (const orden of todasLasOrdenes) {
          const pickup = orden.destinations[0];
          const dropoff = orden.destinations[1];
        
          const formatFecha = (timestamp) => {
            const fecha = new Date(timestamp);
            return fecha.toLocaleDateString('es-MX', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit'
            });
          };

          const formatHora = (timestamp) => {
            const fecha = new Date(timestamp);
            return fecha.toLocaleTimeString('es-MX', {
              hour: '2-digit',
              minute: '2-digit'
            });
          };

          divPadre.innerHTML +=
            `
<div class="orden-wrapper" data-order-number="${orden.order_number}">

    <p class="contenido-textos"><span class="texto-secundario">Order</span> # ${orden.order_number}</p>
  </section>

  <section class="separador">
    <div id="contenidoContenedor" class="contenedor">
        
                <div class="contenedor-fcl alinear-fcl ordenes-todas">
        <div class="contenedor-fcl">
            <img class="padding-fcl" src="assets/img/contenedor.png" alt="">
            <p class="contenido-textos padding-fcl">${orden.type}</p>
        </div>
        <div class="contenedor-fcl">
            <div class="punto ${orden.status_class}"></div>
            <p class="contenido-textos texto-s">${orden.status_string}</p>
        </div>
    </div>
              <hr class="separador-contenedor" />

                <div class="seccion-pedidos">
        
                    <div class="seccion-iconos">
                        <img class="icono" src="assets/img/camion.png" alt="">
                        <img class="icono" src="assets/img/Background-linea.png" alt="">
                        <img class="icono" src="assets/img/ubicacion.png" alt="">
                    </div>
        
                            <div class="contenedor-textos icono">
            <div class="seccion-textos uno">
                <div class="seccion-info contenido-textos">
                    <p class="texto-s texto-secundario">PICKUP</p>
                    <p class="texto-md">${pickup.nickname}</p>
                    <p class="texto-s texto-secundario">${pickup.address}</p>
                </div>
                <div class="contenido-textos fechahora">
                    <p class="texto-s texto-secundario">${formatFecha(pickup.start_date)}</p>
                    <p>${formatHora(pickup.start_date)}</p>
                </div>
            </div>

            <div class="seccion-textos dos">
                <div class="seccion-info contenido-textos">
                    <p class="texto-s texto-secundario">DROPOFF</p>
                    <p class="texto-md">${dropoff.nickname}</p>
                    <p class="texto-s texto-secundario">${dropoff.address}</p>
                </div>
                <div class="contenido-textos fechahora">
                    <p class="texto-s texto-secundario">${formatFecha(dropoff.start_date)}</p>
                    <p>${formatHora(dropoff.start_date)}</p>
                </div>
            </div>
        </div>
                </div>
                <div class="flex">
                    <button id="btnTimePickup-${orden.order_number}" class="boton-pickup">It's time for pickup</button>
                     <a <a href="cargoDetails.html?order=${orden.order_number}"  target="_blank" class="boton-resume" data-order-id="${orden.order_number}">
  Resume
  <img src="assets/img/ojo.png" alt="Ver" class="icono-boton" />
</a>
                </div> 
    </div>
    </section>
    </div>`
    const botonesResume = document.querySelectorAll('.boton-resume');

botonesResume.forEach(boton => {
  boton.addEventListener('click', (e) => {
    e.preventDefault();

    const orderNumber = boton.getAttribute('data-order-id');
    const ordenSeleccionada = todasLasOrdenes.find(o => o.order_number === orderNumber);

    if (ordenSeleccionada) {
      localStorage.setItem('ordenDetalle', JSON.stringify(ordenSeleccionada));
      window.open(boton.href, '_blank');
    } else {
      alert('No se encontró la orden seleccionada');
    }
  });
});
            ;
        }
      }
    }
  });
  xhr.open('GET', 'https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming', true);
  xhr.send();
};

// Autocompletar mientras se escribe
input.addEventListener('input', (e) => {
  const valor = e.target.value.trim().toUpperCase();
  sugerenciasBox.innerHTML = '';
  sugerenciasBox.style.display = 'none';

  if (valor.length === 0 || todasLasOrdenes.length === 0) return;

  const coincidencias = todasLasOrdenes.filter(o => o.order_number.startsWith(valor));

  if (coincidencias.length > 0) {
    sugerenciasBox.style.display = 'block';
    coincidencias.forEach(orden => {
      const item = document.createElement('div');
      item.textContent = orden.order_number;
      item.style.padding = '5px';
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
        input.value = orden.order_number;
        sugerenciasBox.innerHTML = '';
        sugerenciasBox.style.display = 'none';
        console.clear();
        console.log("✅ Orden seleccionada:", orden);
      });
      sugerenciasBox.appendChild(item);
    });
  }
});

inputOrderNumber.addEventListener('input', (e) => {
  const valor = e.target.value.trim().toUpperCase();
  const ordenesDOM = document.querySelectorAll('.orden-wrapper');

  ordenesDOM.forEach(orden => {
    const numeroOrden = orden.getAttribute('data-order-number').toUpperCase();
    if (numeroOrden.startsWith(valor) || valor === '') {
      orden.style.display = 'block';
    } else {
      orden.style.display = 'none';
    }
  });
});


// Cerrar sugerencias si haces clic fuera
document.addEventListener('click', (e) => {
  if (!sugerenciasBox.contains(e.target) && e.target !== input) {
    sugerenciasBox.innerHTML = '';
    sugerenciasBox.style.display = 'none';
  }
});

obtenerOrdenes();


