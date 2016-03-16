var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { 
    preload: preload,
    create: create,
    update: update,

});

//ALL THE TEXT

var boss = {
    q: [   
    "Boss:\nHello. Have you heard about these video games? Making children violent, so I read.",
    "Boss:\nI'm not sure I understand what you sent me. Are you sure you have good sources?"
    ],
    
    c: [
    "Boss:\nI don't think I appreciate the aggression. This is exactly what I am talking about!",
    "Boss:\nWell I suppose we will have to agree to disagree"
    ],
    
    m: [
    "Boss:\nI must confess that I do not know much about this, thank you for the information. Please send me the articles",
    "Boss:\nVery interesting, I had no idea there was so much to this industry."
    ],
    
    w: ["Boss:\nFarewell"]
};
var work = {
    q: [
    "Did you hear what our boss has been saying about video games. She's an idiot.",
    "How did it go with the boss?"
    ],
    
    c: [
    'Wow! Someone sure is cranky this morning',
    "Whatever, I wasn't being nosy"
    ],
    
    m: [
    "Listen, I appreciate you being nice, but she is stuck in the stone age.",
    "Yeah, I know, you're right. I'll try to ease up."
    ],
    
    w: ["Catch ya later."]
};
var playerText = {
    c: [
        "You don't believe that bogus do you?!",
        "There's no consistent research that shows any direct causation of violence due to games"
        ],
    m: [
        "There's actually a lot of research that shows why those claims are surface level. I can send you those.",
        "I certainly will, there are also some good TED talks on the subject if you want to look around."
        ],
    w: ["I'm sorry, I have to go."],
}
var blank = [" "];

    
////Player

var timeConstant = Phaser.Timer.SECOND;
var timer = 0;
var currentTime = 0;
var pathTimer = 0;

var playerOptions = {};
var characters = {};
var questionText = {};

//variable that keeps track of the last person
var lastPerson;
var reaction;

//playerOptions booleans
var confrontYes = false;
var mediateYes = false;
var withdrawYes = false;
var playerChose = false;

var roundStart = false;
var buttonsOn = false;

//conversation path position
var path = 0;

function preload(){
    game.load.spritesheet('boss', 'characters-06-Boss.png', 104, 96);
    game.load.image('confront', 'confront250x150.png');
    game.load.image('mediate', 'mediate.png');
    game.load.image('withdraw', 'withdraw.png');
}


function create() {
    createRectangle(0, 275, 799, 161);
    timeRun();
    // changeButtons();
    //make characters
    characters.boss = drawSprite(100, 80, 'boss', 0);
    
    //create the menu
    playerOptions.confront = drawPlayerOptions(10, 440, 'confront');
    playerOptions.mediate = drawPlayerOptions(270, 440, 'mediate');
    playerOptions.withdraw = drawPlayerOptions(530, 440, 'withdraw');
    
    pathManager();
    // roundManager(boss.q, 'q', 0);
    setText();
}

function update(){
}

//set the timer 
function timeRun(){
    game.time.events.loop(timeConstant, function(){
        timer++;
        //changeButtons();
    }, this);
}

//PATH MANAGER
function pathManager(){
    if(path === 0){
        disableButtons();
        game.time.events.add(Phaser.Timer.SECOND * 3, function(){
            updateText(boss.q, 0);
            enableButtons();
        }, this);
    }
    if(path === 1){
        if(confrontYes){
            roundManager(boss.c, path-1, playerOptions.mediate);
        }else if(mediateYes){
            roundManager(boss.m, path-1, playerOptions.confront);
        }else if(withdrawYes){
            roundManager(boss.w, 0, playerOptions.withdraw);
        }else{
            console.log('impressive');
        }
    }
    if(path === 2){
        if(confrontYes){
            roundManager(boss.c, path-1, playerOptions.mediate);
        }else if(mediateYes){
            roundManager(boss.m, path-1, playerOptions.confront);
        }else if(withdrawYes){
            roundManager(boss.w, 0, playerOptions.withdraw);
        }else{
            console.log('impressive');
        }        
    }else{
        return null;
    } 
}

function roundManager(person, pathCount, disable){
    // disableButtons();
    game.time.events.add(Phaser.Timer.SECOND * 3, function(){
        updateText(person, pathCount);
        enableButtons();
        disableButton(disable);
    }, this);  
}

//WRITE TEXT
function setText(){
    var state = { font: "21px Arial", fill: "#19de65", wordWrap: true, wordWrapWidth: 300 };
    questionText.player = game.add.text(355, 270, '', state);
    questionText.player.stroke = "#000000";
    questionText.player.strokeThickness = 2;
    questionText.player.text = "";
}

function updateText(list, val, state){
    //states refer to question, conflict, mediate, or withdraw they will be a numbered system going 0,1,2,3
    qText = { font: "21px Arial", fill: "#09bb04", wordWrap: true, wordWrapWidth: 375 };
    aConflictText = { font: "21px Arial", fill: "#ff5a00", wordWrap: true, wordWrapWidth: 375 };
    aMediateText = { font: "21px Arial", fill: "#0f0fe8", wordWrap: true, wordWrapWidth: 375 };
    aWithdrawText = { font: "21px Arial", fill: "#09bb04", wordWrap: true, wordWrapWidth: 375 };
    
    if(confrontYes){
        state = aConflictText;
    }else if(mediateYes){
        state = aMediateText;
    }else if(withdrawYes){
        state = aWithdrawText;
    }else{
        state = qText;
    }

    questionText.lefty = game.add.text(32, 280, '', state);
    questionText.lefty.alpha = 0;
    // questionText.lefty.stroke = "#000000";
    // questionText.lefty.strokeThickness = 4;
    questionText.lefty.text = "" + list[val];
    fadeIn(questionText.lefty);
    lastPerson = list;
    return lastPerson;
}

function clearLeftText(){
    game.add.tween(questionText.lefty).to( { alpha: 0 }, 800, Phaser.Easing.Linear.None, true);
}

function clearPlayerText(){
    game.add.tween(questionText.player).to( { alpha: 0 }, 800, Phaser.Easing.Linear.None, true);    
}

///BUTTON DISPLAY FUNCTIONS
function changeButtons(){
    var difference = timer - currentTime;
    if(difference === 5){
        enableButtons();
        playerChose = false;
    }
    if(playerChose){
        disableButtons();
    }
    // console.log(currentTime + "  " + timer + "  " + difference);
}


function disableButton(object){
    object.inputEnabled = false;
    game.add.tween(object).to( { alpha: 0.1 }, 800, Phaser.Easing.Linear.None, true);
    console.log(object + " is disabled");
}

function disableButtons(){
    game.add.tween(playerOptions.confront).to( { alpha: 0.4 }, 800, Phaser.Easing.Linear.None, true);
    game.add.tween(playerOptions.mediate).to( { alpha: 0.4 }, 800, Phaser.Easing.Linear.None, true);
    game.add.tween(playerOptions.withdraw).to( { alpha: 0.4 }, 800, Phaser.Easing.Linear.None, true);
}

function enableButtons(){
    game.add.tween(playerOptions.confront).to( { alpha: 0.8 }, 800, Phaser.Easing.Linear.None, true);
    game.add.tween(playerOptions.mediate).to( { alpha: 0.8 }, 800, Phaser.Easing.Linear.None, true);
    game.add.tween(playerOptions.withdraw).to( { alpha: 0.8 }, 800, Phaser.Easing.Linear.None, true);
}

////DRAW THINGS
function drawSprite(x, y, sprite, key){
    var obj = game.add.sprite(x, y, sprite);
    obj.alpha = 0;
    fadeIn(obj);
    obj.frame = key;
    obj.scale.set(2);
    return obj
}

function fadeIn(sprite){
    game.add.tween(sprite).to( { alpha: 0.8 }, 800, Phaser.Easing.Linear.None, true);
}

function fadeOut(sprite){
    game.add.tween(sprite).to( { alpha: 0 }, 800, Phaser.Easing.Linear.None, true);
}

function drawPlayerOptions(x, y, sprite){
    var obj = game.add.sprite(x, y, sprite);
    obj.inputEnabled = true;
    obj.events.onInputDown.add(playerChoice,this);
    return obj;
}

function changeSprite(object, key){
    object.frame = key;
}

function playerManager(list){
    aConflictText = { font: "21px Arial", fill: "#ff5a00", wordWrap: true, wordWrapWidth: 320 };
    aMediateText = { font: "21px Arial", fill: "#0f0fe8", wordWrap: true, wordWrapWidth: 320 };
    aWithdrawText = { font: "21px Arial", fill: "#09bb04", wordWrap: true, wordWrapWidth: 320 };
    var value = path;
    if(confrontYes){
        state = aConflictText;
        list = playerText.c;
    }else if(mediateYes){
        state = aMediateText;
        list = playerText.m;
    }else if(withdrawYes){
        state = aWithdrawText;
        list = playerText.w;
        if(path > 0){
            value = 0;
        }
    }
   questionText.player = game.add.text(440, 280, '', state);
   questionText.player.alpha = 0;
   questionText.player.text = " " + list[value];
   fadeIn(questionText.player);
}

///PLAYER INPUT
function playerChoice(object){
    clearLeftText();
    clearPlayerText();
    object.alpha = 1;
    if(object.key === "confront"){
        currentTime = timer;
        confrontYes = true;
        mediateYes = false;
        withdrawYes = false;
        playerChose = true;
        reaction = 'c';
    }
    if(object.key === "mediate"){
        mediateYes = true;
        confrontYes = false;
        withdrawYes = false;
        currentTime = timer;
        // console.log(object.key)
        playerChose = true;
        reaction = 'm';
    }
    if(object.key === "withdraw"){
        withdrawYes = true;
        confrontYes = false;
        mediateYes = false;
        currentTime = timer;
        // console.log(object.key)
        playerChose = true;
        reaction = 'w';
		path++;
    }
    playerManager();
    disableButtons();
    path++;
    pathManager();
}


//Draw some squares
function createRectangle(x, y, w, h) {
    var graphics = game.add.graphics(x, y);

    // set a fill and line style
    graphics.beginFill(0xdddddd);
    graphics.lineStyle(1, 0xffffff, 1);
    
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
