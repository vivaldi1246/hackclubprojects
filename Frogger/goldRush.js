/*global Phaser*/
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
var game_state = {};
var graphics;
var logLane1;
function createPlayerSprite(){
      game.playerSprite = game.add.sprite(game.playerPosition.x, game.playerPosition.y, 'player');
      game.playerSprite.anchor.setTo(0.5, 0.5);  
}
function logLaneBuild(name, y, speed, direction){
      if(direction === false){
        direction = 1000;
        var anchor = 1;
      }else{
        direction = -200;
        var anchor = 0;
      }
      var graphics = game.add.graphics(0, 0);
      graphics.beginFill(0x835C3B);
      graphics.drawRect(0, 0, 200, 50);
      name = game.add.sprite(direction, y, graphics.generateTexture());
      game.logGroup.add(name);
      name.anchor.setTo(anchor, 0.5);
      graphics.destroy();
      name.timeSpeed = speed;
      return name;
}
// Creates a new 'main' state that wil contain the game
game_state.main = function() {};
game_state.main.prototype = {
  preload: function() {
    game.load.image('player', 'assets/mario.png');
    game.load.image('background', 'assets/FroggerBack.jpg');
    game.load.audio('correct', ['assets/positive.wav']);
    game.load.audio('incorrect', ['assets/negative.wav']);
    game.load.image('goal', 'assets/gold1.png');
    game.load.image('winner', 'assets/froggerWin.png');
    console.log("test");
  },

  create: function() {
    game.winBool1 = false;
    game.winBool2 = false;
    game.winBool3 = false;
    game.winBool4 = false;
    game.winBool5 = false;
    game.backgroundSprite = game.add.sprite(0, 0, 'background');
    game.logGroup = game.add.group();
    game.gridSize = 56; 
    game.logLane1 = logLaneBuild(game.logLane1, 245, 5000, true);
    game.logLane1b = logLaneBuild(game.logLane1b, 245, 5000, true);
    game.logLane2 = logLaneBuild(game.logLane2, 189, 3333, false);
    moveLogs(game.logLane1, game.logLane1.timeSpeed, true);
    setTimeout(function(){moveLogs(game.logLane1b, game.logLane1b.timeSpeed, true)}, 2500);
    moveLogs(game.logLane2, game.logLane2.timeSpeed, false);
    game.goalSprite1 = game.add.sprite(0, 0, 'goal');
    game.goalSprite1.anchor.setTo(0.5, 0.5);
    game.goalSprite2 = game.add.sprite(0, 0, 'goal');
    game.goalSprite2.anchor.setTo(0.5, 0.5);
    game.goalSprite3 = game.add.sprite(0, 0, 'goal');
    game.goalSprite3.anchor.setTo(0.5, 0.5);
    game.goalSprite4 = game.add.sprite(0, 0, 'goal');
    game.goalSprite4.anchor.setTo(0.5, 0.5);
    game.goalSprite5 = game.add.sprite(0, 0, 'goal');
    game.goalSprite5.anchor.setTo(0.5, 0.5);
    game.goalSprite2.x = 232;game.goalSprite2.y = 21;
    game.goalSprite1.x = 400;game.goalSprite1.y = 21;
    game.goalSprite3.x = 64; game.goalSprite3.y = 21;
    game.goalSprite4.x = 568; game.goalSprite4.y = 21;
    game.goalSprite5.x = 736; game.goalSprite5.y = 21;
    game.goalSprite1.alpha = 0;
    game.goalSprite2.alpha = 0;
    game.goalSprite3.alpha = 0;
    game.goalSprite4.alpha = 0;
    game.goalSprite5.alpha = 0;
    game.getRandomSpot = function(){
      return {
        x: getRandomInt(0, game.width / game.gridSize - 1) * game.gridSize,
        y: getRandomInt(0, game.height / game.gridSize - 1) * game.gridSize
      };
    }
    game.playerPosition = {
      x: 400,
      y: 525
    }
    createPlayerSprite();
    game.correctSound = game.add.audio('correct');
    game.score = 0;
    game.moving = false;
    //game.playerSprite.bringToTop();
  },
  update: function() {
    
    // setTimeout(function(){moveLog(logLane1);}, 2000)
    if(!game.moving){
      if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && game.playerSprite.x == 64){
        game.playerSprite.angle = 270;
      }
      else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        game.playerSprite.angle = 270;
        moveSprite(3);
      }else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && game.playerSprite.x == 736){
        game.playerSprite.angle = 90;
      }
      else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        game.playerSprite.angle = 90;
        moveSprite(1);
      }
      else if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && game.playerSprite.y == 21){
        game.playerSprite.angle = 0;
        //moveSprite(0);
      }
      else if((game.input.keyboard.isDown(Phaser.Keyboard.UP) && game.playerSprite.y == 77 && game.playerSprite.x == 288) || (game.input.keyboard.isDown(Phaser.Keyboard.UP) && game.playerSprite.y == 77 && game.playerSprite.x == 344) || (game.input.keyboard.isDown(Phaser.Keyboard.UP) && game.playerSprite.y == 77 && game.playerSprite.x == 456) || (game.input.keyboard.isDown(Phaser.Keyboard.UP) && game.playerSprite.y == 77 && game.playerSprite.x == 512) || (game.input.keyboard.isDown(Phaser.Keyboard.UP) && game.playerSprite.y == 77 && game.playerSprite.x == 624) || (game.input.keyboard.isDown(Phaser.Keyboard.UP) && game.playerSprite.y == 77 && game.playerSprite.x == 680) || (game.input.keyboard.isDown(Phaser.Keyboard.UP) && game.playerSprite.y == 77 && game.playerSprite.x == 176) || (game.input.keyboard.isDown(Phaser.Keyboard.UP) && game.playerSprite.y == 77 && game.playerSprite.x == 120)){
        game.playerSprite.angle = 0;
      }
      else if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
        game.playerSprite.angle = 0;
        moveSprite(0);
      }
      else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && game.playerSprite.y == 525){
        game.playerSprite.angle = 180;
      }
      else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
          game.playerSprite.angle = 180;
          moveSprite(2);
      }
    }
    if(game.playerSprite.x == game.goalSprite1.x && game.playerSprite.y == game.goalSprite1.y){
        game.winBool1 = 1;
        game.add.sprite(game.playerSprite.x, game.playerSprite.y, 'winner').anchor.setTo(0.5, 0.5);
        game.goalSprite1.destroy();
        game.playerSprite.destroy();
        game.moving = false;
        createPlayerSprite();
        //game.state.start("endGame");
    }
    else if(game.playerSprite.x == game.goalSprite2.x && game.playerSprite.y == game.goalSprite2.y){
        game.winBool2 = 1;
        game.add.sprite(game.playerSprite.x, game.playerSprite.y, 'winner').anchor.setTo(0.5, 0.5);
        game.goalSprite2.destroy();
        game.playerSprite.destroy();
        game.moving = false;
        createPlayerSprite();
    }
    else if(game.playerSprite.x == game.goalSprite3.x && game.playerSprite.y == game.goalSprite3.y){
        game.winBool3 = 1;
        game.add.sprite(game.playerSprite.x, game.playerSprite.y, 'winner').anchor.setTo(0.5, 0.5);
        game.goalSprite3.destroy();
        game.playerSprite.destroy();
        game.moving = false;
        createPlayerSprite();
    }
    else if(game.playerSprite.x == game.goalSprite4.x && game.playerSprite.y == game.goalSprite4.y){
        game.winBool4 = 1;
        game.add.sprite(game.playerSprite.x, game.playerSprite.y, 'winner').anchor.setTo(0.5, 0.5);
        game.goalSprite4.destroy();
        game.playerSprite.destroy();
        game.moving = false;
        createPlayerSprite();
    }
    else if(game.playerSprite.x == game.goalSprite5.x && game.playerSprite.y == game.goalSprite5.y){
        game.winBool5 = 1;
        game.add.sprite(game.playerSprite.x, game.playerSprite.y, 'winner').anchor.setTo(0.5, 0.5);
        game.goalSprite5.destroy();
        game.playerSprite.destroy();
        game.moving = false;
        createPlayerSprite();
    }
    if(game.winBool1 + game.winBool2 + game.winBool3 + game.winBool4 + game.winBool5 == 5){
      game.state.start("endGame");
    }
  }
};
game.state.add('main', game_state.main);


game_state.endGame = function() {};
game_state.endGame.prototype = {

  preload: function() {
    game.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },

  create: function() {
    var style = {
      font: 'bold 60pt Arial',
      fill: 'white',
      align: 'center',
      wordWrap: true,
      wordWrapWidth: game.width - 50
    };
    var text = "You win!";
    var title = game.add.text(game.width / 2, game.height / 2, text, style);
    title.anchor.setTo(0.5, 0.5);
  },

  update: function() {
    if(game.spaceBar.isDown){
      game.state.start('main');
    }
  },
};

game.state.add('endGame', game_state.endGame);

game.state.start('main');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function moveSprite(direction){
  game.moving = true;
  var ease = game.add.tween(game.playerSprite);
  switch(direction){
    case 0: ease.to({
      y: game.playerSprite.y - game.gridSize
    }, 500, Phaser.Easing.Quartic.In);
    break;
    case 1: ease.to({
      x: game.playerSprite.x + game.gridSize
    }, 500, Phaser.Easing.Quartic.In);
    break;
    case 2: ease.to({
      y: game.playerSprite.y + game.gridSize
    }, 500, Phaser.Easing.Quartic.In);
    break;
    case 3: ease.to({
      x: game.playerSprite.x - game.gridSize
    }, 500, Phaser.Easing.Quartic.In);
    break;
  }
  ease.onComplete.add(endMovement, this);
  ease.start();
  function endMovement(){
    game.moving = false;
  }
}
function moveLogs(log, time, direction){
  var ease = game.add.tween(log);
  if(direction === false){
    var value = 0;
  }else{
    var value = 800;
  }
  ease.to({x: value}, time, Phaser.Easing.Linear.None);
  ease.onComplete.add(onCompletion, this);
  ease.start();
  function onCompletion(){
    dupeLogs(log, log.y, log.timeSpeed, direction);
    log.destroy();
  }
}
function dupeLogs(log, y, speed, direction){
  var temp = logLaneBuild(log, y, speed, direction);
  moveLogs(temp, temp.timeSpeed, direction);
}