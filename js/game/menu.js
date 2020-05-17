var itemValuesList = new Array(); //Un array che detiene i valori di ogni oggetto presente nello store

function showMenu()
{
	var handler = function(responseText)
	{
		var response = JSON.parse(responseText);
		if(response["responseCode"] == 0)
		{
			insertOptions(response["data"]);
			itemValues();
		}
		else
			alert(response["message"]);
	}

	ajaxRequest("./../php/ajax/BoughtItems.php", "GET", handler);
}

function insertOptions(boughtItems)
{
	var currentItem;
	var currentOption;
	var currentSelection;
	for(var i = 0; i < boughtItems.length; i++)
	{
		currentItem = boughtItems[i];

		currentOption = document.createElement("option");
		currentOption.value = currentItem["name"];
		currentOption.appendChild(document.createTextNode(currentItem["name"]));

		currentSelection = document.getElementById(currentItem["type"] + "Selection");
		currentSelection.appendChild(currentOption);
	}
}

function itemValues()
{
	var handler = function(responseText)
	{
		var response = JSON.parse(responseText);
		if(response["responseCode"] == 0)
		{
			insertItemValues(response["data"]);
		}
		else
			alert(response["message"]);
	}

	ajaxRequest("./../php/ajax/StoreLoader.php", "GET", handler);
}

function insertItemValues(items)
{
	var currentItem;
	
	for(var i = 0; i < items.length; i++)
	{
		currentItem = items[i];
		itemValuesList[ currentItem["name"] ] = currentItem["value"];
	}
}

function start()
{
	submitForm();
	startGame();
}

function submitForm()
{
	var menu = document.getElementById("Modal");
	menu.style.display = "none";

	var selections = document.getElementsByClassName("itemSelection");

	playerItems["Armor"] = selections[0].value;
	playerItems["ArmorValue"] = itemValuesList[selections[0].value];

	playerItems["Sword"] = selections[1].value;
	playerItems["SwordValue"] = itemValuesList[selections[1].value];
	
	playerItems["Axe"] = selections[2].value;
	playerItems["AxeValue"] = itemValuesList[selections[2].value];
	
	playerItems["Lance"] = selections[3].value;
	playerItems["LanceValue"] = itemValuesList[selections[3].value];

	var difficult = document.getElementById("DifficultySelection");

	switch(difficult.value)
	{
		case "easy":
			enemyItems["Armor"] = "Armatura di ferro";
			enemyItems["Sword"] = "Spada di ferro";
			enemyItems["Axe"] = "Ascia di ferro";
			enemyItems["Lance"] = "Lancia di ferro";
			break;
		case "medium":
			enemyItems["Armor"] = "Armatura d'acciaio";
			enemyItems["Sword"] = "Spada d'acciaio";
			enemyItems["Axe"] = "Ascia d'acciaio";
			enemyItems["Lance"] = "Lancia d'acciaio";
			break;
		case "hard":
			enemyItems["Armor"] = "Armatura d'argento";
			enemyItems["Sword"] = "Spada d'argento";
			enemyItems["Axe"] = "Ascia d'argento";
			enemyItems["Lance"] = "Lancia d'argento";
			break;
	}
	enemyItems["ArmorValue"] = itemValuesList[enemyItems["Armor"]];
	enemyItems["SwordValue"] = itemValuesList[enemyItems["Sword"]];
	enemyItems["AxeValue"] = itemValuesList[enemyItems["Axe"]];
	enemyItems["LanceValue"] = itemValuesList[enemyItems["Lance"]];
}