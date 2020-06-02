function findCharacter(positionX, positionY)
{
    for(var i = 0; i < characters.length; i++)
    {
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
    statPortrait.src = "data:,";
    statPortrait.style.display = "none";

    var PS = document.getElementById("PS" + role);
    PS.textContent = "Ps:--";

    var armorImage = document.getElementById("ArmorImage" + role);
    armorImage.src = "data:,";
    armorImage.style.display = "none";

	var cName = document.getElementById("CharacterName" + role);
    cName.textContent = "Nome:--";

    var cWeapon = document.getElementById("CharacterWeapon" + role);
    cWeapon.textContent = "Arma:--";

    var weaponImage = document.getElementById("WeaponImage" + role);
    weaponImage.src = "data:,";
    weaponImage.style.display = "none";

    document.getElementById("Stats" + role).style.backgroundColor = "#d3d3d378";
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
            if(board.blocks[i].occupier != "obstacle")
            {
                board.blocks[i].element.classList.add(board.blocks[i].team + "TeamBlock");
            }
            else
            {
                board.blocks[i].element.classList.add("obstacleBlock");
            }
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