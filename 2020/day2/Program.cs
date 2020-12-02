using System;
using System.Collections.Generic;
using System.Linq;

namespace day2 {
	class Program {
		static void Main(string[] args) {
			Console.WriteLine("Passing test 1: " +
				System.IO.File.ReadAllLines("input.txt")
					.Select(row => new Password(row))
					.Count<Password>(x => x.isValid()));
			Console.WriteLine("Passing test 2: " +
				System.IO.File.ReadAllLines("input.txt")
					.Select(row => new Password(row))
					.Count<Password>(x => x.isValid2()));
		}
	}

	public class Password {

		public Password(string row) {
			var items = row.Split(' ');
			this.min = int.Parse(items[0].Split('-')[0]) - 1;
			this.max = int.Parse(items[0].Split('-')[1]) - 1;
			this.requiredLetter = items[1][0];
			this.password = items[2];
		}
		int min { get; set; }
		int max { get; set; }
		char requiredLetter { get; set; }
		string password { get; set; }

		public bool isValid() {
			int occurrences = (char)password.Split(this.requiredLetter).Length - 1;

			return occurrences >= this.min && occurrences <= this.max;
		}
		public bool isValid2() {
			if (string.IsNullOrWhiteSpace(this.password) || this.password.Length < this.max) {
				return false;
			}
			return (this.password[this.min] == this.requiredLetter) ^ (this.password[this.max] == this.requiredLetter);
		}
	}
}
