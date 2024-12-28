//#include <iostream>
//#include <fstream>
//#include <string>
//#include <cstdint>
//
//// Структура для данных, которые необходимо сериализовать
//struct Data {
//    wchar_t wideChar;  // Символ wchar_t
//    int integer;       // Целое число (int)
//};
//
//int main() {
//    setlocale(LC_ALL, "ru");
//
//    // Определение данных для сериализации
//    Data data = { L'R', 167 }; // Символ wchar_t и целое число
//
//    // Открытие файла для записи
//    std::ofstream outFile("serialized_data.txt", std::ios::binary);
//    if (!outFile) {
//        std::cerr << "Ошибка открытия файла для записи.\n";
//        return 1;
//    }
//
//    // Сериализация wchar_t
//    std::string wcharType = "wchar_t";
//    uint32_t wcharSize = sizeof(data.wideChar);
//    outFile.write(wcharType.c_str(), wcharType.size() + 1); // +1 для записи '\0'
//    outFile.write(reinterpret_cast<const char*>(&wcharSize), sizeof(wcharSize));
//    outFile.write(reinterpret_cast<const char*>(&data.wideChar), sizeof(data.wideChar));
//
//    // Сериализация int
//    std::string intType = "int32_t";
//    uint32_t intSize = sizeof(data.integer);
//    outFile.write(intType.c_str(), intType.size() + 1); // +1 для записи '\0'
//    outFile.write(reinterpret_cast<const char*>(&intSize), sizeof(intSize));
//    outFile.write(reinterpret_cast<const char*>(&data.integer), sizeof(data.integer));
//
//    outFile.close();
//    std::cout << "Сериализация завершена. Данные сохранены в serialized_data.bin\n";
//    return 0;
//}






#include <iostream>
#include <fstream>
#include <string>
#include <cstring>
#include <cstdint>

//Устанавливает выравнивание на 1 байт, убирая дополнительные байты выравнивания.
#pragma pack(push, 1) // Упаковать структуру без выравнивания
struct MetaData {
    char type[10];     // Тип данных
    uint32_t size;     // Размер данных в байтах
    char data[20];     // Сериализованные данные
};

//struct Data {
//    wchar_t CH;
//    int in;
//};
//Возвращает настройки выравнивания к значениям, которые были до вызова push.
#pragma pack(pop)

int main() {
    setlocale(LC_ALL, "ru");

    // Исходные данные
    unsigned int uchar = 541 ;          
    long intlong = 54453;

    // Открытие файла для записи
    std::ofstream outFile("serialized_data.bin", std::ios::binary);
    if (!outFile) {
        std::cerr << "Ошибка открытия файла для записи.\n";
        return 1;
    }

    //outFile.write(reinterpret_cast<const char*>(&data.CH),sizeof(data.CH));
    //outFile.write(reinterpret_cast<const char*>(&data.in),sizeof(data.in));

    // Сериализация unsigned char
    MetaData wcharMeta;
    strcpy_s(wcharMeta.type, "unsigned");
    wcharMeta.size = sizeof(uchar);
    std::memcpy(wcharMeta.data, &uchar, sizeof(uchar));
    outFile.write(reinterpret_cast<char*>(&wcharMeta), sizeof(wcharMeta));

    // Сериализация int32_t
    MetaData intMeta;
    strcpy_s(intMeta.type, "long");
    intMeta.size = sizeof(intlong);
    std::memcpy(intMeta.data, &intlong, sizeof(intlong));
    outFile.write(reinterpret_cast<char*>(&intMeta), sizeof(intMeta));

    outFile.close();
    std::cout << "Сериализация завершена. Данные сохранены в serialized_data.bin\n";
    return 0;
}
