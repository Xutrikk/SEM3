
/*1.1*/
function makeCounter(){
    let currentCount = 1;

    return function()
    {
        return currentCount++;
    };
}

let counter = makeCounter();

alert( counter() );
alert( counter() );
alert( counter() );

let counter2 = makeCounter();
alert(counter2());
/*1.2*/
// let currentCount = 1;

// function makeCounter(){
//     return function(){
//         return currentCount++;
//     };
// }

// let counter = makeCounter();
// let counter2 = makeCounter();

// alert( counter() );
// alert( counter() );

// alert( counter2() );
// alert( counter2() );

/*2.	Реализуйте каррированную функцию, которая рассчитывает объем прямоугольного параллелепипеда. 
Выполните преобразование функции для неоднократного расчёта объема прямоугольных параллелепипедов, у которых одно ребро одинаковой длины.*/

function volume(l) {
  return function(w) {
    return function(h) {
      return l * w * h;
    };
  };
}

const volumeWithFixedLength = volume(5);

// Вычислим объемы параллелепипедов с разными шириной и высотой
let volume1 = volumeWithFixedLength(6)(7); 
let volume2 = volumeWithFixedLength(3)(6); 
let volume3 = volumeWithFixedLength(7)(2); 

console.log(volume1); // 210
console.log(volume2); // 90
console.log(volume3); // 70


let volume4 = volume(4)(2)(6); 
console.log(volume4); 


/*3.	Пользователь управляет движением объекта, вводя в модальное окно  команды left, right, up, down. 
Объект совершает 10 шагов в заданном направлении (т.е. высчитываются и выводятся в консоль соответствующие координаты) и запрашивает новую команду. 
Разработайте генератор, который возвращает координаты объекта, согласно заданному направлению движения. */
function* moveObjectGenerator() 
{
  let currentX = 0;
  let currentY = 0;

  while (true) 
  {
    const userDirection = yield { x: currentX, y: currentY };

    switch (userDirection) 
    {
      case "left":
        currentX = currentX - 10;
        break;
      case "right":
        currentX = currentX + 10;
        break;
      case "up":
        currentY = currentY + 10;
        break;
      case "down":
        currentY = currentY - 10;
        break;
      default:
        break;
    }

    console.log(`Новые координаты: x:${currentX}, y:${currentY}`);
  }
}

const objectMover = moveObjectGenerator();
objectMover.next();

for (let i = 0; i < 10; i++) 
{
  const userCommand = prompt("Введите команду (left/right/up/down): ");
  objectMover.next(userCommand);
}


/*4.	Какие переменные и функции сохраняются в глобальный объект window? 
Получите значения всех созданных переменных и функции, которые хранятся в глобальном объекте window. Переопределите переменные через глобальный объект.*/

var b = 5;
let a = 6;

alert(window.b);
alert(window.alert);

window.b = 7;
alert(b);

function someFunction()
{
    return "some string";
}
alert(window.someFunction());
