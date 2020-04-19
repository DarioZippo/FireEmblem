/*

Character.prototype.showArea =
function(type, x = this.x, y = this.y)
{
	var leftOk = true, rightOk = true, downOk = true, upOk = true; //I controllori per fermare il painting in una certa direzione in caso di ostacolo incontrato
	for(i = 1; i <= movementLength; i++) //i parte da 1 perchè rappresenta le varie distanze raggiungibili
	{
		if(leftOk == true)
			leftOk = leftPainting(x, y, i, type, this);
		if(rightOk == true)
			rightOk = rightPainting(x, y, i, type, this);
		if(downOk == true)
			downOk = downPainting(x, y, i, type, this);
		if(upOk == true)
			upOk = upPainting(x, y, i, type, this);
	}
}

Character.prototype.attackArea =
function(currentX, currentY)
{
	for(j = 1; j <= attackLength; j++) //i parte da 1 perchè rappresenta le varie distanze raggiungibili
	{
		leftPainting(currentX, currentY, j, "attack", this);
		rightPainting(currentX, currentY, j, "attack", this);
		downPainting(currentX, currentY, j, "attack", this);
		upPainting(currentX, currentY, j, "attack", this);
	}
}


function leftPainting(positionX, positionY, distance, type, currentCharacter)
{
    var currentBlock;
    if(positionX - distance >= 0)
    {
        currentBlock = board.blocks[(positionX - distance) * len + positionY];
        if(currentBlock.occupied == false || type == "attack")
        {
            if(type == "clean")
                currentBlock.element.className = "matrixBlock";
            else
            {
                if(currentBlock.element.className.includes(type) == false) //Cerco di non creare doppioni nella classe
                {
                    if(type == "attack" && currentBlock.element.className.includes("movementBlock") == false)
                        currentBlock.element.className += " " + type + "Block";
                    if(type == "movement")
                    {
                        if(currentBlock.element.className.includes("attackBlock") == true) //Sovrascrivo gli attacchi con gli spostamenti
                            currentBlock.element.className = currentBlock.element.className.replace("attackBlock", " " + type + "Block");
                        else
                            currentBlock.element.className += " " + type + "Block";
                    }
                }
                if(type == "movement")
                {
                    currentCharacter.attackArea(currentBlock.x, currentBlock.y);
                }
            }
            return true;
        }
        else
            return false;         
    }
}

function rightPainting(positionX, positionY, distance, type, currentCharacter)
{
    var currentBlock;
    if(positionX + distance < len)
    {
        currentBlock = board.blocks[(positionX + distance) * len + positionY];
        if(currentBlock.occupied == false || type == "attack")
        {
            if(type == "clean")
                currentBlock.element.className = "matrixBlock";
            else
                if(currentBlock.element.className.includes(type) == false) //Cerco di non creare doppioni nella classe
                {
                    if(type == "attack" && currentBlock.element.className.includes("movementBlock") == false)
                        currentBlock.element.className += " " + type + "Block";
                    if(type == "movement")
                    {
                        if(currentBlock.element.className.includes("attackBlock") == true)
                            currentBlock.element.className = currentBlock.element.className.replace("attackBlock", " " + type + "Block");
                        else
                            currentBlock.element.className += " " + type + "Block";
                    }
                }
                if(type == "movement")
                {
                    currentCharacter.attackArea(currentBlock.x, currentBlock.y);
                }
            return true;
        }
        else
            return false;       
    }
}

function downPainting(positionX, positionY, distance, type, currentCharacter)
{
    var currentBlock;
    if(positionY - distance >= 0)
    {
        currentBlock = board.blocks[positionX * len + (positionY - distance)];
        if(currentBlock.occupied == false || type == "attack")
        {
            if(type == "clean")
                currentBlock.element.className = "matrixBlock";
            else
                if(currentBlock.element.className.includes(type) == false) //Cerco di non creare doppioni nella classe
                {
                    if(type == "attack" && currentBlock.element.className.includes("movementBlock") == false)
                        currentBlock.element.className += " " + type + "Block";
                    if(type == "movement")
                    {
                        if(currentBlock.element.className.includes("attackBlock") == true)
                            currentBlock.element.className = currentBlock.element.className.replace("attackBlock", " " + type + "Block");
                        else
                            currentBlock.element.className += " " + type + "Block";
                    }
                }
                if(type == "movement")
                {
                    currentCharacter.attackArea(currentBlock.x, currentBlock.y);
                }
            return true;
        }
        else
            return false;          
    }
}

function upPainting(positionX, positionY, distance, type, currentCharacter)
{
    var currentBlock;
    if(positionY + distance < len)
    {
        currentBlock = board.blocks[positionX * len + (positionY + distance)];
        if(currentBlock.occupied == false || type == "attack")
        {
            if(type == "clean")
                currentBlock.element.className = "matrixBlock";
            else
                if(currentBlock.element.className.includes(type) == false) //Cerco di non creare doppioni nella classe
                {
                    if(type == "attack" && currentBlock.element.className.includes("movementBlock") == false)
                        currentBlock.element.className += " " + type + "Block";
                    if(type == "movement")
                    {
                        if(currentBlock.element.className.includes("attackBlock") == true)
                            currentBlock.element.className = currentBlock.element.className.replace("attackBlock", " " + type + "Block");
                        else
                            currentBlock.element.className += " " + type + "Block";
                    }
                }
                if(type == "movement")
                {
                    currentCharacter.attackArea(currentBlock.x, currentBlock.y);
                }
            return true;
        }
        else
            return false;       
    }
}
*/