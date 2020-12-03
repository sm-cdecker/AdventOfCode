const fs = require('fs');

function main() {
	const treeGrid = fs
		.readFileSync('input', 'utf8')
		.split('\r\n')
		.map(row => row.split(''));	
	
	console.log(part1(treeGrid));
	
	console.log(part2(treeGrid));
}

function part1(treeGrid) {
	const toboggan = new Toboggan(treeGrid[0].length, treeGrid.length);

	let treecount = 0;
	
	while(toboggan.move()) {		
		if (treeGrid[toboggan.row][toboggan.column] === '#') {
			treecount++;
		}
	}
	return treecount;
}

function part2(treeGrid) {
	const toboggans = [
		new Toboggan(treeGrid[0].length, treeGrid.length, 1, 1),
		new Toboggan(treeGrid[0].length, treeGrid.length, 1, 3),
		new Toboggan(treeGrid[0].length, treeGrid.length, 1, 5),
		new Toboggan(treeGrid[0].length, treeGrid.length, 1, 7),
		new Toboggan(treeGrid[0].length, treeGrid.length, 2, 1)
	];

	return toboggans.map(toboggan => {
		let treecount = 0;
		
		while(toboggan.move()) {		
			if (treeGrid[toboggan.row][toboggan.column] === '#') {
				treecount++;
			}
		}
		return treecount;
	}).reduce((prev, curr) => !!prev ? prev * curr : 1);
}

class Toboggan {
	row=0;
	column = 0;

	row_dist=1;
	column_dist=3;
	
	// the numer of columns in the grid, need to know when to wrap
	wrapLimit = 0;
	row_limit;

	constructor(wrapLimit, row_limit, row_dist, column_dist) {
		this.wrapLimit = wrapLimit;
		this.row_limit = row_limit;
		this.row_dist = row_dist ? row_dist : this.row_dist;
		this.column_dist = column_dist ? column_dist : this.column_dist;
	}

	move() {
		this.row += this.row_dist;
		this.column += this.column_dist;
		
		if (this.column >= this.wrapLimit) {
			this.column -= this.wrapLimit;
		}

		return this.row < this.row_limit;
	}

}

main();
