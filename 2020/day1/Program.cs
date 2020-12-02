using System;
using System.Collections.Generic;
using System.Linq;

namespace day1 {
	class Program {
		static void Main(string[] args) {
			
			List<int> myList = new List<int>(System.IO.File.ReadAllLines("numbers.txt").Select(x => int.Parse(x)));
			part1(myList);
			part2(myList);
		}

		static void part1(List<int> myList) {

			foreach (int row in myList) {


				if (row < 2020) {

					if (myList.Contains((2020 - row))) {

						Console.WriteLine((2020 - row) * row);
						break;
					}
				}
			}
		}

		static void part2(List<int> myList) {
			foreach(var oldest in myList) {
				foreach(var middlest in myList.Where(x => x != oldest && (oldest + x < 2020))) {
					foreach(var youngest in myList.Where(x => x != oldest && x != middlest)) {
						if (youngest + oldest + middlest == 2020)  {
							Console.WriteLine(youngest * oldest * middlest);
						}
					}
				}
			}
		}
	}
}
