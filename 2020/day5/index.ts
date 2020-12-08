import { readFileSync } from "fs";
import { Seat } from './seat';

function main() {
	let input = fileParser(readFileSync('input', 'utf-8'));
	// const plane: Array<Array<Seat>> = (new Array<Array<Seat>> (Plane.rows)).forEach(x => new Array<Seat>(Plane.columns));
	const seats = input.map(seat => new Seat(seat, Plane.maxRow, Plane.maxCol));

	// console.log(new Seat('FBFBBFFRLR', Plane.maxRow, Plane.maxCol));
	console.log(seats.sort((a, b) => b.seatID - a.seatID)[0].seatID);

	const upper = seats.filter(seat => {
		return !seats.find(seat2 => (seat.seatID-1) === seat2.seatID);
	})
	console.log(upper);
}

function fileParser(input: string): Array<string> {
	return input.split(new RegExp(/\n/gm));
}

const Plane = {
	maxRow: 127,
	maxCol: 7
}

main();