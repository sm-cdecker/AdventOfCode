import { readFileSync } from "fs";

class Adapter {
	public isLinked: boolean = false;
	public sequence: number = 0;

	constructor(
		public jolts: number,
		public interactions: number,
		public canStart: boolean
	) { }

	linkIt(sequence: number) {
		this.sequence = sequence;
		this.isLinked = true;
	}

	isCompatible(jolts: number): boolean {
		return this.jolts <= (jolts + 3)
			&& this.jolts >= (jolts - 3)
			&& this.jolts !== jolts;
		}
}

class Collection {
	constructor(public adapters: Array<Adapter>) {}

	current: number = 0;

	getNext(): Adapter {
		return this.adapters.find(x => {
			return !x.isLinked
				&& x.isCompatible(this.current);
		});
	}

	oneJolts(): number {
		let count = 0;
		for(let idx = 1; idx + 1 < this.adapters.length; idx++) {
			if (
				this.adapters[idx].jolts === (this.adapters[idx + 1].jolts + 1)
				|| this.adapters[idx].jolts === (this.adapters[idx + 1].jolts - 1)
				) {
					count++;
				}
		}
		return count;
	}
	threeJolts(): number {
		let count = 0;
		for(let idx = 1; idx + 1 < this.adapters.length; idx++) {
			if (
				this.adapters[idx].jolts === (this.adapters[idx + 1].jolts + 3)
				|| this.adapters[idx].jolts === (this.adapters[idx + 1].jolts - 3)
				) {
					count++;
				}
		}
		return count;
	}

	sort() {
		this.adapters = this.adapters.sort((a, b) => {
			return a.sequence - b.sequence;
		});
	}
}

function main() {
	let rawAdapters = getAdapters('test');

	let collection = new Collection(rawAdapters.map((x: number): Adapter => {
			let interactions = 0;

			rawAdapters
				.filter(y => y !== x)
				.forEach(y => {
					if (y <= (x + 3) && y >= (x - 3)) {
						interactions++;
					}
				})
			return new Adapter(x, interactions, x <= 3);
		})
		.filter(x => x.interactions > 0)
		.sort((a, b) => {
			if (a.canStart !== b.canStart) {
				return a.canStart? -1 : 1;
			} else {
				return b.interactions - a.interactions;
			}
		}));
	let idx = 0;
	while(collection.getNext()) {
		let adpt = collection.getNext();
		collection.current = adpt.jolts;
		adpt.linkIt(idx);
		idx++;
	}

	collection.sort();
	console.dir(collection.adapters);

	console.log(`ones: ${ collection.oneJolts() }`);
	console.log(`threes: ${collection.threeJolts()}`);
}



function getAdapters(file: string): Array<number> {
	return fileParser(readFileSync(file, 'utf-8'))
		.map(x => parseInt(x));
}

function fileParser(input: string): Array<string> {
	return input.split(new RegExp(/\n/gm));
}

main();