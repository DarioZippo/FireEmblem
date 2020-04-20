var duelClick;
var undoClick;

var duelDone = false;

function attackMenu(attacker, defender)
{
	attacker.showStats("Attacker");
	defender.showStats("Defender");

    document.getElementById("DuelWrapper").style.display = "block";

	disableBlocks();

	duelClick = function(){duel(attacker, defender)};
	undoClick = function(){undo()};

	activeDuelButtons();
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

	activeDuelButtons();
}

function undo()
{
	cleanStats("Attacker");
	cleanStats("Defender");

	document.getElementById("DuelWrapper").style.display = "none";

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

function activeDuelButtons()
{
	var duelButton = document.getElementById("DuelButton");
	var undoButton = document.getElementById("UndoButton");

	duelButton.disabled = false;
	undoButton.disabled = false;

	duelButton.addEventListener("click", duelClick);
	undoButton.addEventListener("click", undoClick);
}