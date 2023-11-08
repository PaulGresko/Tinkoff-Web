/**
 * Напишите класс геометрической точки, принимающей в конструкторе координаты X и Y
 * Если координаты не переданы - 0,0; Аналогично если только 1 координата.
 * Со звездочкой: реализовать метод, который возвращает расстояние от точки до центра координат (0, 0)
 */
class Point {
    constructor(x=0,y=0){
        this.x = x;
        this.y = y;
    }

    toCenter(){
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }
}

/**
 * Напишите класс геометрической точки в трехмерном пространстве (x, y, z),
 * который будет наследоваться от точки в двумерном пространстве.
 * Реализовать статический метод, который возвращает расстояние между Point3D.
 */
class Point3D extends Point {
    constructor(x = 0, y = 0, z = 0) {
        super(x, y);
        this.z = z;
    }
    static vectorLength(a, b) {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dz = b.z - a.z;

        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
}

/**
 * Напишите класс "очередь", в котором можно добавить элемент в конец и получить из начала.
 * Предусмотреть 2 варианта инициализации - массивом в конструкторе (из него создается очередь) и без параметров.
 * Со звездочкой: написать тесты методы класса (oop.spec.js)
 */
class Queue {
    constructor(items = []) {
        this.items = items.slice(); // Копируем массив, чтобы избежать изменения исходного массива.
    }

    push(...items) {
        this.items.push(...items);
    }

    pop() {
        return this.items.shift();
    }

    get size() {
        return this.items.length;
    }

    clear() {
        this.items = [];
    }
}

module.exports = {
    Point,
    Point3D,
    Queue,
};
