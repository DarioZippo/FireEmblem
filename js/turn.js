function Turn()
{
    this.teamIndex = 0;
    this.number = 0;

    this.turnClick = function(){this.startTurn()};
    this.currentTeam();
    this.startTurn();
}

Turn.prototype.currentTeam =
function()
{
    if(this.teamIndex < teams.length)
    {
        this.teamName = teams[this.teamIndex];
    }
    else
    {
        this.teamIndex = 0;
        this.teamName = teams[this.teamIndex];
    }
    this.teamIndex++;
}

Turn.prototype.startTurn =
function()
{
    this.number++;

    this.removeTurnPoints(this.teamName);
    this.addTurnPoints(this.teamName);

    this.disableTurnButton(this.teamName);
    this.activeTurnButton(this.teamName);
}

Turn.prototype.disableTurnButton =
function()
{
    var targetButtons = document.getElementsByClassName("turnButton");
    for(var i = 0; i < targetButtons.length; i++)
    {
        if(targetButtons[i].id.includes(this.teamName) == false) //Se il bottone corrente è per un diverso team da quello corrente
        {
            targetButtons[i].removeEventListener("click", this.turnClick);
            targetButtons[i].disabled = true;
        }
    }
}

Turn.prototype.activeTurnButton =
function()
{
    var targetButtons = document.getElementsByClassName("turnButton");
    for(var i = 0; i < targetButtons.length; i++)
    {
        if(targetButtons[i].id.includes(this.teamName) == true) //Se il bottone corrente è per il team corrente
        {
            targetButtons[i].addEventListener("click", this.turnClick);
            targetButtons[i].disabled = false;
        }
    }
}

Turn.prototype.removeTurnPoints =
function()
{
    for(var i = 0; i < characters.length; i++)
    {
        if(characters[i].team != this.teamName)
        {
            characters[i].movePoints = 0;
            characters[i].attackPoints = 0;
        }
    }
}

Turn.prototype.addTurnPoints =
function()
{
    for(var i = 0; i < characters.length; i++)
    {
        if(characters[i].team == this.teamName)
        {
            characters[i].movePoints = 1;
            characters[i].attackPoints = 1;
        }
    }
}