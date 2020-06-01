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
		<link rel="stylesheet" href="./../css/ranking.css" type="text/css" media="screen">
		
		<script src="./../js/ranking.js"></script>
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

		<div id="ExitOption">
				<a class="purple bigButton" id="ExitButton" href="./homepage.php">Esci</a>
		</div>

        <div id="RankingWrapper">
                       
            <table id="RankingTable">
				<caption class="recordValue" id="RankingCaption">CLASSIFICA</caption>
				<tbody>
					<tr class="recordHeaders">
					<th class="recordValue rankingHeader" onclick="sortTable(0, true)">Posizione</th>
						<th class="recordValue rankingHeader" onclick="sortTable(1)">User</th>
						<th class="recordValue rankingHeader" onclick="sortTable(2)">Level</th>
						<th class="recordValue rankingHeader" onclick="sortTable(3)">Esito</th>
						<th class="recordValue rankingHeader" onclick="sortTable(4, true)">Punteggio</th>
						<th class="recordValue rankingHeader" onclick="sortTable(5, true)">Turni</th>
						<th class="recordValue rankingHeader" onclick="sortTable(6)">Data</th>
						<th class="recordValue"></th>
					</tr>
				</tbody>
			</table>
        
		</div>
		
		<div class="modal" id="ModalMenu">
			<div class="modalContent" id="ModalMenuContent">
				<p id="ModalText">
					Vuoi affrontare il livello:
				</p>
				<button class="bigButton modalButton red" id="ModalButtonPlay" onclick="playSeedLevel()">Gioca!</button>
				<button class="bigButton modalButton red" id="ModalButtonUndo" onclick="undo()">Annulla</button>
			</div>
		</div>
    </body>
</html>