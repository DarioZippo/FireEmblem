function Item(elementTarget, cost, name)
{
    this.element = elementTarget;
    this.cost = cost;
    this.name = name;

    this.hover = this.highlight.bind(this);
	this.out = this.disableHighlight.bind(this);
	//this.click = this.buy.bind(this);
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
/*
Item.prototype.buy =
function()
{
    
}
*/

Item.prototype.bought =
function()
{
    this.element.removeEventListener("mouseover", this.hover);
    this.element.removeEventListener("mouseout", this.out);
    /*this.element.removeEventListener("click", this.click);*/

    this.element.classList.add("bought");
}