"use strict";
// в данных задачах нужно использовать возможности es6
// ко всем заданиям можно дописать свои тесты в файле es6.spec.js
// Можно менять параметры функций (например сделать им значения по умолчанию)

// Напишите функцию, которая принимает ФИО пользователя и возвращает
// строку формата Имя Фамилия
function fioToName(fio) {
    let fioSplit = fio.split(' ');
    return (fioSplit[1]===undefined? " " : fioSplit[1]) + " " + (fioSplit[0]===undefined? " " : fioSplit[0]); 
}

// преобразуйте массив чисел так, чтобы в нем остались только
// уникальные элементы
// присмотритесь к коллекции "Set"
function filterUnique(array) {
    return Array.from(new Set(array));
}

// Задача: разница зарплат
// в функцию приходит массив из n зарплат сотрудников фирмы
// ваша задача определить, во сколько раз зарплата самого высокооплачиваемого
// сотрудника превышает зарплату самого низкооплачиваемого
// присмотритесь к методу .reduce
function calculateSalaryDifference(array) {
    //return array.length ? Math.max(...array) / Math.min(...array) : false;
    if (array.length === 0) {
        return false;
      }
    
      const maxSalary = array.reduce((max, currentSalary) => Math.max(max, currentSalary), array[0]);
      const minSalary = array.reduce((min, currentSalary) => Math.min(min, currentSalary), array[0]);
    
      return maxSalary / minSalary;
}

// Реализуйте класс "словарь слов" (как толковый словарь)
// класс должен быть безопасным и работать только со словами
// присмотритесь к коллекции "Map"
// Словарь - (string, string), и все это не null и не undefined
// * покройте класс тестами
class Dictionary {
    constructor(){
        this.words = new Map();
    }

    addWord(word, describtion) {
        if (typeof word === 'string' && typeof describtion === 'string') {
          this.words.set(word, describtion);
        }
    }
    
    getDescription(word) {
      return this.words.get(word);
    }
    
    deleteWord(word) {
      this.words.delete(word);
    }
    
    hasWord(word) {
      return this.words.has(word);
    }

    isEmpty(){
        return this.words.size === 0;
    }
    
    getAllWords() {
      return Array.from(this.words.keys());
    }

    getAllEntries() {
      return Array.from(this.words.entries());
    }

    getEntry(word) {
      if (this.hasWord(word)) {
        return [word, this.getDescription(word)];
      }
      return null; 
    }
}

module.exports = {
    fioToName,
    filterUnique,
    Dictionary,
    calculateSalaryDifference
};