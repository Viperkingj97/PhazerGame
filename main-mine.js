var mainState = {

    preload: function() {
        //load graphics
        game.load.image('player', 'assets/docter.png');
        game.load.image('block', 'assets/block.png');
        game.load.image('baddy', 'assets/baddy.png');
        game.load.image('door', 'assets/door.png');
        
    },
    
    create: function() {
        // set BG colour
        game.stage.backgroundColor = '#0713a8';
        game.physics.startSystem(Phaser.Physics.ARCADE); // start the physics engine
        
        // enemy group
        enemy = game.add.group();
        enemy.enablebody = true;
        
        //make maze
        this.buildMaze();
        
        //player
        player=game.add.sprite(60,405,'player');
        game.physics.arcade.enable(player);
        
        // create baddy
        baddy=game.add.sprite(50,0,'baddy');
        enemy.add(baddy);
        
        //create baddy
        baddy2=game.add.sprite(200,200,'baddy');
        enemy.add(baddy2);
        baddy2.body.velocity.setTo(150,0)
        baddy2.body.bounce.set(1);                    
        
        //create door
        door=game.add.sprite(50,100,'door');
        game.physics.arcade.enable(door);
            
        // initialise keyboard cursors
        cursors = game.input.keyboard.createCursorKeys();
       
    },
    
    update: function() {
        // set up collisions
        game.physics.arcade.collide(player,maze);
        game.physics.arcade.overlap(player,enemy,this.endGame,null,this);
        game.physics.arcade.collide(maze,enemy);
        game.physics.arcade.overlap(player,door,this.winGame,null,this);

        this.movePlayer();
        this.moveBaddy();

    },
    
    buildMaze: function(){
        // make maze a group of objects
        maze = game.add.group();
        maze.enableBody = true; // add physics to the maze
        maze.setAll('body.immovable', true); // make the maze objects immovable
        
        // 1 is a block 0 is a open space 
        var blockArray = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,0,1,1,0,1,1,1,1,1,1,0,1,1,0,1],
            [1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,1],
            [1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1],
            [1,0,1,1,1,1,1,1,0,1,1,1,1,0,1,0,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,1,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1],
            [1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1],
            [1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1],
            [1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1],
            [1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
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
    
    movePlayer: function(){
        if (cursors.left.isDown){
             if (player.x>0){
                 player.body.velocity.x=-200;
             }
                       
        }else if (cursors.right.isDown){
            if (player.x<1000){
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
            if (player.y<1000){
                player.body.velocity.y=200;
            }
            
        }else{
            
            player.body.velocity.y=0;
        }
        
        
    },
    
    moveBaddy: function(){
        
        if (player.x>baddy.x){
            baddy.body.velocity.x=180;
        }else if (player.x<baddy.x){
            baddy.body.velocity.x=-180;
        }
        
        if (player.y>baddy.y){
            baddy.body.velocity.y=180;
        }else if (player.y<baddy.y){
            baddy.body.velocity.y=-180;
        }
    },
    
    endGame: function(){
        
        game.state.start('main');
    },
    
    winGame: function(){
        
        // display message
        messageLabel = game.add.text(100, 250, 'YOU ESCAPED!',{ font: '40px Arial', fill: '#ffffff' });
        
        player.kill();
       baddy.kill();
    },

    
    
};


var game = new Phaser.Game(1000, 1000, Phaser.AUTO, 'gameDiv');
//changethe number ubove the change the size of the map
var player, baddy, key, door,cursors,maze;

game.state.add('main', mainState);
game.state.start('main');
