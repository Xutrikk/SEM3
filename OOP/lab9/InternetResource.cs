using System;
using System.Collections.Generic;
//1)реализуйте указанный интерфейс и другие при необходимости, соберите объекты класса
//в коллекцию (можно сделать специальных класс с вложенной коллекцией и методами ею управляющими)
public class InternetResource : IList<string>
{
    private List<string> _resources;

    public InternetResource()
    {
        _resources = new List<string>();
    }
    public string this[int index] { get => _resources[index]; set => _resources[index] = value; } 

    public int Count => _resources.Count;

    public bool IsReadOnly => false;

    public void Add(string item) => _resources.Add(item);

    public void Clear() => _resources.Clear();

    public bool Contains(string item) => _resources.Contains(item);

    public void CopyTo(string[] array, int arrayIndex) => _resources.CopyTo(array, arrayIndex);

    public IEnumerator<string> GetEnumerator() => _resources.GetEnumerator();

    public int IndexOf(string item) => _resources.IndexOf(item);

    public void Insert(int index, string item) => _resources.Insert(index, item);

    public bool Remove(string item) => _resources.Remove(item);

    public void RemoveAt(int index) => _resources.RemoveAt(index);

    System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator() => _resources.GetEnumerator();
}
