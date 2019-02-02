function RandomPlayer() {
    
    this.game = new Game();
    this.game.init();
    
    RandomPlayer.prototype.take_turn = function () {
        var direction = this.generate_random_integer(0,3);
        if (direction == 0) {
            this.game.move_left();
        } else if (direction == 1) {
            this.game.move_right();
        } else if (direction == 2) {
            this.game.move_up();
        } else {
            this.game.move_down();
        };
            
    };
    
    RandomPlayer.prototype.play_game = function () {
        while (!this.game.game_over) {
            this.take_turn();
        };
    };
    
    RandomPlayer.prototype.generate_random_integer = function(min, max) {
        return Math.floor(Math.random() * (+max - +min)) + +min;
    };
}


function run_random_player() {
    var ai = new RandomPlayer();
    ai.play_game();
}