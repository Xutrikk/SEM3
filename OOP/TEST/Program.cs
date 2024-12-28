using System;

namespace Test
{

    enum Months
    {
        January,
        February,
        March,
        April,
        May,
        June,
        July,
        August,
        September,
        October,
        November,
        December
    }


    class Computer : IComparable<Computer>
    {
        public static readonly string Brand = "Generic";
        public static int TotalComputers = 0;
        public string Model { get; set; }

        public Computer(string model)
        {
            Model = model;
            TotalComputers++;
        }

        public int CompareTo(Computer other)
        {
            return this.Model.CompareTo(other.Model);
        }
    }


    interface IGood
    {
        void Fine();
    }

    abstract class Something
    {
        public abstract void ItsOk();
    }

    class Case : Something, IGood 
    {
        public override void ItsOk()
        {
            Console.WriteLine("Itsok");
        }

        public void Fine()
        {
            Console.WriteLine("Fine!");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {

            foreach (Months month in Enum.GetValues(typeof(Months)))
            {
                Console.WriteLine(month);
            }


            string input = "123. 345. 678";
            string[] sentences = input.Split(new string[] {". "}, StringSplitOptions.RemoveEmptyEntries);
            foreach (string sentence in sentences)
            {
                Console.WriteLine(sentence);
            }


            Computer comp1 = new Computer("ModelA");
            Computer comp2 = new Computer("ModelB");
            Console.WriteLine($"Результат: {comp1.CompareTo(comp2)}");


            Case myCase = new Case();
            myCase.ItsOk();
            myCase.Fine();
        }
    }
}
