let pickupNickname = document.getElementById('pickup-nickname'),
    pickupAdress = document.getElementById('pickup-address'),
    pickupFecha = document.getElementById('pickup-fecha'),
    PickupHora = document.getElementById('pickup-hora'),

    dropoffNickname = document.getElementById('dropoff-nickname'),
    dropoffAdress = document.getElementById('dropoff-address'),
    dropoffFecha = document.getElementById('dropoff-fecha'),
    dropoffHora = document.getElementById('dropoff-hora')
padreStatus = document.getElementById('padreStatus'),
    botonTrackOrder = document.getElementById('botonTrackOrder'),
    /* padre */dataPickup = document.getElementById('dataPickup'),
    direccion = document.getElementById('direccion'),
    fecha = document.getElementById('fecha'),
    telefono= document.getElementById('telefono'),
    email= document.getElementById('email');


    
document.addEventListener('DOMContentLoaded', () => {
    const orden = JSON.parse(localStorage.getItem('ordenDetalle'));

    if (orden && Array.isArray(orden.destinations) && orden.destinations.length >= 2) {
        const pickup = orden.destinations[0];
        const dropoff = orden.destinations[1];

        const formatFecha = (timestamp) => {
            const fecha = new Date(timestamp);
            return fecha.toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: '2-digit' });
        };

        const formatHora = (timestamp) => {
            const fecha = new Date(timestamp);
            return fecha.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
        };

        pickupNickname.textContent = pickup.nickname;
        pickupAdress.textContent = pickup.address;
        pickupFecha.textContent = formatFecha(pickup.start_date);
        PickupHora.textContent = formatHora(pickup.start_date);

        dropoffNickname.textContent = dropoff.nickname;
        dropoffAdress.textContent = dropoff.address;
        dropoffFecha.textContent = formatFecha(dropoff.start_date);
        dropoffHora.textContent = formatHora(dropoff.start_date);
    } else {
        alert('No se encontró la información de la orden.');
    }
});

/* 
console.log(JSON.parse(localStorage.getItem('ordenDetalle'))); */


/* leer data segundo servicio */
function leerDataOrdenes() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);

            const dataOrden = data.result;

            if (dataOrden && typeof dataOrden === 'object') {
                const statusList = dataOrden.status_list.pickup;

                const driver = dataOrden.driver;
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

                let html = '';

                statusList.forEach((item, index) => {
                    const clase = item.active ? 'emoji-check' : 'punto-blanco';
                    html += `<li><span class="${clase}"></span>${item.status}</li>`;
                });

                padreStatus.innerHTML = html;

                if (statusList[3].active === true) {
                    botonTrackOrder.disabled = false;
                    
                } else {
                    botonTrackOrder.disabled = true;
                    botonTrackOrder.style.pointerEvents = 'none';
                }

            const datosDriver = dataOrden.destinations[0];
                direccion.textContent = datosDriver.address
                fecha.textContent = formatFecha(datosDriver.startDate);
                telefono.textContent = datosDriver.contact_info.telephone;
                email.textContent = datosDriver.contact_info.email;
            }
        }
    });

    xhr.open('GET', 'https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders', true);
    xhr.send();
}

leerDataOrdenes();










/* leer data segundo servicio */
/* function leerDataOrdenes() {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      const data = JSON.parse(xhr.responseText);

      const dataOrden = data.result; 

      if (dataOrden && typeof dataOrden === 'object') {
        console.log('Orden recibida:', dataOrden);
      } else {
        console.warn('El campo "result" no es un objeto:', dataOrden);
      }
    } else {
      console.error('Error en la respuesta:', xhr.status);
    }
  });

  xhr.open('GET', 'https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders', true);
  xhr.send();
}

leerDataOrdenes(); */




//acordeón
function toggleAcordeon() {
    const contenido = document.getElementById('contenidoPickup');
    contenido.classList.toggle('activo');
}

