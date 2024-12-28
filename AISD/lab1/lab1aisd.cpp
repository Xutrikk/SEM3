#include <iostream>
#include <ctime>  

using namespace std;


int steps = 0;

void hanoi(int N, int source, int target, int auxiliary) {
    if (N == 1) {
        cout << "Переместить диск 1 со стержня " << source << " на стержень " << target << endl;
        steps++;  
        return;
    }
    hanoi(N - 1, source, auxiliary, target);
    cout << "Переместить диск " << N << " со стержня " << source << " на стержень " << target << endl;
    steps++;  
    hanoi(N - 1, auxiliary, target, source);
}

int main() {
    setlocale(LC_ALL, "Russian");
    int N;
    int totalRods;
    int source, target, auxiliary;

    cout << "Введите количество дисков N: ";
    cin >> N;
    if (N <= 0) {
        cout << "Ошибка: количество дисков должно быть положительным." << endl;
        return 1;
    }

    cout << "Введите количество стержней (минимум 2): ";
    cin >> totalRods;
    if (totalRods < 2) {
        cout << "Ошибка: количество стержней должно быть не менее 2." << endl;
        return 1;
    }

    cout << "Выберите исходный стержень (1-" << totalRods << "): ";
    cin >> source;
    if (source < 1 || source > totalRods) {
        cout << "Ошибка: выбранный исходный стержень должен быть в диапазоне от 1 до " << totalRods << "." << endl;
        return 1;
    }

    cout << "Выберите целевой стержень (1-" << totalRods << "): ";
    cin >> target;
    if (target < 1 || target > totalRods || target == source) {
        cout << "Ошибка: выбранный целевой стержень должен быть в диапазоне от 1 до " << totalRods << " и не совпадать с исходным." << endl;
        return 1;
    }

  
    clock_t start_time = clock();

    if (totalRods == 2) {
        
        if (N == 1) {
            cout << "Переместить диск 1 со стержня " << source << " на стержень " << target << endl;
            steps++;
        }
        else {
            cout << "Невозможно решить задачу Ханойских башен для N > 1 с двумя стержнями." << endl;
        }
    }
    else {
      
        cout << "Выберите вспомогательный стержень (1-" << totalRods << "): ";
        cin >> auxiliary;
        if (auxiliary < 1 || auxiliary > totalRods || auxiliary == source || auxiliary == target) {
            cout << "Ошибка: выбранный вспомогательный стержень должен быть в диапазоне от 1 до " << totalRods << " и не совпадать с исходным или целевым." << endl;
            return 1;
        }

       
        hanoi(N, source, target, auxiliary);
    }

  
    clock_t end_time = clock();
    double time_taken = double(end_time - start_time) / CLOCKS_PER_SEC;

    cout << "Общее количество шагов: " << steps << endl;
    cout << "Время выполнения: " << time_taken << " секунд" << endl;

    return 0;
}
