function checkEndGame()
{
	if(enemyTeam.length == enemyStat.deadCounter)
	{
		result("Vittoria");
	}
	else if(playerTeam.length == playerStat.deadCounter)
	{
		result("Sconfitta");
	}
	else
	{
		return false;
	}
}

//Mostra la finestra modale di resoconto della partita e richiama l'aggiornamento del DB
function result(outcome)
{
	ended = true;

    var reward;

	var modal = document.getElementById("ModalResult");
	modal.style.display = "block";
	
	var modalContent = document.getElementById("ModalResultContent");

	var outcomeElement = document.getElementById("Outcome");
	if(outcome == "Vittoria")
	{
		modalContent.style.backgroundColor = "rgba(115, 255, 123, 0.80)";
        outcomeElement.appendChild(document.createTextNode("WIN! :D"));

        reward = 100 * playerStat.correntScore;
	}
	else
	{
		modalContent.style.backgroundColor = "rgba(160, 11, 31, 0.80)";
        outcomeElement.appendChild(document.createTextNode("Lose... :("));
        
        reward = 50;
	}

	var gameValues = document.getElementById("GameValues");
	gameValues.appendChild(document.createTextNode("Punteggio: " + playerStat.correntScore)); 
	gameValues.appendChild(document.createElement("br"));
	gameValues.appendChild(document.createTextNode("Uccisi: " + playerStat.killedCounter));
	gameValues.appendChild(document.createElement("br"));
	gameValues.appendChild(document.createTextNode("Morti: " + playerStat.deadCounter));												
    
    

	var rewardElement = document.getElementById("Reward");
    rewardElement.appendChild(document.createTextNode(reward + " coins"));
    
    updateDatas(reward, outcome, playerStat.correntScore, turn.number);
}

//Aggiorna il DB aggiungendo il nuovo livello (se non è già presente), la partita nella classifica ed aggiorna il numero di monete dell'utente
function updateDatas(reward, outcome, score, endTurn)
{
    var handler = function(responseText)
	{
		var response = JSON.parse(responseText);
		if(response["responseCode"] == 1)
		{
            alert(response["message"]);
        }
	}

    postString = "reward=" + reward + "&seed=" + seed + "&outcome=" + outcome + "&score=" + score + "&turns=" + endTurn;
	ajaxRequest("./../php/ajax/game/EndGame.php", "POST", handler, postString);
}