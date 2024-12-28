#include <vector>
#include <iostream>
#include <algorithm>
#include <limits.h>
#include <cstdlib>
#include <ctime>
#include <string>

using namespace std;

#define V 8 // Максимальное количество городов (можно изменить для большего масштаба)
int currentV = 8; // Текущее количество городов
double mutationRate = 0.1; // Показатель мутации (по умолчанию)

int cities[V][V] = {
    { INT_MAX, 2, 4, 3, 2, 10, 5, 9 },
    { 5, INT_MAX, 17, 30, 25, 15, 2, 10 },
    { 9, 15, INT_MAX, 6, 1, 20, 3, 2 },
    { 9, 5, 4, INT_MAX, 6, 10, 5, 9 },
    { 2, 8, 7, 10, INT_MAX, 5, 20, 1 },
    { 10, 5, 2, 10, 15, INT_MAX, 7, 3 },
    { 5, 2, 3, 5, 2, 1, INT_MAX, 6 },
    { 9, 10, 2, 9, 10, 3, 6, INT_MAX }
};

struct individual {
    string gnome;
    int fitness;
};

int populationSize;  // Размер популяции
int child;           // Количество потомков
int evoCount;        // Количество эволюций

int rand_num(int start, int end) {
    return start + rand() % (end - start);
}

bool repeat(string s, char ch) {
    return s.find(ch) != string::npos;
}

string mutatedGene(string gnome) {
    if (static_cast<double>(rand()) / RAND_MAX <= mutationRate) {
        while (true) {
            int r = rand_num(1, currentV);
            int r1 = rand_num(1, currentV);
            if (r1 != r) {
                swap(gnome[r], gnome[r1]);
                break;
            }
        }
    }
    return gnome;
}

string create_gnome() {
    string gnome = "0";
    while (gnome.size() < currentV) {
        int temp = rand_num(1, currentV);
        if (!repeat(gnome, temp + '0')) {
            gnome += (temp + '0');
        }
    }
    gnome += gnome[0];
    return gnome;
}

int cal_fitness(string gnome) {
    int f = 0;
    for (int i = 0; i < gnome.size() - 1; i++) {
        int from = gnome[i] - '0';
        int to = gnome[i + 1] - '0';
        if (cities[from][to] == INT_MAX) return INT_MAX;
        f += cities[from][to];
    }
    return f;
}

int cooldown(int temp) {
    return (90 * temp) / 100;
}

bool lessthan(struct individual t1, struct individual t2) {
    return t1.fitness < t2.fitness;
}

void editGraph() {
    int choice;
    do {
        cout << "\nМеню редактирования графа:\n";
        cout << "1. Добавить город\n";
        cout << "2. Удалить город\n";
        cout << "3. Добавить дорогу\n";
        cout << "4. Удалить дорогу\n";
        cout << "5. Вернуться в главное меню\n";
        cout << "Ваш выбор: ";
        cin >> choice;

        switch (choice) {
        case 1:
            if (currentV >= V) {
                cout << "Невозможно добавить больше городов (достигнут максимум).\n";
            }
            else {
                currentV++;
                for (int i = 0; i < currentV; i++) {
                    cities[i][currentV - 1] = cities[currentV - 1][i] = INT_MAX;
                }
                cout << "Город добавлен. Теперь городов: " << currentV << ".\n";
            }
            break;

        case 2:
            if (currentV <= 2) {
                cout << "Невозможно удалить больше городов.\n";
            }
            else {
                currentV--;
                cout << "Город удалён. Теперь городов: " << currentV << ".\n";
            }
            break;

        case 3: {
            int from, to, weight;
            cout << "Введите начальный город, конечный город и расстояние: ";
            cin >> from >> to >> weight;
            if (from < currentV && to < currentV) {
                cities[from][to] = cities[to][from] = weight;
                cout << "Дорога добавлена.\n";
            }
            else {
                cout << "Неверные номера городов.\n";
            }
            break;
        }

        case 4: {
            int from, to;
            cout << "Введите начальный и конечный города: ";
            cin >> from >> to;
            if (from < currentV && to < currentV) {
                cities[from][to] = cities[to][from] = INT_MAX;
                cout << "Дорога удалена.\n";
            }
            else {
                cout << "Неверные номера городов.\n";
            }
            break;
        }

        case 5:
            cout << "Возврат в главное меню.\n";
            break;

        default:
            cout << "Неверный выбор.\n";
        }
    } while (choice != 5);
}

void Genetic_algo() {
    vector<individual> population;
    for (int i = 0; i < populationSize; i++) {
        individual temp;
        temp.gnome = create_gnome();
        temp.fitness = cal_fitness(temp.gnome);
        population.push_back(temp);
    }

    int gen = 1;
    int diap = 10000;

    while (gen <= evoCount) {
        // Сортируем популяцию по фитнесу
        sort(population.begin(), population.end(), lessthan);

        // Выводим все особи в текущем поколении
        cout << "\nПоколение " << gen << ":\n";
        for (const auto& ind : population) {
            cout << "Маршрут: " << ind.gnome << " | Длина: " << ind.fitness << "\n";
        }

        // Выводим лучший маршрут
        cout << "\nЛучший маршрут в поколении " << gen << ": " << population[0].gnome
            << " | Длина: " << population[0].fitness << "\n";

        vector<individual> new_population;
        for (int i = 0; i < child; i++) {
            string new_gnome = mutatedGene(population[i].gnome);
            individual new_ind;
            new_ind.gnome = new_gnome;
            new_ind.fitness = cal_fitness(new_gnome);
            new_population.push_back(new_ind);
        }

        diap = cooldown(diap);
        for (const auto& ind : new_population) {
            population.push_back(ind);
        }

        sort(population.begin(), population.end(), lessthan);
        population.resize(populationSize);
        gen++;
    }

    // Выводим окончательный оптимальный маршрут
    cout << "\nОптимальный маршрут: " << population[0].gnome
        << " | Длина маршрута: " << population[0].fitness << "\n";
}


int main() {
    setlocale(LC_ALL, "Russian");
    srand(time(0));
    do {
        cout << "Введите размер популяции: ";
        cin >> populationSize;
    } while (populationSize <= 0);

    do {
        cout << "Введите количество потомков: ";
        cin >> child;
    } while (child <= 0);

    do {
        cout << "Введите количество эволюций: ";
        cin >> evoCount;
    } while (evoCount <= 0);

    cout << "Введите показатель мутации (от 0 до 1): ";
    cin >> mutationRate;
    if (mutationRate < 0 || mutationRate > 1) {
        cout << "Неверное значение для показателя мутации.\n";
        return 1;
    }

    int choice;
    do {
        cout << "\nМеню:\n";
        cout << "1. Редактировать граф\n";
        cout << "2. Запустить генетический алгоритм\n";
        cout << "3. Выйти\n";
        cout << "Ваш выбор: ";
        cin >> choice;

        switch (choice) {
        case 1:
            editGraph();
            break;
        case 2:
            Genetic_algo();
            break;
        case 3:
            cout << "Завершение программы.\n";
            break;
        default:
            cout << "Неверный выбор.\n";
        }
    } while (choice != 3);

    return 0;
}
