#include<iostream>  
#include <string>  
#include <queue>  
#include <unordered_map> 
using namespace std;  

// Структура для представления узла дерева Хаффмана
struct Node
{
    char ch;  
    int freq;  
    Node* left, * right;  
};

// Функция для создания нового узла
Node* getNode(char ch, int freq, Node* left, Node* right)
{
    // Выделяем память под новый узел
    Node* node = new Node();

    // Присваиваем значения атрибутам узла
    node->ch = ch;  
    node->freq = freq;  
    node->left = left;  
    node->right = right;  

    return node;  
}

// Структура для сравнения узлов в приоритетной очереди
struct comp
{
    // Функция сравнения узлов по частоте
    bool operator()(Node* l, Node* r)
    {
        return l->freq > r->freq;  
    }
};

// Рекурсивная функция для кодирования символов с помощью дерева Хаффмана
void encode(Node* root, string str, unordered_map<char, string>& huffmanCode)
{
    if (root == nullptr)  
        return;

    if (!root->left && !root->right)
        huffmanCode[root->ch] = str;  

    
    encode(root->left, str + "0", huffmanCode);

    encode(root->right, str + "1", huffmanCode);
}

// Рекурсивная функция для декодирования строки с помощью дерева Хаффмана
void decode(Node* root, int& index, string str)
{
    if (root == nullptr)  
    {
        return;
    }


    if (!root->left && !root->right)
    {
        cout << root->ch;  
        return;
    }

    index++;  

   
    if (str[index] == '0')
        decode(root->left, index, str);

   
    else
        decode(root->right, index, str);
}

// Функция для построения дерева Хаффмана и кодирования строки
void buildHuffmanTree(string text)
{
    // Хэш-таблица для хранения частоты каждого символа
    unordered_map<char, int> freq;

    
    for (char ch : text)
    {
        freq[ch]++; 
    }

    // Приоритетная очередь для узлов дерева Хаффмана, сортированная по частоте
    priority_queue<Node*, vector<Node*>, comp> pq;

    // Создаем листовые узлы для каждого символа и добавляем их в очередь
    for (auto pair : freq)
    {
        pq.push(getNode(pair.first, pair.second, nullptr, nullptr)); 
    }

  
    cout << "Частота символов" << endl;
    for (auto pair : freq)
    {
        cout << pair.first << " " << pair.second << endl;  
    }

    // Строим дерево Хаффмана, объединяя узлы с наименьшей частотой
    while (pq.size() != 1)
    {
        Node* left = pq.top(); pq.pop();  // Извлекаем узел с минимальной частотой
        Node* right = pq.top(); pq.pop();  // Извлекаем второй узел с минимальной частотой

        // Создаем новый узел с суммарной частотой двух узлов
        int sum = left->freq + right->freq;
        pq.push(getNode('\0', sum, left, right));  // Новый узел не имеет символа (пустой)
    }

  
    Node* root = pq.top();

    // Хэш-таблица для хранения кодов Хаффмана для каждого символа
    unordered_map<char, string> huffmanCode;

    // Генерируем коды Хаффмана для каждого символа
    encode(root, "", huffmanCode);

    
    cout << "Коды Хаффмана :\n" << '\n';
    for (auto pair : huffmanCode)
    {
        cout << "Символ: '" << pair.first << "' Код: " << pair.second << '\n';  
    }

   
    cout << "\nИсходная строка :\n" << text << '\n';

    // Кодируем строку с помощью кодов Хаффмана
    string str = "";
    for (char ch : text)
    {
        str += huffmanCode[ch];  // Добавляем код символа в итоговую строку
    }

   
    cout << "\nЗакодированная строка :\n" << str << '\n';

    int index = -1;

   
    cout << "\nДекодированная строка: \n";
    while (index < (int)str.size() - 2)
    {
        decode(root, index, str);  
    }
}

int main()
{
    setlocale(LC_ALL, "RU");  

    string text = "Трек дерево";  

    buildHuffmanTree(text);  

    return 0;  
}
