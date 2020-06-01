<?php
	session_start();
	require_once __DIR__ . "./../AjaxResponse.php";
	include DIR_DB_UTIL . "sessionUtil.php";
	include DIR_DB_UTIL . "storeUtil.php";

	$response = new AjaxResponse();

	if(!isLogged())
		$response->error("Richiesta rifiutata");

    $username = $_POST["username"];
    $item = $_POST["item"];
    $cost = $_POST["cost"];

	$result = buy($username, $item, $cost);
    $code; $message;
    
	if (checkEmptyResult($result))
	{
        $response->error("Empty result");
		return;
    }

	else
	{	
        updateSession();
		$response->sendBack(0,
							"Ok",
							0);
	}

    function checkEmptyResult($result)
    {
		if ($result === null || !$result)
			return true;
	}
?>