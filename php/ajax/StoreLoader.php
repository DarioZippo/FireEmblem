<?php
	session_start();
	require_once __DIR__ . "./AjaxResponse.php";
	include DIR_DB_UTIL . "sessionUtil.php";
	include DIR_DB_UTIL . "storeUtil.php";

	$response = new AjaxResponse();

	if(!isLogged())
		$response->error("Richiesta rifiutata");

	$store = showStore();
	$code; $message;

	if( isset($store) ) 
	{
		$response->sendBack(0,
							"Ok",
							[ "store" => $store]
							);
	}
	else
		$response->error("Riprova piu' tardi");
	
?>