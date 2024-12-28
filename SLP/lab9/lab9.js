/*1.Создайте объекты (Object) для фигур, представленных на картинке. Обратите внимание, фигуры имеют одинаковые параметры, 
следовательно одни объекты могут наследовать от других.
С помощью методов JS получите свойства, которые отличают фигуру «зеленый круг»; свойства, которые описывают фигуру «треугольник с тремя линиями»; 
есть ли у фигуры «маленький квадрат» собственное свойство, которое определяет цвет фигуры.*/
//super используется для вызова методов родительского (или "базового") класса внутри класса-наследника.
class Shape {
    constructor(color, size) {
      this.color = color;
      this.size = size;
    }
  }
  
  
  class Square extends Shape {
    constructor(color, size) {
      super(color, size);
    }
  }
  

  class Circle extends Shape {
    constructor(color, size) {
      super(color, size);
    }
  }
  

  class Triangle extends Shape {
    constructor(color, size, lines) {
      super(color, size);
      this.lines = lines; 
    }
  }
  

  const largeSquare = new Square('yellow', 'large');
  const smallSquare = new Square('yellow', 'small');
  const circle = new Circle('white', 'large');
  const greenCircle = new Circle('green', 'large');
  const triangle = new Triangle('white', 'large', 3);
  const triangleWithLines = new Triangle('white', 'large', 3);
  
 
  console.log(greenCircle.color); 
  console.log(triangle.lines); 
  console.log(smallSquare.hasOwnProperty('color')); 


/*2.Реализуйте иерархию классов:
Human: содержит поля Имя, Фамилия, Возраст, Адрес. Методы, позволяющие изменить значения для возраста и адреса. 
Измените класс Human, добавив геттер и сеттер для возраста, который вычисляется  на основании года рождения, соответственно, добавив в класс
 новое поле Год рождения.
Класс Student наследуется от Human. Содержит поля Факультет, Курс, Группа, № зачетки. Метод для изменения значения поля Курс и Группа. 
Метод getFullName() – вывод имени и фамилии студента.
Номер зачетки 71201300, где 7 – шифр факультета (7- ФИТ, 6- ИД), далее одна цифра шифр специальности (1-ПОИТ, 2-ИСИТ, 3-ДЭВИ, 4- ПОИБМС),
20 – две последние цифры года поступления, далее одна цифра – 1-бюджет, 2- платники, и три цифры- порядковый номер. 
Класс Faculty. Содержит поля Название факультета, Количество групп, Количество студентов и соответствующие методы, изменяющие значения полей 
Количество групп и Количество студентов. Класс должен содержать метод getDev(), который выводит количество студентов специальности ДЭВИ 
(определяется из номера зачетки) и метод getGroupe() – выводит список студентов заданной группы.*/
// Класс Human
class Human {
    constructor(firstName, lastName, birthYear, address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthYear = birthYear;
        this._age = this.calculateAge();
        this.address = address;
    }

   
    calculateAge() {
        const currentYear = new Date().getFullYear();
        return currentYear - this.birthYear;
    }

   
    get age() {
        return this._age;
    }

  
    set age(newAge) {
        const currentYear = new Date().getFullYear();
        this.birthYear = currentYear - newAge;
        this._age = newAge;
    }

 
    setAddress(newAddress) {
        this.address = newAddress;
    }
}


class Student extends Human {
    constructor(firstName, lastName, birthYear, address, faculty, course, group, gradeBookNumber) {
        super(firstName, lastName, birthYear, address);
        this.faculty = faculty;
        this.course = course;
        this.group = group;
        this.gradeBookNumber = gradeBookNumber;
    }

    
    setCourse(newCourse) {
        this.course = newCourse;
    }

   
    setGroup(newGroup) {
        this.group = newGroup;
    }

 
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

   
    getSpecialty() {
        const specialtyCode = this.gradeBookNumber[1];
        switch (specialtyCode) {
            case '1': return 'ПОИТ';
            case '2': return 'ИСИТ';
            case '3': return 'ДЭВИ';
            case '4': return 'ПОИБМС';
            default: return 'Неизвестная специальность';
        }
    }
}


class Faculty {
    constructor(name, groupCount, studentCount) {
        this.name = name;
        this.groupCount = groupCount;
        this.studentCount = studentCount;
        this.students = [];
    }

    
    setGroupCount(newGroupCount) {
        this.groupCount = newGroupCount;
    }

   
    setStudentCount(newStudentCount) {
        this.studentCount = newStudentCount;
    }

   
    addStudent(student) {
        this.students.push(student);
    }

   
    getDev() {
        return this.students.filter(student => student.getSpecialty() === 'ДЭВИ').length;
    }

   
    getGroup(group) {
        return this.students.filter(student => student.group === group);
    }
}




const student1 = new Student("Masha", "Ivanova", 2002, "Minsk", "FIT", 2, "B21", "71201301");
const student2 = new Student("Ivan", "Petrov", 2001, "Minsk", "FIT", 3, "B21", "71202301");


student1.setCourse(3);
student1.setGroup("B22");


const faculty = new Faculty("FIT", 10, 200);
faculty.addStudent(student1);
faculty.addStudent(student2);


console.log(student1.getFullName()); 


console.log(faculty.getDev()); 


console.log(faculty.getGroup("B21")); 
