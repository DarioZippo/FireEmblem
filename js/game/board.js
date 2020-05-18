function Board(xLen, yLen)
{
	this.element = document.getElementById("Board");
	this.blocks = new Array;
	
	this.generator(xLen, yLen);
	this.randomObstacles(xLen, yLen);
}

Board.prototype.generator =
function(xLen, yLen)
{
	var currentRow;
	var currentBlock;
	for(var i = 0; i < yLen; i++)
	{
		currentRow = document.createElement("div");
		currentRow.className = "matrixRow";
		this.element.appendChild(currentRow);
		for(var j = 0; j < xLen; j++)
		{
			currentBlock = new Block(i, j);
			currentBlock.element = document.createElement("span");
			currentBlock.element.className = "matrixBlock";
			currentRow.appendChild(currentBlock.element);
			
			this.blocks.push(currentBlock);
			
			this.blocks[i * xLen + j].addEvents();
		}
	}
}

Board.prototype.randomObstacles =
function(xLen, yLen)
{
	var currentRandomNumber;
	var currentRow;

	for(var currentColumn = 0; currentColumn < xLen; currentColumn++)
	{
		currentRandomNumber = Math.floor(Math.random() * 3) + 0; //Numero compreso fra 0 e 2

		switch(currentRandomNumber)
		{
			case 0:
				levelCode += currentRandomNumber; //Aggiorno il codice del livello
				continue;
			case 1:
				currentRow = Math.floor(yLen / 2) - 1;
				break;
			case 2:
				currentRow = Math.floor(yLen / 2);
				break;
		}
		
		this.blocks[currentRow * xLen + currentColumn].obstacle();
		levelCode += currentRandomNumber; //Aggiorno il codice del livello
	}
}