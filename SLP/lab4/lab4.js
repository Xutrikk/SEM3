/*1.	Имеется список товаров. Реализуйте функции, которые добавляют, удаляют товар из списка, проверяет наличие товара. 
Определите количество имеющего товара. Используйте коллекцию Set.  */
let products = new Set();

function addProduct(product)
{
    products.add(product);
}

function removeProduct(product)
{
    products.delete(product);
}

function isProduct(product)
{
   return products.has(product);
}

function countOfProduct()
{
    return products.size;
}

addProduct("телевизор");
addProduct("ноутбук");
addProduct("телефон");
addProduct("планшет");
console.log(isProduct("ноутбук"));
console.log(isProduct("наушники"));
console.log(countOfProduct());
removeProduct("планшет");
console.log(isProduct("планшет"));
console.log(countOfProduct());

/*2.Используя коллекцию Set создайте список студентов. О каждом студенте содержится информация: номер зачетки, группа, ФИО. Создайте функции, которые:
- добавляют студента, 
- удаляют по номеру, 
- фильтруют список по группе, 
- сортируют по номеру зачетки. 
*/

let students = new Set();

function addStudent(student)
{
    students.add(student);
}

function removeStudent(studentId)
{
    students.forEach((student) => {
        if(student.studentId === studentId)
        {
            students.delete(student);
        }
    });
}

function filterStudent(group)
{
    students.forEach((students) => {
        if(students.group == group)
        {
            console.log(students)
        }
    });
}

function sortStudent()
{
    return Array.from(students).sort((a, b) => a.studentId - b.studentId);
}

addStudent({studentId: 3, group: "A", fio: "Овсянка Вика"});
addStudent({studentId: 6, group: "B", fio: "Глухова Даша"});
addStudent({studentId: 7, group: "A", fio: "Трубочкина Аня"});
addStudent({studentId: 4, group: "C", fio: "Иванонов Иван"});

filterStudent("A");
removeStudent(1);
filterStudent("A");

console.log(sortStudent());

/*3.Используя коллекцию Map и ее методы, реализуйте хранилище товаров. В корзине хранится информация о товаре: id (ключ в коллекции Map), название, количество товара, цена. Разработайте функции, которые:  
- добавляют товар, 
- удаляют товар из списка по id, 
- удаляют товары по названию (учтите, что названия товаров могут повторяться), 
- изменяют количество каждого товара,
- изменяют стоимость товара.
Рассчитайте количество позиций в списке и сумму стоимости всех товаров.
*/

let products1 = new Map();

function addProducts1(id, name, col, price)
{
    products1.set(id, {name, col, price});
}
function removeByID(id)
{
    products1.delete(id);
}
function removeByName(name) 
{
    for (let [id, product1] of products1) 
    {
      if (product1.name === name) 
      {
        products1.delete(id);
      }
    }
}
function updateCol(id, newCol) 
{
    if (products1.has(id)) 
    {
      const product1 = products1.get(id);
      product1.col = newCol;
      products1.set(id, product1);
    }
}
function updatePrice(id, newPrice) 
{
    if (products1.has(id)) 
    {
      const product1 = products1.get(id);
      product1.price = newPrice;
      products1.set(id, product1);
    }
}
function getProductCount() 
{
    return products1.size;
}
function getTotalPrice() 
{
    let totalPrice = 0;
    for (const product1 of products1.values()) 
    {
      totalPrice += product1.col * product1.price;
    }
    return totalPrice;
}

// Пример использования функций
addProducts1(1, "Телефон", 2, 100);
addProducts1(2, "Ноутбук", 1, 500);
addProducts1(3, "Телевизор", 3, 200);

console.log(getProductCount()); // 3
console.log(getTotalPrice()); // 1300

removeByID(2);
console.log(getProductCount()); // 2
console.log(getTotalPrice()); // 800

removeByName("Телефон");
console.log(getProductCount()); // 1
console.log(getTotalPrice()); // 600

updateCol(3, 5);
console.log(getTotalPrice()); // 1000

updatePrice(3, 250);
console.log(getTotalPrice()); // 1250


/*4.Создайте коллекцию WeakMap для кеширования результатов функции. WeakMap должен содержать входные параметры функции и результаты расчета.  
Функция должна выполняться только в том случае, если в кэше нет данных, иначе – берем данные из WeakMap.*/


const cache = new WeakMap();

// Функция для кэширования результатов
function cachedFunction(func) 
{
  return function(...args) 
  {
    // Проверяем, есть ли результат для данного набора аргументов в кэше
    if (cache.has(func) && cache.get(func)[args]) 
    {
      console.log('Данные взяты из кэша');
      return cache.get(func)[args];
    }

    // Выполняем функцию, так как результатов в кэше нет
    const result = func(...args);

    // Создаем новый кэш для функции, если его еще нет
    if (!cache.has(func)) 
    {
      cache.set(func, {});
    }

    // Сохраняем результат в кэше
    cache.get(func)[args] = result;

    console.log('Результаты вычислений сохранены в кэше');
    return result;
  };
}


function calculateExpensiveValue(base, exponent) 
{
  console.log('Выполняется вычисление...');
  return Math.pow(base, exponent);
}

const cachedCalculate = cachedFunction(calculateExpensiveValue);

// Пример использования
console.log(cachedCalculate(2, 3)); // Выполняется вычисление... 8
console.log(cachedCalculate(2, 3)); // Данные взяты из кэша 8
console.log(cachedCalculate(4, 2)); // Выполняется вычисление... 16
console.log(cachedCalculate(4, 2)); // Данные взяты из кэша 16