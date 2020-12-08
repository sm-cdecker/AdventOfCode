import { readFileSync } from "fs";

export interface Bag {[color: string]: number }

const shinyGold = 'shiny gold';

function main() {
	let raw = fileParser(readFileSync('input', 'utf-8'));
	let bags: {[color: string]: Bag} = {};
	let canContainGold = new Set();

	raw.forEach(rule => {
		let [rawColor, rawContents] = rule.split(' bags contain ');
		if (!bags[rawColor]) {
			bags[rawColor] = {};
		}

		rawContents
			.split(new RegExp(/bags?[\,\.]{1}/))
			.filter(x => !!x && x.trim() !== 'no other')
			.forEach(bag => {
				let bagCount = +bag.trim().split(' ')[0],
					bagColor = bag.trim().substring(1,bag.length - 1).trim();
				bags[rawColor][bagColor] = bagCount;
				if (bagColor === shinyGold) {
					canContainGold.add(rawColor);
				}
			});
	});
	canContainGold.forEach(color => {
		Object.entries(bags)
			.filter(([parentColor, bag]) => {
				return Object.entries(bag).some(([gc, num]) => canContainGold.has(gc));
			})
			.forEach(([parentColor, bag]) => {
				canContainGold.add(parentColor);
			});
	});
	canContainGold.delete(shinyGold);
	console.log(canContainGold.size);

	let shinyGoldBag = Object.entries(bags)
		.find(([color, bags]) => color === shinyGold)[1];
	console.log(shinyGoldBag)
	console.log(sumContents(bags, shinyGoldBag, shinyGold));
}

function sumContents(bagList: {[color: string]: Bag} = {}, parentBag: Bag, color: string, parentCount?: number): number {
	
	const total = Object.entries(parentBag)
		.map(([color, count]) => {
			// console.log(color)
			const sum = sumContents(bagList, bagList[color], color);
			if (Object.entries(bagList[color]).length === 0) {
				return count;
			}

			return count + (count * (!sum ? 1 : sum));
		}).reduceRight((prev, curr) => prev + curr, 0);
	const toReturn = total === 0 ? 1 : total;
	// console.log(`total-${color}: ${toReturn}`);
	return toReturn;
}

function fileParser(input: string): Array<string> {
	return input.split(new RegExp(/\n/gm));
}

main();