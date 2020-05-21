<?php
	require_once __DIR__ ."/config.php"; 
	session_start();
	require DIR_DB_UTIL."sessionUtil.php";

	if(!isLogged())
	{
		header("Location: ./../index.php");
		exit;
	}
?>

<!doctype html>
<html lang="it">
	<head>
		<meta charset="utf-8"> 
    	<meta name = "author" content = "Dario Zippo">
		<meta name = "keywords" content = "Fire Emblem">
		
    	<link rel="shortcut icon" type="image/x-icon" href="./../img/icons/siteIcon.png">
		<link rel="stylesheet" href="./../css/FireEmblem.css" type="text/css" media="screen">
		<link rel="stylesheet" href="./../css/game.css" type="text/css" media="screen">
		
		<script src="./../js/ajaxRequest.js"></script>
		<script src="./../js/game/menu.js"></script>
		<script src="./../js/game/game.js"></script>
		<script src="./../js/game/turn.js"></script>
		<script src="./../js/game/board.js"></script>
		<script src="./../js/game/block.js"></script>
		<script src="./../js/game/area.js"></script>
		<script src="./../js/game/character.js"></script>
		<script src="./../js/game/enemy.js"></script>
		<script src="./../js/game/duel.js"></script>
		<script src="./../js/game/util.js"></script>
		<script src="./../js/game/teamStat.js"></script>
		<script src="./../js/game/endGame.js"></script>
		<title>Fire Emblem</title>
	</head>
	<body onLoad="begin()">
		<header>
			<img src="./../img/Title/Title.png" alt="Fire Emblem Title" id="TitleImage">
			<!--<div id="TitleWrapper">
				<img src="./../img/Title/Title.png" alt="Fire Emblem Title" id="TitleImage">
			</div>-->
		</header>

		<div id="ExitOption">
			<a class="purple bigButton" id="ExitButton" href="./homepage.php">Esci</a>
		</div>

		<div id="GameWrapper">

			<div id="TurnTableWrapper">
				<table  id="TurnTable">
					<tbody id="TurnTableBody">
						<tr>
							<th class="turnTableBlock">
								Turno
							</th>
							<th class="turnTableBlock">
								Squadra
							</th>
						</tr>
						<tr>
							<td id="TurnNumber" class="turnTableBlock">

							</td>
							<td id="TurnTeam" class="turnTableBlock">

							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div id="GameWrapper2">
				
				<div id="BlueStatsWrapper" class="teamStatsWrapper">
					<table id="BlueStatsTable" class="teamStatsTable">
						<tbody id="BlueStatsTableBody" class="teamStatsTableBody">
							<tr>
								<th id="BlueStatsTitle" class="teamStatsTitle" colspan="2">Blue Team</th>
							</tr>
							<tr>
								<th id="BlueKilledCounterTitle" class="statTitle">Uccisi</th>
								<th id="BlueDeadCounterTitle" class="statTitle">Morti</th>
							</tr>
							<tr>
								<td id="BlueKilledCounter" class="counter">0</td>
								<td id="BlueDeadCounter" class="counter">0</td>
							</tr>
							<tr>
								<th id="BlueScoreTitle" class="statTitle" colspan="2">Punteggio</th>
							</tr>
							<tr>
								<td id="BlueScore" class="score" colspan="2">0</td>
							</tr>
							<tr>
								<td colspan="2">
									<button id="BlueTurnButton" class="turnButton" disabled>End Turn</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div id="BoardWrapper">
					<div id="Board">
						<!-- Qui la roba viene aggiunta via DOM -->
					</div>

					<div class="stats" id="StatsAttacker">
						<div class="characterPortraitWrapper" id="CharacterPortraitWrapperAttacker">
							<img class="characterPortrait" id="CharacterPortraitAttacker" alt="Character" src="./">
						</div>
						<div class="valuesWrapper" id="ValuesWrapperAttacker">
							<div id="CharacterNameAttackerWrapper" class="value">
								<p id="CharacterNameAttacker" class="valueText">Nome:-- </p>
							</div>
							<div id="PSAttackerWrapper" class="value">
								<p id="PSAttacker" class="valueText">Ps:--</p>
								<img class="armorImage" id="ArmorImageAttacker" alt="Armor" src="./">
							</div>
							<div id="CharacterWeaponAttackerWrapper" class="value">
								<p id="CharacterWeaponAttacker" class="valueText">Arma:--</p>
								<img class="weaponImage" id="WeaponImageAttacker" alt="Weapon" src="./">
							</div>
							<!--<div class="pointsWrapper" id="PointsWrapperAttacker">-->
							<!--	<div class="value" id="MovePointsAttacker">Move Points:--</div>
								<div class="value" id="AttackPointsAttacker">Attack Points:--</div> -->
							<!--</div>-->
						</div>
					</div>

					<div id="DuelWrapper">
						<div id="ButtonWrapper">
							<button id="DuelButton" class="duelMenuButton" disabled>DUEL</button>
							<button id="UndoButton" class="duelMenuButton" disabled>UNDO</button>
						</div>
						<div class="stats" id="StatsDefender">
							<div class="characterPortraitWrapper" id="CharacterPortraitWrapperDefender">
								<img class="characterPortrait" id="CharacterPortraitDefender" alt="Character" src="./">
							</div>
							<div class="valuesWrapper" id="ValuesWrapperDefender">
								<div id="CharacterNameDefenderWrapper" class="value">
									<p id="CharacterNameDefender" class="valueText">Nome:--</p>
								</div>
								<div id="PSDefenderWrapper" class="value">
									<p id="PSDefender" class="valueText">Ps:--</p>
									<img class="armorImage" id="ArmorImageDefender" alt="Armor" src="./">
								</div>
								<div id="CharacterWeaponDefenderWrapper" class="value">
									<p id="CharacterWeaponDefender" class="valueText">Arma:--</p>
									<img class="weaponImage" id="WeaponImageDefender" alt="Weapon" src="./">
								</div>
								<!--<div class="pointsWrapper" id="PointsWrapperDefender">-->
								<!--	<div class="value" id="MovePointsDefender">Move Points:--</div>
									<div class="value" id="AttackPointsDefender">Attack Points:--</div> -->
								<!--</div>-->
							</div>
						</div>

					</div>
				</div>

				<div id="RedStatsWrapper" class="teamStatsWrapper">
					<table id="RedStatsTable" class="teamStatsTable">
						<tbody id="RedStatsTableBody" class="teamStatsTableBody">
							<tr>
								<th id="RedStatsTitle" class="teamStatsTitle" colspan="2">Red Team</th>
							</tr>
							<tr>
								<th id="RedKilledCounterTitle" class="statTitle">Uccisi</th>
								<th id="RedDeadCounterTitle" class="statTitle">Morti</th>
							</tr>
							<tr>
								<td id="RedKilledCounter" class="counter">0</td>
								<td id="RedDeadCounter" class="counter">0</td>
							</tr>
							<tr>
								<th id="RedScoreTitle" class="statTitle" colspan="2">Punteggio</th>
							</tr>
							<tr>
								<td id="RedScore" class="score" colspan="2">0</td>
							</tr>
							<tr>
								<td colspan="2">
									<button id="RedTurnButton" class="turnButton" disabled>End Turn</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<!-- Menu iniziale di selezione oggetti -->
		<div class="modal" id="ModalMenu">
			<div class="modalContent" id="ModalMenuContent">
				<div class="itemSelectionWrapper selectionWrapper">
					<label for="ArmorSelection">Armor type:</label>
						<select id="ArmorSelection" class="itemSelection" name="Armors">
						
						</select><br><br>
				</div>
				<div class="itemSelectionWrapper selectionWrapper">
					<label for="SwordSelection">Sword type:</label>
						<select id="SwordSelection" class="itemSelection" name="Swords">
							
						</select><br><br>
				</div>
				<div class="itemSelectionWrapper selectionWrapper">
					<label for="AxeSelection">Axe type:</label>
						<select id="AxeSelection" class="itemSelection" name="Axes">
						
						</select><br><br>
				</div>
				<div class="itemSelectionWrapper selectionWrapper">
					<label for="LanceSelection">Lance type:</label>
						<select id="LanceSelection" class="itemSelection" name="Lances">
							
						</select><br><br>
				</div>
				
				<div class="difficultySelectionWrapper selectionWrapper">
					<label for="DifficultySelection">Difficolta':</label>
							<select id="DifficultySelection" name="Difficult">
								<option value="easy">Facile</option>
								<option value="medium">Medio</option>
								<option value="hard">Difficile</option>
							</select><br><br>
				</div>
				<div id="SubmitWrapper">
					<button id="Submit" class="bigButton purple" onclick="start()">Submit</button>
				</div>	
			</div>
		</div>
		<!--Pop-up di resoconto dopo la fine di una partita-->
		<div class="modal" id="ModalResult">
			<div class="modalContent" id="ModalResultContent">
				<p id="Outcome" class="resultText">
					
				</p>
				<p id="GameValues" class="resultText">

				</p>
				<p id="Reward" class="resultText">

				</p>
				<a class="bigButton purple" href="./homepage.php">Esci</a>
			</div>
		</div>

	</body>
</html>