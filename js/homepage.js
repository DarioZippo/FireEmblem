//Gestisce il logout dell'utente tramite AJAX

function load()
{
	getUserInformations();
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
	var element = document.getElementById("UserInformations");
	element.textContent = "User: " + userInfo["username"] + " Coins: " + userInfo["coins"];
}

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