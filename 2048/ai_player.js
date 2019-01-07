function AIPlayer() {
    
    AIPlayer.prototype.init = function () {
        this.game = new Game();
        this.game.init();
        
        this.turnmanager = new AITurnManager();
        this.setup_turns();
    };
    
    
    AIPlayer.prototype.execute_command = function (name) {
        if (name == 'left') {
            this.game.move_left();
        } else if (name == 'right') {
            this.game.move_right();
        } else if (name == 'up') {
            this.game.move_up();
        } else if (name == 'down') {
            this.game.move_down();
        } else {
            console.log('command name not defined: ' + name);
        }
    };
    
    
    AIPlayer.prototype.take_turn = function () {
        var command_name = this.turnmanager.pick_command();
        command_name();
    };
    
    AIPlayer.prototype.play_game = function () {
        while (!this.game.game_over) {
            this.take_turn();
        };
    };
    
    AIPlayer.prototype.train = function () {
        var high_score = 0;
        for (var i=0; i<10; i++) {
            document.getElementById('counter').innerText = 'Game counter: ' + i;
            high_score = this.training_turn(high_score)
        };
    }
    
    
    AIPlayer.prototype.training_turn = function (high_score) {
        
        this.game.reset();
        this.play_game();
        
        if (this.game.highest_tile >= high_score) {
            console.log('new high score: ' + high_score);
            high_score = this.game.highest_tile;
            this.turnmanager.save_command_probabilities();
            console.log(this.turnmanager.string());
        };
        
        return high_score;
    }
        
    
    AIPlayer.prototype.setup_turns = function() {
        this.turnmanager.add_command(this.game.move_left.bind(this.game),   this.game.move_left_possible.bind(this.game),   'left');
        this.turnmanager.add_command(this.game.move_right.bind(this.game),  this.game.move_right_possible.bind(this.game),  'right');
        this.turnmanager.add_command(this.game.move_up.bind(this.game),     this.game.move_up_possible.bind(this.game),     'up');
        this.turnmanager.add_command(this.game.move_down.bind(this.game),   this.game.move_down_possible.bind(this.game),   'down');
    };
    
    
    AIPlayer.prototype.nudge = function() {
        this.turnmanager.commands[0].chance = .45;
        this.turnmanager.commands[1].chance = .05;
        this.turnmanager.commands[2].chance = .45;
        this.turnmanager.commands[3].chance = .05;
    }
    
    this.init();
}


function run_ai_player() {
    var ai = new AIPlayer();
    ai.play_game();
}

function train_ai_player() {
    var ai = new AIPlayer();
    ai.nudge();
    ai.train();
}