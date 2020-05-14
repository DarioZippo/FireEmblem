<?php
	require_once __DIR__ . "/../config.php";
	require_once DIR_DB_MANAGER . "FireEmblemDBManager.php";
	require_once DIR_DB_UTIL . "sessionUtil.php";

	function showStore()
	{
		global $FireEmblemDB;

		$query = "SELECT * "
				."FROM item "
				."ORDER BY type, cost";

		$result = $FireEmblemDB->performQuery($query);
		
		$FireEmblemDB->CloseConnection();
		return $result;
	}

	function showBoughtItems($user)
	{
		global $FireEmblemDB;

		$query = "SELECT * "
				."FROM inventory "
				."WHERE user = '". $user ."'";

		$result = $FireEmblemDB->performQuery($query);
		
		$FireEmblemDB->CloseConnection();
		return $result;
	}

	function buy($username, $item, $cost)
	{
		global $FireEmblemDB;

		$query = 'INSERT into inventory values (' . '"' . $username . '", ' . '"' .$item. '"); '
				.'UPDATE user '
				.'SET coins = coins - ' . $cost . ' '
				.'WHERE username = ' . '"' . $username . '"' . ';';

		$result = $FireEmblemDB->performMultiQuery($query);

		//checkResult($result,$query);
		//showResult($result);

		$FireEmblemDB->CloseConnection();
		return $result;
	}
?>
