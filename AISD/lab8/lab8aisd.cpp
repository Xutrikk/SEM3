#include<stdio.h>
#include<stdlib.h>
#include <iostream>

using namespace std;

typedef struct items
{
    char name[20];
    unsigned int weight;
    float profit;
};

float max(float a, float b)
{
    return ((a > b) ? a : b);
}

float knapsack(unsigned int n, struct items object[], unsigned int capacity)
{
    float** table = new float* [n + 1];

    for (unsigned int i = 0; i <= n; i++)
    {
        table[i] = new float[capacity + 1];
        for (unsigned int j = 0; j <= capacity; j++)
        {

            if (i == 0 || j == 0) //(предметы еще не рассматриваются)(рюкзак еще не имеет емкости).
                table[i][j] = 0.0;
            else if (object[i - 1].weight <= j) // Если рассматриваемый предмет может поместиться в рюкзак с текущей емкостью.
                table[i][j] = max((object[i - 1].profit + table[i - 1][j - object[i - 1].weight]), table[i - 1][j]); //Заполняет текущую ячейку максимальной прибылью, которую можно получить с учетом или без учета текущего предмета.
            else //Если рассматриваемый предмет не помещается в рюкзак, копирует значение из ячейки выше (без учета текущего предмета).
                table[i][j] = table[i - 1][j];
        }
    }


    int i = n; //конец списка предметов.
    int j = capacity; //емкость рюкзака.

    cout << "\nПредметы и их цена: \n\n";

    while (i > 0 && j > 0)
    {
        //Если текущий предмет был выбран (значение в текущей ячейке не совпадает с значением в ячейке выше).
        if (table[i][j] != table[i - 1][j])
        {
            cout << object[i - 1].name << " " << object[i - 1].profit << endl;
            j -= object[i - 1].weight; //Уменьшает оставшуюся емкость рюкзака на вес выбранного предмета.
        }

        i--;
    }

    cout << endl;
    system("pause");
    return table[n][capacity];
}

void main()
{
    setlocale(LC_ALL, "rus");
    unsigned int capacity;
    using namespace std;
    cout << "Введите объем рюкзака:";
    cin >> capacity;

    unsigned int n;
    cout << "Введите общее количество элементов:";
    cin >> n;


    items* item = new items[n];

    printf("Введите запрашиваемые данные:\n");
    for (unsigned int i = 0; i < n; i++)
    {
        printf("------------------- %d -------------------\n", i + 1);
        printf("Имя : ");
        cin >> item[i].name;

        cout << "Вес: ";
        cin >> item[i].weight;

        cout << "Цена: ";
        cin >> item[i].profit;
    }

    float max_profit = knapsack(n, item, capacity);
}