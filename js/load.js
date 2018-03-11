const loadState = {
    
    preload: function(){
         // Add loading...
        console.log("load");
        const loadingLabel = game.add.text(game.width/2, 150,
                'loading...', { font: '30px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5,0.5);
        
        // Display the progress bar
        const progressBar = game.add.sprite(game.width/2, 200,
                'progressBar');
        progressBar.anchor.setTo(0.5,0.5);
        game.load.setPreloadSprite(progressBar);
        
        //load assets
        game.load.image('sky', 'assets/layer-1-sky.png');
        game.load.image('mid', 'assets/layer-2.png');
        game.load.spritesheet('player', 'assets/player2.png',20,20);
        game.load.image('floor', 'assets/wallHorizontal.png');
        game.load.image('enemy', 'assets/enemy.png');
        game.load.image('pixel', 'assets/pixel.png');
        
        // load sound
        game.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3']);
        game.load.audio('coin', ['assets/coin.ogg', 'assets/coin.mp3']);
        game.load.audio('dead', ['assets/dead.ogg', 'assets/dead.mp3']);
        
        //load packages

    },
    
    create: function() {
    
    game.state.start('menu');
    }

};