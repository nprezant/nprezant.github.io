function Cell() {
    Cell.prototype.init = function(row, column) {
        this.row = row;
        this.column = column;
    };
}


function Game() {
    
    // init
    this.name = "2048";
    this.highest_tile = 0;
    
    this.colors = {
        '': 'white',
        '0': 'white',
        '2': '#a0b6db',
        '4': 'yellow',
        '8': '#e5d0a2',
        '16': '#f2c185',
        '32': '#f96f25',
        '64': '#db6443',
        '128': '#ba597c',
        '256': '#a06077',
        '512': '#c22def',
        '1024': '#9e6af2',
        '2048': '#5bd3ff',
        '5096': 'gray',
    };
    
    
    Game.prototype.reset = function() {
        this.init();
    }
    
    
    Game.prototype.init = function() {
        this.game_over = false;
        
        this.grid = document.getElementsByClassName('grid')[0];
        var rows = this.get_cell_array();
        this.clear(rows);
        this.insert_random_input(rows);
        this.insert_random_input(rows);
        this.insert_random_input(rows);
        this.insert_random_input(rows);
        this.write(rows);
    };
    
    
    Game.prototype.clear = function(arr) {
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr[i].length; j++) {
                arr[i][j] = 0;
            };
        };
    };
    
    
    Game.prototype.get_highest_tile = function(arr) {
        var high = 0;
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr[i].length; j++) {
                if (arr[i][j] > high) {
                    high = arr[i][j];
                };
            };
        };
        this.highest_tile = high;
    };
    
    
    Game.prototype.move_left = function() {
        if (this.move_left_possible()) {
            this.move_left_execute();
            this.check_game_over();
        };
    };
    
    
    Game.prototype.move_right = function() {
        if (this.move_right_possible()) {
            this.move_right_execute();
            this.check_game_over();
        };
    };
    
    
    Game.prototype.move_up = function() {
        if (this.move_up_possible()) {
            this.move_up_execute();
            this.check_game_over();
        };
    };
    
    
    Game.prototype.move_down = function() {
        if (this.move_down_possible()) {
            this.move_down_execute();
            this.check_game_over();
        };
    };
    
    
    Game.prototype.recolor = function() {
        var rows = this.grid.getElementsByClassName('row');
        for (var i=0; i<rows.length; i++) {
            var cells = rows[i].getElementsByClassName('cell');
            for (var j=0; j<cells.length; j++) {
                var n = cells[j].innerText;
                cells[j].style.backgroundColor = this.colors[n];
            };
        };
    };
    
    
    Game.prototype.get_cell_array = function() {
        var rows = this.grid.getElementsByClassName('row');
        var arr = [];
        
        for (var i=0; i<rows.length; i++) {
            arr.push([])
            var cells = rows[i].getElementsByClassName('cell');
            for (var j=0; j<cells.length; j++) {
                arr[i].push(Number(cells[j].innerText));
            };
        };
        
        return arr;
    };
    
    
    Game.prototype.write = function(row_array) {
        var rows = this.grid.getElementsByClassName('row');
        
        for (var i=0; i<rows.length; i++) {
            var cells = rows[i].getElementsByClassName('cell');
            for (var j=0; j<cells.length; j++) {
                if (row_array[i][j] == 0) {
                    cells[j].innerText = "";
                } else {
                    cells[j].innerText = row_array[i][j];
                }
            };
        };
        this.recolor()
    };
    
    
    Game.prototype.check_game_over = function() {
        this.get_highest_tile(this.get_cell_array());
        if (!this.any_moves_possible()) {
            this.game_over = true;
        };
    };
    
    
    Game.prototype.any_moves_possible = function() {
        var possible = true;
        if (!this.move_left_possible()) {
            if (!this.move_right_possible()) {
                if (!this.move_up_possible()) {
                    if (!this.move_down_possible()) {
                        possible = false;
                    };
                };
            };
        };
        return possible;
    };
                        
    
    
    Game.prototype.move_left_execute = function() {
        var rows = this.get_cell_array();
        this.main_operation(rows);
        this.write(rows);
    };
    
    
    Game.prototype.move_left_possible = function() {
        var rows = this.get_cell_array();
        var rows2 = this.copy_array(rows);
        this.shift_operation(rows);
        if (this.array_is_equal(rows, rows2)) {
            return false;
        } else {
            return true;
        };
    };
    
    
    Game.prototype.move_right_execute = function() {
        var rows = this.get_cell_array();
        this.fliplr(rows);
        this.main_operation(rows);
        this.fliplr(rows);
        this.write(rows);
    };
    
    
    Game.prototype.move_right_possible = function() {
        var rows = this.get_cell_array();
        this.fliplr(rows);
        var rows2 = this.copy_array(rows);
        this.shift_operation(rows);
        if (this.array_is_equal(rows, rows2)) {
            return false;
        } else {
            return true;
        };
    };
    
    
    Game.prototype.move_up_execute = function() {
        var rows = this.get_cell_array();
        this.flipd(rows);
        this.main_operation(rows);
        this.flipd(rows);
        this.write(rows);
    };
    
    
    Game.prototype.move_up_possible = function() {
        var rows = this.get_cell_array();
        this.flipd(rows);
        var rows2 = this.copy_array(rows);
        this.shift_operation(rows);
        if (this.array_is_equal(rows, rows2)) {
            return false;
        } else {
            return true;
        };
    };
    
    
    Game.prototype.move_down_execute = function() {
        
        var rows = this.get_cell_array();
        
        this.flipd(rows);
        this.fliplr(rows);
        
        this.main_operation(rows);
        
        this.fliplr(rows);
        this.flipd(rows);
        
        this.write(rows);
        
    };
    
    
    Game.prototype.move_down_possible = function() {
        var rows = this.get_cell_array();
        this.flipd(rows);
        this.fliplr(rows);
        var rows2 = this.copy_array(rows);
        this.shift_operation(rows);
        if (this.array_is_equal(rows, rows2)) {
            return false;
        } else {
            return true;
        };
    };
    
    
    Game.prototype.array_is_equal = function(arr1, arr2) {
        var is_equal = true;
        for (var i = 0; i < arr1.length; i++) {
            for (var j = 0; j < arr1[i].length; j++) {
                if (arr1[i][j] != arr2[i][j]) {is_equal = false};
            };
        };
        return is_equal;
    };
    
    
    Game.prototype.copy_array = function(arr) {
        var copy = [];
        
        for (var i = 0; i < arr.length; i++) {
            var row = [];
            for (var j = 0; j < arr[i].length; j++) {
                row.push(arr[i][j]);
            };
            copy.push(row);
        };
        
        return copy;
    };
    
    
    Game.prototype.fliplr = function(arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i].reverse();
        };
    };
    
    
    Game.prototype.flipd = function(arr) {
        
        var cp = this.copy_array(arr);
        
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr[i].length; j++) {
                arr[i][j] = cp[j][i];
            };
        };
        
        return arr;
    };
    
    
    Game.prototype.combine = function(rows) {
        for (var r=0; r<rows.length; r++) {
            var row = rows[r];
            
            for (var c=0; c<row.length-1; c++) {
                
                if (row[c] == row[c+1]) {
                    
                    if (row[c] == 0) {
                        continue;
                    }
                    
                    // combine
                    row[c] = row[c] + row[c+1]
                                        
                    // shift remaining cells
                    this.shift_remaining_cells(row, c+1);
                };
            };
        };
    };
    
    
    Game.prototype.shift_remaining_cells = function(row, starting_index) {
        for (var i = starting_index; i < row.length-1; i++) {
            row[i] = row[i+1];
        };
        row[row.length-1] = 0;
    };
    
    
    Game.prototype.remove_forward_blanks = function(rows) {
        for (var r=0; r<rows.length; r++) {
            var row = rows[r];
            this.remove_forward_blanks_in_row(row);
        };
    };
    
    
    Game.prototype.is_empty = function(cells) {
        var b = true;
        for (var i=0; i<cells.length; i++) {
            if (cells[i] != 0) {
                b = false;
            };
        };
        return b
    };
    
    
    Game.prototype.remove_forward_blanks_in_row = function(row) {
        for (var c=0; c<row.length-1; c++) {
            if (row[c] == 0) {
                var rest_of_row_empty = this.is_empty(row.slice(c, row.length))
                if (!rest_of_row_empty) {
                    this.shift_remaining_cells(row, c);
                    this.remove_forward_blanks_in_row(row);
                };
            };
        };
    };
    
    
    Game.prototype.generate_random_input = function() {
        var rand = Math.random();
        
        var value = 2;
        
        if (rand < 0.2) {
            value = 4;
        };
        
        return value;
    };
    
    
    Game.prototype.generate_random_open_position = function(rows) {
        
        var available = [];
        
        for (var i = 0; i < rows.length; i++) {
            for (var j = 0; j < rows[i].length; j++) {
                if (rows[i][j] == 0) {
                    var open_cell = new Cell();
                    open_cell.init(i,j);
                    available.push(open_cell);
                };
            };
        };
        
        var index = this.generate_random_integer(0, available.length-1);
        
        return available[index];
    };
    
    
    Game.prototype.generate_random_integer = function(min, max) {
        return Math.floor(Math.random() * (+max - +min)) + +min;
    };
    
    
    Game.prototype.insert_random_input = function(rows) {
        var input = this.generate_random_input();
        var position = this.generate_random_open_position(rows);
        if (position instanceof Cell) {
            rows[position.row][position.column] = input;
        };
    };
    
    
    Game.prototype.shift_operation = function(rows) {
        this.remove_forward_blanks(rows);
        this.combine(rows);
    };
    
    
    Game.prototype.main_operation = function(rows) {
        
        this.shift_operation(rows);
        
        this.insert_random_input(rows);
        
    };
    
}
    

var g = new Game();

window.onload = function() {
    g.init();
    
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37) {
            g.move_left();
        }
        else if(event.keyCode == 38) {
            g.move_up();
        }
        else if(event.keyCode == 39) {
            g.move_right();
        }
        else if(event.keyCode == 40) {
            g.move_down();
        }
    });
}

function left() {
    g.move_left();
}

function right() {
    g.move_right();
}

function up() {
    g.move_up();
}

function down() {
    g.move_down();
}

function reset() {
    g.init();
}

