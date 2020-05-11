<?php
	//Definisce le costanti per l'utilizzo di percorsi assoluti, data la difficile prevedibilità
	//dei percorsi relativi a causa del meccanismo di inclusione
	define ("DIR_BASE", __DIR__ . '/');
	define ("DIR_AJAX", DIR_BASE . 'ajax/');
	define ("DIR_CONST", DIR_BASE . 'constants/');
	define ("DIR_DB_MANAGER", DIR_BASE . 'databaseManager/');
	define ("DIR_DB_UTIL", DIR_BASE . 'util/');
	define ("DIR_LAYOUT", DIR_BASE . 'layout/');
?>