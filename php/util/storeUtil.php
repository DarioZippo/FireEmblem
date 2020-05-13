<?php
	require_once __DIR__ . "/../config.php";
	require_once DIR_DB_MANAGER . "FireEmblemDBManager.php";

	function showStore()
	{
		global $FireEmblemDB;

		$query = "SELECT * "
				."FROM item "
				."ORDER BY type, cost";

		$result = $FireEmblemDB->performQuery($query);
		
		if (!$result) {
			echo 'Invalid query: ' . $FireEmblemDB->error; 
		}
		
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
		
		if (!$result) {
			echo 'Invalid query: ' . $FireEmblemDB->error; 
		}
		
		$FireEmblemDB->CloseConnection();
		return $result;
	}

?>
