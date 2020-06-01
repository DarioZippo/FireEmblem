function Character(cName, positionX, positionY, cWeaponType, cTeam)
{
	this.name = cName;
	this.x = positionX;
	this.y = positionY;
	this.team = cTeam;
	this.weaponType = cWeaponType;

	if(this.team == playerTeamColor)
		this.teamStat = playerStat;
	else
		this.teamStat = enemyStat;

	this.values();

	this.images = 
	{
		sprite : document.createElement("img"),
		portrait : document.createElement("img"),
		armor : document.createElement("img"),
		weapon : document.createElement("img")
	}

	this.characterImages();
}

//Imposto i valori di attacco e vita in base al suo equipaggiamento
Character.prototype.values =
function()
{
	if(this.team == playerTeamColor)
	{
		this.armor = playerItems["Armor"];
		this.weapon = playerItems[this.weaponType];
		this.lifePoints = playerItems["ArmorValue"];
		this.attack = playerItems[this.weaponType + "Value"];
	}
	else
	{
		this.armor = enemyItems["Armor"];
		this.weapon = enemyItems[this.weaponType];
		this.lifePoints = enemyItems["ArmorValue"];
		this.attack = enemyItems[this.weaponType + "Value"];
	}
	
	this.alive = true;
	this.movePoints = 0; //Indicano i punti spendibili per un movimento
	this.attackPoints = 0; //Indicano i punti spendibili per un attacco
}

//Imposto le immagini che userò per gli sprite del personaggio, dell'equipaggiamento e il ritratto
Character.prototype.characterImages =
function()
{
	this.images.sprite.src = "./../img/sprites/" + this.name + ".png";
	this.images.sprite.className = "characterSprite "+ this.name;
	this.images.sprite.alt = "characterSprite "+ this.name;

	this.images.portrait.src = "./../img/portraits/" + this.name + ".png";
	this.images.portrait.className = "characterPortrait "+ this.name;
	this.images.portrait.alt = "characterPortrait "+ this.name;

	this.images.armor.src = "./../img/icons/" + this.armor.replace(/ /g, "_") + ".png";
	this.images.armor.className = "characterArmor";
	this.images.armor.alt = "characterArmor";

	this.images.weapon.src = "./../img/icons/" + this.weapon.replace(/ /g, "_") + ".png";
	this.images.weapon.className = "characterWeapon";
	this.images.weapon.alt = "characterWeapon";
}

//Mostra le statistiche nell'area target, passata via argomento
Character.prototype.showStats =
function(role = "Attacker")
{
	var statPortrait = document.getElementById("CharacterPortrait" + role);
	statPortrait.src = this.images.portrait.src;
	statPortrait.style.display = "block";

	var PS = document.getElementById("PS" + role);
	var str1 = PS.textContent.slice(PS.textContent.indexOf(":"), PS.textContent.length);
	PS.textContent = PS.textContent.replace(str1, ":" + this.lifePoints);

	var armorImage = document.getElementById("ArmorImage" + role); //Affianco l'immagine dell'armatura
	armorImage.src = this.images.armor.src;
	armorImage.style.display = "block"; 

	var cName = document.getElementById("CharacterName" + role);
	var str2 = cName.textContent.slice(cName.textContent.indexOf(":"), cName.textContent.length);
	cName.textContent = cName.textContent.replace(str2, ":" + this.name);

	var cWeapon = document.getElementById("CharacterWeapon" + role);
	var str3 = cWeapon.textContent.slice(cWeapon.textContent.indexOf(":"), cWeapon.textContent.length);
	cWeapon.textContent = cWeapon.textContent.replace(str3, ":" + this.weapon);
	
	var weaponImage = document.getElementById("WeaponImage" + role); //Affianco l'immagine dell'arma
	weaponImage.src = this.images.weapon.src;
	weaponImage.style.display = "block"; 

	//Coloro l'area Stats in base al colore della squadra d'appartenenza
	var elementTarget = document.getElementById(this.team + "StatsTable");
    var style = window.getComputedStyle(elementTarget);
	var currentColor = style.getPropertyValue("background-color");
	var newColor = changeOpacity(currentColor, 0.7);

	document.getElementById("Stats" + role).style.backgroundColor = newColor;
}

Character.prototype.showArea =
function()
{
	this.area = new Area(this);
	this.area.showMovementArea();
}

Character.prototype.showAttackArea =
function()
{
	this.area = new Area(this, 0);
	this.area.showAttackArea();
}

Character.prototype.move =
function(destinationBlock)
{
	//Elimino il personaggio dal blocco corrente, aggiornandone i valori
	currentBlock = board.blocks[this.x * xLen + this.y];
	currentBlock.occupied = false;
	currentBlock.occupier = "";
	currentBlock.team = "";
	currentBlock.element.removeChild(currentBlock.element.childNodes[0]);

	//Aggiorno la posizione del personaggio
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
		setTimeout(function(){that.die()}, 2000);
		return "died";
	}
}

Character.prototype.showDamage =
function(damage, role)
{
	var statPortrait = document.getElementById("CharacterPortrait" + role);
	statPortrait.src = "./../img/portraits/" + this.name + "Damage" + ".png";

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

	currentBlock = board.blocks[this.x * xLen + this.y];
	currentBlock.occupied = false;
	currentBlock.occupier = "";
	currentBlock.team = "";
	
	currentBlock.element.removeChild(currentBlock.element.childNodes[0]);
	currentBlock.element.className = "matrixBlock";

	this.x = -1;
	this.y = -1;
}