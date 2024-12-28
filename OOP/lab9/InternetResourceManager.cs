using System;
using System.Collections.Concurrent;
//1 Создайте класс по варианту, определите в нем свойства и методы
public class InternetResourceManager
{
    private ConcurrentDictionary<int, string> _resources;

    public InternetResourceManager()
    {
        _resources = new ConcurrentDictionary<int, string>();
    }

    public void AddResource(int id, string url)
    {
        _resources.TryAdd(id, url);
    }

    public void RemoveResource(int id)
    {
        _resources.TryRemove(id, out _);
    }

    public string FindResource(int id)
    {
        return _resources.TryGetValue(id, out string url) ? url : null;
    }

    public void DisplayResources()
    {
        foreach (var resource in _resources)
        {
            Console.WriteLine($"ID: {resource.Key}, URL: {resource.Value}");
        }
    }
}
