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
    statPortrait.style.display = "none";

    var PS = document.getElementById("PS" + role);
    PS.textContent = "Ps:--";

	var cName = document.getElementById("CharacterName" + role);
    cName.textContent = "Nome:--";

    var cWeapon = document.getElementById("CharacterWeapon" + role);
    cWeapon.textContent = "Arma:--";

    document.getElementById("Stats" + role).style.backgroundColor = "#d3d3d378";
    /*
    var mPoints = document.getElementById("MovePoints" + role);
    mPoints.textContent = "Move Points:--";
    
    var aPoints = document.getElementById("AttackPoints" + role);
	aPoints.textContent = "Attack Points:--";
    */
}

function cleanBlock(positionX, positionY)
{
    var classe = "matrixBlock";
    var currentBlock = board.blocks[positionX * xLen + positionY];
    currentBlock.selected = false;

    currentBlock.element.className = classe;

    movePhase = false;
    attackPhase = false;

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
    movePhase = false;
    attackPhase = false;
    for(var i = 0; i <  board.blocks.length; i++)
    {
        board.blocks[i].selected = false;
        board.blocks[i].movementBlock = false;
        board.blocks[i].attackBlock = false;
        board.blocks[i].element.className = "matrixBlock";
        if(board.blocks[i].occupied == true)
        {
            board.blocks[i].element.className += " " + board.blocks[i].team + "TeamBlock";
        }
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

function howManyAlive(targetTeam)
{
    var counter = 0;
    for(var i = 0; i < targetTeam.length; i++)
    {
        if(targetTeam[i].alive == true)
            counter++;
    }
    return counter;
}

function changeOpacity(currentColor, opacityTarget)
{
    var rgbaValues = currentColor.slice(4, currentColor.length - 1) 
	rgbaValues = rgbaValues.split(",");
	rgbaValues[3] = opacityTarget;
    var newColor = "rgba(" + rgbaValues[0] + ", " + rgbaValues[1] + ", " + rgbaValues[2] + ", " + rgbaValues[3] + ")";
    return newColor;
}