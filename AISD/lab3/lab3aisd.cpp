#include <iostream>  
#define V 9  

using namespace std;
//dist[] — массив с текущими минимальными расстояниями до всех вершин.
//sptSet[] — булев массив, который отслеживает, включена ли вершина в дерево кратчайших путей(Shortest Path Tree).
// Функция для нахождения вершины с минимальным расстоянием, которая ещё не включена в кратчайший путь
int minDistance(int dist[], bool sptSet[])
{
    int min = INT_MAX, min_index;

    for (int v = 0; v < V; v++)
    {
        // Если вершина ещё не включена в кратчайший путь и её расстояние меньше текущего минимума
        if (sptSet[v] == false && dist[v] <= min)
        {
            min = dist[v];
            min_index = v;
        }
    }
    return min_index;
}


void printSolution(int dist[])
{
    char str[9] = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I' };


    for (int i = 0; i < V; i++)
    {
        cout << "До вершины " << str[i] << " -- " << dist[i] << endl;
    }
}

// Функция для реализации алгоритма Дейкстры для нахождения кратчайших путей от исходной вершины
void dijkstra(int graph[V][V], int src)
{
    int dist[V];
    bool sptSet[V];


    for (int i = 0; i < V; i++)
    {
        dist[i] = INT_MAX;
        sptSet[i] = false;
    }

    dist[src] = 0;


    for (int count = 0; count < V - 1; count++)
    {

        int u = minDistance(dist, sptSet);
        sptSet[u] = true;


        for (int v = 0; v < V; v++)
        {
            // Обновляем расстояние dist[v], если:
            // - вершина v еще не включена в кратчайший путь
            // - существует ребро между u и v (graph[u][v] != 0)
            // - текущее расстояние до вершины u не является бесконечным
            // - новое рассчитанное расстояние до v через u меньше текущего расстояния до v
            if (!sptSet[v] && graph[u][v] && dist[u] != INT_MAX && dist[u] + graph[u][v] < dist[v])
            {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }

    printSolution(dist);
}


int main()
{
    int dot;
    setlocale(LC_ALL, "rus");


    int graph[V][V] =
    {
        //A  B  C   D  E  F  G  H  I
         {0, 7, 10, 0, 0, 0, 0, 0, 0},  //A 
         {7, 0, 0, 0, 0, 9, 27, 0, 0},  //B
         {10, 0, 0, 0, 31, 8, 0, 0, 0}, //C
         {0, 0, 0, 0, 32, 0, 0, 17, 21},//D
         {0, 0, 31, 32, 0, 0, 0, 0, 0}, //E
         {0, 9, 8, 0, 0, 0, 0, 11, 0},  //F
         {0, 27, 0, 0, 0, 0, 0, 0, 15}, //G
         {0, 0, 0, 17, 0, 11, 0, 0, 15},// H
         {0, 0, 0, 21, 0, 0, 15, 15, 0},// I
    };


    do
    {
        cout << "введите номер вершины\n";
        cout << "A - 0, B - 1, C - 2, D - 3, E - 4, F - 5, G - 6, H - 7, I - 8" << endl;
        cin >> dot;
    } while (dot < 0 || dot > 8);

    dijkstra(graph, dot);
    cout << "В этой реализации используется простой линейный поиск, из-за чего сложность остается O(n^2 + m),n-кол-во операций,m-кол-во" << endl;
    return 0;
}