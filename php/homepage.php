<?php
	require_once __DIR__ ."/config.php"; 
	session_start();
	require DIR_DB_UTIL."sessionUtil.php";

	if(!isLogged())
	{
		header("Location: ./../index.php");
		exit;
	}

	$_SESSION["onGame"] = false;
?>

<html>
	<head>
		<meta charset="utf-8"> 
    	<meta name = "author" content = "Dario Zippo">
		<meta name = "keywords" content = "Fire Emblem">
		
    	<link rel="shortcut icon" type="image/x-icon" href="./../img" />
		<link rel="stylesheet" href="./../css/FireEmblem.css" type="text/css" media="screen">
		<link rel="stylesheet" href="./../css/homepage.css" type="text/css" media="screen">
		
		<script type="text/javascript" src="./../js/homepage.js"></script>
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
        
        <div id="Wrapper">
			<div id="MenuWrapper">
				<div id="UserInformationsWrapper">
					<p id="UserInformations"></p>
				</div>
				<div id="Menu">
					<a class="bigButton verticalOption purple" href="./../php/game.php">Gioca</a>
					<a class="bigButton verticalOption purple" href="./store.php">Store</a>
					<button class="bigButton verticalOption purple">Classifica</button>
					<button class="bigButton verticalOption purple">Tutorial</button>
					<button class="bigButton verticalOption purple" onclick="logout()">Esci</button>
				</div>
			</div>
		</div>
    </body>
</html>