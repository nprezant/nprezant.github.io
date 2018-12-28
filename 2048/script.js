

function game() {
    
    // init
    this.name = "2048";
    
    // methods
    game.prototype.speak = function() {
        alert("I am " + this.name);
    };
    
    // things that need to happen
    // need to have the different moves defined (left, right, up, down)
    
    // move left command
    game.prototype.move_left = function() {
        grid = document.getElementsByClassName('cells')[0];
        
        rows = grid.getElementsByClassName('row');
        
        for (var r = 0; r < rows.length; r++) {
            
            row = rows[r].getElementsByClassName('cell');
            
            for (var c = 0; c <row.length-1; c++) {
                
                if (row[c].innerText == row[c+1].innerText) {
                    
                    if (row[c].innerText == "") {
                        continue;
                    }
                    
                    // combine
                    row[c].innerText = this.combine_cells(row[c], row[c+1])
                                        
                    // shift remaining cells
                    for (var i = c+1; i < row.length-1; i++) {
                        if (row[i+1].innerText == "") {
                            row[i].innerText = "";
                        } else {
                            row[i].innerText = row[i+1].innerText;
                        };
                    };
                    
                    // set the last cell to nothing since the row shifted over
                    row[row.length-1].innerText ="";
                };
                

            };
                
        };
    };
    
    
    // move right command
    game.prototype.move_right = function() {
        grid = document.getElementsByClassName('cells')[0];
        
        rows = grid.getElementsByClassName('row');
        
        for (var r = 0; r < rows.length; r++) {
            
            row = rows[r].getElementsByClassName('cell');
            
            for (var c = row.length; c > 1; c--) {
                
                if (row[c].innerText == row[c-1].innerText) {
                    
                    if (row[c].innerText == "") {
                        continue;
                    }
                    
                    // combine
                    row[c].innerText = this.combine_cells(row[c], row[c-1])
                                        
                    // shift remaining cells
                    for (var i = c-1; i > 1; i--) {
                        if (row[i-1].innerText == "") {
                            row[i].innerText = "";
                        } else {
                            row[i].innerText = row[i-1].innerText;
                        };
                    };
                    
                    // set the last cell to nothing since the row shifted over
                    row[0].innerText ="";
                };
                

            };
                
        };
    };
    
    
    game.prototype.combine_cells = function(cell1, cell2) {
        return  Number(cell1.innerText) + Number(cell2.innerText);
    }
    
    
    // need to be able to test if the move is possible
    
    // need to be able to write out he 2048 matrix
    
    // need to combine cells
    
    // need to generate random number to insert
    
    
    
    
}


var g = new game();

function left() {
    g.move_left();
}

function right() {
    g.move_right()
}