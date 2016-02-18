
var game = new Phaser.Game(1280, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update});


//BLATANTLY RIPPED OFF CONCEPT FROM COOKIE CLICKER FOR CLASS ASSIGNMENT - orteil.dashnet.org/cookieclicker/
//also blatantly reuses code from 2016 game jam Mondaze


var timeConstant = Phaser.Timer.SECOND;

///Global varaible////
var dollarCount = 1; //THIS IS THE MAIN MONEY VARIABLE

var firstPush = false;

var mps = 0; //money per second
var timer = 0;

var laborRate = 0.1; //Child laborer money per second per item
var sweatRate = 0.5; 
var cccRate = 2;
var superPac = 5;


var count = {};

var hud = {};
hud.money = 0;
hud.perSecond = 0;
hud.labor = 0;
hud.sweat = 0;
hud.ccc = 0;
hud.superPac = 0;

var cost = {};


var buildings = {};

//last minute variables

var kidCount = 0;


function preload() {
    game.load.image('dollar', 'dollarClick.png');
    game.load.image('labor', 'labour.jpg');
    game.load.image('sweat', 'seatShop.png');
    game.load.image('kid', 'kid.png');
    game.load.image('ccc', 'ccc.png');
    
    //backgrounds
    game.load.image('background', 'bkg.png');
    game.load.image('halfBack', 'bkgOscar.png');
    game.load.image('fullBack', 'bkgFull.png');
}


//IN THE BEGINNING//
function create() {
    background = game.add.sprite(0, 0, 'fullBack');
    
    
    firstPush = false;
    game.input.mouse.capture = true;
    
    addCoin();
    
    buildings.labor = addBuilding(1100, 200, 'labor', 0, 3);
    buildings.sweat = addBuilding(1100, 350, 'sweat', 0, 10);
    buildings.ccc = addBuilding(1100, 500, 'ccc', 0, 50);

    setUI();
    moneyPer();
    
    //Draw the lines
    createRectangle(350, 0, 10, 720); //left side
    createRectangle(900, 0, 10, 720);
}


function addCoin(){
    var icon = game.add.sprite(150, 150, 'dollar');
    
    icon.inputEnabled = true;
    icon.input.useHandCursor = true;
    icon.events.onInputDown.add(click, this);
}


function addBuilding(x, y, sprite, count, cost){
    var obj = game.add.sprite(x, y, sprite);
    
    obj.count = count;
    obj.cost = cost;
    obj.anchor.setTo(0.5,0.5);
    obj.alpha = 0.2;
    obj.scale.set(0.5);
    obj.inputEnabled = false;
    obj.events.onInputDown.add(incBuilding, this);
    
    return obj;
}


function update() {
    changeText();
    costListen();
}


function setUI(){
    var textOptions = { font: "35px Monospace", fill: "#000000", align: "center", fontStyle: "bold"}; // fill -> Color  
    
    //Current money
    hud.money = game.add.text( 230, 120, "Dollars: 0", textOptions);
    hud.money.anchor.set(0.5);
    hud.money.fixedToCamera = true;
    
    //Current Money Per Second
    var textMPS = { font: "30px Monospace", fill: "#000000", align: "center", fontStyle: "bold"}; // fill -> Color 
    hud.perSecond = game.add.text(1140, 75, "Money per\nSecond: 0", textMPS);
    hud.perSecond.anchor.set(0.5);
    
    //Child Laborer text
    var textCost = {font: "20px Monospace", fill: "#f0f0f0", align: "center", fontStyle: "bold"};
    hud.laborCost = game.add.text(1075, 185, "Child Laborer\nCost: 0", textCost);
    hud.laborCost.anchor.set(0.5);
    hud.laborCost.stroke = '#000000';
    hud.laborCost.strokeThickness = 6;
    
    
    //SweatShop text
    var sweatCost = {font: "20px Monospace", fill: "#f0f0f0", align: "center", fontStyle: "bold"}; 
    hud.sweatCost = game.add.text(1075, 365, "SweatShop\nCost: 0", sweatCost);
    hud.sweatCost.anchor.set(0.5);
    hud.sweatCost.stroke = '#000000';
    hud.sweatCost.strokeThickness = 6; 
    
    
    //Credit Card Company text
    var cccCost = {font: "20px Monospace", fill: "#f0f0f0", align: "center", fontStyle: "bold"}; 
    hud.cccCost = game.add.text(1100, 500, "Credit Card Company\nCost: 0", cccCost);
    hud.cccCost.anchor.set(0.5);
    hud.cccCost.stroke = '#000000';
    hud.cccCost.strokeThickness = 6; 
}

function changeText(){
    /*if(firstPush){
        var obj = game.add.sprite(0, 0, 'halfBack');
        obj.alpha = 0;
        game.add.tween(obj).to( { alpha: 1 }, 2000, "Linear", true);
    }*/
    
    hud.money.text = "Money: " + Phaser.Math.roundAwayFromZero(dollarCount);
    hud.perSecond.text = "Money per\nSecond: " + mps;
    hud.laborCost.text = "Child Laborer\nCost: " + Phaser.Math.roundAwayFromZero(buildings.labor.cost);
    hud.sweatCost.text = "Sweatshop\nCost: " + Phaser.Math.roundAwayFromZero(buildings.sweat.cost);
    hud.cccCost.text = "Credit Card Company\nCost: " + Phaser.Math.roundAwayFromZero(buildings.ccc.cost);
    
    
    //update the money per second
    var laborTotal = buildings.labor.count * laborRate;
    var sweatTotal = buildings.sweat.count * sweatRate;
    var cccTotal = buildings.ccc.count * cccRate;
    mps = laborTotal + sweatTotal + cccTotal;
    
}



function moneyPer(){
    // var laborTotal = buildings.labor.count * laborRate;
    // var sweatTotal = buildings.sweat.count * sweatRate;
    // mps = laborTotal + sweatTotal;
    game.time.events.loop(timeConstant, function() {
        timer++;
        dollarCount += mps;
    }, this);
}


//Click the main coin
function click(){
    if(firstPush === false){
        firstPush = true;
    }
    if(game.input.activePointer.leftButton.isDown){
        dollarCount += 1;
    }
}

//Click on the building button
function incBuilding(object){
    if(game.input.activePointer.leftButton.isDown){
        dollarCount = Phaser.Math.roundAwayFromZero(dollarCount - object.cost);
        object.cost = Phaser.Math.roundAwayFromZero(object.cost * 2.95);
        object.count += 1;
        
        if(object.y === 200 && kidCount < 3){
            var obj = game.add.sprite(700 - (kidCount * 150), 150, 'kid');
            obj.scale.set(0.7);
            kidCount++;
        }

        
    } 
}


//Listens for if costs are met
function costListen(){
    //child laborer cost
    if(dollarCount >= buildings.labor.cost){
        buildings.labor.alpha = 1;
        buildings.labor.inputEnabled = true;
        buildings.labor.input.useHandCursor = true;
    }else{
        buildings.labor.alpha = 0.4;
        buildings.labor.inputEnabled = false;
    }
    
    //sweatshop
    if(dollarCount >= buildings.sweat.cost){
        buildings.sweat.alpha = 1;
        buildings.sweat.inputEnabled = true;
        buildings.sweat.input.useHandCursor = true;
        
    }else{
        buildings.sweat.alpha = 0.4;
        buildings.sweat.inputEnabled = false;
    }
    
    //credit card company
    if(dollarCount >= buildings.ccc.cost){
        buildings.ccc.alpha = 1;
        buildings.ccc.inputEnabled = true;
        buildings.ccc.input.useHandCursor = true;
    }else{
        buildings.ccc.alpha = 0.4;
        buildings.ccc.inputEnabled = false;
    }
    
}



function createRectangle(x, y, w, h) {
    var graphics = game.add.graphics(x, y);

    // set a fill and line style
    graphics.beginFill(0x000000);
    graphics.lineStyle(5, 0xffffff, 1);
    
    // draw a shape
    graphics.moveTo(0,0);
    graphics.lineTo(w, 0);
    graphics.lineTo(w, h);
    graphics.lineTo(0, h);
    graphics.lineTo(0, 0);
    graphics.endFill();
    
    graphics.fixedToCamera = true;
    
    return graphics;
}
