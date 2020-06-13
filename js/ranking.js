function load()
{
    var handler = function(responseText)
	{
		var response = JSON.parse(responseText);
		if(response["responseCode"] == 0)
		{
			loadRankingRecords(response["data"]);
			getUserInformations(); 
		}
		else
			alert(response["message"]);
	}

	ajaxRequest("./../php/ajax/ranking/showRanking.php", "GET", handler);
}

//Ottiene e mostra i valori di session nella pagina, per poi modificare i record dell'utente corrente
function getUserInformations()
{
	var currentUserData = new Array();
	var handler = function(responseText)
	{
		var response = JSON.parse(responseText);
		if(response["responseCode"] == 0)
		{
			currentUserData = response["data"];
			currentUserData["coins"] = parseInt(currentUserData["coins"]);
			showUserInformations(currentUserData);
			updateRecordsTarget(currentUserData["username"]);
		}
		else
			alert(response["message"]);
	}

	ajaxRequest("./../php/ajax/session/sessionValues.php", "GET", handler);
}

//Mostra a video i valori di session nella pagina
function showUserInformations(currentUserData)
{
	var element = document.getElementById("UserInformationsText");
	element.textContent = "User: " + currentUserData["username"] + " Coins: " + currentUserData["coins"];
}

//Ottiene e mostra i record della classifica
function loadRankingRecords(data)
{
    for(var i = 0; i < data.length; i++)
    {
		insertRankingRecords(data[i], i + 1);
	}
}

function insertRankingRecords(currentGame, currentPosition)
{
    var table = document.getElementById("RankingTable");

    var record = document.createElement("TR");
	record.className = "record";

    var currentValue;
	var tempButton;

    for(var i = -1; i <= currentGame.length; i++)
    {
        currentValue = document.createElement("TD");
		currentValue.classList.add("recordValue");
		if(i == -1)
		{
			currentValue.appendChild(
				document.createTextNode(currentPosition)
			);
		}
		else if(i == currentGame.length)
		{
			tempButton = document.createElement("button");
			tempButton.appendChild(
				document.createTextNode("Sfida")
			);
			tempButton.classList.add("bigButton", "red");
			tempButton.addEventListener("click", showModalChallenge);

			currentValue.appendChild(tempButton);
		}
		else
		{
			currentValue.appendChild(
				document.createTextNode(currentGame[i])
			);
		}

        record.appendChild(currentValue);
    }

	table.appendChild(record);
}

//Aggiorna i record dell'utente corrente applicando uno sfondo rosso
function updateRecordsTarget(usernameTarget)
{
	var records = document.getElementsByClassName("record");

	var currentUsername;
	
	for(var i = 0; i < records.length; i++)
	{
		currentUsername = records[i].children[1].childNodes[0].nodeValue;

		if(currentUsername == usernameTarget)
		{
			records[i].classList.add("userRecord");
		}
	}
}

//Ordina i record della tabella in base all'attributo cliccato
function sortTable(columnTarget, number = false) 
{
	var table, rows, switching, i, x, y, shouldSwitch;
	table = document.getElementById("RankingTable");
	switching = true;
	/* Crea un ciclo che continuerà finchè verranno eseguiti scambi*/
	while (switching == true) 
	{
		// Comincio dicendo che non ci sono scambi in corso
		switching = false;
		rows = table.rows;
		/* Passa attraverso tutte le righe della tabella (tranne la
		prima, che contiene le intestazioni */
		for (i = 1; i < (rows.length - 1); i++) 
		{
			// Comincio dicendo che non ci dovrebbero essere scambi
			shouldSwitch = false;
			/* Prendo il record corrente ed il prossimo e li confronto */
			x = rows[i].getElementsByTagName("TD")[columnTarget];
			y = rows[i + 1].getElementsByTagName("TD")[columnTarget];

			if(number == true) //Controllo se ho passato alla funzione un numero o una stringa
			{
				if (Number(x.childNodes[0].nodeValue) > Number(y.childNodes[0].nodeValue)) 
				{
					// Se necessitano lo scambio, esco dal ciclo e faccio lo scambio
					shouldSwitch = true;
					break;
				}
			}
			else
			{
				if (x.childNodes[0].nodeValue.toLowerCase() > y.childNodes[0].nodeValue.toLowerCase() ) 
				{
					// Se necessitano lo scambio, esco dal ciclo e faccio lo scambio
					shouldSwitch = true;
					break;
				}
			}
	  	}
		if (shouldSwitch == true) 
		{
			/* Se lo scambio è necessario, lo eseguo e lo segno, così da andare avanti nel ciclo */
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
		}
	}
}

//Mostra la finestra modale per la sfida in livello presente nella classifica
function showModalChallenge()
{
	var currentRecord = this.parentNode.parentNode; //Il padre è TH, il nonno TR
	var level = currentRecord.children[2].childNodes[0].nodeValue;

	var modalText = document.getElementById("ModalText");
	modalText.childNodes[0].nodeValue += level + "?";

	var modalMenu = document.getElementById("ModalMenu");
	modalMenu.style.display = "block";
}

//Avvia una partita tramite il bottone di sfida
function playSeedLevel()
{
	var modalText = document.getElementById("ModalText");
	var textTarget = modalText.childNodes[0].nodeValue;

	textTarget = textTarget.replace(/ /g, "");
	textTarget = textTarget.replace(/\t/g, "");
	textTarget = textTarget.replace(/\n/g, "");
	
	var level = textTarget.slice(textTarget.lastIndexOf(":") + 1, textTarget.length - 1);

	var handler = function(responseText)
	{
		var response = JSON.parse(responseText);
		if(response["responseCode"] == 0)
		{
			window.location.replace("./../php/game.php");
		}
		else
		{
			alert(response["message"]);	
		}
	}
	var postString = "seed=" + level;
	ajaxRequest("./../php/ajax/game/PlaySeedLevel.php", "POST", handler, postString);
}

//Nasconde la finestra modale per la sfida
function undo()
{
	var modalText = document.getElementById("ModalText");
    var modalTextValue = modalText.childNodes[0].nodeValue;
    var currentLevel = modalTextValue.slice(modalTextValue.indexOf(":") + 2, modalTextValue.length);
    
	currentLevel = currentLevel.replace(/\t/g, "");
	currentLevel = currentLevel.replace(/\n/g, "");

    modalTextValue = modalTextValue.replace(currentLevel, ""); //Elimino il livello corrente dalla stringa

	modalText.childNodes[0].nodeValue = modalTextValue;
	
	var modalMenu = document.getElementById("ModalMenu");
    modalMenu.style.display = "none";
}