import { Person } from './person';

export class Group {
	members: Array<Person>;
	groupSum: number = 0;
	
	constructor(rawGroup: String) {
		this.members = rawGroup
			.split(new RegExp(/\n/g))
			.filter(x => !!x)
			.map(x => new Person(x));

		const obj: {[key: string]: number} = {};
		this.members.forEach(mem => {
			mem.rawAnswer.split('').forEach((x) => {
				if (!obj[x]) {
					obj[x] = 0;
				}
				obj[x]++;
			});
		});
		this.groupSum = Object.values(obj)
			.filter(x => x === this.members.length)
			.length;
	}

}