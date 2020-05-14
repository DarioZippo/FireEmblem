function Item(elementTarget, cost, name)
{
    this.element = elementTarget;
    this.cost = cost;
    this.name = name;

    this.hover = this.highlight.bind(this);
	this.out = this.disableHighlight.bind(this);
	this.click = this.buy.bind(this);
}

Item.prototype.highlight =
function()
{
    this.element.classList.add("purchasable");
}

Item.prototype.disableHighlight =
function()
{
    this.element.classList.remove("purchasable");
}

Item.prototype.buy =
function()
{
    if(currentUserData["coins"] >= this.cost)
    {
        var handler = function(responseText)
        {
            var response = JSON.parse(responseText);
            if(response["responseCode"] == 0)
            {
                alert("Bought");
                refreshStore();
            }
            else
                alert(response["message"]);
        }

        var postString = "username=" + currentUserData["username"] + "&item=" + this.name + "&cost=" + this.cost;
        ajaxRequest("./../php/ajax/StoreBuy.php", "POST", handler, postString);
    }
    else
        alert("poor");
}


Item.prototype.bought =
function()
{
    this.element.removeEventListener("mouseover", this.hover);
    this.element.removeEventListener("mouseout", this.out);
    this.element.removeEventListener("click", this.click);

    this.element.classList.add("bought");
}