<?php
	require_once __DIR__ . "./../AjaxResponse.php";
	include DIR_DB_UTIL . "sessionUtil.php";
	
	$response = new AjaxResponse();

    $result = getSessionValues();

	if($result)
		$response->sendBack(0, "Ok", $result);
	else
		$response->error("Errore: non ho ottenuto i dati della sessione");
?>