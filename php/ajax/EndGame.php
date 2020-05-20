<?php
	session_start();
	require_once __DIR__ . "./AjaxResponse.php";
	include DIR_DB_UTIL . "sessionUtil.php";
	include DIR_DB_UTIL . "rankingUtil.php";

	$response = new AjaxResponse();

	if(!isLogged())
		$response->error("Richiesta rifiutata");

	$result = addCoins($_SESSION["username"], $_POST["reward"]);
	
	$code; $message;

	if (!$result)
	{
		$response->error("Update coins error");
		return;
	}
	else
	{
		$found = showLevel($_POST["seed"]);

		if(checkEmptyResult($found))
		{
			$result = insertLevel($_POST["seed"]);
			if (!$result)
			{
				$response->error("Insert level error");
				return;
			}
		}

		$result = updateRanking($_SESSION["username"], $_POST["seed"], $_POST["outcome"], $_POST["score"], $_POST["turns"]);
		if (!$result)
		{
			$response->error("update ranking error");
			return;
		}


		updateSession();
		$response->sendBack(0,
							"Ok",
							0);
	}

	function checkEmptyResult($result)
	{
		if ($result === null || !$result)
			return true;
			
		return ($result->num_rows <= 0);
	}
?>