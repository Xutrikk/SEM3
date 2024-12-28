using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;

class Program
{
    static void Main()
    {/*2.Создайте универсальную  коллекцию в соответствии с вариантом задания и заполнить ее данными встроенного типа .Net (int, char,…).  
      a.Выведите коллекцию на консоль
      b.Удалите из коллекции n последовательных элементов 
      c.Добавьте другие элементы (используйте все возможные методы добавления для вашего типа коллекции). 
      d.Создайте вторую коллекцию (из таблицы выберите другой тип коллекции) и заполните ее данными из первой коллекции. 
      e.Выведите вторую коллекцию на консоль. В случае не совпадения количества параметров (например, LinkedList<T> и Dictionary<Tkey, TValue>), 
      при нехватке  - генерируйте ключи, в случае избыточности – оставляйте TValue.*/
        ConcurrentDictionary<int, string> internetResources = new ConcurrentDictionary<int, string>();
        internetResources.TryAdd(1, "https://example.com");
        internetResources.TryAdd(2, "https://openai.com");
        internetResources.TryAdd(3, "https://microsoft.com");

        Console.WriteLine("Коллекция ConcurrentDictionary:");
        foreach (var kvp in internetResources)
        {
            Console.WriteLine($"Key: {kvp.Key}, Value: {kvp.Value}");
        }

        internetResources.TryRemove(2, out _);

        Console.WriteLine("\nПосле удаления элемента с ключом 2:");
        foreach (var kvp in internetResources)
        {
            Console.WriteLine($"Key: {kvp.Key}, Value: {kvp.Value}");
        }

        internetResources.TryAdd(4, "https://github.com");
        internetResources[5] = "https://google.com";

        Console.WriteLine("\nПосле добавления новых элементов:");
        foreach (var kvp in internetResources)
        {
            Console.WriteLine($"Key: {kvp.Key}, Value: {kvp.Value}");
        }

        List<string> secondCollection = new List<string>();
        foreach (var kvp in internetResources)
        {
            secondCollection.Add(kvp.Value);
        }

        Console.WriteLine("\nВторая коллекция List<string>:");
        foreach (var resource in secondCollection)
        {
            Console.WriteLine(resource);
        }

        string searchValue = "https://google.com";
        bool found = secondCollection.Contains(searchValue);
        Console.WriteLine($"\nНайдено ли значение \"{searchValue}\"? {found}");

        //3.Создайте объект наблюдаемой коллекции ObservableCollection<T>. Создайте произвольный метод и зарегистрируйте его  на событие CollectionChange.
        //Напишите демонстрацию с добавлением и удалением элементов.В качестве типа T используйте свой класс из таблицы.
        var observableCollection = new System.Collections.ObjectModel.ObservableCollection<string>();
        observableCollection.CollectionChanged += ObservableCollection_CollectionChanged;

        observableCollection.Add("https://example.com");
        observableCollection.Add("https://openai.com");
        observableCollection.Remove("https://openai.com");
    }

    private static void ObservableCollection_CollectionChanged(object sender, System.Collections.Specialized.NotifyCollectionChangedEventArgs e)
    {
        Console.WriteLine("\nИзменение в ObservableCollection:");

        if (e.Action == System.Collections.Specialized.NotifyCollectionChangedAction.Add)
        {
            var addedItems = e.NewItems.Cast<string>();
            Console.WriteLine($"Добавлены элементы: {string.Join(", ", addedItems)}");
        }
        else if (e.Action == System.Collections.Specialized.NotifyCollectionChangedAction.Remove)
        {
            var removedItems = e.OldItems.Cast<string>();
            Console.WriteLine($"Удалены элементы: {string.Join(", ", removedItems)}");
        }
    }
}