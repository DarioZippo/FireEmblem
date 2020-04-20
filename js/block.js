function Block()
{
	this.x;
	this.y;
	this.element;

	this.occupied = false;
    this.occupier = "";
    
    this.movementBlock = false;
	this.attackBlock = false;
	
	this.hover = this.highlight.bind(this);
	this.out = this.disableHighlight.bind(this);
	this.click = this.selectBlock.bind(this);
}

Block.prototype.addEvents =
function()
{
	this.element.addEventListener("mouseover", this.hover );
	this.element.addEventListener("mouseout", this.out );
	this.element.addEventListener("click", this.click );
}

Block.prototype.removeEvents =
function()
{	
	this.element.removeEventListener("mouseover", this.hover);
	this.element.removeEventListener("mouseout", this.out);
	this.element.removeEventListener("click", this.click);
}

Block.prototype.highlight =
function()
{
	//alert(this.className);
	this.element.className += " highlightedBlock";
}

Block.prototype.disableHighlight =
function()
{
	this.element.className = this.element.className.replace("highlightedBlock", "");
}

Block.prototype.selectBlock =
function()
{
	var classe = this.element.className;
	var currentCharacter;

	if(movePhase == true)
	{
		if(this.movementBlock == true)
		{
			cleanBlock(selectedBlock.x, selectedBlock.y);
			currentCharacter = findCharacter(selectedBlock.x, selectedBlock.y);
			currentCharacter.move(this);
			currentCharacter.movePoints--;
			movePhase = false;
			attackPhase = true;
			updateBoardCharacters();

			selectedBlock.x = this.x; 
			selectedBlock.y = this.y;

			currentCharacter.showStats();
			currentCharacter.showAttackArea();

			return;
		}
		else
		{
			currentCharacter.selected = false;
		}
	}

	if(attackPhase == true)
	{
		currentCharacter = findCharacter(selectedBlock.x, selectedBlock.y);
		if(this.attackBlock == true)
		{
			cleanBlock(selectedBlock.x, selectedBlock.y);
			var attackedCharacter = findCharacter(this.x, this.y);
			if(currentCharacter != null && attackedCharacter != null)
				attackMenu(currentCharacter, attackedCharacter);
			
			attackPhase = false;

			return;
		}
		else
		{
			currentCharacter.selected = false;
			attackPhase = false;
			cleanArea();
			selectedBlock.x = null; 
			selectedBlock.y = null;
		}
	}

	if(selectedBlock.x != null && selectedBlock.y != null)
	{
		if(selectedBlock.x != this.x || selectedBlock.y != this.y)
		{
			cleanBlock(selectedBlock.x, selectedBlock.y);
		}
	}

	if(classe.includes("selectedBlock") == false)	
	{	
		this.element.className += " selectedBlock";
		currentCharacter = findCharacter(this.x, this.y); //Trovo il personaggio nella posizione selezionata
		if(currentCharacter != null)
		{
			currentCharacter.showStats();
			if(currentCharacter.selected == false)
			{
				currentCharacter.selected = true;
				if(currentCharacter.movePoints > 0)
				{
					currentCharacter.showArea();
					movePhase = true;
				}
				else if(currentCharacter.attackPoints > 0)
				{
					currentCharacter.showAttackArea();
					attackPhase = true;
				}
			}
			else
			{
				currentCharacter.selected = false;
			}
		}
		else
			cleanStats();
		//Aggiorno la posizione del blocco selezionato
		selectedBlock.x = this.x; 
		selectedBlock.y = this.y;
	}
	else
	{
		cleanBlock(this.x, this.y);
		//Nessun blocco è selezionato
		selectedBlock.x = null; 
		selectedBlock.y = null;
	}

	//alert(this.element.className)
}