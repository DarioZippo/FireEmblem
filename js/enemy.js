Character.prototype.autoTurn =
function()
{
    this.showArea();
    var that = this;
    setTimeout(function(){that.autoMove();}, 2000);
    setTimeout(function(){updateBoardCharacters();}, 3000);
    setTimeout(function(){cleanArea();}, 4000);
    /*this.autoAttack();*/
}

Character.prototype.autoMove =
function()
{
    var startBlock = board.blocks[this.x * len + this.y];
    var currentBlock, minDistanceBlock;
    var str;
    for(var i = 0; i < playerTeam.length; i++)
    {
        //alert(playerTeam[i].name);
        if(i == 0)
        {
            minDistanceBlock = checkMinDistance(this, playerTeam[i]);
        }
        else
        {
            currentBlock = checkMinDistance(this, playerTeam[i]);
            //str = "Current " + i +": "+ currentBlock.block.x +", " + currentBlock.block.y + " -> " + currentBlock.dist;
            //alert(str);
            if(currentBlock.dist < minDistanceBlock.dist)
                minDistanceBlock = currentBlock;
        }
        //str = "Min " + i +": "+ minDistanceBlock.block.x +", " + minDistanceBlock.block.y + " -> " + minDistanceBlock.dist;
        //alert(str);
    }
    var start = startBlock.x + ", " + startBlock.y;
    var end = minDistanceBlock.block.x + ", " + minDistanceBlock.block.y;
    /*
        alert(start);
        alert(end);
    */
    this.move(minDistanceBlock.block);
}

function checkMinDistance(character1, character2)
{
    var currentDistanceX, currentDistanceY;
    var currentBlock = {
        block : null,
        dist : 0
    };
    var minDistanceBlock = {
        block : null,
        dist : 0
    };
    var k = 0; //counter
    var str;
    for(let i = 0; i < character1.area.movementMatrix.length; i++)
    {
        if(character1.area.movementMatrix[i].movementBlock == true)
        {
            currentDistanceX = distance(character1.area.movementMatrix[i].x, character2.x);
            currentDistanceY = distance(character1.area.movementMatrix[i].y, character2.y);
            if(k == 0)
            {
                minDistanceBlock.block = character1.area.movementMatrix[i];
                minDistanceBlock.dist = currentDistanceX + currentDistanceY;
            }
            else
            {
                currentBlock.block = character1.area.movementMatrix[i];
                currentBlock.dist = currentDistanceX + currentDistanceY; 
                /*
                    str = "Current " + i +": "+ currentBlock.block.x +", " + currentBlock.block.y + " -> " + currentBlock.dist;
                    alert(str);
                    str = "Min before " + i +": "+ minDistanceBlock.block.x +", " + minDistanceBlock.block.y + " -> " + minDistanceBlock.dist + " K = " + k;
                    alert(str);
                */
                if(currentBlock.dist < minDistanceBlock.dist)
                {
                    minDistanceBlock.block = currentBlock.block;
                    minDistanceBlock.dist = currentBlock.dist;
                }
            }
            k++;
            /*
                str = "Min after " + i +": "+ minDistanceBlock.block.x +", " + minDistanceBlock.block.y + " -> " + minDistanceBlock.dist + " K = " + k;
                alert(str);
            */
        }
    }
    /*
        alert(minDistanceBlock.dist);
        alert(minDistanceBlock.block.x);
        alert(minDistanceBlock.block.y);
    */
    return minDistanceBlock;
}