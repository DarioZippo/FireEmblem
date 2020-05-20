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
		<link rel="stylesheet" href="./../css/ranking.css" type="text/css" media="screen">
		
		<script type="text/javascript" src="./../js/ranking.js"></script>
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

        <div id="RankingWrapper">
                       
            <table id="RankingTable">
				<tbody>
					<caption class="recordValue" id="RankingCaption">CLASSIFICA</caption>
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
				<button class="bigButton red" id="ModalButton" onclick="playSeedLevel()">Gioca!</button>
			</div>
		</div>
    </body>
</html>