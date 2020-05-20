<?php
	require_once __DIR__ ."/config.php"; 
	session_start();
	require DIR_DB_UTIL."sessionUtil.php";

	if(!isLogged())
	{
		header("Location: ./../index.php");
		exit;
	}

	$_SESSION["seed"] = "";
?>

<html>
	<head>
		<meta charset="utf-8"> 
    	<meta name = "author" content = "Dario Zippo">
		<meta name = "keywords" content = "Fire Emblem">
		
    	<link rel="shortcut icon" type="image/x-icon" href="./../img/icons/siteIcon.png">
		<link rel="stylesheet" href="./../css/FireEmblem.css" type="text/css" media="screen">
		<link rel="stylesheet" href="./../css/store.css" type="text/css" media="screen">
		
		<script type="text/javascript" src="./../js/store.js"></script>
		<script type="text/javascript" src="./../js/storeItem.js"></script>
		<script type="text/javascript" src="./../js/ajaxRequest.js"></script>
		<title>Fire Emblem</title>
	</head>

	<body onload="load()">
        <header>
            <img src="./../img/Title/Title.png" alt="Fire Emblem Title" id="TitleImage">
            <!--
			<div id="TitleWrapper">
				<img src="./../img/Title/Title.png" alt="Fire Emblem Title" id="TitleImage">
			</div>-->
        </header>
		<div id="UserInformationsWrapper">
			<p id="UserInformations"></p>
		</div>
		<div id="StoreContainer">
			<div id="WeaponWrapper">
				<div id="SwordSection" class="weaponSection">
				</div>

				<div id="LanceSection" class="weaponSection">
				</div>

				<div id="AxeSection" class="weaponSection">
				</div>
			</div>
			
			<div id="ArmorWrapper">
				<div id="ArmorSection">
				</div>
			</div>
		</div>

		<div id="ExitWrapper">
			<div id="ExitOption">
				<a class="purple bigButton" id="ExitButton" href="./homepage.php">Esci</a>
			</div>
		</div>
	</body>
</html>