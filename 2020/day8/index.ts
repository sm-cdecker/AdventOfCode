import { readFileSync } from "fs";

interface Instruction {
	op: string; // 'nop' | 'acc' | 'jmp'
	arg: number;
}

function main() {
	let instr,
		idx = 0;

	do {
		instr = getCommands('input');
		switch(instr[idx].op) {
			case 'nop':
				instr[idx].op = 'jmp';
				break;
			case 'jmp':
				instr[idx].op = 'nop';
				break;
		}
		idx++;
	} while (!run(instr) && idx < instr.length)


	console.log(`HasRun: ${run(instr, true)}`);
}

function run(commands: Array<Instruction>, printACC?: boolean) {
		
	let acc: number = 0,
		ptr: number = 0,
		lastPtr: number = 0,
		counter: number = 0,
		stack: Set<number> = new Set(),
		successful: boolean = true,
		cmd: Instruction;

	do {
		cmd = commands[ptr];
		stack.add(ptr);
		lastPtr = ptr;
		switch(cmd.op) {
			case 'acc':
				acc += cmd.arg;
			case 'nop':
				ptr++;
				break;
			case 'jmp':
				ptr = ptr + cmd.arg;
				break;
		}
		counter++;
		if (stack.has(ptr)) {
			successful = false;
		}

	} while (ptr < commands.length && !stack.has(ptr));
	/*console.log(`LastRowRun: ${lastPtr + 1}`);
	console.log(`counter: ${counter - 2}`);
	console.log(`acc: ${this.acc}`);*/
	if (printACC) {
		console.log(`ACC: ${acc}`);
	}
	return successful
}

/*class Processor {

	public run(commands: Array<Instruction>) {
		
		let acc: number = 0,
			ptr: number = 0,
			lastPtr: number = 0,
			counter: number = 0,
			stack: Set<number> = new Set(),
			successful: boolean = true;

		do {
			const cmd = this.commands[ptr];
			stack.add(ptr);
			lastPtr = ptr;
			switch(cmd.op) {
				case 'acc':
					this.acc += cmd.arg;
				case 'nop':
					ptr++;
					break;
				case 'jmp':
					ptr = ptr + cmd.arg;
					break;
			}
			counter++;
			if (stack.has(ptr)) {
				console.log('BREAK');
				successful = false;
			}

		} while (ptr < this.commands.length && !stack.has(ptr));
		/*console.log(`LastRowRun: ${lastPtr + 1}`);
		console.log(`counter: ${counter - 2}`);
		console.log(`acc: ${this.acc}`);
		return successful
	}
}*/


function getCommands(file: string): Array<Instruction> {
	return fileParser(readFileSync(file, 'utf-8'))
	.map<Instruction>(instr => {
		const [op, arg] = instr.split(' ');
		return {
			op: op,
			arg: parseInt(arg)
		}
	});
}

function fileParser(input: string): Array<string> {
	return input.split(new RegExp(/\n/gm));
}

main();