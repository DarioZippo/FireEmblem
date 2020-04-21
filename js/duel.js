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

	var result = defender.getDamage(attacker.attack, "Defender");
	attacker.attackPoints--;
	if(result == "died")
	{
		attackPhase = false;
		setTimeout( function(){undo();}, 3000);
		setTimeout( function(){attacker.showStats("Attacker");}, 3000);
		return;
	}	
	setTimeout(function(){attacker.getDamage(defender.attack, "Attacker")}, 3000);
	attackPhase = false;

	setTimeout(function(){activeDuelButtons();}, 5000);
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

	undoButton.disabled = false;
	undoButton.addEventListener("click", undoClick);

	if(attackPoints > 0)
	{
		duelButton.disabled = false;
		duelButton.addEventListener("click", duelClick);
		duelButton.style.display = "block";
		undoButton.style.height= "50%";
	}
	else
	{
		duelButton.style.display = "none";
		undoButton.style.height= "100%";
	}
}