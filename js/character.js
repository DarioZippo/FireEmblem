function Character(cName, positionX, positionY, cTeam)
{
	this.name = cName;
	this.x = positionX;
	this.y = positionY;
	this.team = cTeam;

	this.values();

	this.images = 
	{
		sprite : document.createElement("img"),
		portrait : document.createElement("img")
	}

	this.characterImages();
}

Character.prototype.values =
function()
{
	this.lifePoints = 100;
	this.attack = 50;
	this.class = "Soldier";
	this.alive = true;
	this.movePoint = 0; //Indicano i punti spendibili per un movimento
	this.attackPoint = 0; //Indicano i punti spendibili per un attacco
}

Character.prototype.characterImages =
function()
{
	this.images.sprite.src = "./img/sprites/" + this.name + ".png";
	this.images.sprite.className = "characterSprite "+ this.name;

	this.images.portrait.src = "./img/portraits/" + this.name + ".png";
	this.images.portrait.className = "characterPortrait "+ this.name;
}

Character.prototype.showStats =
function(role = "Attacker")
{
	var statPortrait = document.getElementById("CharacterPortrait" + role);
	statPortrait.src = this.images.portrait.src;

	var PS = document.getElementById("PS" + role);
	var str1 = PS.textContent.slice(PS.textContent.indexOf(":"), PS.textContent.length);
	PS.textContent = PS.textContent.replace(str1, ":" + this.lifePoints);

	var cName = document.getElementById("CharacterName" + role);
	var str2 = cName.textContent.slice(cName.textContent.indexOf(":"), cName.textContent.length);
	cName.textContent = cName.textContent.replace(str2, ":" + this.name);
}

Character.prototype.showArea =
function()
{
	this.area = new Area(this);
	this.area.show();
}

Character.prototype.showAttackArea =
function()
{
	this.area = new Area(this, 0);
	this.area.show();
}

Character.prototype.move =
function(destinationBlock)
{
	currentBlock = board.blocks[this.x * len + this.y];
	currentBlock.occupied = false;
	currentBlock.occupier = "";
	currentBlock.element.removeChild(currentBlock.element.childNodes[0]);


	this.x = destinationBlock.x;
	this.y = destinationBlock.y;
}

Character.prototype.getDamage =
function(damage, role)
{
	this.showDamage(damage, role);
	this.lifePoints -= damage;
	var that = this;
	setTimeout(function(){that.showStats(role)}, 2000);
	if(this.lifePoints <= 0)
	{
		this.die();
		return "died";
	}
}

Character.prototype.showDamage =
function(damage, role)
{
	var statPortrait = document.getElementById("CharacterPortrait" + role);
	statPortrait.src = "./img/portraits/" + this.name + "Damage" + ".png";

	var damageElement = document.createElement("span");
	damageElement.className = "damage";
	damageElement.textContent = "-" + damage;

	var PS = document.getElementById("PS" + role);
	PS.appendChild(damageElement);
}

Character.prototype.die =
function()
{
	this.alive = false;

	currentBlock = board.blocks[this.x * len + this.y];
	currentBlock.occupied = false;
	currentBlock.occupier = "";
	currentBlock.element.removeChild(currentBlock.element.childNodes[0]);

	this.x = -1;
	this.y = -1;
}