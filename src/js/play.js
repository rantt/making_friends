/*global Game*/

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */

// // Choose Random integer in a range
// function rand (min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// var musicOn = true;

var wKey;
var aKey;
var sKey;
var dKey;
var leftArrow;
var rightArrow;
var upArrow;
var downArrow;
var score = 0;

Game.Play = function(game) {
  this.game = game;
};

Game.Play.prototype = {
  create: function() {
    this.game.world.setBounds(0, 0 ,Game.w ,Game.h);

    this.map = this.game.add.tilemap('test2');
    this.map.addTilesetImage('tiles');

    this.layer1 = this.map.createLayer('layer1');
    this.layer2 = this.map.createLayer('layer2');

    this.map.setCollision([1,7,8,9,10,11]);
    this.map.setCollision([1,7,8,9,10,11,14,15,16,17],true,'layer2');

    this.layer1.resizeWorld();
    this.layer2.resizeWorld();

    var tile1 = this.map.getTile(0,0,'layer1');
    // console.log('tile' + tile1);

    this.player = new Player(this.game, 5, 5, this.map);
    // this.player = new Player(this.game, 40, 31, this.map);


    this.signs = this.game.add.group();
    this.map.createFromObjects('objects', 19, 'tiles', 18, true, false, this.signs);//yellow

    //Initialize Sign 
    this.sign_text = this.game.add.bitmapText(32, 480,'minecraftia','',24);
    this.sign_text.fixedToCamera = true;


    // // Music
    // this.music = this.game.add.sound('music');
    // this.music.volume = 0.5;
    // this.music.play('',0,1,true);

    //Setup WASD and extra keys
    wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    // muteKey = game.input.keyboard.addKey(Phaser.Keyboard.M);


    //Create Twitter button as invisible, show during win condition to post highscore
    // this.twitterButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 200,'twitter', this.twitter, this);
    this.twitterButton = this.game.add.button(45*tileSize, 31*tileSize,'twitter', this.twitter, this);
    this.twitterButton.anchor.set(0.5);
    this.twitterButton.visible = true;
  },

  update: function() {

    //Read Signs
    this.signs.forEach(function(sign) {
      if (checkOverlap(this.player, sign)) {
        this.lastRead = this.game.time.now + 500;
        this.sign_text.setText(sign.text);
      }
    },this);

    if (this.game.time.now > this.lastRead) {
      this.sign_text.setText('');
    }


    function checkOverlap(spriteA, spriteB) {
      var boundsA = spriteA.getBounds();
      var boundsB = spriteB.getBounds();
      return Phaser.Rectangle.intersects(boundsA, boundsB);
    }


    // // Toggle Music
    // muteKey.onDown.add(this.toggleMute, this);

  },
  twitter: function() {
    //Popup twitter window to post highscore
    var game_url = 'http://www.divideby5.com/games/making_friends/'; 
    var twitter_name = 'rantt_';
    var tags = ['1GAM'];

    window.open('http://twitter.com/share?text=Making+Friends+Is+Easy.+at&via='+twitter_name+'&url='+game_url+'&hashtags='+tags.join(','), '_blank');
  },

  // toggleMute: function() {
  //   if (musicOn == true) {
  //     musicOn = false;
  //     this.music.volume = 0;
  //   }else {
  //     musicOn = true;
  //     this.music.volume = 0.5;
  //   }
  // },
  // render: function() {
  //   game.debug.text('Health: ' + tri.health, 32, 96);
  // }

};
