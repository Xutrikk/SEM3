#include <iostream>
#include <vector>
#include <cmath>
#include <cstdlib>
#include <ctime>
#include <algorithm>
#include <limits>

using namespace std;

// Функция для генерации случайной матрицы расстояний
vector<vector<int>> generateDistanceMatrix(int N) {
    vector<vector<int>> distances(N, vector<int>(N));
    srand(time(0)); 
    for (int i = 0; i < N; i++) {
        for (int j = i + 1; j < N; j++) {
            distances[i][j] = distances[j][i] = rand() % 100 + 1;
        }
    }
    return distances; 
}

// Функция для ввода матрицы феромонов
vector<vector<double>> inputPheromoneMatrix(int N) {
    vector<vector<double>> pheromones(N, vector<double>(N, 0.0)); 
    cout << "Введите значения феромонов для каждого ребра (в формате матрицы):\n";
    for (int i = 0; i < N; i++) {
        for (int j = i + 1; j < N; j++) {
            cout << "Феромон от города " << i << " до города " << j << ": ";
            cin >> pheromones[i][j];
            pheromones[j][i] = pheromones[i][j]; 
        }
    }
    return pheromones; 
}

// Функция для вывода матрицы
template <typename T>
void printMatrix(const vector<vector<T>>& matrix) {
    for (const auto& row : matrix) { 
        for (T val : row) {
            cout << val << "\t";
        }
        cout << endl;
    }
}

// Вычисление длины маршрута
double calculateRouteDistance(const vector<int>& route, const vector<vector<int>>& distances) {
    double totalDistance = 0; 
    for (size_t i = 0; i < route.size() - 1; ++i) {
        totalDistance += distances[route[i]][route[i + 1]];
    }
    totalDistance += distances[route.back()][route.front()]; 
    return totalDistance; 
}

// Основной алгоритм муравьиной оптимизации
void antColonyOptimization(int N, vector<vector<int>>& distances, vector<vector<double>>& pheromones,
    double alpha, double beta, int iterations) {
    vector<int> bestRoute; 
    double bestDistance = numeric_limits<double>::infinity(); 

    for (int iter = 0; iter < iterations; ++iter) {
        vector<vector<int>> antRoutes; 
        vector<double> antDistances; 

        for (int ant = 0; ant < N; ++ant) {
            vector<int> route;
            vector<bool> visited(N, false);
            int currentCity = ant; 
            visited[currentCity] = true;
            route.push_back(currentCity);

            while (route.size() < N) {
                vector<double> probabilities(N, 0.0); 
                double sumProbabilities = 0;

                for (int nextCity = 0; nextCity < N; ++nextCity) {
                    if (!visited[nextCity]) { 
                        double pheromone = pow(pheromones[currentCity][nextCity], alpha);
                        double distance = pow(1.0 / distances[currentCity][nextCity], beta);
                        probabilities[nextCity] = pheromone * distance;
                        sumProbabilities += probabilities[nextCity];
                    }
                }

            
                for (int i = 0; i < N; ++i) {
                    probabilities[i] /= sumProbabilities;
                }

                double randValue = ((double)rand() / RAND_MAX);
                double cumulativeProbability = 0;
                int chosenCity = -1;

                for (int nextCity = 0; nextCity < N; ++nextCity) {
                    cumulativeProbability += probabilities[nextCity];
                    if (randValue <= cumulativeProbability) {
                        chosenCity = nextCity;
                        break;
                    }
                }

                visited[chosenCity] = true;
                route.push_back(chosenCity);
                currentCity = chosenCity;
            }

            antRoutes.push_back(route);
            double routeDistance = calculateRouteDistance(route, distances); 
            antDistances.push_back(routeDistance);

            if (routeDistance < bestDistance) {
                bestDistance = routeDistance;
                bestRoute = route;
            }
        }
        for (auto& row : pheromones) {
            for (double& pheromone : row) {
                pheromone *= 0.9; 
            }
        }
        for (size_t ant = 0; ant < antRoutes.size(); ++ant) {
            const auto& route = antRoutes[ant];
            double routeDistance = antDistances[ant];
            for (size_t i = 0; i < route.size() - 1; ++i) {
                int from = route[i];
                int to = route[i + 1];
                pheromones[from][to] += 1.0 / routeDistance;
                pheromones[to][from] += 1.0 / routeDistance;
            }
        }

        cout << "Итерация: " << iter + 1 << endl;
        cout << "Лучший маршрут: ";
        for (int city : bestRoute) {
            cout << city << " ";
        }
        cout << endl;
        cout << "Длина маршрута: " << bestDistance << endl << endl;
    }
}

int main() {
    setlocale(LC_ALL, "Russian");
    int N;
    cout << "Введите количество городов: ";
    cin >> N;

    vector<vector<int>> distances = generateDistanceMatrix(N);
    cout << "Матрица расстояний между городами:\n";
    printMatrix(distances);

    vector<vector<double>> pheromones = inputPheromoneMatrix(N);

    double alpha, beta;
    int iterations;

    cout << "Введите значение альфа: ";
    cin >> alpha;
    cout << "Введите значение бета: ";
    cin >> beta;
    cout << "Введите количество итераций: ";
    cin >> iterations;

    antColonyOptimization(N, distances, pheromones, alpha, beta, iterations);

    return 0;
}
