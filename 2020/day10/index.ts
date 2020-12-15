import { readFileSync } from "fs";

function main() {
	let adapters = getAdapters('test');

	adapters.forEach(x => {
		console.log(x);
	})

}

function getAdapters(file: string): Array<number> {
	return fileParser(readFileSync(file, 'utf-8'))
		.map(x => parseInt(x));
}

function fileParser(input: string): Array<string> {
	return input.split(new RegExp(/\n/gm));
}

main();