var mainState = { 
    
    //Preload function called first when state starts
    preload: function(){ 
    
        game.load.image('player', 'assets/player.png');
        game.load.image('block', 'assets/block.png');
        game.load.image('baddy', 'assets/baddy.png');
        game.load.image('key', 'assets/key.png');
        game.load.image('door', 'assets/door.png');
        //load audio 
        game.load.audio('pickup', 'assets/pickup.wav');
        game.load.audio('win', 'assets/win.wav');
        
    },
    
    //create function called after preload finishes
    create:function(){
          //set BG color
        game.stage.backgroundColor = '#5474cb';
        game.physics.startSystem(Phaser.Physics.ARCADE); // start the physics engine   
        
        //create player
        player=game.add.sprite(60 , 405 , 'player');
        game.physics.arcade.enable(player);
     cursors = game.input.keyboard.createCursorKeys();//game.camera.follow(player);
        this.buildMaze();
        key=game.add.sprite(150,50,'key');
        game.physics.arcade.enable(key);
        
        keyPickup = game.add.audio('pickup');
        winGame = game.add.audio('win');
        
        door=game.add.sprite(400,100,'door');
        game.physics.arcade.enable(door);
        
        
    },
    
    //update called every frame thereafter 
    update:function() {
        this.movePlayer();
        
    game.physics.arcade.collide(player, maze);   
    },
     movePlayer: function(){
        if (cursors.left.isDown){
             if (player.x>0){
                 player.body.velocity.x=-200;
             }
                       
        }else if (cursors.right.isDown){
            if (player.x<460){
                player.body.velocity.x=200;
            }
            
        }else{
            player.body.velocity.x=0;
        }
        
        
        if (cursors.up.isDown){
             if (player.y>0){
                 player.body.velocity.y=-200;
             }
                       
        }else if (cursors.down.isDown){
            if (player.y<460){
                player.body.velocity.y=200;
            }
            
        }else{
            
            player.body.velocity.y=0;
        }
     }, buildMaze: function(){
        // make maze a group of objects
        maze = game.add.group();
        maze.enableBody = true; // add physics to the maze
        maze.setAll('body.immovable', true); // make the maze objects immovable
        
        
        var blockArray = [
            [1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,1,1,0,0,0,1],
            [1,0,1,0,1,0,0,1,0,1],
            [1,0,1,0,1,0,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,0,1,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,0,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1]
            ];
        
        for (var r=0;r<blockArray.length;r++){
            
            for (var c=0; c<blockArray[r].length;c++){
                console.log("Column",c);
                console.log("Row",r);
                if(blockArray[r][c]==1){
                   var block=game.add.sprite(c*50,r*50,'block');
                    maze.add(block);
                }
            }
            
        }
        
        maze.setAll('body.immovable', true);
    },
};

var game = new Phaser.Game(500,500,Phaser.AUTO,'gameDIV');
game.state.add('main',mainState);
game.state.start('main');