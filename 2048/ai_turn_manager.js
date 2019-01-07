function AITurnManager() {
    
    this.commands = []
    
    AITurnManager.prototype.add_command = function (execute_callback, possible_callback, name='default name') {
        this.commands.push(new Command(execute_callback, possible_callback, name));
        this.reset_command_chance();
    }
    
    
    AITurnManager.prototype.reset_command_chance = function () {
        for (var i=0; i<this.commands.length; i++) {
            for (var j=0; j<this.commands.length; j++) {
                this.commands[i].chance[j] = 1/this.commands.length;
            };
        };
    }
    
    
    AITurnManager.prototype.update_command_chance = function () {
        var total_data_points = this.command_chance_total_data_points();
        
        for (var i=0; i<this.commands.length; i++) {
            for (var j=0; j<this.commands.length; j++) {
                this.commands[i].chance[j] = this.commands[i].num_used[j]/total_data_points[j];
        };
    }
    
    
    AITurnManager.prototype.command_chance_total_data_points = function () {
        var total_data_points = Array(this.commands.length)
        for (var i=0; i<this.commands.length; i++) {
            total_data_points = total_data_points + this.commands[i].num_used;
        };
        return total_data_points;
    }
    
    
    AITurnManager.prototype.pick_command = function (choice_level=0) {
        
        // make random number
        var rand = Math.random();
        
        // choose command
        for (var i=0; i<this.commands.length; i++) {
            
            // sum chances to this point
            var sum_chance = 0;
            for (var j=0; j<=i; j++) {
                sum_chance = sum_chance + this.commands[j].chance;
            };
            
            // check if that's our ticket
            if (rand < sum_chance) {
                if (this.commands[i].possible()) {
                    this.commands[i].runtime_num_used = this.commands[i].runtime_num_used + 1;
                    return this.commands[i].execute;
                } else {
                    return this.pick_command();
                };
            };
        };
        
    }
    
    AITurnManager.prototype.save_command_probabilities = function () {
        for (var i=0; i<this.commands.length; i++) {
            this.commands[i].num_used = this.commands[i].num_used + this.commands[i].runtime_num_used;
        };
        this.update_command_chance();
    }
    
    
    AITurnManager.prototype.string = function() {
        var s = '';
        for (var i=0; i<this.commands.length; i++) {
            s = s + this.commands[i].name + ' = ' + this.commands[i].chance.toFixed(2) + '\n';
        };
        return s;
    }
}


function Command(execute_callback, possible_callback, name) {
    this.name = name;
    this.chance = [];
    this.num_used = [];
    this.runtime_num_used = [];
    this.execute = execute_callback; // callback function
    this.possible = possible_callback; // callback function
}
