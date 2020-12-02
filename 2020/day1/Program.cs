using System;
using System.Collections.Generic;

namespace day1 {
	class Program {
		static void Main(string[] args) {

			List<string> myList = new List<string>(System.IO.File.ReadAllLines("numbers.txt"));

			foreach (string row in myList) {

				var number = int.Parse(row);

				if (number < 2020) {

					if (myList.Contains((2020 - number).ToString())) {

						Console.WriteLine((2020 - number) * number);
						break;
					}
				}
			}

		}
	}
}
