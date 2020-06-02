<?php
	session_start();
	require_once __DIR__ . "/php/config.php";
    include DIR_DB_UTIL . "sessionUtil.php";

    if (isLogged())
    {
		    header('Location: ./php/homepage.php');
		    exit;
    }	
?>

<!doctype html>
<html lang="it">
	<head>
		<meta charset="utf-8">
		<title>Fire Emblem</title>
		<script src="./js/index.js"></script>
		<script src="./js/ajaxRequest.js"></script>

		<link rel="shortcut icon" type="image/x-icon" href="./img/icons/siteIcon.png">
		<link rel="stylesheet" type="text/css" href="./css/index.css">
		<link rel="stylesheet" type="text/css" href="./css/FireEmblem.css">
	</head>
	<body onload="load()">
		<header>
			<img src="./img/Title/Title.png" alt="Fire Emblem Title" id="TitleImage">
		</header>
		
		<div id="FormWrapper">

			<div id="FormContainer">
				<p id="messageArea" class="hidden"></p>
				<div id="LoginWrapper">
					<p class="inlineP">Accedi</p>
					<button id="loginSwitch" class="simpleButton" onclick="switchToLogIn();" disabled>&#x25BC;</button>
				
					<form id="loginForm" name="loginForm" class="form" autocomplete="on" onsubmit="submitFun(event, 'loginForm');" >
						<input type="text" name="username" placeholder="Username" autofocus data-pattern="^.*$" oninput="this.modified=true; validate_form('loginForm');">
						<input type="password" name="password" placeholder="Password" data-pattern="^.*$" oninput="this.modified=true; validate_form('loginForm');">
						<input id="loginForm.submit" type="submit" class="mediumButton" value="Accedi">
					</form>
				</div>
				
				<div class="form" id="SignInWrapper">
					<p class="inlineP">Registrati</p>
					<button id="signInSwitch" class="simpleButton" onclick="switchToSignIn();">&#x25BC;</button>

					<form id="signInForm" name="signInForm" class="form hidden" autocomplete="off" onsubmit="submitFun(event, 'signInForm');">
						<div class="inputBox">
							<input type="text" name="username" placeholder="Username"  data-pattern='^[a-zA-Z0-9]{5,16}$' data-unique="true" oninput="this.modified=true; validate_form('signInForm');">
						</div>
						<div class="inputBox">
							<input id="password" type="password" name="password" placeholder="Scegli una password" data-pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}' oninput="this.modified=true; validate_form('signInForm');">
							<input id="password_rep" type="password" name="password_rep" placeholder="Scrivila di nuovo" oninput="this.modified=true; validate_form('signInForm')">
						</div>
						<div class="inputBox">
							<input type="text" name="email" placeholder="email" data-pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" data-unique="true" oninput="this.modified=true; validate_form('signInForm');">
						</div>
						<input id="signInForm.submit" type="submit" class="mediumButton" value="Registrati">
					</form>
				</div>
			</div>
		</div>

		<button id="info" class="bigButton purple" onclick="showModalInfo()">Cos'è Fire Emblem?</button>
		
		<div class="modal hidden" id="ModalInfo">
			<div class="modalContent" id="ModalInfoContent">
				<div id="ModalInfoContentWrapper">
					<p>
					<p>
						Fire Emblem è un videogioco strategico a turni in cui il giocatore controlla un team di personaggi con l'obiettivo di sconfiggere il team avversario.<br>
						A tale scopo il giocatore può scegliere tra diversi equipaggiamenti, acquistabili nello store, con cui potenziare i propri personaggi, e sfruttare il sistema di debolezze e resistenze tra le armi a proprio vantaggio negli scontri.<br>
						Una volta effettuata la registrazione e il login, la homepage del sito presenta tre pulsanti che portano a diverse sezioni del sito: "Gioca", "Store", "Classifica" e "Tutorial".
					</p>
					<p>
						Cliccando su "Gioca" si può avviare una nuova partita, dopo aver scelto tra gli equipaggiamenti posseduti dal giocatore.
						Le meccaniche di gioco vengono ben spiegate, con l'ausilio di immagini, nella sezione "Tutorial".<br>
						Se si sconfiggoni tutti i nemici, il giocatore vincerà, mentre se il giocatore perderà tutte le proprie unità, perderà.<br> 
						I punti vengono dati in base alla differenza tra in nemici sconfitti ed i propri personaggi battuti,
						informazioni che vengono costantemente aggiornati nel proprio tabellone, durante la partita.<br>
						In caso di vittoria, il giocatore riceverà un numero di monete pari al proprio punteggio moltiplicato per 100.<br>
						In caso di sconfitta invece riceverà 50 monete.
					</p>
					<p>
						Cliccando su "Classifica" si possono vedere i punteggi propri (evidenziati in rosso) e degli altri giocatori di Fire Emblem, con la relativa posizione in classifica.<br>
						Si possono ordinare le righe della classifica in modo crescente in base a qualsiasi colonna. Basterà cliccare sull'intestazione della colonna interessata.<br>
						In tale sezione è inoltre possibile accedere al meccanismo delle sfide, grazie al quale più giocatori singolarmente possono affrontare partite negli stessi livelli (che altrimenti posizionerebbero gli ostacoli in modo randomico) e con lo stesso livello di difficoltà. Lo scopo di una sfida è quindi quello di raggiungere il miglior punteggio fra tutti coloro che hanno giocato il medesimo livello.<br>
						Per sfidare un giocatore sullo stesso livello, basterà cliccare sul pulsante "Sfida" e continuare tramite il menu' contestuale.
					</p>
					<p>
						Cliccando su "Store" si possono spendere monete di gioco, guadagnate giocando, per acquistare nuovo equipaggiamento quali armi o armature.
					<p>
					</p>
					<button class="bigButton purple" onclick="hideModalInfo()">Esci</button>
				</div>
			</div>
		</div>
	</body>
</html>