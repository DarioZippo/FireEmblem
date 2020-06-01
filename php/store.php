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

<!doctype html>
<html lang="it">
	<head>
		<meta charset="utf-8"> 
    	<meta name = "author" content = "Dario Zippo">
		<meta name = "keywords" content = "Fire Emblem">
		
    	<link rel="shortcut icon" type="image/x-icon" href="./../img/icons/siteIcon.png">
		<link rel="stylesheet" href="./../css/FireEmblem.css" type="text/css" media="screen">
		<link rel="stylesheet" href="./../css/store.css" type="text/css" media="screen">
		
		<script src="./../js/store.js"></script>
		<script src="./../js/storeItem.js"></script>
		<script src="./../js/ajaxRequest.js"></script>
		<title>Fire Emblem</title>
	</head>

	<body onload="load()">
        <header>
            <img src="./../img/Title/Title.png" alt="Fire Emblem Title" id="TitleImage">
        </header>

		<div id="UserInformationsWrapper">
			<div id="UserInformations">
				<p id="UserInformationsText"></p>
				<span>
					<img src="./../img/icons/coinIcon.png" id="coinsIcon" alt="coin">
				</span>
			</div>
		</div>

		<div id="contentWrapper">
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
		</div>

		<div class="modal" id="ModalMenu">
			<div class="modalContent" id="ModalMenuContent">
				<p class="modalText" id="ModalTextMenu">
					Vuoi acquistare: 
				</p>
				<div id="ModalMenuButtons">
					<button class="bigButton modalButton green" id="ModalButtonBuy">Acquista</button>
					<button class="bigButton modalButton red" id="ModalButtonUndo">Annulla</button>
				</div>
			</div>
		</div>

		<div class="modal" id="ModalBuyResult">
			<div class="modalContent" id="ModalBuyResultContent">
				<p class="modalText" id="ModalTextResult">
				</p>
				<button class="bigButton modalButton red" id="ModalBuyResultButton" onclick="hideModalResult()">Ok</button>
			</div>
		</div>
	</body>
</html>