//1
function basicOperation(operation, value1, value2) {
    let result;
    if (operation === '+') {
      result = value1 + value2;
    } else if (operation === '-') {
      result = value1 - value2;
    } else if (operation === '*') {
      result = value1 * value2;
    } else if (operation === '/') {
      if (value2 === 0) {
        result = 'Деление на ноль недопустимо';
      } else {
        result = value1 / value2;
      }
    } else {
      result = 'Неподдерживаемая операция';
    }
    return result;
  }
  const result = basicOperation('+', 50, 2);
  alert(result);
  
  //2
  let sumOfCubes = n => {
    let sum = 0;
  
    for (let i = 1; i <= n; i++) {
      sum += i ** 3;
    }
  
    return sum;
  }
  const n = 3; 
  const result2 = sumOfCubes(n);
  alert(`Сумма кубов чисел от 1 до ${n} равна ${result2}`);
  
  
  // 3
  function calculateAverage(numbers) {
    if (numbers.length === 0) {
      return 0;
    }
    let sum3 = 0;
    for (let i = 0; i < numbers.length; i++) {
      sum3 += numbers[i];
    }
    const average = sum3 / numbers.length;
    return average;
  }
  
  const numbers = [5, 10, 15, 20];
  const result3 = calculateAverage(numbers);
  alert(`Среднее арифметическое элементов массива: ${result3}`);
  
  
  //4
  
  let str = prompt("Введите строку: ");
function reverseString(str1) {
    let reverse = str1.replace(/[^a-zA-Z ]/g, '').split('').reverse().join('');
    return reverse;
}
alert(reverseString(str));
  
function repeatString(n, s) {
  
  if (n <= 0) {
    return '';
  }
  
  return s.repeat(n);
}

const n5 = 4; 
const s = 'ognik'; 
const repeatedString = repeatString(n5, s);
alert(repeatedString);
  
  //6
  function findStringsNotInArray(arr6, arr66) {
    let arr666 = [];
  
    for (let i = 0; i < arr6.length; i++) {
      let isFound = false;
      for (let j = 0; j < arr66.length; j++) {
        if (arr6[i] === arr66[j]) {
          isFound = true;
          break;
        }
      }
      if (!isFound) {
        arr666.push(arr6[i]);
      }
    }
  
    return arr666;
  }
  const arr6 = ['sun', 'banana', 'cherry', 'date'];
  const arr66 = ['banana', 'date', 'car'];
  const arr666 = findStringsNotInArray(arr6, arr66);
  
  alert(arr666); 
  