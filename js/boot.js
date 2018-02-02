const bootState = {
    
    preload: function(){
        game.load.image('progressBar', 'assets/progressBar.png');
    },
    
    create: function() {
       if (!game.device.desktop){
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            
            game.scale.setMinMax(game.width/2, game.height/2,
                game.width*2, game.height*2);
            
            // Center the game
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            
            // adds blue background to hide white borders
            document.body.style.backgroundColor = '#3498db';
        }
        game.state.start('load');
    }
};
