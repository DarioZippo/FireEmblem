function Item(elementTarget, cost, name)
{
    this.element = elementTarget;
    this.cost = cost;
    this.name = name;

    this.hover = this.highlight.bind(this);
	this.out = this.disableHighlight.bind(this);
    this.click = this.buyMenu.bind(this);

    this.buyButton = this.buy.bind(this);
    this.undoButton = this.exit.bind(this);
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

Item.prototype.buyMenu =
function()
{
    var modalMenu = document.getElementById("ModalMenu");
    modalMenu.style.display = "block";

    var modalTextMenu = document.getElementById("ModalTextMenu");
    modalTextMenu.childNodes[0].nodeValue += this.name + "?";

    var modalButtonBuy = document.getElementById("ModalButtonBuy");
    modalButtonBuy.addEventListener("click", this.buyButton);

    var modalButtonUndo = document.getElementById("ModalButtonUndo");
    modalButtonUndo.addEventListener("click", this.undoButton);
}

Item.prototype.buy =
function()
{    
    this.exit();

    if(currentUserData["coins"] >= this.cost)
    {
        var handler = function(responseText)
        {
            var response = JSON.parse(responseText);
            if(response["responseCode"] == 0)
            {
                showModalResult(true);
                refreshStore();
                getUserInformations();
            }
            else
                alert(response["message"]);
        }

        var postString = "username=" + currentUserData["username"] + "&item=" + this.name + "&cost=" + this.cost;
        ajaxRequest("./../php/ajax/StoreBuy.php", "POST", handler, postString);
    }
    else
        showModalResult(false);
}

Item.prototype.exit =
function()
{
    var modalTextMenu = document.getElementById("ModalTextMenu");
    var modalTextMenuValue = modalTextMenu.childNodes[0].nodeValue;
    var currentItemText = modalTextMenuValue.slice(modalTextMenuValue.indexOf(":") + 2, modalTextMenuValue.length);
    
	currentItemText = currentItemText.replace(/\t/g, "");
	currentItemText = currentItemText.replace(/\n/g, "");

    modalTextMenuValue = modalTextMenuValue.replace(currentItemText, "");

    modalTextMenu.childNodes[0].nodeValue = modalTextMenuValue;

    var modalButtonBuy = document.getElementById("ModalButtonBuy");
    modalButtonBuy.removeEventListener("click", this.buyButton);

    var modalButtonUndo = document.getElementById("ModalButtonUndo");
    modalButtonUndo.removeEventListener("click", this.undoButton);

    var modalMenu = document.getElementById("ModalMenu");
    modalMenu.style.display = "none";
}

Item.prototype.bought =
function()
{
    this.element.removeEventListener("mouseover", this.hover);
    this.element.removeEventListener("mouseout", this.out);
    this.element.removeEventListener("click", this.click);

    this.element.classList.add("bought");
}