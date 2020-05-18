function checkEndGame()
{
	if(enemyTeam.length == enemyStat.deadCounter)
	{
		result(true);
	}
	else if(playerTeam.length == playerStat.deadCounter)
	{
		result(false);
	}
	else
	{
		return false;
	}
}

function result(win)
{
	ended = true;

    var reward;

	var modal = document.getElementById("ModalResult");
	modal.style.display = "block";
	
	var modalContent = document.getElementById("ModalResultContent");

	var outcome = document.getElementById("Outcome");
	if(win == true)
	{
		modalContent.style.backgroundColor = "rgba(115, 255, 123, 0.80)";
        outcome.appendChild(document.createTextNode("WIN! :D"));
        
        reward = 100 * playerStat.correntScore;
	}
	else
	{
		modalContent.style.backgroundColor = "rgba(160, 11, 31, 0.80)";
        outcome.appendChild(document.createTextNode("Lose... :("));
        
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
    
    updateDatas(reward);
}

function updateDatas(reward)
{
    var handler = function(responseText)
	{
		var response = JSON.parse(responseText);
		if(response["responseCode"] == 1)
		{
            alert(response["message"]);
        }
	}

    postString = "reward=" + reward;
	ajaxRequest("./../php/ajax/UserUpdate.php", "POST", handler, postString);
}