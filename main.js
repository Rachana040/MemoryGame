var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;

function memory_title_shuffle(array) {
	var i = array.length;
	var i,temp;
	while(--i > 0) {
		j = Math.floor(Math.random() * (i+1));
		temp = array[j];
		array[j] = array[i];
		array[i] = temp;
	}
}


//New board
function newBoard() {
	tiles_flipped = 0;
	var output = '';
	memory_title_shuffle(memory_array);
	for(var i = 0;i < memory_array.length;i++) {
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
	}
	document.getElementById("memory_board").innerHTML = output;
}

function memoryFlipTile(tile,value) {
	if(tile.innerHTML == "" && memory_values.length < 2) {
		tile.style.background = "#FFF";
		tile.innerHTML = value;
		if(memory_values.length == 0) {
			memory_values.push(value);
			memory_tile_ids.push(tile.id);
		}
		
		else if(memory_values.length == 1) {
			memory_values.push(value);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]) {
				tiles_flipped += 2;
				
				//clearing arrays for next flip
				memory_values = [];
				memory_tile_ids = [];
				
				//check if game over
				if(tiles_flipped == memory_array.length) {
					alert("Congratulations!");
					document.getElementById("memory_board").innerHTML = '';
					newBoard();
				}
			}
			
			else {
				function flip2tilesback() {
					var tile_1 = document.getElementById(memory_tile_ids[0]);
					var tile_2 = document.getElementById(memory_tile_ids[1]);
					tile_1.style.background = '#333';
					tile_1.innerHTML = '';
					tile_2.style.background = "#333";
					tile_2.innerHTML = '';
					
					//clearing arrays for next flip
					memory_values = [];
					memory_tile_ids = [];
				}
				window.setTimeout(flip2tilesback,700); 
			}
		}
	}		
}