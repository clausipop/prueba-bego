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

    if (page === "index.php") {
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
