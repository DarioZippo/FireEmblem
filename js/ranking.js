function load()
{
    var handler = function(responseText)
	{
		var response = JSON.parse(responseText);
		if(response["responseCode"] == 0)
		{
			loadRankingRecords(response["data"]);
			getUserInformations(); //Ottiene e mostra i valori di session nella pagina, per poi modificare i record dell'utente corrente
		}
		else
			alert(response["message"]);
	}

	ajaxRequest("./../php/ajax/showRanking.php", "GET", handler);
}

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

function showUserInformations(currentUserData)
{
	var element = document.getElementById("UserInformations");
	element.textContent = "User: " + currentUserData["username"] + " Coins: " + currentUserData["coins"];
}

function loadRankingRecords(data)
{
    for(var i = 0; i < data.length; i++)
    {
		insertRankingRecords(data[i], i + 1);
		/*updateBuyedStoreItem();*/
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

function sortTable(columnTarget, number = false) 
{
	//alert("ok");
	var table, rows, switching, i, x, y, shouldSwitch;
	table = document.getElementById("RankingTable");
	switching = true;
	/* Make a loop that will continue until
	no switching has been done: */
	while (switching == true) 
	{
		// Start by saying: no switching is done:
		switching = false;
		rows = table.rows;
		/* Loop through all table rows (except the
		first, which contains table headers): */
		for (i = 1; i < (rows.length - 1); i++) 
		{
			// Start by saying there should be no switching:
			shouldSwitch = false;
			/* Get the two elements you want to compare,
			one from current row and one from the next: */
			x = rows[i].getElementsByTagName("TD")[columnTarget];
			y = rows[i + 1].getElementsByTagName("TD")[columnTarget];
			// Check if the two rows should switch place:
			if(number == true)
			{
				if (Number(x.childNodes[0].nodeValue) > Number(y.childNodes[0].nodeValue)) 
				{
					// If so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			}
			else
			{
				if (x.childNodes[0].nodeValue.toLowerCase() > y.childNodes[0].nodeValue.toLowerCase() ) 
				{
					// If so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			}
	  	}
		if (shouldSwitch == true) 
		{
			/* If a switch has been marked, make the switch
			and mark that a switch has been done: */
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
		}
	}
}

function showModalChallenge()
{
	var currentRecord = this.parentNode.parentNode; //Il padre è TH, il nonno TR
	var level = currentRecord.children[2].childNodes[0].nodeValue;

	var modalText = document.getElementById("ModalText");
	modalText.childNodes[0].nodeValue += level + "?";

	var modalMenu = document.getElementById("ModalMenu");
	modalMenu.style.display = "block";
}

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
	ajaxRequest("./../php/ajax/PlaySeedLevel.php", "POST", handler, postString);
}