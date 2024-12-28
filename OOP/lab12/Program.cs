using System;

namespace Lab12
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                Console.WriteLine("*****************************************************************************************************");
                HKVDiskInfo.WriteDiskInfo("C:\\");
                HKVLog.WriteInLog("HKVDiskInfo.getFreeDrivesSpace()");

                Console.WriteLine("******************************************************************************************************");
                HKVFileInfo.WriteFileInfo(@"C:\BSTU\SEM3\OOP\lab12oop\12_Потоки_файловая система.pdf");
                HKVLog.WriteInLog("HKVFileInfo.WriteFileInfo()", "HKVLogfile.txt", @"C:\BSTU\SEM3\OOP\lab12oop\lab12oop\HKVLogfile.txt");

                Console.WriteLine("******************************************************************************************************");
                HKVDirInfo.WriteDirInfo(@"C:\BSTU\SEM3\OOP");
                HKVLog.WriteInLog("HKVDirInfo.WriteDirInfo()", @"C:\BSTU\SEM3\OOP");

                HKVFileManager.InspectDriver("C:\\");
                HKVLog.WriteInLog("HKVFileManager.InspectDriver()", "C:\\");
                HKVFileManager.CopyFiles(@"C:\BSTU\SEM3\KPO", ".docx");
                HKVLog.WriteInLog("HKVFileManager.CopyFiles()", @"C:\BSTU\SEM3\KPO");
                HKVFileManager.CreateArchive(@"C:\BSTU\SEM3\OOP\lab12oop\lab12oop\HKVARCHIVE");
                HKVLog.WriteInLog(" HKVFileManager.CreateArchive()");

                HKVLog.FindInfo();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}