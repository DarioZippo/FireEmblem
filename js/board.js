function Board(xLen, yLen)
{
	this.element = document.getElementById("Board");
	this.blocks = new Array;
	
	this.generator(xLen, yLen);
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