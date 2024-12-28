using System;

namespace lab_05
{
    class Printer
    {
        public void IAmPrinting(Inventory inventory)
        {
            Console.WriteLine(inventory.ToString());
        }
    }
}