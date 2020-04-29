function Turn()
{
    this.teamIndex = 0;
    this.number = 0;

    this.addButtonEvents();

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
    cleanArea();
    cleanStats();

    this.number++;

    this.currentTeam();

    this.updateTable();

    this.removeTurnPoints();
    this.addTurnPoints();

    this.disableTurnButton();
    this.activeTurnButton();

    if(this.teamName == enemyTeamColor)
    {
        disableBlocks();
        this.enemyTurn();
    }
}

Turn.prototype.updateTable =
function()
{
    var elementTarget = document.getElementById(this.teamName + "StatsTable");
    var style = window.getComputedStyle(elementTarget);
    var currentColor = style.getPropertyValue("background-color");

    document.getElementById("TurnTableBody").style.backgroundColor = currentColor;
    document.getElementById("TurnNumber").textContent = this.number;
    document.getElementById("TurnTeam").textContent = this.teamName;
}

Turn.prototype.addButtonEvents =
function()
{
    var that = this;
    var turnClick = function(){that.startTurn()};
    var targetButtons = document.getElementsByClassName("turnButton");
    for(var i = 0; i < targetButtons.length; i++)
    {
        targetButtons[i].addEventListener("click", turnClick);
    }
}

Turn.prototype.disableTurnButton =
function()
{
    var targetButtons = document.getElementsByClassName("turnButton");
    for(var i = 0; i < targetButtons.length; i++)
    {
        if(targetButtons[i].id.includes(this.teamName) == false) //Se il bottone corrente è per un diverso team da quello corrente
        {
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

Turn.prototype.enemyTurn =
function()
{
    disableBlocks();
    var i = 0;
    var that = this;

    var turnBlock = setInterval(
        function()
        {
            if(waitingTurn == false)
            {
                if(i >= enemyTeam.length)
                {
                    activeBlocks();
                    that.startTurn();
                    clearInterval(turnBlock);
                }
                else if(enemyTeam[i].alive == true)
                {
                    waitingTurn = true;
                    enemyTeam[i].autoTurn();
                    i++;
                }
                else
                {
                    i++;
                }
            }
        }, 1000);
}