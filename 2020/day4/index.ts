import { readFileSync } from "fs";

function main() {

	const passports: Array<Passport> = fileParser(readFileSync('./inputs','utf-8'));
	console.log(`Part 1: ${passports.filter(x => x.isValid()).length}`);
	console.log(`Part 2: ${passports
			.filter(x => x.isValid2())
			.length}`);

	let sample = passports.filter(x => x.isBirthValid());
	console.log('isBirthValid: ' + sample.length);
	sample = sample.filter(x => x.isECLValid());
	console.log('isECLValid: ' + sample.length);
	sample = sample.filter(x => x.isEYRValid());
	console.log('isEYRValid: ' + sample.length);
	sample = sample.filter(x => x.isHCLValid());
	console.log('isHCLValid: ' + sample.length);
	sample = sample.filter(x => x.isHGTValid());
	console.log('isHGTValid: ' + sample.length);
	sample = sample.filter(x => x.isIYRValid());
	console.log('isIYRValid: ' + sample.length);
	sample = sample.filter(x => !x.isPIDValid());
	console.log(sample[5]);

}

function fileParser(input: string): Array<Passport> {
	return input.split(new RegExp(/^\r\n/gm))
		.filter(blankCheck => !!blankCheck)
		.map((rawPP: string) => {			
			const ppKvp = rawPP
				.match(/(byr|eyr|iyr|pid|hcl|ecl|hgt):[#a-zA-Z0-9]*/g)
				.reduceRight((prev, curr) => {
					const fields = curr.split(':');
					prev[fields[0]] = fields[1]
					return prev;
				}, {});
			
			return new Passport(ppKvp);
		});
}


class Passport {
	// byr (Birth Year)
	public birthYear: number;
	// iyr (Issue Year)
	public issueYear: number;
	// eyr (Expiration Year)
	public expYear: number;
	// hgt (Height)
	public height: string;
	// hcl (Hair Color)
	public hairColor: string;
	// ecl (Eye Color)
	public eyeColor: string;
	// pid (Passport ID)
	public passportId: string;
	// cid (Country ID)
	public countryId: number;

	constructor(passport: {[key: string]: any}) {
		this.birthYear = +passport.byr;
		this.issueYear = +passport.iyr;
		this.expYear = +passport.eyr;
		this.height = passport.hgt;
		this.hairColor = passport.hcl;
		this.eyeColor = passport.ecl;
		this.passportId = passport.pid;
		this.countryId = passport.cid;
	}

	public isValid(): boolean{
		return !!this.birthYear
			&& !!this.issueYear
			&& !!this.expYear
			&& !!this.height
			&& !!this.hairColor
			&& !!this.eyeColor
			&& !!this.passportId;
	}

	public isValid2(): boolean {
		return this.isBirthValid()
			&& this.isIYRValid()
			&& this.isEYRValid()
			&& this.isHGTValid()
			&& this.isHCLValid()
			&& this.isECLValid()
			&& this.isPIDValid();
	}

	public isBirthValid(): boolean {
		return this.birthYear >= 1920
			&& this.birthYear <= 2002;
	}

	public isIYRValid(): boolean {
		return this.issueYear >= 2010
			&& this.issueYear <= 2020;
	}

	public isEYRValid(): boolean {
		return this.expYear >= 2020
			&& this.expYear <= 2030;
	}

	public isHGTValid(): boolean {
		if (!this.height)
			return false;

		const [height, measurement] = this.height.match(/^[0-9]{2,3}|(in|cm)$/g);
		if (!height || !measurement)
			return false;
		const heightNum = +height;
		
		switch(measurement) {
			case 'in':
				return heightNum >= 59 && heightNum <= 76;
			
			case 'cm':
				return heightNum >= 150 && heightNum <= 193;

			default:
				return false;
		}
	}

	public isHCLValid(): boolean {
		return !!this.hairColor && !!this.hairColor.match(/^#[a-f0-9]{6}$/);
	}
	public isECLValid(): boolean {
		return !!this.eyeColor && !!this.eyeColor.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/);
	}
	public isPIDValid(): boolean {
		return !!this.passportId && !!this.passportId.match(/^\d{9}$/);
	}
}


main();
