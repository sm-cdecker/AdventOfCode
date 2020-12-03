const fs = require('fs');

function main() {
	const treeGrid = fs
		.readFileSync('input', 'utf8')
		.split('\r\n')
		.map(row => row.split(''));	
	
	console.log(part1(treeGrid));
	console.log(`wrapLimit: ${treeGrid[0].length}`)
}

function part1(treeGrid) {
	const toboggan = new Toboggan(treeGrid[0].length);

	return treeGrid.filter((row, idx) => {
			if (idx === 0)
				return false;
			toboggan.move();
			console.log(toboggan.toString());
			console.log(row.join(''));

			return row[toboggan.column] === '#';
		}).length;

}

class Toboggan {
	column = 0;
	
	// the numer of columns in the grid, need to know when to wrap
	wrapLimit = 0;

	constructor(wrapLimit) {
		this.wrapLimit = wrapLimit;
	}

	move() {
		this.column += 3;
		
		if (this.column >= this.wrapLimit) {
			this.column -= this.wrapLimit;
		}
	}

	toString() {
		return `[${this.column}]`;
	}
}

main();
