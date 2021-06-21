var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var position;
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  balloonref = database.ref("height");
  balloonref.on("value",readPosition,showError);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);
  if(position !== undefined){

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePosition(-3,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePosition(3,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePosition(0,-3);
    balloon.scale = balloon.scale - 0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePosition(0,3);
    balloon.scale = balloon.scale + 0.005;
  }
  }
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y
}
function updatePosition(x,y){
x1 = position.x + x;
y1 = position.y + y;
database.ref("height").set({x:x1,y:y1})

}
function showError(){
console.log("error");
}