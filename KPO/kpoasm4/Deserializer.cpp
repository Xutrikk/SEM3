#include <iostream>
#include <fstream>
#include <string>
#include <cstdint>
#include <cstring>

#pragma pack(push, 1)
struct MetaData {
    char type[10];
    uint32_t size;
    char data[20];
};
#pragma pack(pop)
//
//struct Data {
//    wchar_t CH;
//    int in;
//};

int main() {
    setlocale(LC_ALL, "ru");


//    // Десериализация из файла и запись в файл .asm
//    std::ifstream inFile("C:\\Users\\user\\Desktop\\VS\\кпо\\SE\\SE_ASM4\\Serializer\\serialized_data.txt", std::ios::binary);
//    if (!inFile) {
//        std::cerr << "Ошибка открытия файла для чтения.\n";
//        return 1;
//    }
//
//    std::ofstream asmFile("deserialized_data.asm");
//    if (!asmFile) {
//        std::cerr << "Ошибка открытия файла для записи ассемблерного кода.\n";
//        return 1;
//    }
//
//    asmFile << ".data\n";
//
//    while (inFile.peek() != EOF) {
//        // Чтение типа данных
//        char type[20] = { 0 };
//        inFile.getline(type, sizeof(type), '\0');
//
//        // Чтение размера
//        uint32_t size;
//        inFile.read(reinterpret_cast<char*>(&size), sizeof(size));
//
//        // Чтение значения
//        if (strcmp(type, "wchar_t") == 0) {
//            wchar_t value;
//            inFile.read(reinterpret_cast<char*>(&value), sizeof(value));
//            asmFile << "wideChar DW 0" << std::hex << value << "h ; Тип: wchar_t\n";
//        }
//        else if (strcmp(type, "int32_t") == 0) {
//            int value;
//            inFile.read(reinterpret_cast<char*>(&value), sizeof(value));
//            asmFile << "integer DD " << std::dec << value << " ; Тип: int32_t\n";
//        }
//    }
//
//    inFile.close();
//    asmFile.close();
//
//    std::cout << "Десериализация завершена. Ассемблерный код сохранён в deserialized_data.asm\n";
//    return 0;
//}
//
//

    // Открытие файла для чтения
    std::ifstream inFile("C:\\BSTU\\SEM3\\KPO\\SE_ASM4\\Serializer\\serialized_data.bin", std::ios::binary);
    if (!inFile) {
        std::cerr << "Ошибка открытия файла для чтения.\n";
        return 1;
    }

    // Открытие файла для записи ассемблерного кода
    std::ofstream asmFile("deserialized_data.asm");
    if (!asmFile) {
        std::cerr << "Ошибка открытия файла для записи ассемблерного кода.\n";
        return 1;
    }

    asmFile << ".data\n"; // Начало секции данных

    MetaData meta;
    while (inFile.read(reinterpret_cast<char*>(&meta), sizeof(meta))) {
        asmFile << "; Тип данных: " << meta.type << "\n";
        if (strcmp(meta.type, "unsigned") == 0) {
            unsigned int uchar;
            asmFile << "uchar DWORD ";
            std::memcpy(&uchar, meta.data, sizeof(int));

            asmFile << std::dec << uchar;
            asmFile << "\n";
            //asmFile << "wideChar DW " << wideChar << "h\n"; // Записываем в HEX
        }
        else if (strcmp(meta.type, "long") == 0) {
            long intlong;
            std::memcpy(&intlong, meta.data, sizeof(long));
            asmFile << "intlong DWORD " << std::dec << intlong << "\n";
        }
        else {
            asmFile << "; Неизвестный тип данных\n";
        }
        //Data data;
        //inFile.read(reinterpret_cast<char*>(&data.CH), sizeof(data.CH));
        //inFile.read(reinterpret_cast<char*>(&data.in), sizeof(data.in));
        //asmFile << "wideChar DW \"" << data.CH << "\", 0\n"; // Записываем в HEX
        //asmFile << "integer DD " << data.in << "\n";
    }

    asmFile.close();
    inFile.close();
    std::cout << "Десериализация завершена. Ассемблерный код сохранён в deserialized_data.asm\n";
    return 0;
}
