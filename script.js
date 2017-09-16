/*
 *
 * bc => big_cell
 * sc => small_cell
 *
 * */

var valid_rows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

var filled_bc = [null, "", "", "", "", "", "", "", "", ""];

var can_mark_anywhere = false;

function game(initial_mark) {
    var sc_list = document.querySelectorAll('.small_cell');

    var prev_sc_number = 0, count = 0;
    var mark = initial_mark;

    function event_listener() {
        for (var i = 0; i < sc_list.length; i++) {
            var bc_number = sc_list[i].parentNode.parentNode.getAttribute('data-big-cell');
            sc_list[i].addEventListener('click', on_click(i, bc_number));
        }
    }

    function mark_input(i, _mark, _comark, bc_number) {
        sc_list[i].innerHTML = _mark;
        mark = _comark;
        sc_check(_mark, bc_number);
        bc_check(_mark);
        console.log(_mark + ' moved at bc_number: ' + bc_number + '; sc_number: ' + ((i % 9) + 1));
    }

    function sc_check(_mark, bc_number) {
        var sc_in_bc = document.querySelectorAll("[data-big-cell = '" + bc_number + "'] .small_cell");
        for (var i = 0; i < valid_rows.length; i++) {
            if (sc_in_bc[valid_rows[i][0]].innerHTML !== "" &&
                sc_in_bc[valid_rows[i][1]].innerHTML !== "" &&
                sc_in_bc[valid_rows[i][2]].innerHTML !== "" &&
                sc_in_bc[valid_rows[i][0]].innerHTML === sc_in_bc[valid_rows[i][1]].innerHTML &&
                sc_in_bc[valid_rows[i][1]].innerHTML === sc_in_bc[valid_rows[i][2]].innerHTML) {
                console.log(_mark + " WINS BIG CELL NUMBER " + bc_number);
                filled_bc[Number(bc_number)] = _mark;
                console.log(filled_bc);
                document.querySelector("[data-big-cell = '" + bc_number + "']").innerHTML = _mark;
            }
        }
    }

    function bc_check (_mark) {
        for (var i = 0; i < valid_rows.length; i++) {
            if (filled_bc[valid_rows[i][0] + 1] !== "" &&
                filled_bc[valid_rows[i][1] + 1] !== "" &&
                filled_bc[valid_rows[i][2] + 1] !== "" &&
                filled_bc[valid_rows[i][0] + 1] === filled_bc[valid_rows[i][1] + 1] &&
                filled_bc[valid_rows[i][1] + 1] === filled_bc[valid_rows[i][2] + 1]) {
                alert(_mark + " HAS WON THE GAME");
                for (var j = 0; j < valid_rows[i].length; j++) {
                    document.querySelector("[data-big-cell = '" + (valid_rows[i][j] + 1) + "']").style.backgroundColor = '#00CB00';
                }
            }

        }
    }

    function on_click(i, curr_bc_number) {
        return function() {
            function filled_or_not () {
                if (sc_list[i].innerHTML === "") {
                    mark === "X" ? mark_input(i, "X", "O", curr_bc_number) : mark_input(i, "O", "X", curr_bc_number);
                    prev_sc_number = sc_list[i].getAttribute('data-small-cell');
                }
                can_mark_anywhere = false;
                if (filled_bc[Number(prev_sc_number)] !== "") {
                    console.log("poo");
                    can_mark_anywhere = true;
                }
            }
            count++;
            if (can_mark_anywhere) {
                if (filled_bc[Number(curr_bc_number)] === "") {
                    filled_or_not();
                } else {
                    alert("This cell has already been captured, mark somewhere else");
                }
            } else {
                if (curr_bc_number === prev_sc_number || count === 1) {
                    filled_or_not();
                }
            }
        }
    }

    event_listener();
}

game("X");