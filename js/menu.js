const menuState = {
    
    create: function() {
        // sky background
        this.sky = game.add.tileSprite(0, 0, game.width, game.height, 'sky');
        this.sky.tileScale.x = 0.5; 
        this.sky.tileScale.y = 0.5;
        
        const gameLabel = game.add.text(game.width/2, 80, 
                'Jump!', {font: '50px Arial', fill: '#ffffff', boundsAlignH: "center"});
        gameLabel.anchor.setTo(0.5,0.5);
        gameLabel.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        let startText;
        if (game.device.desktop) {
            startText = 'Press the up key to jump. \n Hold it to jump higher!';
        }
        else {
            startText = 'Touch the screen to jump. \n Hold it to jump higher!'
        }
        const startLabel = game.add.text(game.width/2, 200, 
                startText, {font: '30px Arial', fill: '#ffffff', boundsAlignH: "center"});
        startLabel.anchor.setTo(0.5,0.5);
        startLabel.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        
        const upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.add(this.start, this);
        
        if (!game.device.desktop) {
            game.input.onDown.add(this.start, this);
        }
    },
    
    start: function() {
        game.state.start('play');
    
    },  
    
    update: function() {
        this.sky.tilePosition.x -= 1;
    }
};