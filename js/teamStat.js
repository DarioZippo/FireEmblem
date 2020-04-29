function TeamStat(cTeam)
{
    this.team = cTeam;
    
    this.killedCounter = 0;
    this.deadCounter = 0;
    this.correntScore = 0;
}

TeamStat.prototype.incrementScore =
function()
{
    this.correntScore++;
    this.killedCounter++;
}

TeamStat.prototype.decrementScore =
function()
{
    this.correntScore--;
    this.deadCounter++;
}

TeamStat.prototype.updateScoreBoard =
function()
{
    document.getElementById(this.team + "KilledCounter").textContent = this.killedCounter;
    document.getElementById(this.team + "DeadCounter").textContent = this.deadCounter;
    document.getElementById(this.team + "Score").textContent = this.correntScore;
}

var playerStat = new TeamStat(playerTeamColor);
var enemyStat = new TeamStat(enemyTeamColor);