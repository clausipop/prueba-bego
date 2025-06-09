<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cargo Orders</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
</head>

<script>
    const btnBack = document.getElementById('btnBack');
    const path = window.location.pathname;

    const page = path.split("/").pop();

    if (page === "index.html") {
      btnBack.style.display = "none";
    } else {
      btnBack.style.display = "block"; 
    }
</script>

<body>
    <header class="contenido-textos barra-nav">

        <a id="btnBack" href="index.php"><span class="material-symbols-outlined">arrow_back_ios</span></a>
        <div class="titulo-header">Cargo orders</div>
        <span class="material-symbols-outlined notificacion">notifications</span>

    </header>
<?php
$orderNumber = $_GET['order'] ?? '';
?>

<main>
<div id="contenido-general">
  <section class="separador contenido-textos">
    <div class="contenedor-segunda">
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
              <p id="pickup-nickname" class="texto-s"></p>
              <p id="pickup-address" class="texto-s texto-secundario"></p>
            </div>
            <div class="contenido-textos fechahora">
              <p id="pickup-fecha" class="texto-s texto-secundario"></p>
              <p id="pickup-hora"></p>
            </div>
          </div>
  
          <div class="seccion-textos dos">
            <div class="seccion-info contenido-textos">
              <p class="texto-s texto-secundario">DROPOFF</p>
              <p id="dropoff-nickname" class="texto-s"></p>
              <p id="dropoff-address" class="texto-s texto-secundario"></p>
            </div>
            <div class="contenido-textos fechahora">
              <p id="dropoff-fecha" class="texto-s texto-secundario"></p>
              <p id="dropoff-hora"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
      <div class="separador"></div>
      <section class="separador contenido-textos">
  
          <div class="contenedor-conductor ">
              <div class="imagen-conductor">
                  <img src="assets/img/Image.png" alt="Foto de persona" class="foto-persona">
              </div>
  
              <p class="hora">10:30pm</p>
  
              <ul id="padreStatus" class="lista-estados texto-md">
                  <!-- <li><span class="emoji-check"></span> Create order</li>
                  <li><span class="emoji-check"></span> Accepted order</li>
                  <li><span class="punto-blanco"></span> Pick up by William</li>
                  <li><span class="punto-blanco"></span> Pick up completed</li> -->
              </ul>
  
              <button id="botonTrackOrder" class="boton-track contenido-textos">Track order</button>
          </div>
      </section>
  
      <section class="separador">
          <div class="acordeon-container ">
              <button class="acordeon-boton" onclick="toggleAcordeon()">
                  <span class="contenido-textos">Pickup data</span>
                  <span><img src="assets/img/flechaa.png" alt=""></span>
              </button>
  
              <div class="acordeon-contenido contenido-textos " id="contenidoPickup">
                  <div id="dataPickup">
                      <p id="direccion"></p>
                      <p id="fecha"></p>
                      <p id="telefono"></p>
                      <p id="email"></p>
                  </div>
              </div>
          </div>
      </section>
</div>
    
</main>
<script src="js/details.js" ></script>