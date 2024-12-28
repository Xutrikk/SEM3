#include <iostream>
#include <vector>
#include <algorithm>
#include <random>
#include <ctime>
using namespace std;
// Функция для генерации случайного распределения номеров в коробках
vector<int> generateBoxArrangement() {
    vector<int> boxes(100);
    for (int i = 0; i < 100; ++i) {
        boxes[i] = i + 1;
    }
    shuffle(boxes.begin(), boxes.end(), mt19937(random_device()()));
    return boxes;
}

// Случайный выбор коробок заключённым
bool randomStrategy(const vector<int>& boxes, int prisoner) {
    vector<int> openedBoxes;
    for (int i = 0; i < 50; ++i) {
        int randomBox;
        do {
            randomBox = rand() % 100;
        } while (find(openedBoxes.begin(), openedBoxes.end(), randomBox) != openedBoxes.end());

        openedBoxes.push_back(randomBox);
        if (boxes[randomBox] == prisoner) {
            return true;
        }
    }
    return false;
}

// Алгоритм цикла (по содержимому коробок)
bool loopStrategy(const vector<int>& boxes, int prisoner) {
    int currentBox = prisoner - 1; // Номер коробки, с которой начнёт заключённый
    for (int i = 0; i < 50; ++i) {
        if (boxes[currentBox] == prisoner) {
            return true;
        }
        currentBox = boxes[currentBox] - 1; // Следующая коробка основывается на содержимом текущей
    }
    return false;
}

// Симуляция задачи для двух алгоритмов
void simulatePrisonerProblem(int rounds) {
    int randomSuccess = 0;
    int loopSuccess = 0;

    for (int i = 0; i < rounds; ++i) {
        vector<int> boxes = generateBoxArrangement();

        // Проверка случайной стратегии
        bool randomAllSucceeded = true;
        for (int prisoner = 1; prisoner <= 100; ++prisoner) {
            if (!randomStrategy(boxes, prisoner)) {
                randomAllSucceeded = false;
                break;
            }
        }
        if (randomAllSucceeded) {
            ++randomSuccess;
        }

        // Проверка стратегии цикла
        bool loopAllSucceeded = true;
        for (int prisoner = 1; prisoner <= 100; ++prisoner) {
            if (!loopStrategy(boxes, prisoner)) {
                loopAllSucceeded = false;
                break;
            }
        }
        if (loopAllSucceeded) {
            ++loopSuccess;
        }
    }

    // Вывод результатов
    cout << "\nРезультаты симуляции:\n";
    cout << "Случайная стратегия: " << randomSuccess << " успешных исходов из " << rounds << "\n";
    cout << "Стратегия цикла: " << loopSuccess << " успешных исходов из " << rounds << "\n";
}

int main() {
    setlocale(LC_ALL, "Russian");
    srand(static_cast<unsigned>(time(nullptr)));

    int rounds;
    cout << "Введите количество раундов симуляции: ";
    cin >> rounds;

    simulatePrisonerProblem(rounds);

    return 0;
}
