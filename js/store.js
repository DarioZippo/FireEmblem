function load()
{
    var handler = function(responseText)
	{
		var response = JSON.parse(responseText);
		if(response["responseCode"] == 0)
		{
			loadStoreItems(response["data"]);
		}
	}

    ajaxRequest("./../php/ajax/StoreLoader.php", "GET", handler);
}

function loadStoreItems(data)
{
	//alert("Ciao");
	alert(data.length);
    for(var i = 0; i < data.length; i++)
    {
		alert();
		alert(data[i]);
		alert(data[i].name);
        alert(data[i].item.name);
    }
}