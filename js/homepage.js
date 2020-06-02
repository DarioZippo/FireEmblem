function load()
{
	getUserInformations(); //Ottiene e mostra i valori di session nella pagina
}

function getUserInformations()
{
	var handler = function(responseText)
	{
		var response = JSON.parse(responseText);
		if(response["responseCode"] == 0)
		{
			showUserInformations(response["data"]);
		}
		else
			alert(response["message"]);
	}

	ajaxRequest("./../php/ajax/session/sessionValues.php", "GET", handler);
}

function showUserInformations(userInfo)
{
	var element = document.getElementById("UserInformationsText");
	element.textContent = "User: " + userInfo["username"] + " Coins: " + userInfo["coins"];
}

//Gestisce il logout dell'utente tramite AJAX
function logout()
{
	var handler = function(responseText)
	{
		var response = JSON.parse(responseText);

		if(response["responseCode"] == 0)
			window.location.replace("./../index.php");
	}

	ajaxRequest("./../php/ajax/session/logout.php", "GET", handler);
}

//Mostra la finestra modale
function showModalTutorial()
{
	var modalBuyResult = document.getElementById("ModalTutorial");
	modalBuyResult.style.display = "block";
}

//Nasconde la finestra modale
function hideModalTutorial()
{
	var modalBuyResult = document.getElementById("ModalTutorial");
	modalBuyResult.style.display = "none";
}