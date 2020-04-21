function Area(targetCharacter, movLen = movementLength, atkLen = attackLength)
{
    this.movLen = movLen;
    this.atkLen = atkLen;
    this.character = targetCharacter;

    this.movementMatrix = new Array();
    this.attackMatrix = new Array();
}

Area.prototype.buildMovementArea =
function()
{
    var k = 0;
    for(let i = this.character.x - this.movLen; i <= this.character.x + this.movLen; i++)
    {
        if(i < 0) //Controllo che la riga non sia precedente alla matrice
        {
            continue;
        }
        if(i >= len) //Controllo che la riga non sia oltre la matrice
        {
            break;
        }
        for(let j = this.character.y - this.movLen; j <= this.character.y + this.movLen; j++)
        {
            if(j < 0) //Controllo che la colonna non sia precedente alla matrice
            {
                continue;
            }
            if(j >= len) //Controllo che la colonna non sia oltre la matrice
            {
                break;
            }    
            this.movementMatrix[k] = board.blocks[i * len + j];
            k++;
        }
    }
    //Adesso abilito i blocchi raggiungibili della matrice
    var distanceX, distanceY; //Le distanze rispetto al blocco del personaggio
    for(let i = 0; i < this.movementMatrix.length; i++)
    {
        distanceX = distance(this.character.x, this.movementMatrix[i].x);
        distanceY = distance(this.character.y, this.movementMatrix[i].y);
        if( (distanceX + distanceY) <= this.movLen) //Verifico la regola per essere un blocco raggiungibile
        {
            if(this.movementMatrix[i].occupied == false || (this.movementMatrix[i].x == this.character.x && this.movementMatrix[i].y == this.character.y) ) //Libero o casella del personaggio
            {
                this.movementMatrix[i].movementBlock = true; //Abilito il blocco della matrice
            }
        }
        else
        {
            this.movementMatrix[i].movementBlock = false;
        }
    }
}

Area.prototype.buildAttackArea =
function()
{
    var lenArea = this.atkLen + this.movLen;
    var k = 0;
    for(let i = this.character.x - lenArea; i <= this.character.x + lenArea; i++)
    {
        if(i < 0) //Controllo che la riga non sia precedente alla matrice
        {
            continue;
        }
        if(i >= len) //Controllo che la riga non sia oltre la matrice
        {
            break;
        }
        for(let j = this.character.y - lenArea; j <= this.character.y + lenArea; j++)
        {
            if(j < 0) //Controllo che la colonna non sia precedente alla matrice
            {
                continue;
            }
            if(j >= len) //Controllo che la colonna non sia oltre la matrice
            {
                break;
            }
            this.attackMatrix[k] = board.blocks[i * len + j];
            k++;
        }
    }
    //Adesso abilito i blocchi raggiungibili della matrice
    var distanceX, distanceY; //Le distanze rispetto al blocco del personaggio
    for(let i = 0; i < this.attackMatrix.length; i++)
    {
        distanceX = distance(this.character.x, this.attackMatrix[i].x);
        distanceY = distance(this.character.y, this.attackMatrix[i].y);
        if(distanceX + distanceY == 0)
        {
            this.attackMatrix[i].attackBlock = false;
        }
        else if( (distanceX + distanceY) <= lenArea) //Verifico la regola per essere un blocco raggiungibile
        {
            this.attackMatrix[i].attackBlock = true; //Abilito il blocco della matrice
        }
        else
        {
            this.attackMatrix[i].attackBlock = false;
            this.attackMatrix[i].movementBlock = false;
        }
    }
}

Area.prototype.showMovementArea =
function()
{
    this.buildMovementArea();
    for(let i = 0; i < this.movementMatrix.length; i++)
    {
        if(this.movementMatrix[i].movementBlock == true)
        {
            this.movementMatrix[i].element.className += " movementBlock";
        }
    }
}

Area.prototype.showAttackArea =
function()
{
    this.showMovementArea();
    this.buildAttackArea();
    for(let i = 0; i < this.attackMatrix.length; i++)
    {
        if(this.attackMatrix[i].attackBlock == true)
        {
            this.attackMatrix[i].element.className += " attackBlock";
        }
    }
}
