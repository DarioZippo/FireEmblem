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