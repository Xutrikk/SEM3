using System.IO.Compression;
using System.IO;
using System.Linq;

namespace Lab12
{
    /*5. Создать класс XXXFileManager. Набор методов определите самостоятельно. С его помощью выполнить следующие действия:
        a. Прочитать список файлов и папок заданного диска. Создать директорий XXXInspect, создать текстовый файл 
        xxxdirinfo.txt и сохранить туда информацию. Создать копию файла и переименовать его. Удалить первоначальный файл.
        b. Создать еще один директорий XXXFiles. Скопировать в него все файлы с заданным расширением из заданного 
        пользователем директория. Переместить XXXFiles в XXXInspect.
        c. Сделайте архив из файлов директория XXXFiles. Разархивируйте его в другой директорий.*/
    public static class HKVFileManager
    {
        public static void InspectDriver(string driverName)
        {
            Directory.CreateDirectory(@"C:\BSTU\SEM3\OOP\lab12oop\lab12oop\HKVInspect");
            File.Create(@"C:\BSTU\SEM3\OOP\lab12oop\lab12oop\HKVInspect\HKVdirinfo.txt").Close();
            var currentDrive = DriveInfo.GetDrives().Single(x => x.Name == driverName);

            using (StreamWriter file = new StreamWriter(@"C:\BSTU\SEM3\OOP\lab12oop\lab12oop\HKVInspect\HKVdirinfo.txt"))
            {
                file.WriteLine("Список папок:");
                foreach (var s in currentDrive.RootDirectory.GetDirectories())
                {
                    file.WriteLine(s);
                }
                file.WriteLine("Список файлов:");
                foreach (var f in currentDrive.RootDirectory.GetFiles())
                {
                    file.WriteLine(f);
                }
            }

            File.Copy(@"C:\BSTU\SEM3\OOP\lab12oop\lab12oop\HKVInspect\HKVdirinfo.txt", @"C:\BSTU\SEM3\OOP\lab12oop\lab12oop\HKVInspect\HKVdirinfoCopy.txt", true);
            File.Delete(@"C:\BSTU\SEM3\OOP\lab12oop\lab12oop\HKVInspect\HKVdirinfo.txt");
        }

        public static void CopyFiles(string path, string extention)
        {
            Directory.CreateDirectory(@"C:\BSTU\SEM3\OOP\lab12oop\lab12oop\HKVFiles");
            DirectoryInfo directory = new DirectoryInfo(path);
            DirectoryInfo directory2 = new DirectoryInfo(@"C:\BSTU\SEM3\OOP\lab12oop\lab12oop\HKVInspect\HKVFiles");
            foreach (var f in directory.GetFiles())
            {
                if (f.Extension == extention)
                    f.CopyTo(@"C:\BSTU\SEM3\OOP\lab12oop\lab12oop\HKVFiles\" + f.Name + extention, true);
            }
            if (!directory2.Exists)
                Directory.Move(@"C:\BSTU\SEM3\OOP\lab12oop\lab12oop\HKVFiles", @"C:\BSTU\SEM3\OOP\lab12oop\lab12oop\HKVInspect\HKVFiles");
            else
                Directory.Delete(@"C:\BSTU\SEM3\OOP\lab12oop\lab12oop\HKVFiles", true);
        }

        public static void CreateArchive(string dir)
        {
            string name = @"C:\BSTU\SEM3\OOP\lab12oop\lab12oop\HKVInspect\HKVFiles";
            if (new DirectoryInfo(@"C:\BSTU\SEM3\OOP\lab12oop\lab12oop\HKVInspect").GetFiles("*.zip").Length == 0)
            {
                ZipFile.CreateFromDirectory(name, name + ".zip");
                DirectoryInfo direct = new DirectoryInfo(dir);
                foreach (var innerFile in direct.GetFiles())
                    innerFile.Delete();
                direct.Delete();
                ZipFile.ExtractToDirectory(name + ".zip", dir);
            }
        }
    }
}