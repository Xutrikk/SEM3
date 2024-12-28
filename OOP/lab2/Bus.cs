using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lab_02;

namespace Lab_02
{
    public partial class Bus
    {
        /*поле - только для чтения(например, для каждого экземпляра сделайте
       поле только для чтения ID - равно некоторому уникальному номеру
       (хэшу) вычисляемому автоматически на основе инициализаторов объекта);*/
        private readonly int bus_ID;
        private string driverName;
        private int busNumber;
        private int routeNumber;
        private string busBrand;
        private int yearOfOpetationStart;
        private int mileage;
        private int busID;
        private static int count; // Статическое поле для хранения количества созданных объектов

        public string DriverName
        {
            get { return driverName; }
            set { driverName = value; }
        }

        /*поле- константу;*/
        private const string busColor = "Red";

        public Bus()// без параметров
        {
            driverName = "Default";
            busNumber = 100;
            routeNumber = 1;
            busBrand = "МАЗ";
            yearOfOpetationStart = 2022;
            mileage = 0;
            busID = GetHashCode();
            count++; // Инкрементируем количество созданных объектов
        }

        public Bus(string driverName, int busNumber, int routeNumber, int yearOfOpetationStart, int mileage, string busBrand = "МАЗ") // с параметрами по умолчанию
        {
            if (routeNumber > 0 && yearOfOpetationStart >= 1990 && mileage >= 0)
            {
                this.driverName = driverName;//представляет ссылку на текущий экземпляр
                this.busNumber = busNumber;
                this.routeNumber = routeNumber;
                this.busBrand = busBrand;
                this.yearOfOpetationStart = yearOfOpetationStart;
                this.mileage = mileage;
                busID = GetHashCode();
                count++; // Инкрементируем количество созданных объектов
            }
            else
                throw new ArgumentException();
        }

        public Bus(int routeNum)// с парамаетрами
        {
            if (routeNum > 0)
            {
                driverName = "Default";
                busNumber = 100;
                routeNumber = routeNum;
                busBrand = "МАЗ";
                yearOfOpetationStart = 2022;
                mileage = 0;
                busID = GetHashCode();
                count++; // Инкрементируем количество созданных объектов
            }
            else
                throw new ArgumentException();
        }

        //статический конструктор(конструктор типа);
        static Bus()
        {
            count = 0; // Инициализация счетчика
        }

        //определите закрытый конструктор; предложите варианты его вызова;
        private Bus(int busNumber, int routeNumber, string driverName)
        {
            this.busNumber = busNumber;
            this.routeNumber = routeNumber;
            this.driverName = driverName;
            this.busBrand = "МАЗ"; 
            this.yearOfOpetationStart = 2022; 
            this.mileage = 0; 
            this.busID = GetHashCode();
            count++; 
        }

        /*свойства (get, set) – для всех поле класса (поля класса должны быть
           закрытыми); Для одного из свойств ограните доступ по set*/

        public int BusNum
        {
            get { return this.busNumber; }//действия, выполняемые при получении значения свойства
            private set // Для одного из свойств ограните доступ по set
            {
                if (value > 0)
                    this.busNumber = value;
                else
                    this.busNumber = 1;
            }
        }

        public int RouteNum
        {
            get { return this.routeNumber; }
            set
            {
                if (value > 0)
                    this.routeNumber = value;
                else
                    this.routeNumber = 1;
            }
        }

        public int YearStart
        {
            get { return this.yearOfOpetationStart; }
            set
            {
                if (value >= 1990)
                    this.yearOfOpetationStart = value;
                else
                    this.yearOfOpetationStart = 1990;
            }
        }

        public int Mileage
        {
            get { return this.mileage; }
            set
            {
                if (value >= 0)
                    this.mileage = value;
                else
                    this.mileage = 0;
            }
        }

        // Статический метод для получения количества созданных объектов
        public static int GetBusCount()
        {
            return count;
        }

    }
}