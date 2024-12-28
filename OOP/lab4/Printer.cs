using lab_04;
using System;

namespace lab_04
{
    /*Создайте дополнительный класс Printer c полиморфным методом
IAmPrinting(SomeAbstractClassorInterface someobj). Формальным
параметром метода должна быть ссылка на абстрактный класс или наиболее
общий интерфейс в вашей иерархии классов.В методе iIAmPrinting
определите тип объекта и вызовите ToString(). .*/
    class Printer
    {
        public void IAmPrinting(Inventory inventory)
        {
            Console.WriteLine(inventory.ToString());
        }
    }
}
interface B
{
    void Function();
}
class A:B
{
    A name = new A();
    void B.Function() {
        Console.WriteLine("Dsad");
    }
}
