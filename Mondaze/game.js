var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { 
    preload: preload,
    create: create,
    update: update,
    render: render
});


////////////////////////
// Global Constants

var worldWidth = 1600;
var worldHeight = 1200;
var timeConstant = Phaser.Timer.SECOND / 2;


////////////////////
// Global Variables

var player;

var timer = 0;

var points = {};
points.interpersonal = 0;
points.work = 0;
points.comfort = 0;

var objects = {};
var interactions = {};
var storystate = {};

var background;
var hud = {};
var dialogs = [];
//var doors = {};

var music = [];
var sfx = [];

var startScreen;
var fadeSprite;
var endSprite;

var ending = "Same old, same old."




///////////////////////
// Hour by hour logic

function nextHour(hour) {
    if(hour == 17) {
        endGame();
    }
    
    
    ///demetrious story
    if(hour == 10){
        interactions.tamera = talkToTameraFirst();
    }else if(hour == 11){
        interactions.tamera.destroy();
    }
    if (hour == 11) {
        if(storystate.DEMITRIUS_ASSIGNMENT === true) {
            interactions.iris = talkToDemetrious();
        }
    }
    if (hour == 12) {
        if(storystate.MARCY_BREAKROOM === true) {
            interactions.marcy = talkToMarcyNegative();
        }
    }
    /*
    if(hour == 10) {
        console.log('carol');
        objects.iris.direction = 'left';
        var tween = Tween(objects.iris, {x: 700}, 1500);
        tween.onComplete.addOnce(function() {
            objects.iris.direction = 'stopped';
            //if(storystate)
            //interactions.iris = talkToDemetrious();
        })
    }else if(hour == 11) {
        interactions.iris.destroy();
        objects.iris.direction = 'right';
        var tween2 = Tween(objects.iris, {x: 1190}, 1500);
        tween2.onComplete.addOnce(function() {
            objects.iris.direction = 'stopped';
        })
    } 
    }*/
}



//////////////////////////////////////
// Global preload, create, and update

function preload() {
    game.load.image('rabbit', 'rabbit.png'); // Load the rabbit image
    game.load.image('desk', 'desk_corner_right.png'); // Load the rabbit image
    game.load.image('circle', 'redCircle.png');
    game.load.image('circleActive', 'greenCircle.png');
    //game.load.image('iris', 'glassdoor_left.png');
    game.load.image('background', 'floor tile-01.png');
    game.load.image('cwv', 'cubical_wall_vertical.png');
    game.load.image('cwh', 'cubical_wall_horizontal.png');
    game.load.image('dwh', 'wall_half_horizontal.png');
    game.load.image('dwv', 'wall_half_vertical.png');
    game.load.image('coffeetable', 'coffeetable.png');
    game.load.image('computer', 'computer.png');
    game.load.image('fridge', 'fridge.png');
    game.load.image('wfh', 'wall_full_horizontal.png');
    game.load.image('fancydesk', 'fancy_desk.png');
    game.load.image('printer', 'printer_rawr.png');
    game.load.image('boss', 'boss.png');
    game.load.image('fade', 'fade.png');
    game.load.image('end', 'endscreen.png');
    game.load.image('watercooler', 'watercooler.png')
    
    //Spritesheets
    game.load.spritesheet('spritey', 'charSprite.png', 55, 96);
    game.load.spritesheet('doubledoory', 'glassdoor_double_animsheet.png', 145, 181.98)
    game.load.spritesheet('singledoory', 'glassdoor_vertical_inleftanim.png', 144, 181.98)
    game.load.spritesheet('clear', 'clear.png');
    game.load.spritesheet('fade', 'fade.png');
    game.load.spritesheet('start', 'Mondaze_title.png');
    
    
    game.load.spritesheet('demetrius','characters-01-Secretary.png', 55, 96);
    game.load.spritesheet('santos', 'characters-02-IT.png', 66, 96);
    game.load.spritesheet('iris','characters-03-Receptionist.png', 55, 96);
    game.load.spritesheet('marcy','characters-04-Accountant.png', 66, 96);
    //game.load.spritesheet('tamera','characters-06-Boss.png', 104, 96);
    
    
    //SOUND HERE
    game.load.audio('music1', 'OfficeTrackA.ogg');
    //game.load.audio('music1', 'NeutralHour1Complete.wav');
    game.load.audio('sfx1','PhoneSingle.wav');
    game.load.audio('sfx2', 'WaterCooler.wav');
    game.load.audio('sfx3', 'Printer.ogg');
    game.load.audio('sfx4', 'Typing.ogg');
    game.load.audio('sfx5', 'TaskComplete.wav');
    
}


//BE SURE TO KEEP CREATED OBJECTS IN ORDER
function create() {
    displayStartScreen();
    

}

function displayStartScreen() {
    startScreen = game.add.sprite(0, 0, 'start');
    startScreen.fixedToCamera = true;
    
    // Draw instructions text
    var text = "Press E to start game!";
    var textOptions = { font: "35px Monospace", fill: "#000000", align: "center"}; // fill -> Color  
    instructions = game.add.text(game.world.centerX, game.world.centerY+150, text, textOptions);
    instructions.anchor.set(0.5); // Center text
    
    // Tween - fade instructions text in and out
    instructions.alpha = 0.0; // Start text totally faded out
    game.add.tween(instructions).to( { alpha: 1.0 }, 1000, 'Linear', true, 500, -1, true);
    
    
    startScreen.update = function() {
     if (game.input.keyboard.isDown(Phaser.Keyboard.E)) {
        startScreen.destroy();
        restartGame(); 
     }
    }
    
}

function restartGame() {
    
    background = game.add.sprite(0, 0, 'background');
    
    startAudio();

    // Add Walls
    addWalls();
    
    // Add coworkers
    // objects.carol = Carol(500, 200);
    // objects.iris = Iris(1200, 400);
    
    // Add static objects    
    objects.yourDesk = Desk(620, 550);
    objects.yourComputer = Computer(600, 496);
    
    
    objects.santosDesk = Desk(610, 150);
    objects.santosComputer = Computer(592, 96);
    objects.santos = Human(590, 125, 'santos');
    
    objects.marcyDesk = Desk(100, 350);
    objects.marcyComputer = Computer(78, 296);
    objects.marcy = Human(90, 320, 'marcy');
    
    objects.irisDesk = Desk(1200, 400);
    objects.irisComputer = Computer(1181, 346);
    objects.iris = Human(1190, 400, 'demetrius');
    
    objects.bossDesk = StaticObject(1100, 100, 'fancydesk');
    objects.tamera = Boss(1100, 125, 'boss');
    
    
    // TODO - Put reception desk here
    
    objects.dimitri = Human(300, 825, 'iris');
    
    
    
    objects.coffeeTable = CoffeeTable(1000, 600);
    objects.fridge = Fridge(1250, 575);
    objects.printer = StaticObject(110, 100, 'printer')
    objects.waterCooler = StaticObject(400, 100, 'watercooler');
    
    // Add perminent interactions
    interactions.coffee = drinkCoffee();
    // interactions.iris = talkToIris();
    interactions.email = doEmail();
    interactions.printer = doFax();
    //interactions.fridge = eatLunch();
    interactions.waterCooler = drinkWater();
    
    // Add Walls
    
    // Add player
    player = Player(600, 700);
    
    createRectangle(0, 0, 800, 46);
    createRectangle(700, 0, 100, 46);
    createTimer(); // Accessible with timer
    createPointsHUD();
    
    fadeSprite = game.add.sprite(0, 0, 'fade');
    fadeSprite.fixedToCamera = true;
    fadeSprite.alpha = 0.0;
    
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.world.setBounds(0, 0, 1310, 1030);
    game.camera.follow(player);
    
}

function endGame() {
    
  
  
    // Fade out
    var fadeOut = Tween(fadeSprite, {alpha: 1.0}, 1500);
    fadeOut.onComplete.addOnce(function() {
        endSprite = game.add.sprite(0, 0, 'end');
        endSprite.fixedToCamera = true;
        endSprite.alpha = 0.0;
        var fadeOut2 = Tween(endSprite, {alpha: 1.0}, 1500);
    
        
        var textOptions = { font: "25px Monospace", fill: "#f0f0f0", align: "left"}; // fill -> Color 
        var textObject = game.add.text(300, 100, 'What did you do today at work?' , textOptions);
        textObject.anchor.set(0.5); // Center text
        textObject.fixedToCamera = true;
            
            
        var endingText;
        
        var specialEnding = false;
        if (storystate.MARCY_GOOD_ENDING === true){
            specialEnding = true;
        }
        if(specialEnding) {
            if (storystate.MARCY_GOOD_ENDING === true) {
                endingText = "I learned a lot about my\ncoworker Marcy today.";
            }
            
            
        } else if(points.work === 0 && points.interpersonal === 0 && points.comfort === 0) {
            endingText = "I literally did nothing today.";
        } else if(points.work > points.interpersonal && points.work > points.comfort) {
            endingText = "I did a lot of work today.";
        } else if(points.interpersonal > points.work && points.interpersonal > points.comfort) {
            endingText = "I met my coworkers.";
        } else {
            endingText = "I had an easy day.";
        }
        
        
            
        var textObject2 = game.add.text(470, 350, endingText , textOptions);
        textObject2.anchor.set(0.5); // Center text
        textObject2.fixedToCamera = true;
    
    
        fadeOut2.onComplete.addOnce(function() {
            game.paused = true;
        })
        
    })

    // Dialog("What'd you do at work today?", 1000, function() {
    //     Dialog(ending, 1000, function() {
    //         Tween()
    
}



function addWalls() {

    //marcy-top
    for (i = 0; i < 4; i++) {
    a = Wall(i*64-40, 240, 'dwh'); 
    }
    //marcy-bottom
    for (i = 0; i < 4; i++) {
    a = Wall(i*64-40, 624, 'dwh'); 
    }
    //santos-bottom
    for (i = 0; i < 6; i++) {
        if (i < 3 || i > 5){
            a = Wall(i*64+480, 240, 'dwh');
        } else if (i === 3) {
            //doors.santos = DoubleDoor(i*64+516, 305)
            a = Wall(i*64+625, 240, 'dwh');
        }
    }
    //boss- bottom
    for (i = 0; i < 6; i++) {
    a = Wall(i*64+890, 494, 'dwh');  
    }
    
    //cube top
    for (i = 0; i < 3; i++) {
    a = Wall(i*64+520, 440, 'cwh');  
    }
    
    //top-edge
    for (i = 0; i < 20; i++ ) {
        a = Wall(i*64 - 24, -24, 'wfh');
    }
    
    
    //VERTICAL
    
    //cube-left
    for (i = 0; i < 5; i++) {
    a = Wall(516, i*42 + 440, 'cwv');
    }
    //cube-right
    for (i = 0; i < 5; i++) {
    a = Wall(700, i*42 + 440, 'cwv');
    }
    
    //vertical large left
    for (i = 0; i < 16; i++) {
        if (i > 4 && i != 12 & i != 13) {
            a = Wall(226, i*42 - 34, 'dwv');
        } else if (i === 12) {
            //doors.largeleft = VertDoor(226, i*42 - 34)
        }
    }
    
    //vertical left edge
    for (i = 0; i < 15; i++) {
        a = Wall(0, i * 42, 'dwv');
    }
    //vertical santos left
    for (i = 0; i < 6; i++) {
    a = Wall(516, i*42, 'dwv');
    }
    //vertical boss-breakroom-left
    for (i = 0; i < 24; i++) {
        if (i != 9 && i != 10 && i != 16 && i != 17)  {
            a = Wall(900, i*42, 'dwv');
        }
    }
    //vertical boss-breakroom-right
    for (i = 0; i < 24; i++) {
    a = Wall(1284, i*42, 'dwv');
    }
    //Right long wall

}

function startAudio() {
    //Music
    
    music1 = game.add.audio('music1');
 
    music = [music1];
    
    //music[0].loop = true;
    music[0].play();
    music[0].volume = 0.3;
    
    //sound effects
    sfx1 = game.add.audio('sfx1');
    sfx1.volume = 0.05;
    sfx2 = game.add.audio('sfx2');
    sfx2.volume = 0.05;
    sfx3 = game.add.audio('sfx3');
    sfx3.volume = 0.05;
    sfx4 = game.add.audio('sfx4');
    sfx4.volume = 0.05;
    sfx5 = game.add.audio('sfx5');
    sfx5.volume = 0.5; 

    sfx = [sfx1, sfx2, sfx3, sfx4];
    
    //sound effects have a position, be sure to assign x,y coordinates
    Noises(sfx[0], 78000, 90000);
    sfx[0].x = 300;
    sfx[0].y = 300;
    Noises(sfx[1], 54000, 98000);
    sfx[1].x = 400;
    sfx[1].y =400;
    Noises(sfx[2], 54000, 78000);
    sfx[2].x = 120;
    sfx[2].y =100;
    Noises(sfx[3], 50000, 18000);
    Noises(sfx[3], 70000, 214000);
    sfx[3].x = 500;
    sfx[3].y =400;
}

function update() {
    if(player !== undefined) {
        update2();
    }
}

function update2() {
    updatePointsHUD();
    updateSound();
}


function updateSound() {
    
    sfx.forEach(function(sound) {
        var dist = Phaser.Math.distance(sound.x, sound.y, player.x, player.y);
        
        var intensity = 0.7 / Math.sqrt(dist);
        
        sound.volume = intensity;
    })
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.M)){
        music.forEach(function(aMusic) {
          aMusic.mute = true  
        });
        sfx.forEach(function(aSfx){
            aSfx.mute = true;
        })
    }
}


////////////////
// Global Timer

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

function createTimer() {
    var text = "";
    var textOptions = { font: "25px Monospace", fill: "#f0f0f0", align: "center", fontStyle: "bold"}; // fill -> Color  
    
    game.time.events.loop(timeConstant, function() {
        timer++;
        updateWallTime();
    }, this);
    
    hud.timer = game.add.text(game.world.width - 50, 25, text, textOptions);
    hud.timer.fixedToCamera = true;
    hud.timer.anchor.set(0.5); // Center text
}


function updateWallTime() {
    var hour = 9 + (Math.floor(timer / 60));
    var minute = timer % 60;
    if(minute === 0) {
        nextHour(hour);
    }
    if(minute < 10) {
        minute = '0' + minute;
    }
    hud.timer.text = hour + ':' + minute;
}


/////////////
// Points HUD

function createPointsHUD() {
    var textOptions = { font: "25px Monospace", fill: "#f0f0f0", align: "center"}; // fill -> Color  
    
    hud.points = {};
    
    hud.points.comfort = game.add.text(100, 25, "Comfort: 0", textOptions);
    hud.points.comfort.anchor.set(0.5); // Center text
    hud.points.comfort.fixedToCamera = true;
    
    hud.points.interpersonal = game.add.text(300, 25, "Personal: 0", textOptions);
    hud.points.interpersonal.anchor.set(0.5); // Center text
    hud.points.interpersonal.fixedToCamera = true;
    
    hud.points.work = game.add.text(475, 25, "Work: 0", textOptions);
    hud.points.work.anchor.set(0.5); // Center text
    hud.points.work.fixedToCamera = true;
    
    
}

function updatePointsHUD() {
    hud.points.comfort.text = "Comfort: " + points.comfort;
    hud.points.interpersonal.text = "Personal: " + points.interpersonal;
    hud.points.work.text = "Work: " + points.work;
}

/////////////////////
// Dialog helpers

function closeDialogs() {
    dialogs.forEach(function(dialog) {
        dialog.destroy(); 
    });
}




function Tween(obj, attrs, time) {
    return game.add.tween(obj).to(attrs, time, 'Linear', true);
    
}
// tween(objects.carol, {x: 500},  1500)



//////////
// Tasks

var drinkCoffee = function() {
    return Interaction(0, 0, 250, 250, 5, function() {
        points.comfort += 2;
        //interactions.coffee.destroy();
    }, function() {}, objects.coffeeTable);
}

var doEmail = function() {
    return Interaction(0, 0, 250, 250, 5, function() {
        points.work += 1;
        //interactions.coffee.destroy();
    }, function() {}, objects.yourComputer);
}
/*
var eatLunch = function() {
    return Interaction(0, 0, 250, 250, 30, function() {
        //interactions.fridge.destroy();
    }, function() {
        Menu("A) Eat your lunch.\nB) Eat Santos's lunch",
            function() {
                points.comfort += 8;
            },
            function() {
                points.comfort += 12;
                //STORY STATE CHANGE GOES HERE
            }, interactions.fridge);
    }, objects.fridge);
}
*/

var doFax = function() {
    return Interaction(0, 0, 250, 250, 15, function() {
        points.work += 4;
    }, function() {}, objects.printer);
}

var drinkWater = function() {
    return Interaction(0, 0, 250, 250, 3, function() {
        points.comfort += 1;
    }, function() {}, objects.waterCooler);
}


var talkToCarol = function() {
    return Interaction(0, 0, 250, 250, 15, function() {
        points.interpersonal += 1;
        interactions.carol.destroy();
        Tween(objects.carol, {x: 500},  1500);
    }, function() {
        Dialog("Don't ask me.\nI don't work here.", 3000, function() {
            Menu("A) Classic Carol. \nB) You won't for long.", function(){
                Dialog("Who is Carol?", 4000, function(){
                    Dialog("Welp, it sure was nice to meet you.\n Whoever YOU are.", 4000, function(){});
                });
            }, function(){
                Dialog("Keep dreaming.\n You ain't half the trouble I've seen", 4000, function(){
                    Dialog("Smell ya later.", 4000, function(){});
                });
            });
        });
        
    }, objects.carol);
}



var talkToIris = function() {
    
    return Interaction(0, 0, 250, 250, 8, function() {
        points.interpersonal += 1;
        interactions.iris.destroy();
    }, function() {
        console.log('irisInteractionStart');
        Dialog("Hello! How's it going?\nNot that I really care.", 4000, function() {
            Menu("A) It's going pretty well.\nB) If you don't care why would you ask?", function() {
                Dialog("Ok. That's nice", 4000, function() {}); 
            }, function() {
                Dialog("Why not?", 4000, function() {});
            }, interactions.iris);
        })
    }, objects.iris);
}

var talkToTameraFirst = function() {
    return Interaction(0, 0, 250, 250, 9, function() {
        interactions.tamera.destroy();
    }, function() {
        Menu("A) Hello Ms. Weiss. Did you have something for me?\nB) Boss? Did something go wrong?",
            function(){
                Dialog("Glad to see you're ready to work. I have a few things you can do, \nbut check in with Demetrius for your first assignment. I want to see top quality work.", 9000, function(){});
                storystate.DEMITRIUS_ASSIGNMENT = true;
                points.interpersonal += 1;
            },
            function(){
                Dialog("No something didn't go wrong, but I don't appreciate you thinking so. \nGo see Demetrius and start your first assignment. It better be perfect, too.", 9000, function(){});
                storystate.DEMITRIUS_ASSIGNMENT = true;
                storystate.MARCY_BREAKROOM = false;
            }, interactions.tamera);
    }, objects.tamera);
}

var talkToMarcyNegative = function() {
    return Interaction(0, 0, 250, 250, 25, function() {
        try{
        interactions.marcy.destroy();
    } catch (e) {}
    }, function() {
        Menu("A) Hello? Are you Marcy?\nB) Who are you, and why are you lounging about in here?",
            function(){
                points.interpersonal += 1;
                Dialog("Boss!? Oh wait. You aren't her. Um... yes, I'm Marcy.\nYou're the intern, right? It's nice to meet you.", 10000, 
                    function() {
                        Menu("A) Nice to meet you as well. Are you doing well?\n Is there anything I can help with?\nB) You're not slacking? Certainly looks like it to me.", 
                            function() {
                                points.interpersonal += 1;
                                Dialog("Help? O-oh no, I've got everything done for the day.\nThank you for offering though.", 10000, 
                                    function() {
                                        storystate.MARCY_GOOD_ENDING = true;
                                        Dialog("Well if you need something,\ndon't hesitate to let me know.", 5000, function(){});
                                    });
                            },
                            function() {
                                Dialog("S-stop talking already!\nYou'll get me in trouble!", 5000, function(){});
                                //STEVE: MARCY WALKS BACK TO DESK HERE.
                        }, interactions.marcy);
                    });
            },
            function(){
                Dialog("I'm not slacking! I mean... I am taking a break. Did you... need something?", 10000,
                    function() {
                        Menu("A) Nice to meet you as well. Are you doing well? Is there anything I can help with?\nB) You're not slacking? Certainly looks like it to me.", 
                            function() {
                                points.interpersonal += 1;
                                Dialog("Help? O-oh no, I've got everything done for the day. Thank you for offering though.", 10000, 
                                    function() {
                                        storystate.MARCY_GOOD_ENDING = true;
                                        Dialog("Well if you need something, don't hesitate to let me know.", 5000, function(){});
                                    });
                            },
                            function() {
                                Dialog("S-stop talking already! You'll get me in trouble!", 5000, function(){});
                                //STEVE: MARCY WALKS BACK TO DESK HERE.
                        }, interactions.marcy);
                    });
            }, interactions.marcy);
    }, objects.marcy);
}


var talkToDemetrious = function() {
    return Interaction(0, 0, 250, 250, 20, function() {
        try{
            interactions.iris.destroy();
        } catch(e) {
            
        }
    }, function() {
        Menu("A) Hello sir, I was told to see you about my assignment?\nB) Yeah... Assignment.",
            function(){
                storystate.MARCY_BREAKROOM = false;
                Dialog("The name is Demetrius. Glad to meet you. You'll be in \ncharge of responding to emails today. If you need any additional help, see Iris or Marcy for that. Any other questions?", 10000, 
                    function(){
                        points.interpersonal += 1;
                        Menu("A) Got it. No questions at the moment. Thank you.\nB) Nothing, easy work like that will be done soon.", 
                            function(){
                                points.interpersonal += 1;
                                Dialog("Great to hear. I hope you'll fit in well here. See you later.", 10000, function(){});
                            },
                            function(){
                                Dialog("I see. Hope you're able to get it\n all done in time then.", 10000, function(){});
                            }, interactions.iris);
                    });
            },
            function(){
                storystate.MARCY_BREAKROOM = true;
                Dialog("Yes. The name is Demetrius, and you'll do well to smile a bit.\n You'll be in charge of answering emails today.\n So get to it. Any questions? ", 10000, 
                    function(){
                        points.interpersonal += 1;
                        Menu("A) Got it. No questions at the moment. Thank you.\nB) Nothing, easy work like that will be done soon.", 
                            function(){
                                points.interpersonal += 1;
                                Dialog("Great to hear. I hope you'll fit in well here.\n See you later.", 10000, function(){});
                            },
                            function(){
                                Dialog("I see. Hope you're able to get it \nall done in time then.", 10000, function(){});
                            }, interactions.iris);
                    });
                
            }, interactions.iris);
    }, objects.iris);
}

var talkToMarcyNegative = function() {
    return Interaction(0, 0, 250, 250, 25, function() {
        interactions.marcy.destroy();
    }, function() {
        Menu("A) Hello? Are you Marcy?\nB) Who are you, and why are you lounging about in here?",
            function(){
                points.interpersonal += 1;
                Dialog("Boss!? Oh wait. You aren't her. Um... yes, I'm Marcy. You're the intern, right? It's nice to meet you.", 10000, 
                    function() {
                        Menu("A) Nice to meet you as well. Are you doing well? Is there anything I can help with?\nB) You're not slacking? Certainly looks like it to me.", 
                            function() {
                                points.interpersonal += 1;
                                Dialog("Help? O-oh no, I've got everything done for the day. Thank you for offering though.", 10000, 
                                    function() {
                                        storystate.MARCY_GOOD_ENDING = true;
                                        Dialog("Well if you need something, don't hesitate to let me know.", 5000, function(){});
                                    });
                            },
                            function() {
                                Dialog("S-stop talking already! You'll get me in trouble!", 5000, function(){});
                                //STEVE: MARCY WALKS BACK TO DESK HERE.
                        }, interactions.marcy);
                    });
            },
            function(){
                Dialog("I'm not slacking! I mean... I am taking a break. Did you... need something?", 10000,
                    function() {
                        Menu("A) Nice to meet you as well. Are you doing well? Is there anything I can help with?\nB) You're not slacking? Certainly looks like it to me.", 
                            function() {
                                points.interpersonal += 1;
                                Dialog("Help? O-oh no, I've got everything done for the day. Thank you for offering though.", 10000, 
                                    function() {
                                        storystate.MARCY_GOOD_ENDING = true;
                                        Dialog("Well if you need something, don't hesitate to let me know.", 5000, function(){});
                                    });
                            },
                            function() {
                                Dialog("S-stop talking already! You'll get me in trouble!", 5000, function(){});
                                //STEVE: MARCY WALKS BACK TO DESK HERE.
                        }, interactions.marcy);
                    });
            }, interactions.marcy);
    }, objects.marcy);
}


// var talkToIris = function() {
//     return Interaction(0, 0, 100, 100, 5, function() {
//         Dialog('Hello', 3000, function() {
//             Menu('Goodbye', 2000, function() {
//                 Dialog('Your mean', 5000, function() {
                    
//                 })
//             }, function() {
//                 Dialog('Your nice')
//             })
//         })
        
//         points.interpersonal += 1;
//         interactions.carol.destroy();
//         Tween(objects.carol, {x: 500},  1500)
//     }, objects.carol);
// }



////////////////
// Co-Workers

var Carol = function(x, y) {
    var obj = StaticObject(x, y, 'rabbit');
    return obj;
}

var Iris = function(x,y){
    var obj = StaticObject(x,y,'iris');
    // obj.scale.set(.15);
    return obj;
}

// DANGER - CAUTION - DANGER - CAUTION - LAZERZ
// Collin's Experimental Sections of DOOOOOM!
// DANGER - CAUTION - DANGER - CAUTION - LAZERZ
// AKA if shit broke, comment this stuff out

var DoubleDoor = function(x, y) {
    var obj = game.add.sprite(x, y, 'doubledoory', 0);
    obj.anchor.setTo(0, 1);
    
    obj.animations.add('close', [0], 10, true);
    obj.animations.add('open', [1], 10, true);
    
    game.physics.enable(obj, Phaser.Physics.ARCADE);
    obj.body.immovable = true;
    
    obj.update = function () {
        var opened = false;
        game.physics.arcade.overlap(player, obj, null, function() {
            obj.play('open');
            opened = true;
        });
        
        if(!opened){
            obj.play('close')
        }
    }
    
    return obj;
}

var VertDoor = function(x, y){
    var obj = game.add.sprite(x, y, 'vertdoory', 0);
    //obj.anchor.setTo(0, 1);
    
    obj.animations.add('close', [0], 10, true);
    obj.animations.add('open', [1], 10, true);
    
    game.physics.enable(obj, Phaser.Physics.ARCADE);
    obj.body.immovable = true;
    
    obj.update = function () {
        var opened = false;
        game.physics.arcade.overlap(player, obj, null, function() {
            obj.play('open');
            opened = true;
        });
        
        if(!opened){
            obj.play('close')
        }
    }
    
    return obj;
}

////////////////
// Classes


function Player(x, y) {
    var obj = game.add.sprite(x, y, 'spritey', 1);
    obj.anchor.setTo(0.5, 0.5);
    
    game.physics.enable(obj, Phaser.Physics.ARCADE);
    obj.speed = 350;
    obj.body.setSize(50, 20, 0, 30);
    
    obj.smoothed = false;
    obj.scale.set(1);
    
 
    
    left = obj.animations.add('left', [9,10,11], 10, true);
    right = obj.animations.add('right', [5, 6, 7], 10, true);
    obj.animations.add('up', [13, 14, 15], 10, true);
    obj.animations.add('down', [1,2,3], 10, true);

    left.enableUpdate = true;
    right.enableUpdate = true;

    obj.animate = function() {
        if(obj.body.velocity.y > 0) {
            player.play('down');
        } else if(obj.body.velocity.y < 0) {
            player.play('up');
        } else if(obj.body.velocity.x > 0) {
            player.play('right');
        } else if(obj.body.velocity.x < 0) {
            player.play('left');
        } else {
            player.animations.stop();
        }
        //console.log(obj.animations.currentFrame);
    }

    obj.update = function() {
        obj.keyboardControls();
        obj.checkOuterWallCollisions();
        obj.animate();
    }
    
    
    obj.keyboardControls = function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            obj.body.velocity.x = -obj.speed;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            obj.body.velocity.x = obj.speed;
        } else {
            obj.body.velocity.x = 0;
        }
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            obj.body.velocity.y = obj.speed;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            obj.body.velocity.y = -obj.speed;
        } else {
            obj.body.velocity.y = 0;
        }
    }
    
    obj.checkOuterWallCollisions = function() {
        var margin = 50;
        
        if(obj.x < margin) {
            obj.x = margin;
            //obj.body.velocity.x = 0;
        }
        
        if(obj.y < margin) {
            obj.y = margin;
            //obj.body.velocity.y = 0;
        }
        
        if(obj.x > worldWidth - margin) {
            obj.x = worldWidth - margin;
            //obj.body.velocity.x = 0;
        }
        
        if(obj.y > worldHeight - margin) {
            obj.y = worldHeight - margin;
            //obj.body.velocity.y = 0;
        }
    }
    
    return obj;
}


function Human(x, y, sprite) {
    var obj = game.add.sprite(x, y, sprite, 1);
    obj.anchor.setTo(0.5, 0.5);
    
    game.physics.enable(obj, Phaser.Physics.ARCADE);
    obj.speed = 350;
    // obj.body.setSize(50, 20, 0, 30);
    obj.body.immovable = true;
    
    obj.smoothed = false;
    obj.scale.set(1);
    
    left = obj.animations.add('left', [9,10,11], 10, true);
    right = obj.animations.add('right', [5, 6, 7], 10, true);
    obj.animations.add('up', [13, 14, 15], 10, true);
    obj.animations.add('down', [1,2,3], 10, true);
    stopped = obj.animations.add('stopped', [1], 10, true);
    obj.direction = 'stopped';


    obj.update = function() {
        game.physics.arcade.collide(player, obj);
        obj.animate();
    }

    obj.animate = function() {
        if(obj.direction === 'down') {
            obj.play('down');
        } else if(obj.direction === 'up') {
            obj.play('up');
        } else if(obj.direction === 'right') {
            obj.play('right');
        } else if(obj.direction === 'left') {
            obj.play('left');
        } else {
            obj.play('stopped');
            obj.animations.stop();
        }
    }
    
    

    return obj;
}


function Boss(x, y, sprite) {
    var obj = game.add.sprite(x, y, sprite);
    obj.anchor.setTo(0.5, 0.5);
    
    game.physics.enable(obj, Phaser.Physics.ARCADE);
    obj.speed = 350;
    // obj.body.setSize(50, 20, 0, 30);
    obj.body.immovable = true;
    
    obj.smoothed = false;
    obj.scale.set(1);
    

    obj.update = function() {
        game.physics.arcade.collide(player, obj);
        // obj.animate();
    }

    return obj;
}




function Dialog(text, time, callback) {
    
    if(player.y > game.world.centerY) {
        boxY = 100;
    } else {
        boxY = 400;
    }
    var box = createRectangle(50, boxY, 700, 100);
    
    var textOptions = { font: "25px Monospace", fill: "#f0f0f0", align: "left"}; // fill -> Color 
    var textObject = game.add.text(400, boxY + 50, text, textOptions);
    textObject.anchor.set(0.5); // Center text
    textObject.fixedToCamera = true;
    
    // textObject.children.push(box);
    
    dialogs.push(textObject);
    dialogs.push(box);
    
    game.time.events.add(0.001 * time * timeConstant, function() {
        textObject.destroy();
        box.destroy();
        callback();
    }, this).autoDestroy = true;
    
    
}


function Menu(text, callbackA, callbackB, interaction) {
    if(player.y > game.world.centerY) {
        boxY = 100;
    } else {
        boxY = 400;
    }
    var box = createRectangle(50, boxY, 700, 100);
    
    var textOptions = { font: "25px Monospace", fill: "#f0f0f0", align: "left"}; // fill -> Color 
    var textObject = game.add.text(400, boxY + 50, text, textOptions);
    textObject.anchor.set(0.5); // Center text
    textObject.fixedToCamera = true;
    
    dialogs.push(textObject);
    dialogs.push(box);
    // interaction.pauseTimer();
    
    textObject.update = function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            textObject.destroy();
            box.destroy();
            callbackA();
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.B)) {
            textObject.destroy();
            box.destroy();
            callbackB();
        }
    }
          
}


function Noises(sound, min, max){
    console.log(game.rnd.integerInRange(min,max));
    sound.play();
    game.time.events.add(0.001 * game.rnd.integerInRange(min, max) * timeConstant, function(){
        sound.stop();
        Noises(sound, min, max);
    }, this);
}


function Interaction(x, y, w, h, duration, endCallback, startCallback, parent) {
    
    if(parent !== undefined) {
        x += parent.x;
        y += parent.y;
    }   
    
    
    
    var obj = game.add.sprite(x, y, 'circle');
    obj.anchor.setTo(0.5, 0.5);
    
    game.physics.enable(obj, Phaser.Physics.ARCADE);
    obj.body.setSize(w, h);
    obj.alpha = 0.8;
    obj.scale.set(0.5);
    
    
    var circleActive = game.add.sprite(x, y, 'circleActive');
    circleActive.anchor.setTo(0.5, 0.5);
    circleActive.scale.set(0.5);
    circleActive.visible = false;
    obj.children.push(circleActive);
    
    obj.taskStarted = false;
    obj.duration = duration;
    
    var textOptions = { font: "25px Monospace", fill: "#f0f0f0", align: "center"}; // fill -> Color  
    obj.timeText = game.add.text(obj.x, obj.y, obj.duration, textOptions);
    obj.timeText.anchor.set(0.5); // Center text
    
    obj.children.push(obj.timeText);
    
    obj.resetTask = function() {
        circleActive.visible = false;
        obj.taskStarted = false;
        obj.timeText.text = obj.duration;
    }
    
    obj.taskDoneEvent = function() {
        obj.resetTask();
        sfx5.play();
        endCallback();
    }
    
    obj.startTask = function() {
        circleActive.visible = true;
        obj.taskStarted = true;
        obj.timeStarted = timer;
        startCallback();
    }
    
    obj.previousTimer = timer;
    
    obj.update = function() {
        
        // if(obj.timerPaused) {
        //     obj.timeStarted +=     
        // }
        
        if(obj.taskStarted) {
            obj.timeText.text = obj.duration - (timer - obj.timeStarted);    
        }
        
        game.physics.arcade.overlap(player, obj, null, function() {
            if (!obj.taskStarted && game.input.keyboard.isDown(Phaser.Keyboard.E)) {
                obj.startTask();
            }
        });
        
        if(obj.taskStarted) {
            if(game.physics.arcade.overlap(player, obj)) {
                if(timer - obj.timeStarted > obj.duration) {
                    obj.taskDoneEvent();
                }
            } else {
                obj.resetTask();
                closeDialogs();
            }
        }
        
        if(parent !== undefined) {
            if(game.physics.arcade.overlap(player, obj) === true){
                parent.alpha = 0.75;
            } else {
                parent.alpha = 1;
            }
        }
    }
    
    obj.destructor = function() {
        obj.textTime.destroy();
    }
    
    return obj;
}

function Desk(x, y) {
    var obj = StaticObject(x, y, 'desk');
    obj.body.setSize(125, 60, 0, -40);
    
    obj.secondBox = StaticObject(x, y, 'clear');
    // obj.secondBox.visible = false;
    obj.secondBox.body.setSize(50, 80, 40, 0);

    // obj.children.push(obj.secondBox);

    return obj;
    
}

function CoffeeTable(x, y) {
    var obj = StaticObject(x, y, 'coffeetable');
    // obj.body.setSize(67, 20, 0, 0);
    return obj;
}

function Computer(x, y) {
    var obj = StaticObject(x, y, 'computer');
    return obj;
}

function Fridge(x, y) {
    var obj = StaticObject(x, y, 'fridge');
    return obj;
}


function Wall(x, y, image) {
    var obj = game.add.sprite(x, y, image);
    
    game.physics.enable(obj, Phaser.Physics.ARCADE);
    obj.body.immovable = true;
    
    obj.update = function() {
        game.physics.arcade.collide(player, obj);
    }
    
    return obj;
    
}

function StaticObject(x, y, image) {
    var obj = game.add.sprite(x, y, image);
    obj.anchor.setTo(0.5, 0.5);
    
    game.physics.enable(obj, Phaser.Physics.ARCADE);
    obj.body.immovable = true;
    
    obj.update = function() {
        game.physics.arcade.collide(player, obj);
    }
    
    return obj;
}


////////

function render() {
    // game.debug.body(objects.iris);
    // game.debug.body(objects.yourDesk.secondBox);
    // game.debug.body(player);
}

