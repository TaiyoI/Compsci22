/**
 * Glow Jump
 * 
 * Started: 1/29/23
 * Finished: 2/1/23
 * Released: 2/2/23
 * 
 * My first game! Please give me advice in the Tips & Thanks!
 * 
 * @LOG {
 * 2/2/23 Released. First on the Hotlist, 37 votes! Updated lb.
 * }
*/
//Canvas Setup
smooth();
size(600,600,P2D);

//Leaderboard Sorting and Variables
var leaderboard = [
    {
        name: "Dark Knight",
        score: 56
    },
    {
        name: "LightningCoder",
        score: 59
    },
    {
        name: "hadleyquinn",
        score: 42
    },
    {
        name: "Jibanyanc",
        score: 60
    },
    {
        name: "Vortex",
        score: 52
    },
]
.sort(function(a,b){
    return a.score - b.score;
})
.reverse();

//Color Palette (Not all colors are used.)
var colors = {
    red: color(255, 0, 0),
    orange: color(255, 153, 0),
    yellow: color(255, 234, 0),
    green: color(0, 181, 36),
    blue: color(0, 51, 255),
    purple: color(191, 0, 255),
    white: color(255, 255, 255),
    black: color(0, 0, 0),
    transBlue: color(0, 51, 255, 150),
    transOrange: color(255, 153, 0, 150),
};

//Random Variables
// {
    var scene = "intro";
    var points = 0, speed = 3, highscore = 0;
    var clicked = false;
// }

//Key Functions and Variables
var keys = [];
keyPressed = function(){
    keys[keyCode] = true;
};
keyReleased = function(){
    keys[keyCode] = false;
};

//Cubey
var cubey = {
    //Key player controls.
    x: 50,
    y: 280,
    w: 40,
    h: 40,
    g: 10,
    j: true,
    
    //Past Location (Important for later)
    past: {
        x: 50,
        y: 280,
    },
    
    //Moving and Gravity
    update: function(){
        //Update Past Location
        cubey.past.x = cubey.x;
        cubey.past.y = cubey.y;
        
        //Gravity
        cubey.y += cubey.g;
        cubey.g += 0.5;
        
        //Applying gravity.
        if(keys[UP] && cubey.j){
            cubey.g = -13;
            cubey.j = false;
        }
        
        //Ending the game.
        if(cubey.y > 500){
            scene = "dead";
        }
        
        //The other directions.
        if(keys[LEFT]){
            cubey.x -= 3;
        }
        if(keys[RIGHT]){
            cubey.x += 3;
        }
        
        //Keeping cubey in the map.
        if(cubey.x + cubey.w >= 600){
            cubey.x = 600 - cubey.w;
        }
        if(cubey.x <= 0){
            cubey.x = 0;
        }
    },
    
    //Drawing Player
    make: function(){
        stroke(colors.transOrange);
        strokeWeight(5);
        fill(colors.orange);
        rect(cubey.x,cubey.y,cubey.w,cubey.h);
        fill(colors.black);
        rect(cubey.x + 5,cubey.y + 5,30,30);
    }
};

//Columns
var column = function(x,y,w,h){
    //Design
    strokeWeight(5);
    stroke(colors.transBlue);
    fill(colors.blue);
    rect(x,y,w,h);
    fill(colors.black);
    rect(x + 5,y + 5,w - 10,h - 10);
    
    //Collisions
    if(cubey.x + cubey.w > x && cubey.y + cubey.h > y && cubey.x < x + w && cubey.y < y + h){
        if(cubey.past.x + cubey.w <= x){
            cubey.x = x - cubey.w;
        } 
        if(cubey.past.y + cubey.h <= y){
            cubey.g = 0;
            cubey.j = true;
            cubey.y = y - cubey.h;
        } 
        if(cubey.past.x >= x + w){
            cubey.x = x + w;
        } 
        if(cubey.past.y >= y + h) {
        cubey.g = 1;
            cubey.y = y + h;
        }
    }
};

//Text Align and Font
// {
    textAlign(CENTER,CENTER);
    textFont(createFont("Monospace Bold"));
// }

//Button
var button = function(x,y,w,h,txt,dest){
    strokeWeight(5);
    stroke(colors.transBlue);
    if(mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h){
        fill(colors.blue);
        rect(x - 5,y - 5,w + 10,h + 10);
        fill(colors.black);
        rect(x,y,w,h);
    }
    else{
        fill(colors.blue);
        rect(x,y,w,h);
        fill(colors.black);
        rect(x + 5,y + 5,w - 10,h - 10);
    }
    textSize(35);
    fill(colors.transBlue);
    text(txt,x + w / 2,(y + h / 2) + 1);
    fill(colors.blue);
    text(txt,x + w / 2,(y + h / 2) - 1);
    if(mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h && clicked === true){
        scene = dest;
    }
};

//Game Scene and Variables
var firstColumn = -10;
var columnH = [random(200,400),random(200,400),random(200,400),random(200,400),random(200,400),random(200,400)];
var columns = [400,550,700,850,1000,1150];
var game = function(){
    //Cubey
    cubey.update();
    cubey.make();
    
    //The Starting Column
    column(firstColumn,320,310,300);
    
    //The Game Columns
    for(var i = 0; i < 6; i++){
        column(columns[i],columnH[i],50,410);
    }
    /*column(columns[0],columnH[0],50,410);
    column(columns[1],columnH[1],50,410);
    column(columns[2],columnH[2],50,410);
    column(columns[3],columnH[3],50,410);
    column(columns[4],columnH[4],50,410);
    column(columns[5],columnH[5],50,410);*/
    
    //Moving the Columns
    firstColumn -= points / 10 + speed;
    columns[0] -= points / 10 + speed;
    columns[1] -= points / 10 + speed;
    columns[2] -= points / 10 + speed;
    columns[3] -= points / 10 + speed;
    columns[4] -= points / 10 + speed;
    columns[5] -= points / 10 + speed;
    
    //Sending Columns Back
    if(columns[0] <= -75){
        columns[0] = 825;
        points++;
    }
    if(columns[1] <= -75){
        columns[1] = 825;
        points++;
    }
    if(columns[2] <= -75){
        columns[2] = 825;
        points++;
    }
    if(columns[3] <= -75){
        columns[3] = 825;
        points++;
    }
    if(columns[4] <= -75){
        columns[4] = 825;
        points++;
    }
    if(columns[5] <= -75){
        columns[5] = 825;
        points++;
    }
    
    //Score Tracker
    textSize(75);
    fill(colors.transBlue);
    text(points,300,52);
    fill(colors.blue);
    text(points,300,49);
};

//Intro Scene and Variables
var introEverything = 0;
var introFade = [0,0,0];
var introLines = [305,0,0,0,360,0];
var intro = function(){
    introFade[0] += 1;
    if(introFade[0] > 100){
        introFade[1] += 3;
        introLines[0] -= 2;
        introLines[1] += 2;
        introLines[2] += 2;
    }
    noStroke();
    fill(colors.orange,introFade[1]);
    textSize(50);
    text("Dark Knight",300,introEverything + 300);
    rect(introLines[0],introEverything + 250,introLines[1],10,10);
    rect(introLines[0],introEverything + 350,introLines[1],10,10);
    rect(295,introEverything + 250,introLines[2],10,10);
    rect(295,introEverything + 350,introLines[2],10,10);
    if(introLines[0] < 101){
        introLines[0] = 101;
        introLines[1] = 398;
        introLines[2] = 198;
        introLines[3] += 2;
        introLines[4] -= 2;
        introLines[5] += 2;
    }
    rect(99,introEverything + 250,10,introLines[3],10);
    rect(491,introEverything + introLines[4],10,introLines[5],10);
    if(introLines[4] < 252){
        introLines[3] = 108;
        introLines[4] = 252;
        introLines[5] = 108;
        introFade[2] += 5;
    }
    noStroke();
    fill(colors.black,introFade[2]);
    rect(0,0,width,height);
    if(introFade[2] > 255){
        scene = "menu";
    }
};

//Juice
var randomJuice1, randomJuice2, randomJuice3, randomJuice4;
var juice = function(){
    randomSeed(82);
    noStroke();
    for(var i = 0; i < 20; i++){
        randomJuice1 = random(10,30);
        randomJuice2 = random(25,575);
        randomJuice3 = random(225,575);
        fill(colors.transBlue);
        ellipse(randomJuice2 + 1,randomJuice3 + 1,randomJuice1,randomJuice1);
        fill(colors.blue);
        ellipse(randomJuice2 - 1,randomJuice3 - 1,randomJuice1,randomJuice1);
    }
    for(var i = 0; i < 10; i++){
        randomJuice1 = random(10,30);
        randomJuice2 = random(25,575);
        randomJuice4 = random(25,75);
        fill(colors.transBlue);
        ellipse(randomJuice2 + 1,randomJuice4 + 1,randomJuice1,randomJuice1);
        fill(colors.blue);
        ellipse(randomJuice2 - 1,randomJuice4 - 1,randomJuice1,randomJuice1);
    }
};

//Menu Scene and Variables
var menu = function(){
    juice();
    textSize(100);
    fill(colors.transBlue);
    text("Glow Jump",300,152);
    fill(colors.blue);
    text("Glow Jump",300,148);
    button(150,300,300,75,"Play","game");
    button(150,400,300,75,"How","how");
    button(150,500,300,75,"Lead","lead");
};

//How Scene and Variables
var how = function(){
    textSize(70);
    fill(colors.transBlue);
    text("How to Play",300,102);
    fill(colors.blue);
    text("How to Play",300,98);
    textSize(30);
    fill(colors.transBlue);
    text("Use the arrow keys to stay up\non the platforms to stay alive.",300,316);
    fill(colors.blue);
    text("Use the arrow keys to stay up\non the platforms to stay alive.",300,314);
    button(150,500,300,75,"Menu","menu");
};

//Leaderboard Scene (variables up top)
var lead = function(){
    textSize(70);
    fill(colors.transBlue);
    text("Leaderboard",300,102);
    fill(colors.blue);
    text("Leaderboard",300,98);
    textSize(30);
    for(var i in leaderboard){
        fill(colors.transBlue);
        text(leaderboard[i].name + " - " + leaderboard[i].score,300,i * 50 + 231);
        fill(colors.blue);
        text(leaderboard[i].name + " - " + leaderboard[i].score,300,i * 50 + 229);
    }
    button(150,500,300,75,"Menu","menu");
};

//Dead Scene and Variables
var dead = function(){
    if(points >= highscore){
        highscore = points;
    }
    textSize(70);
    fill(colors.transBlue);
    text("You Died",300,102);
    fill(colors.blue);
    text("You Died",300,98);
    textSize(30);
    fill(colors.transBlue);
    text("Score - " + points + "\nHigh - " + highscore,300,301);
    fill(colors.blue);
    text("Score - " + points + "\nHigh - " + highscore,300,299);
    button(150,500,300,75,"Menu","reset");
};

//Reset 'Scene'
var reset = function(){
    points = 0;
    firstColumn = -10;
    columns[0] = 400;
    columns[1] = 550;
    columns[2] = 700;
    columns[3] = 850;
    columns[4] = 1000;
    columns[5] = 1150;
    cubey.x = 50;
    cubey.y = 280;
    scene = "menu";
};

//Draw function
draw = function() {
    background(colors.black);
    switch(scene){
        case "intro":
            intro();
        break;
        case "menu":
            menu();
        break;
        case "game":
            game();
        break;
        case "how":
            how();
        break;
        case "lead":
            lead();
        break;
        case "dead":
            dead();
        break;
        case "reset":
            reset();
        break;
    }
    clicked = false;
};

//Turns clicked true.
mouseClicked = function(){
    clicked = true;
};
