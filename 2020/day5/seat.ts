
export class Seat {
	row: number;
	column: number;
	code: string;
	seatID: number;

	public constructor(code: string, row: number, column: number) {	
		this.code = code;
		let minRow: number = 0,
			maxRow: number = row,
			minCol: number = 0,
			maxCol: number = column;

		code
			.split('')
			.forEach(val => {
				switch(val) {
					case 'F':
						maxRow = Math.floor((maxRow - minRow) / 2) + minRow;
						this.row = minRow;
						break;
					case 'B':
						minRow = Math.ceil((maxRow - minRow) / 2) + minRow;
						this.row = maxRow;
						break;
					case 'R':
						minCol = Math.ceil((maxCol - minCol) / 2) + minCol;
						this.column = maxCol;
						break;
					case 'L':
						maxCol = Math.floor((maxCol - minCol) / 2) + minCol;
						this.column = minCol;
						break;
				}
			});
		this.seatID = (this.row * 8) + this.column;
	}
}