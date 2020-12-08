import { readFileSync } from "fs";
import { Group } from "./group";

function main() {
	
	let rawGroups = fileParser(readFileSync('input', 'utf-8'));
	const groups: Array<Group> = rawGroups.map(grp => {
		return new Group(grp);
	});
	const groupSum = groups.reduceRight((prev, curr) => {
		return prev + curr.groupSum;
	}, 0);
	groups.forEach(x => {
		x.members.forEach(y => {
			console.log(y)
		})
	})
	console.log(groupSum);
}

function fileParser(input: string): Array<string> {
	return input.split(new RegExp(/^\n/gm));
}

main();