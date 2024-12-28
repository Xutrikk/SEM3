/*1.Объедините два массива с вложенностью используя reduce().*/
let arr = [1, [1, 2, [3, 4]], [2, 4]];

let flattenedArray = arr.reduce((acc, curr) => acc.concat(Array.isArray(curr) ? curr.flat() : curr), []);
console.log(flattenedArray);

/*2.Найдите сумму элементов массива, если вложенность массива неизвестна.*/
let nestedArray = [1, [2, [3, 4]], [5, 6]];

function sumArray(arr) 
{
  return arr.reduce((acc, curr) => 
  {
    if (Array.isArray(curr)) 
    {
      return acc + sumArray(curr);
    }
    return acc + curr;
  }, 0);
}

let sum = sumArray(nestedArray);
console.log(sum);

/*3.Напишите функцию, которая на вход принимает массив из студентов, где студент — это объект с полями «имя», «возраст» и «номер группы» {name: string, age: number, groupId: number}, а на выходе возвращает объект, где ключ — это номер группы, а значение — массив из студентов старше 17 лет.*/
let students = [
  { name: 'Сергей', age: 18, groupId: 1 },
  { name: 'Миша', age: 20, groupId: 6 },
  { name: 'Настя', age: 16, groupId: 1 },
  { name: 'Давид', age: 19, groupId: 6 },
  { name: 'Алиса', age: 21, groupId: 3 }
];

  function groupStudentsByAge(students) 
  {
    const result = {};
  
    students.forEach(student => 
      {
      if (student.age > 17) 
      {
        const groupId = student.groupId;
  
        if (result[groupId]) 
        {
          result[groupId].push(student);
        } 
        else 
        {
          result[groupId] = [student];
        }
      }
    }
    );
  
    return result;
  }

let groupedStudents = groupStudentsByAge(students);
console.log(groupedStudents);

 /*4.Вам дана строка, состоящая из символов ASCII. Переведите символы в код - число total1, замените все цифры 7 на 1 - число total2. И вычтите из total1 число total2.*/
 let stringASCII = "ABC";
let total1 = "";

for(let i = 0; i < stringASCII.length; i++) 
{
    let num = stringASCII[i].charCodeAt();
    total1 += num;
}

let total2 = total1.replace('7', '1');
let subtraction = parseInt(total1)- parseInt(total2);
console.log(subtraction);

/*5.Создайте функцию, которая принимает несколько объектов в качестве параметров и возвращает НОВЫЙ объект со всеми свойствами из входных объектов. Для объединения объектов и создания НОВОГО объекта использовать метод assign*/
function extend(...objects) 
{
  return Object.assign({}, ...objects);
}

let obj1 = { a: 1, b: 2 };
let obj2 = { c: 3 };
let obj3 = { d: 4 };

let mergedObj = extend(obj1, obj2, obj3);
console.log(mergedObj);

  /*6. Создайте башню-пирамиду, состоящую из символов "*". В качестве входного параметра приходит число этажей башни.*/
  function createTower(numFloors) 
  {
    let tower = [];
  
    for (let i = 1; i <= numFloors; i++) 
    {
      let spaces = " ".repeat(numFloors - i);
      let stars = "*".repeat(i * 2 - 1);
      let floor = spaces + stars;
      tower.push(floor);
    }
  
    return tower;
}
  
let tower = createTower(4);
console.log(tower);