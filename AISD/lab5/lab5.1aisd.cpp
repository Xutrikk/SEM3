
#include <Windows.h>
#include <iostream>
using namespace std;

const int V = 8;
const int INF = 9999;
const int NO = 0;

int visited[V];
int Matrix[V][V] = {
    {NO, 2, NO, 8, 2, NO, NO, NO},
    {2, NO, 3, 10, 5, NO, NO, NO},
    {NO, 3, NO, NO, 12, NO, NO, 7},
    {8, 10, NO, NO, 14, 3, 1, NO},
    {2, 5, 12, 14, NO, 11, 4, 8},
    {NO, NO, NO, 3, 11, NO, 6, NO},
    {NO, NO, NO, 1, 4, 6, NO, 9},
    {NO, NO, 7, NO, 8, NO, 9, NO}
};

void Kraskl();
int findConnectedComponent(int vertexIndex);
void unionComponents(int i, int j);

int main()
{
    SetConsoleCP(1251);
    SetConsoleOutputCP(1251);
    Kraskl();
}

void Kraskl()
{
    int min;
    int edgesCount = 0;
    for (int i = 0; i < V; i++)
    {
        visited[i] = i;
    }

    while (edgesCount < V - 1)
    {
        min = INF;
        int a = INF, b = INF;
        for (int i = 0; i < V; i++)
        {
            for (int j = 0; j < V; j++)
            {
                if (findConnectedComponent(i) != findConnectedComponent(j) && Matrix[i][j] < min && Matrix[i][j] != NO)
                {
                    min = Matrix[i][j];
                    a = i;
                    b = j;
                }
            }
        }
        unionComponents(a, b);
        edgesCount++;
        cout << a + 1 << " --- " << b + 1 << " == " << min << endl;
    }
}

int findConnectedComponent(int z)
{
    while (visited[z] != z)
    {
        z = visited[z];
    }
    return z;
}

void unionComponents(int i, int j)
{
    int a = findConnectedComponent(i);
    int b = findConnectedComponent(j);
    visited[a] = b;
}
