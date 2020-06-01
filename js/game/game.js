var board = null;
var characters = null;
var xLen = 9;
var yLen = 6;

var seed = "";

var playerItems = new Array(); //Gli oggetti selezionati nel menu
var enemyItems = new Array(); //Gli oggetti basati sulla difficolta' selezionata nel menu

var movementLength = 2; //Ampiezza dell'area di movimento
var attackLength = 1; //Ampiezza dell'area di attacco

var teams = ["Blue", "Red"]; //Array che registra i team coinvolti

var playerTeamColor = teams[0];
var enemyTeamColor = teams[1];

var playerTeam = new Array();
var enemyTeam = new Array();

var turn;

var movePhase = false;
var attackPhase = false;

var selectedBlock = {
	x : null,
	y : null
};

var ended;

function begin()
{
	board = new Board();

	getSessionSeed();

	showMenu();
}

//Richiede via ajax il seed salvato nella session
//Se non c'è, il livello verrà creato randomicamente e la difficoltà sarà selezionabile dall'utente
//Se c'è, creerà il livello basandosi solo sul seed, ed la difficoltà sarà settata in base al seed
function getSessionSeed()
{
	var handler = function(responseText)
	{
		var response = JSON.parse(responseText);
		if(response["responseCode"] == 0)
		{
			var currentUserData = response["data"];
			buildBoard(currentUserData["seed"]);
		}
		else
			alert(response["message"]);
	}

	ajaxRequest("./../php/ajax/session/sessionValues.php", "GET", handler);
}

function buildBoard(currentSeed)
{
	if(currentSeed == "")
	{
		board.randomObstacles();
	}
	else
	{
		board.seedObstacles(currentSeed);
		//Imposto la difficoltà e la fisso nel menu iniziale
		var difficult = parseInt(currentSeed[currentSeed.length - 1]);
		
		var difficultySelection = document.getElementById("DifficultySelection");
		difficultySelection.getElementsByTagName("option")[difficult].selected = "selected";

		difficultySelection.disabled = "true";
	}
}

function startGame()
{
	characters = new Array();
	characters[0] = new Character("Bylet(M)", yLen-1, 0, "Sword", "Blue");
	characters[1] = new Character("Hilda", yLen-1, Math.floor(xLen / 2), "Axe", "Blue");
	characters[2] = new Character("Claude", yLen-1, xLen-1, "Lance", "Blue");
	characters[3] = new Character("Felix", yLen-2, xLen-3, "Sword", "Blue");
	characters[4] = new Character("Dorothea", yLen-2, 2, "Lance", "Blue");

	characters[5] = new Character("Edelgard", 0, 0, "Axe", "Red");
	characters[6] = new Character("Dimitri", 0, Math.floor(xLen / 2), "Lance", "Red");
	characters[7] = new Character("Petra", 0, xLen-1, "Sword", "Red");
	characters[8] = new Character("Bylet(F)", 1, xLen-3, "Sword", "Red");
	characters[9] = new Character("Sylvain", 1, 2, "Lance", "Red");
	
	buildTeams();

	updateBoardCharacters();
	turn = new Turn();
}

function buildTeams()
{
	for(var i = 0; i < characters.length; i++)
	{
		if(characters[i].team == playerTeamColor)
		{
			playerTeam.push(characters[i]);
		}
		else
		{
			enemyTeam.push(characters[i]);
		}
	}
}

//Aggiorna la posizione dei personaggi nella board
function updateBoardCharacters()
{
	var currentX, currentY;
	var currentBlock;
	var imageWrapper;
	for (var i = 0; i < characters.length; i++) 
	{
		if(characters[i].alive == true)
		{
			currentX = characters[i].x;
			currentY = characters[i].y;
			currentBlock = board.blocks[currentX * xLen + currentY];
			
			if(currentBlock.occupied == false)
			{
				currentBlock.occupied = true;
				currentBlock.occupier = characters[i].name;
				currentBlock.team = characters[i].team.toLowerCase();

				imageWrapper = document.createElement("div");
				imageWrapper.className = "characterWrapper";
				imageWrapper.id = characters[i].name;
				imageWrapper.appendChild(characters[i].images.sprite);

				currentBlock.element.appendChild(imageWrapper);

				currentBlock.element.className += " " + currentBlock.team + "TeamBlock";
			}
		}
	}
}