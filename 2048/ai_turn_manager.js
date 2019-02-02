function AITurnManager() {
    
    this.commands = []
    
    AITurnManager.prototype.add_command = function (execute_callback, possible_callback, name='default name') {
        this.commands.push(new Command(execute_callback, possible_callback, name));
        this.reset_runtime_count();
        this.reset_num_used_count();
        this.reset_command_chance();
    }


    AITurnManager.prototype.reset_runtime_count = function () {
        for (var i=0; i<this.commands.length; i++) {
            for (var j=0; j<this.commands.length; j++) {
                this.commands[i].runtime_num_used[j] = 0;
            };
        };
    }
    
    
    AITurnManager.prototype.reset_num_used_count = function () {
        for (var i=0; i<this.commands.length; i++) {
            for (var j=0; j<this.commands.length; j++) {
                this.commands[i].num_used[j] = 1;
            };
        };
    }
    
    
    AITurnManager.prototype.reset_command_chance = function () {
        for (var i=0; i<this.commands.length; i++) {
            for (var j=0; j<this.commands.length; j++) {
                this.commands[i].chance[j] = 1/this.commands.length;
            };
        };
    }
    
    
    AITurnManager.prototype.update_command_chance = function () {
        for (var i=0; i<this.commands.length; i++) {
            for (var j=0; j<this.commands.length; j++) {
                var total_data_points = this.command_chance_total_data_points(j);
                this.commands[i].chance[j] = this.commands[i].num_used[j]/total_data_points;
            };
        };
    }
    
    
    AITurnManager.prototype.command_chance_total_data_points = function (choice_level) {
        var total_data_points = 0
        
        for (var i=0; i<this.commands.length; i++) {
            total_data_points = total_data_points + this.commands[i].num_used[choice_level];
        };
        return total_data_points;
    }
    
    
    AITurnManager.prototype.random_int = function (min=0, max=1) {
        return Math.floor(Math.random() * max) + min;
    }
    
    
    AITurnManager.prototype.pick_command = function (choice_level=0, cmd_options=[]) {
        
        // if this is the first choice level, generate the command options
        if (choice_level == 0) {
            for (var i=0; i<this.commands.length; i++) {
                cmd_options.push(i);
            };
        };
        
        // make random number to select the command from the available commands
        var rand_choice = this.random_int(0, cmd_options.length);
        var cmd_chosen = this.commands[rand_choice];
        
        if (cmd_chosen.possible()) {
            cmd_chosen.runtime_num_used[choice_level] = cmd_chosen.runtime_num_used[choice_level] + 1;
            return cmd_chosen.execute;
        } else {
            // remove this option from the pool and try again at the next choice level
            cmd_options.slice(rand_choice,1)
            choice_level = choice_level + 1
            var picked =  this.pick_command(choice_level, cmd_options);
            if (picked == undefined) {
                console.log('tits')
            }
            return picked
        };
        
        /*// choose command
        for (var i=0; i<this.commands.length; i++) {
            
            // sum chances to this point
            var sum_chance = 0;
            for (var j=0; j<=i; j++) {
                sum_chance = sum_chance + this.commands[j].chance[choice_level];
            };
            
            // check if that's our ticket
            if (rand < sum_chance) {
                if (this.commands[i].possible()) {
                    this.commands[i].runtime_num_used[choice_level] = this.commands[i].runtime_num_used[choice_level] + 1;
                    return this.commands[i].execute;
                } else {
                    
                    var a =  this.pick_command(choice_level + 1);
                    if (a == undefined) {
                        console.log('tit')
                    }
                };
            };
        };*/
        
    }
    
    AITurnManager.prototype.save_command_probabilities = function () {
        for (var i=0; i<this.commands.length; i++) {
            for (var j=0; j<this.commands.length; j++) {
                this.commands[i].num_used[j] = this.commands[i].num_used[j] + this.commands[i].runtime_num_used[j];
            };
        };
        this.update_command_chance();
    }
    
    
    AITurnManager.prototype.string = function() {
        var s = '';
        for (var i=0; i<this.commands.length; i++) {
            s = s + this.commands[i].name + ' = '
            for (var j=0; j<this.commands.length; j++) {
                s = s + this.commands[i].chance[j].toFixed(2) + ', ';
            };
            s = s + '\n'
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
