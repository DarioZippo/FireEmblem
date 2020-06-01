<?php
	session_start();
	require_once __DIR__ . "./../AjaxResponse.php";
	include DIR_DB_UTIL . "sessionUtil.php";
    include DIR_DB_UTIL . "rankingUtil.php";
    
    $response = new AjaxResponse();

	if(!isLogged())
		$response->error("Richiesta rifiutata");

	$result = showRanking();
	$code; $message;

	if (checkEmptyResult($result))
	{
		$response->error("Empty result");
		return;
	}
	else
	{			
		$index = 0;
		$data = array();
		while ($row = $result->fetch_array(MYSQLI_NUM))
		{			
			$data[$index] = $row;
			$index++;
		}
		
		$response->sendBack(0,
							"Ok",
							$data);
	}

	function checkEmptyResult($result){
		if ($result === null || !$result)
			return true;
			
		return ($result->num_rows <= 0);
	}
?>