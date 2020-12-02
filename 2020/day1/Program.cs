using System;
using System.Collections.Generic;

namespace day1
{
	class Program
	{
		static void Main(string[] args)
		{

			List<string> myList = new List<string>(System.IO.File.ReadAllLines("numbers.txt"));
			foreach (string row in myList)
			{
				var number = int.Parse(row);
				if (number < 2020)
				{
					var compliment = 2020 - number;
					if (myList.Contains(compliment.ToString()))
					{
						Console.WriteLine(compliment * number);
					}
				}
			}
			
		}
	}
}
