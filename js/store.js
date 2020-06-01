var items = new Array(); //Array che salva in locale gli oggetti ottenuti dal database
var currentUserData = new Array(); //Array che salva in locale i valori di sessione ottenuti dal database

function load()
{
	getUserInformations(); //Ottiene e mostra i valori di session nella pagina

    var handler = function(responseText)
	{
		var response = JSON.parse(responseText);
		if(response["responseCode"] == 0)
		{
			loadStoreItems(response["data"]);
			refreshStore(); //Aggiorna gli oggetti già venduti all'utente corrente
		}
		else
			alert(response["message"]);
	}

	ajaxRequest("./../php/ajax/store/StoreLoader.php", "GET", handler); //Ottiene gli oggetti venduti nello store e li carica nella pagina 
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
	var element = document.getElementById("UserInformationsText");
	element.textContent = "User: " + currentUserData["username"] + " Coins: " + currentUserData["coins"];
}

function loadStoreItems(data)
{
    for(var i = 0; i < data.length; i++)
    {
		insertStoreItem(data[i]);
	}
	addEvents();
}

function insertStoreItem(currentItem)
{
	var element = document.createElement("DIV");
	element.className = "item " + currentItem["type"];

	var image = document.createElement("IMG");
	image.src = "./../img/Items/" + currentItem["name"].replace(/ /g, "_") + ".png";
	image.className = "itemImage";
	image.alt = currentItem["name"];
	
	var informationsWrapper = document.createElement("DIV");
	informationsWrapper.className = "informationsWrapper";

	var nameWrapper = document.createElement("DIV");
	nameWrapper.className = "valueWrapper";

	var nameTitle = document.createElement("P");
	nameTitle.className = "itemTitle";
	nameTitle.textContent = "Nome";

	var name = document.createElement("P");
	name.className = "itemValue";
	name.textContent = currentItem["name"];

	var bonusWrapper = document.createElement("DIV");
	bonusWrapper.className = "valueWrapper";

	var bonusTitle = document.createElement("P");
	bonusTitle.className = "itemTitle";
	bonusTitle.textContent = "Bonus";

	var bonus = document.createElement("P");
	bonus.className = "itemValue";
	bonus.textContent = currentItem["value"];

	var priceWrapper = document.createElement("DIV");
	priceWrapper.className = "valueWrapper";

	var priceTitle = document.createElement("P");
	priceTitle.className = "itemTitle";
	priceTitle.textContent = "Prezzo";

	var price = document.createElement("P");
	price.className = "itemValue";
	price.textContent = currentItem["cost"];

	element.appendChild(image);

	nameWrapper.appendChild(nameTitle);
	nameWrapper.appendChild(name);

	bonusWrapper.appendChild(bonusTitle);
	bonusWrapper.appendChild(bonus);

	priceWrapper.appendChild(priceTitle);
	priceWrapper.appendChild(price);

	informationsWrapper.appendChild(nameWrapper);
	informationsWrapper.appendChild(bonusWrapper);
	informationsWrapper.appendChild(priceWrapper);

	element.appendChild(informationsWrapper);

	var sectionTarget = document.getElementById(currentItem["type"] + "Section");
	sectionTarget.appendChild(element);

	items.push(new Item(element, currentItem["cost"], currentItem["name"]) ); //Aggiorna l'array Items con i valori del nuovo oggetto aggiunto nel sito
}

//Rende interattivi gli oggetti nella pagina
function addEvents()
{
	for(let i = 0; i < items.length; i++)
	{
		items[i].element.addEventListener("mouseover", items[i].hover);
		items[i].element.addEventListener("mouseout", items[i].out);
		items[i].element.addEventListener("click", items[i].click);
	}
}

//Mostra il risultato dell'acquisto tramite una finestra modale
function showModalResult(bought)
{
	var modalBuyResult = document.getElementById("ModalBuyResult");
	var modalBuyResultContent = document.getElementById("ModalBuyResultContent");
	var modalTextResult = document.getElementById("ModalTextResult");
	if(bought == true)
	{
		modalBuyResultContent.style.backgroundColor = "rgba(115, 255, 123, 0.80)";
		modalTextResult.childNodes[0].nodeValue = "Acquistato! :D"
	}
	else
	{
		modalBuyResultContent.style.backgroundColor = "rgba(160, 11, 31, 0.80)";
		modalTextResult.childNodes[0].nodeValue = "Non hai abbastanza monete... :(";
	}
	modalBuyResult.style.display = "block";
}

//Nasconde la finestra modale
function hideModalResult()
{
	var modalBuyResult = document.getElementById("ModalBuyResult");
	modalBuyResult.style.display = "none";
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

	ajaxRequest("./../php/ajax/store/BoughtItems.php", "GET", handler);
}

//Aggiorna lo stato degli oggetti acquistati, cambiandone lo stile e rimuovendo gli event listener
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