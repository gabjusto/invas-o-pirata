const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world
var angle = 20
var ground,tower,towerImg;
var backgrounImg;
var cannon
var balls = []
var boatizhinho
var boats = []

function preload() {
 backgrounImg = loadImage("./assets/background.gif");

  towerImg = loadImage("./assets/tower.png")
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15
  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0,height - 1,width *2, 1,options)
  World.add(world,ground);
  
  tower = Bodies.rectangle(160,350,160,310,options)
  World.add(world,tower);
  
  cannon = new Cannon(180,110,130,100,angle);
  
}

function draw() {
  background(189);
  image(backgrounImg,0,0,1200,600)
 
  Engine.update(engine);

  rect(ground.position.x,ground.position.y,width *2, 1)
  
  push()
  imageMode(CENTER)
  image(towerImg,tower.position.x,tower.position.y,160,310)
  pop()

  cannon.display()
  //criando barquinhos
  showBoats()
  
  for (let i = 0; i < balls.length; i++) {
      showCannonBalls(balls[i],i)
      collisionWithBoat(i)
    }
     strokeWeight(2)
  text("X: "+ mouseX + " / " + "Y: "+mouseY,mouseX,mouseY)
}
function keyReleased() {
  if (keyCode===DOWN_ARROW) {
    balls[balls.length-1].shoot()
  }
}
function keyPressed(){
  if (keyCode===DOWN_ARROW) {
      var  cannonball = new CannonBall(cannon.x,cannon.y)
      balls.push(cannonball)
    }
}
function showCannonBalls(ball,index){
  if (ball) {
    ball.display()
    if (ball.body.position.x>=width) {
        World.remove(world,balls[index].body)
        balls.splice(index,1)
    }
    if (ball.body.position.y>=height-50) {
        ball.removeBalls(index)
    }
  }
}
function showBoats() {
  //verificando se existe barquinho no array
  if (boats.length>0) {
    if (boats[boats.length-1]===undefined ||boats[boats.length-1].body.position.x<width-200) {//verificando a posição do barquinho
      //criando posiçoes aleatorias 
      var positions = [-40,-60,-70,-20,-110,-95,-160,-230,-255]
      var position = random(positions)
      //criando novos barquinhos
      var boatizhinho = new Boatizhinho(width-79,height-60,170,170,position)
      boats.push(boatizhinho)
    }
    //dando velocidade e exibindo os barquinhos
    for (let i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body,{x:-0.9,y:0})
        boats[i].display()
      }
      
    }
  } else {//criando o primeiro barquinho
    var boatizhinho = new Boatizhinho(width-79,height-180,170,170,-80)
    boats.push(boatizhinho)
  }
}
function collisionWithBoat(index) {
    for (let i = 0; i < boats.length; i++) {//percorrendo o array dos barcos
      if (balls[index] !==undefined && boats[i]!==undefined) {//verificando se a bala e o barco existem 
          var collision = Matter.SAT.collides(balls[index].body,boats[i].body)//verificando a colizão entre a bala e o barco
        if (collision.collided) {//verificando se houve colizão
          boats[i].removeBoats(i)
          Matter.World.remove(world,balls[index].body)
          delete balls[index]
        }  
      }
      
    }
}   