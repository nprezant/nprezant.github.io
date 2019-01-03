function Cell() {
    Cell.prototype.init = function(row, column) {
        this.row = row;
        this.column = column;
    };
}


function game() {
    
    // init
    this.name = "2048";
    
    game.prototype.init = function() {
        this.grid = document.getElementsByClassName('grid')[0];
        
        var rows = this.get_cell_array();
        this.insert_random_input(rows);
        this.insert_random_input(rows);
        this.insert_random_input(rows);
        this.insert_random_input(rows);
        this.write(rows);
    };
    
    
    game.prototype.get_cell_array = function() {
        var rows = this.grid.getElementsByClassName('row');
        var arr = [];
        
        for (var i=0; i<rows.length; i++) {
            arr.push([])
            var cells = rows[i].getElementsByClassName('cell');
            for (var j=0; j<cells.length; j++) {
                arr[i].push(Number(cells[j].innerText));
            };
        };
        
        return arr
    };
    
    
    game.prototype.write = function(row_array) {
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
    };
    
    
    game.prototype.move_left = function() {
        
        var rows = this.get_cell_array();
        
        this.main_operation(rows);
        
        this.write(rows);
        
    };
    
    
    game.prototype.move_right = function() {
        var rows = this.get_cell_array();

        this.fliplr(rows);
        
        this.main_operation(rows);
        
        this.fliplr(rows);
        
        this.write(rows);
    };
    
    
    game.prototype.move_up = function() {
        
        var rows = this.get_cell_array();
        
        this.flipd(rows);
        
        this.main_operation(rows);
        
        this.flipd(rows);
        
        this.write(rows);
        
    };
    
    
    game.prototype.move_down = function() {
        
        var rows = this.get_cell_array();
        
        this.flipd(rows);
        this.fliplr(rows);
        
        this.main_operation(rows);
        
        this.fliplr(rows);
        this.flipd(rows);
        
        this.write(rows);
        
    };
    
    
    game.prototype.copy_array = function(arr) {
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
    
    
    game.prototype.fliplr = function(arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i].reverse();
        };
    };
    
    
    game.prototype.flipd = function(arr) {
        
        var cp = this.copy_array(arr);
        
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr[i].length; j++) {
                arr[i][j] = cp[j][i];
            };
        };
        
        return arr;
    };
    
    
    game.prototype.combine = function(rows) {
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
    
    
    game.prototype.shift_remaining_cells = function(row, starting_index) {
        for (var i = starting_index; i < row.length-1; i++) {
            row[i] = row[i+1];
        };
        row[row.length-1] = 0;
    };
    
    game.prototype.remove_forward_blanks = function(rows) {
        for (var r=0; r<rows.length; r++) {
            var row = rows[r];
            this.remove_forward_blanks_in_row(row);
        };
    };
    
    game.prototype.is_empty = function(cells) {
        var b = true;
        for (var i=0; i<cells.length; i++) {
            if (cells[i] != 0) {
                b = false;
            };
        };
        return b
    };
    
    
    game.prototype.remove_forward_blanks_in_row = function(row) {
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
    
    
    game.prototype.generate_random_input = function() {
        var rand = Math.random();
        
        var value = 2;
        
        if (rand < 0.2) {
            value = 4;
        };
        
        return value;
    };
    
    
    game.prototype.generate_random_open_position = function(rows) {
        
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
    
    
    game.prototype.generate_random_integer = function(min, max) {
        return Math.floor(Math.random() * (+max - +min)) + +min;
    };
    
    
    game.prototype.insert_random_input = function(rows) {
        var input = this.generate_random_input();
        var position = this.generate_random_open_position(rows);
        if (position instanceof Cell) {
            rows[position.row][position.column] = input;
        };
    };
    
    
    game.prototype.operation_possible = function(rows) {
        
    };
    
    
    game.prototype.main_operation = function(rows) {
        
        this.remove_forward_blanks(rows);
        
        this.combine(rows);
        
        this.insert_random_input(rows);
        
    };
    
}
    

var g = new game();

window.onload = function() {
    g.init()
    
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


