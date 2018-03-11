const playState = {
    create: function() {
        // fps for debugging
        game.time.advancedTiming = true;
        
        this.gameSpeed = 1;
         // parallax background
        this.sky = game.add.tileSprite(0, 0, game.width, game.height, 'sky');
        this.sky.tileScale.x = 0.33; 
        this.sky.tileScale.y = 0.33;
        
        this.mid = game.add.tileSprite(0, 0, game.width, game.height - 100, 'mid');
        this.mid.tileScale.x = 0.33; 
        this.mid.tileScale.y = 0.33;
        
        // create player
        this.player = game.add.sprite(game.width/4, game.height/2, 'player');
        this.player.anchor.setTo(0.5,0.5);
        this.player.scale.setTo(2);
        
        //walking animation
        this.player.animations.add('right',[1,2], 8, true);
        this.player.animations.play('right', this.gameSpeed*10, 'true');
        game.stage.backgroundColor = '#3498db';
        
        // add sounds
        this.jumpSound = game.add.audio('jump');
        this.coinSound = game.add.audio('coin');
        this.deadSound = game.add.audio('dead');
       
        
        // Add physics
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 1200;
        
        // add jump timer
        this.player.jumpTimer = 0;
        this.cursor = game.input.keyboard.createCursorKeys();
        // add floor
        this.floor = game.add.tileSprite(0,500, game.width, 100, 'floor');
        game.physics.arcade.enable(this.floor);
        this.floor.body.immovable = true;
        
        
        // add obstacles
        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.createMultiple(10, 'enemy');
        
        // add score 
        this.scoreLabel = game.add.text(30, 30, 'score: 0',
            { font: '18px Arial', fill: '#ffffff'});
        this.score = 0;
        this.addEnemy();
        
        // timer until next enemy variable
        this.nextEnemy = 0;
        
        // create particle emitter
        this.emitter = game.add.emitter(0,0,15);
        this.emitter.makeParticles('pixel');
        
        this.emitter.setYSpeed(-150,150);
        this.emitter.setXSpeed(-150,150);
        //Scale particles from 2 to 0 in 800ms
        this.emitter.setScale(2, 0, 2, 0, 800);
        this.emitter.gravity = 0;
        
    },
    
    movePlayer: function() {
        if (this.cursor.up.isDown || game.input.pointer1.isDown) {
            if (this.player.body.touching.down && this.player.jumpTimer == 0) {
                this.jumpSound.play();
                this.player.jumpTimer = 1;
                this.player.body.velocity.y = -200;
            } else if (this.player.jumpTimer > 0 && this.player.jumpTimer < 20) {
                this.player.jumpTimer++;
                this.player.body.velocity.y = -200 - (this.player.jumpTimer*10);
            } 
        } else {
            this.player.jumpTimer = 0;
        }
    },
    
    playerDie: function() {
        
        this.player.kill();
        this.deadSound.play();
        // death emitter
        this.emitter.x = this.player.x;
        this.emitter.y = this.player.y;
        
        // screen shake
        game.camera.shake(0.02, 300);
        this.emitter.start(true, 800, null, 15);
        
        // Hide score label
        this.scoreLabel.visible = false;
        // game over label
        let overText = 'You died! Your total score was: ' +this.score;
            
        if (game.device.desktop) {
            overText += '\n Press up to restart'; 
        }
        else {
            overText +='\n Touch the screen to restart';
        }
        const overLabel = game.add.text(game.width/2, 200, 
                overText, {font: '30px Arial', fill: '#ffffff', boundsAlignH: "center"});
        
        overLabel.anchor.setTo(0.5,0.5);

        //this.bgm.stop();
        this.cursor.up.onDown.add(this.startMenu, this);
        if (!game.device.desktop) {
            game.input.onDown.add(this.startMenu, this);
        };
        
        
    },
    
    submitName: function() {
        var name = "Your username is " + (this.username.value ? this.username.value : "John");
        console.log(name);
        this.username.destroy();
        this.submit.destroy();
        
        
        const userName = game.add.text(game.width/2, 400, name, {font: '30px Arial', fill: '#ffffff', boundsAlignH: "center"})
    },
    
    startMenu: function() {
        game.state.start('play');
    },
    addEnemy: function() {
        const enemy = this.enemies.getFirstDead();
        
        if (!enemy) {
            return;
        }
        
        // variable height
        enemy.scale.setTo(1,game.rnd.integerInRange(1,3));
        enemy.anchor.setTo(0.5,1);
        enemy.reset(game.width, 500);
        enemy.body.gravity.y = 500;
        enemy.body.velocity.x = -50 -50*this.gameSpeed;
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
        enemy.passed = false;
        enemy.hasSpawned = false;
        
    },
    
    updateScore: function() {
        console.log("score");
        this.score++;
        this.coinSound.play();
        this.scoreLabel.text = `score: ${this.score}`;
        
        if (this.score % 5 == 0) {
            this.gameSpeed ++;
            this.enemies.forEachAlive(function(enemy) {
                enemy.body.velocity.x = -50 -50*this.gameSpeed;
            },this);
        }
    },
    
    update: function() {
        game.physics.arcade.collide(this.player, this.floor);
        game.physics.arcade.collide(this.enemies, this.floor);
        
        game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);
        this.movePlayer();
        
        game.debug.text(game.time.fps, 2, 14, "#00ff00");
        // updates score if player passes obsticle
        // also spawns new enemy when old enemy has passed halfway
        if (this.player.alive == true) {
            
        this.enemies.forEach(function(enemy) {
            if (enemy.x < game.width/2 && enemy.hasSpawned == false) {
                enemy.hasSpawned = true;
                this.addEnemy();
            }
            
            if (enemy.x < this.player.x && enemy.passed == false){
                enemy.passed = true;
                this.updateScore();
            }
        },this);
    };
        // scrolling background
        this.sky.tilePosition.x -= this.gameSpeed;
        this.mid.tilePosition.x -=this.gameSpeed*2;
        
    },
    
    
};