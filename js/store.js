var items = new Array();
var currentUserData = new Array();

function load()
{
	getUserInformations(); //Ottiene e mostra i valori di session nella pagina

    var handler = function(responseText)
	{
		var response = JSON.parse(responseText);
		if(response["responseCode"] == 0)
		{
			loadStoreItems(response["data"]);
			refreshStore();
		}
		else
			alert(response["message"]);
	}

	ajaxRequest("./../php/ajax/StoreLoader.php", "GET", handler);
}

function getUserInformations()
{
	var handler = function(responseText)
	{
		var response = JSON.parse(responseText);
		if(response["responseCode"] == 0)
		{
			currentUserData = response["data"];
			currentUserData["coins"] = parseInt(currentUserData["coins"]);
			showUserInformations(currentUserData);
		}
		else
			alert(response["message"]);
	}

	ajaxRequest("./../php/ajax/session/sessionValues.php", "GET", handler);
}

function showUserInformations()
{
	var element = document.getElementById("UserInformations");
	element.textContent = "User: " + currentUserData["username"] + " Coins: " + currentUserData["coins"];
}

function loadStoreItems(data)
{
    for(var i = 0; i < data.length; i++)
    {
		insertStoreItem(data[i]);
		/*updateBuyedStoreItem();*/
	}
	addEvents();
}

function insertStoreItem(currentItem)
{
	var element = document.createElement("DIV");
	element.className = "item " + "weapon " + currentItem["type"];

	var image = document.createElement("IMG");
	image.src = "./../img/Items/" + currentItem["name"].replace(/ /g, "_") + ".png";
	image.className = "itemImage";
	
	var name = document.createElement("P");
	name.className = "itemName";
	name.textContent = currentItem["name"];

	var price = document.createElement("P");
	price.className = "itemPrice";
	price.textContent = currentItem["cost"];

	element.appendChild(image);
	element.appendChild(name);
	element.appendChild(price);

	var sectionTarget = document.getElementById(currentItem["type"] + "Section");
	sectionTarget.appendChild(element);

	items.push(new Item(element, currentItem["cost"], currentItem["name"]) );
}

function addEvents()
{
	for(let i = 0; i < items.length; i++)
	{
		items[i].element.addEventListener("mouseover", items[i].hover);
		items[i].element.addEventListener("mouseout", items[i].out);
		items[i].element.addEventListener("click", items[i].click);
	}
}

function refreshStore()
{
	var handler = function(responseText)
	{
		var response = JSON.parse(responseText);
		if(response["responseCode"] == 0)
		{
			updateBought(response["data"]);
		}
		else
			alert(response["message"]);
	}

	ajaxRequest("./../php/ajax/BoughtItems.php", "GET", handler);
}

function updateBought(data)
{
	for(var i = 0; i < data.length; i++)
	{
		for(var j = 0; j < items.length; j++)
		{
			if(data[i]["item"] == items[j].name)
			{
				items[j].bought();
			}
		}
	}
}