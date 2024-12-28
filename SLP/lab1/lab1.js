//ex_1_______________________________________________
let a = 5;
alert(typeof a);

let name = "Name";
alert(typeof name);

let i = 0;
alert(typeof i);

let double = 0.23;
alert(typeof double);

let result_1 = 1/0;
alert(typeof result_1);

let answer = true;
alert(typeof answer);

let no = null;
alert(typeof no);
//ex_2_______________________________________________
console.log("\nзадание 2");
let side2 = 5;
let side1 = 45;
let heightA = 21;

let squareB = side2 * side1;
let squareA = side1 * heightA;

let count = Math.floor(squareA / squareB);
console.log(count);

//ex_3_______________________________________________________
let i_2 = 2;
let a_2 = ++i_2;
alert(i_2);
let b_2 = i_2++;
alert(a_2 == b_2);

//ex_4___________________________
alert('Котик' > 'котик' ? true : false); //f
alert('Котик' > 'китик' ? true : false); //f
alert('Кот' > 'Котик' ? true : false); //f
alert('Привет' > 'Пока' ? true : false); //t
alert(73 > '53' ? true : false); //t
alert(false > 0 ? true : false); //f 
alert(54 > true ? true : false); //t
alert(123 > false ? true : false); //t
alert(true > '3' ? true : false); //f
alert(3 > '5mm' ? true : false); //f
alert(8 > '-2' ? true : false); //t
alert(34 > '34' ? true : false); //f
alert(null > undefined ? true : false); //f

//ex_5____________________________________________
const teacherName = "Кудлацкая Марина Фёдоровна";
const userInput = prompt("Пожалуйста, введите ваше имя или ФИО:");
const lowercaseInput = userInput.toLowerCase();
const lowercaseTeacherName = teacherName.toLowerCase();

const teacherComponents = lowercaseTeacherName.split(" ");
const userWords = lowercaseInput.split(" ");

let match = false;
for (const userWord of userWords) {
  if (teacherComponents.includes(userWord)) {
    match = true;
    break; 
  }
}

if (match) {
  alert('Введенные вами данные верные.');
} else {
  alert('Введенные вами данные неверные.');
}

//ex_6___________________________________________
let ex_1 = prompt(`Сдал ли студент экзамен по математике? (ДА - "+", НЕТ - "-")`);
let ex_2 = prompt(`Сдал ли студент экзамен по русскому? (ДА - "+", НЕТ - "-")`);
let ex_3 = prompt(`Сдал ли студент экзамен по английскому? (ДА - "+", НЕТ - "-")`);

if (ex_1 == '+' && ex_2 == '+' && ex_3 == '+') {
    alert(`Студент переведён на второй курс!`);
} else if (ex_1 == '-' && ex_2 == '-' && ex_3 == '-') {
    alert(`Студент отчислен!`);
} else if (ex_1 == '-' || ex_2 == '-' || ex_3 == '-') {
    alert(`Студента ожидает пересдача!`);
}

//ex_7_________________________________________
let ex7_1 = true + true;
alert(ex7_1);
let ex7_2 = 0 + "5";
alert(ex7_2);
let ex7_3 = 5 + "mm";
alert(ex7_3);
let ex7_4 = 8 / Infinity;
alert(ex7_4);
let ex7_5 = 9 * "\n9";
alert(ex7_5);
let ex7_6 = null - 1;
alert(ex7_6);
let ex7_7 = "5" - 2;
alert(ex7_7);
let ex7_8 = "5px" - 3;
alert(ex7_8);
let ex7_9 = true - 3;
alert(ex7_9);
let ex7_10 = 7 || 0;
alert(ex7_10);

//ex_8_________________________________
let arr = [10];
for (let count = 0; count < 10; count++) {
    arr[count] = count + 1;

    if (arr[count] % 2 == 0)
        arr[count] += 2;

    if (arr[count] % 2 != 0)
        arr[count] = `${arr[count]}mm`;

    alert(`${arr[count]}`);
}

//ex_9_______________________________________________________--
let days = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
        let dayNumber = parseInt(prompt("Введите номер дня недели (1-7):"));

        alert(days[dayNumber - 1] || "Неверный номер дня");

        let daysObj = {
            1: "пн",
            2: "вт",
            3: "ср",
            4: "чт",
            5: "пт",
            6: "сб",
            7: "вс"
        };

        alert(daysObj[dayNumber] || "Неверный номер дня");

 //ex_10_______________________________________________________
        function exampleFunc(param1 = "just", param2 = "do", param3 = prompt("Введите третий параметр")) {
            return `${param1}, ${param2}, ${param3}`;
        }

        alert(exampleFunc("first"));

  //ex_11________________________________________________________

// Function Declaration (Функция будет доступна в коде до ее фактического объявления в коде)
function paramsDeclaration(a, b) {
  if (a === b) {
    return 4 * a; 
  } else {
    return a * b; 
  }
}

// Function Expression (Функция будет доступна в коде только после ее объявления.)
const paramsExpression = function(a, b) {
  if (a === b) {
    return 4 * a; 
  } else {
    return a * b; 
  }
};

// Функция-стрелка (Arrow Function)
const paramsArrow = (a, b) => (a === b ? 4 * a : a * b);

const sideA = parseFloat(prompt("Введите длину стороны A:"));
const sideB = parseFloat(prompt("Введите длину стороны B:"));

const resultDeclaration = paramsDeclaration(sideA, sideB);
const resultExpression = paramsExpression(sideA, sideB);
const resultArrow = paramsArrow(sideA, sideB);

if (sideA === sideB) {
  alert(`Это квадрат, его периметр: ${resultDeclaration}`);
} else {
  alert(`Это прямоугольник, его площадь (Function Declaration): ${resultDeclaration}`);
}

if (sideA === sideB) {
  alert(`Это квадрат, его периметр: ${resultExpression}`);
} else {
  alert(`Это прямоугольник, его площадь (Function Expression): ${resultExpression}`);
}

if (sideA === sideB) {
  alert(`Это квадрат, его периметр: ${resultArrow}`);
} else {
  alert(`Это прямоугольник, его площадь (Arrow Function): ${resultArrow}`);
}
