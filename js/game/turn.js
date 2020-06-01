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
    
    if(this.teamName == playerTeamColor)
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
        if(targetButtons[i].id.includes(this.teamName) == false) //Se il bottone corrente è per team diverso da quello corrente
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
        if(targetButtons[i].id.includes(this.teamName) == true && this.teamName != enemyTeamColor) //Se il bottone corrente è per il team corrente, e per il team del giocatore
        {
            targetButtons[i].disabled = false;
        }
    }
}

//Funzione che rimuove i punti di spostamento ed attacco per le squadre diverse da quella del turno corrente
//Per impedire ai personaggi di agire al di fuori dei loro turni
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

//Funzione che aggiunge punti di spostamento ed attacco per la squadra del turno corrente
//Per poter usare i personaggi nel loro turno
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

//Funzione che avvia il turno automatico degli avversari
Turn.prototype.enemyTurn =
function()
{
    disableBlocks();

    nextEnemyTurn(0);
}

//Funzione che avvia il turno automatico del prossimo personaggio avversario in vita
//A meno che non siano terminati. Nel caso passerà il turno al giocatore
function nextEnemyTurn(i = 0)
{
    while(i < enemyTeam.length && enemyTeam[i].alive == false)
    {
        i++;
    }
    if(i >= enemyTeam.length) //Finisce il turno avversario
    {
        activeBlocks();
        turn.startTurn();
    }
    else if(enemyTeam[i].alive == true)
    {
        enemyTeam[i].autoTurn(i);
    }
}        