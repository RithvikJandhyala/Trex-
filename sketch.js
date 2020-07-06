var trex;
var treximg;
var ground;
var groundimg
var  invisibleGround;
var cloudimg
var CloudsGroup 
var cactusimg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ObstaclesGroup;
var count = 0;
var gameOver;
var gameOverimg;
var restart;
var restartimg;
var trexcimg;
var jumpmp3
var die;
var check;
var moon;
var treximg2;
var moonimg;
var Tdonimg;

function preload(){
treximg = loadAnimation("trex1.png","trex3.png","trex4.png");
groundimg = loadImage("ground2.png");
cloudimg =  loadImage("cloud.png");
cactusimg1 = loadImage("obstacle1.png");
cactusimg2 = loadImage("obstacle2.png");
cactusimg3 = loadImage("obstacle3.png");
cactusimg4 = loadImage("obstacle4.png");
cactusimg5 = loadImage("obstacle5.png");
cactusimg6 = loadImage("obstacle6.png");
gameOverimg = loadImage("gameOver.png");
restartimg = loadImage("restart.png");
trexcimg = loadImage("trex_collided.png");
jumpmp3 = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  check = loadSound("checkPoint.mp3");
  treximg2 = loadAnimation("TRexDown.png","TRexDown2.png");
  Tdonimg = loadAnimation("TDon1.png","TDon2.png");
  moonimg = loadImage("Moon1.png");
}

function setup() {
  createCanvas(600, 200);
  ground = createSprite(200,180,600,20);
  ground.addImage("ground",groundimg);    
  trex = createSprite(60,160);
  trex.addAnimation("trex",treximg);
  trex.scale = 0.5
  invisibleGround = createSprite(200,190,600,5);
invisibleGround.visible = false;
  gameOver = createSprite(300,50);
  gameOver.addImage("gameOver",gameOverimg);
  gameOver.visible = false;
  restart = createSprite(300,100);
  restart.addImage("restart",restartimg);
  restart.scale = 0.5;
  restart.visible = false;
  CloudsGroup = new Group();
  moon = createSprite(540,60);
  moon.addImage("moon",moonimg);
  moon.scale=1.5;
  moon.visible = false;
ObstaclesGroup = new Group();
  
  
  
  
}

function draw() {
  
  background(255);
text(mouseX+";"+mouseY,mouseX,mouseY);
  textSize(15);
  text("Score: "+ count, 500, 20);
  if(gameState === PLAY ){
   ground.velocityX = -(6 + 3*count/100);
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
   count =count+ Math.round(getFrameRate()/60);
   if(keyDown("space") && trex.y >= 164||keyDown("UP_ARROW") && trex.y >= 164){
      trex.velocityY = -12 ;
      jumpmp3.play();
    }
   trex.velocityY = trex.velocityY + 0.8;
   spawnclouds();
   spawncactus();
    ftDon();
    if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
      die.play();
    }
    if(count >=700 && count <=800 ){
     background(20);
     fill("white");
    text("Score: "+ count, 500, 20);
      moon.visible = true;
    }
    moon,visible = false;
    if(count%100===0 &&count>0){
     check.play();
    }
    if(keyDown("DOWN_ARROW")){
     trex.addAnimation("trex",treximg2);
    }
    
  }
  
  else if(gameState === END){
   ground.velocityX = 0;
  trex.velocityX = 0;
    trex.velocityY = 0;
  ObstaclesGroup.setVelocityXEach(0);
  CloudsGroup.setVelocityXEach(0);
   ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    gameOver.visible = true;
    restart.visible = true;
    trex.addAnimation("trex",trexcimg);
    if(mousePressedOver(restart)) {
    reset();
    }  
  }
  trex.collide(invisibleGround);
  drawSprites();
}
function spawnclouds(){
if(frameCount%80===0){
var cloud = createSprite(650,random(70,110));
cloud.addImage("cloud",cloudimg);
cloud.scale = 0.5
cloud.velocityX = -3;
cloud.lifetime = 230;
cloud.depth = trex.depth;
trex.depth = trex.depth + 1;
CloudsGroup.add(cloud);
}
}
function spawncactus(){
if(frameCount%80===0){
var cactus = createSprite(650,165);
var rand = Math.round(random(1,6));
switch(rand){
  case 1:cactus.addImage("cactus",cactusimg1);
  break;
  case 2:cactus.addImage("cactus",cactusimg2);
  break;
  case 3:cactus.addImage("cactus",cactusimg3);
  break;
  case 4:cactus.addImage("cactus",cactusimg4);
  break;
  case 5:cactus.addImage("cactus",cactusimg5);
  break;
  case 6:cactus.addImage("cactus",cactusimg6);
  break;
  default:break;
}
cactus.velocityX = - (6 + 3*count/100);
cactus.scale = 0.5;
ObstaclesGroup.add(cactus);

}

}
function reset(){
   gameOver.visible = false;
    restart.visible = false;
    gameState = PLAY;
    ObstaclesGroup.destroyEach();
    CloudsGroup.destroyEach();
    count = 0;
    trex.addAnimation("trex",treximg);
  moon.visible = false;
}
function ftDon(){
if(frameCount%130===0&& count>800 ){
var tdon = createSprite(650,190);
var rand = Math.round(random(1,3));
switch(rand){
  case 1:tdon.y=190;
  break;
  case 2:tdon.y =120;
  break;
  case 3:tdon.y = 60;
  break;
  default:break;
}
tdon.addAnimation("tdon",Tdonimg);
tdon.velocityX = - (6 + 3*count/100);
tdon.scale = 1;
ObstaclesGroup.add(tdon);
}

}
