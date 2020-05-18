var board = null;
var characters = null;
var xLen = 9;
var yLen = 6;

var levelCode = "";

var playerItems = new Array(); //Gli oggetti selezionati nel menu
var enemyItems = new Array(); //Gli basati sulla difficolta' selezionata nel menu

var movementLength = 5; //Ampiezza dell'area di movimento
var attackLength = 1; //Ampiezza dell'area di attacco

var teams = ["Blue", "Red"]; //Variabile che registra chi deve fare il turno corrente

var playerTeamColor = teams[0];
var enemyTeamColor = teams[1];

var playerTeam = new Array();
var enemyTeam = new Array();

var turn;

var waitingTurn = false;

var movePhase = false;
var attackPhase = false;

var selectedBlock = {
	x : null,
	y : null
};

var ended;

function begin()
{
	showMenu();

	board = new Board(xLen, yLen);
}

function startGame()
{
	characters = new Array();
	characters[0] = new Character("Bylet", 0, 0, "Sword", "Blue");
	characters[1] = new Character("Hilda", 0, Math.floor(xLen / 2), "Axe", "Blue");
	characters[2] = new Character("Claude", 0, xLen-1, "Lance", "Blue");
	characters[3] = new Character("Edelgard", yLen-1, 0, "Axe", "Red");
	characters[4] = new Character("Dimitri", yLen-1, Math.floor(xLen / 2), "Lance", "Red");
	characters[5] = new Character("Petra", yLen-1, xLen-1, "Sword", "Red");
	
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
			/*currentBlock.element.className += " occupied"; //+ " " + character[i].name; da implementare*/
		}
	}
}