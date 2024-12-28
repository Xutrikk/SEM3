#include<iostream>           
#include <vector>            
#include <string>            

using namespace std;         

// Функция для нахождения наибольшей возрастающей подпоследовательности
void findLIS(vector<int> const& arr)
{
    int n = arr.size();  

    if (n == 0) {       
        return;          
    }

    // Создаем вектор векторов для хранения LIS для каждого элемента
    vector<vector<int>> LIS(n, vector<int>{});

    // Инициализируем первую подпоследовательность, добавляем первый элемент массива
    LIS[0].push_back(arr[0]);

    // Внешний цикл проходит по каждому элементу массива, начиная со второго
    for (int i = 1; i < n; i++)
    {
        // Вложенный цикл сравнивает текущий элемент с предыдущими
        for (int j = 0; j < i; j++)
        {
            // Проверяем, если предыдущий элемент меньше текущего и длина LIS[j] больше, чем у LIS[i]
            if (arr[j] < arr[i] && LIS[j].size() > LIS[i].size())
            {
                LIS[i] = LIS[j];  // Если условие выполняется, обновляем LIS[i], копируя LIS[j]
            }
        }
        LIS[i].push_back(arr[i]);  // Добавляем текущий элемент в LIS[i]
    }

    cout << "Длина: " << LIS[LIS.size() - 1].size() << endl;

   
    cout << "Максимальная возрастающая подпоследовательность: ";
    for (int i : LIS[LIS.size() - 1]) {
        cout << i << " ";  // Поэлементный вывод подпоследовательности
    }
}


int main()
{
    setlocale(LC_ALL, "rus");
    vector<int> arr;           // Вектор для хранения введенной последовательности чисел

    cout << "Введите элементы последовательности (для выхода -0:) ";

    string num;  // Переменная для хранения введённого числа (как строки)
    while (true)
    {
        cin >> num;             // Считываем строку
        if (num == "0") {       
            break;
        }
        arr.push_back(stoi(num));  // Преобразуем строку в число и добавляем в вектор
    }

    cout << "Исходная последовательность: ";
    for (vector<int>::iterator it = arr.begin(); it != arr.end(); ++it)
    {
        cout << *it << " ";  
    }
    cout << endl;

    findLIS(arr); 

    cout << endl << endl;

    return 0;
}