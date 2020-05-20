<?php
	session_start();
	require_once __DIR__ . "./AjaxResponse.php";
	include DIR_DB_UTIL . "sessionUtil.php";

	$response = new AjaxResponse();

	if(!isLogged())
		$response->error("Richiesta rifiutata");

	$result = updateSession($_POST["seed"]);
	
	$code; $message;

	if (!$result)
	{
		$response->error("Update error");
		return;
	}
	else
	{			
		$response->sendBack(0,
							"Ok",
							0);
	}
?>