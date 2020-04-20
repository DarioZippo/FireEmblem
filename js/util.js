function findCharacter(positionX, positionY)
{
    //var str1 = "" + positionX + " " + positionY;
    //alert(characters.length);
    var str2;
    for(var i = 0; i < characters.length; i++)
    {
        //str2 = characters[i].x + " " + characters[i].y;
        if(characters[i].x == positionX && characters[i].y == positionY)
        {
            return characters[i];
        }
    }
    return null;
}

function cleanStats(role = "Attacker")
{
    var statPortrait = document.getElementById("CharacterPortrait" + role);
	statPortrait.src = "";

	var PS = document.getElementById("PS" + role);
	PS.textContent = "Ps:--";

	var cName = document.getElementById("CharacterName" + role);
    cName.textContent = "Nome:--";
    
    var mPoints = document.getElementById("MovePoints" + role);
    cName.textContent = "Move Points:--";
    
    var cName = document.getElementById("AttackPoints" + role);
	cName.textContent = "Attack Points:--";
}

function cleanBlock(positionX, positionY)
{
    var classe = "matrixBlock";
    var currentBlock = board.blocks[positionX * len + positionY];
    currentBlock.element.className = classe;

    if(currentBlock.occupied == true)
    {
        cleanArea();
    }
}

function distance(a, b)
{
    /*
    str = a + " " + b;
    alert(str);
    */
    return Math.abs(a - b);
}

function cleanArea()
{
    for(var i = 0; i <  board.blocks.length; i++)
    {
        board.blocks[i].movementBlock = false;
        board.blocks[i].attackBlock = false;
        board.blocks[i].element.className = "matrixBlock";
    }
}

function disableBlocks()
{
    for (let i = 0; i < board.blocks.length; i++) 
    {
        board.blocks[i].removeEvents();
    }
}

function activeBlocks()
{
    for (let i = 0; i < board.blocks.length; i++) 
    {
        board.blocks[i].addEvents();
    }
}