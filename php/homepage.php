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
		<link rel="stylesheet" href="./../css/homepage.css" type="text/css" media="screen">
		
		<script src="./../js/homepage.js"></script>
		<script src="./../js/ajaxRequest.js"></script>
		<title>Fire Emblem</title>
	</head>
	<body onload="load()">
        <header>
            <img src="./../img/Title/Title.png" alt="Fire Emblem Title" id="TitleImage">
        </header>
        
        <div id="Wrapper">
			<div id="MenuWrapper">
				<div id="UserInformationsWrapper">
					<div id="UserInformations">
						<p id="UserInformationsText"></p>
						<span>
							<img src="./../img/icons/coinIcon.png" id="coinsIcon" alt="coin">
						</span>
					</div>
				</div>

				<div id="Menu">
					<a class="bigButton verticalOption purple" href="./../php/game.php">Gioca</a>
					<a class="bigButton verticalOption purple" href="./store.php">Store</a>
					<a class="bigButton verticalOption purple" href="./ranking.php">Classifica</a>
					<button class="bigButton verticalOption purple">Tutorial</button>
					<button class="bigButton verticalOption purple" onclick="logout()">Esci</button>
				</div>
			</div>
		</div>
    </body>
</html>