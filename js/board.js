function Board(len)
{
	this.element = document.getElementById("Board");
	this.blocks = new Array;
	
	this.generator(len);
}

Board.prototype.generator =
	function(len)
	{
		var currentRow;
		var currentBlock;
		for(var i = 0; i < len; i++)
		{
			currentRow = document.createElement("div");
			currentRow.className = "matrixRow";
			this.element.appendChild(currentRow);
			for(var j = 0; j < len; j++)
			{
				currentBlock = new Block();
				currentBlock.element = document.createElement("span");
				currentBlock.element.className = "matrixBlock";
				currentBlock.x = i;
				currentBlock.y = j;
 				currentRow.appendChild(currentBlock.element);
				
				this.blocks.push(currentBlock);
				
				this.blocks[i * len + j].addEvents();
			}
		}
	}



