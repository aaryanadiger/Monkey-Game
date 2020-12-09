var bananaImage,obstacleImage, obstacleGroup,foodGroup, backGround, backImage, backImage,monkey_running, score, monkey,inviGround;

function preload(){
  backImage = loadImage("jungle2.jpg");
  monkey_running =   loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(400,400);
  
  backGround =createSprite(200,200,400);
  backGround.velocityX = -3;
  backGround.addImage("background",backImage);
  backGround.x = backGround.width /2;
  
  inviGround = createSprite(10,372,780,10);
  inviGround.visible = false;
  
  monkey = createSprite(70,350,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.07;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score=0;
  
}

function draw() {
  background(220);
  
  stroke("white");
  textSize(20);
  fill("white");
  
  
  monkey.collide(inviGround);
  
   if (backGround.x < 0) {
    backGround.x = backGround.width/2;
  }
  
  if (keyDown("space")){
    monkey.velocityY = -12; 
  }
  
   monkey.velocityY = monkey.velocityY + 0.8;
  
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score = score + 2;
  }
   
  switch(score){
    case 10: monkey.scale = 0.10;
      break;
    case 20: monkey.scale = 0.12;
      break;
    case 30: monkey.scale = 0.14;
      break;
    case 40: monkey.scale = 0.16;
      break;
    default: break;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale = 0.07;
    score = 0;
    obstacleGroup.destroyEach();
  }
  
 spawnBananas();
 spawnObstacles();
  
  drawSprites();
  text("Score: "+ score,230,50);
}

function spawnBananas(){
  if (World.frameCount % 80 === 0){
  var bananas = createSprite(400,320,40,10);
  bananas.y = random(120,200);
  bananas.addImage("Banana",bananaImage);
  bananas.scale = 0.05;
  bananas.velocityX = -3;
  bananas.lifetime = 134;
  foodGroup.add(bananas);
  }
}

function spawnObstacles(){
   if(World.frameCount % 300 === 0) {
    var obstacle = createSprite(400,350,10,40);
    obstacle.velocityX = -4;
    obstacle.addImage("Stone",obstacleImage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 120;
    obstacleGroup.add(obstacle);
    
  }
}

