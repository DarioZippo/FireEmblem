var duelClick;
var undoClick;

var duelDone = false;

function attackMenu(attacker, defender)
{
	attacker.showStats("Attacker");
	defender.showStats("Defender");

    document.getElementById("DuelWrapper").style.display = "block";

	disableBlocks();
	document.getElementById("BlueTurnButton").disabled = true;
	document.getElementById("RedTurnButton").disabled = true;

	duelClick = function(){duel(attacker, defender)};
	undoClick = function(){undo()};

	activeDuelButtons(attacker.attackPoints);
}

function duel(attacker, defender)
{
	disableDuelButtons();

	var currentDamage = calculateDamage(attacker.attack, attacker.weapon, defender.weapon); //Calcolo l'attacco iniziale	

	//duelResult = ""; //Lo inizializzo a 0
	var duelResult = defender.getDamage(currentDamage, "Defender");
	attacker.attackPoints--;
	if(duelResult == "died")
	{
		attackPhase = false;
		setTimeout( function(){undo();}, 3000);
		setTimeout( function(){attacker.showStats("Attacker");}, 3000);
		return;
	}
	currentDamage = calculateDamage(defender.attack, defender.weapon, attacker.weapon); //Calcolo l'attacco di risposta	

	setTimeout(function(){duelResult = attacker.getDamage(currentDamage, "Attacker");}, 3000);
	setTimeout(
		function()
		{
			attackPhase = false;

			if(duelResult == "died")
			{
				undo();
				setTimeout(function(){defender.showStats("Attacker");}, 1);
				return;
			}
			else
			{ 
				activeDuelButtons();
			}
		}, 5000);
	
}

function calculateDamage(currentDamage, attackerWeapon, defenderWeapon)
{
	if(attackerWeapon != defenderWeapon)
	{
		var modifier = currentDamage / 2;

		if(attackerWeapon == "Sword")
		{
			if(defenderWeapon == "Axe")
			{
				currentDamage = currentDamage + modifier;
			}
			if(defenderWeapon == "Lance")
			{
				currentDamage = currentDamage - modifier;
			}
		}

		if(attackerWeapon == "Axe")
		{
			if(defenderWeapon == "Lance")
			{
				currentDamage = currentDamage + modifier;
			}
			if(defenderWeapon == "Sword")
			{
				currentDamage = currentDamage - modifier;
			}
		}
		
		if(attackerWeapon == "Lance")
		{
			if(defenderWeapon == "Sword")
			{
				currentDamage = currentDamage + modifier;
			}
			if(defenderWeapon == "Axe")
			{
				currentDamage = currentDamage - modifier;
			}
		}
	}
	return currentDamage;
}

function undo()
{
	cleanStats("Attacker");
	cleanStats("Defender");
	

	document.getElementById("DuelWrapper").style.display = "none";
	
	turn.activeTurnButton();
	
	disableDuelButtons();
	
	activeBlocks();
}

function disableDuelButtons()
{
	var duelButton = document.getElementById("DuelButton");
	var undoButton = document.getElementById("UndoButton");

	duelButton.removeEventListener("click", duelClick);
	undoButton.removeEventListener("click", undoClick);

	duelButton.disabled = true;
	undoButton.disabled = true;
}

function activeDuelButtons(attackPoints)
{
	var duelButton = document.getElementById("DuelButton");
	var undoButton = document.getElementById("UndoButton");

	if(turn.teamName == enemyTeamColor)
	{
		undoButton.style.display = "none";
		duelButton.style.display = "block";
		duelButton.style.height= "100%";
		return;
	}
	
	undoButton.style.display = "block";
	undoButton.disabled = false;
	undoButton.addEventListener("click", undoClick);

	if(attackPoints > 0)
	{
		duelButton.disabled = false;
		duelButton.addEventListener("click", duelClick);
		duelButton.style.display = "block";
		duelButton.style.height = "50%";
		undoButton.style.height= "50%";
	}
	else
	{
		duelButton.style.display = "none";
		undoButton.style.height= "100%";
	}
}