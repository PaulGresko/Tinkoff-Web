const assert = require('assert');
const core = require('./es6');

describe('es6', () => {
    describe('#fioToName', () => {
        it('ФИО в Имя Фамилия корректно', () => {
            assert.strictEqual(core.fioToName('Иванов Иван Иванович'), 'Иван Иванов');
        });

        it('ФИ в Имя Фамилия', () => {
            assert.strictEqual(core.fioToName('Петров Петр'), 'Петр Петров');
        });
    });

    describe('#filterUnique', () => {
        it('массив с уникальными равен сам себе', () => {
            assert.deepStrictEqual(core.filterUnique([1, 2, 3]), [1, 2, 3]);
        });

        it('массив с неуникальными отфильтрован', () => {
            assert.deepStrictEqual(core.filterUnique([1, 1, 1, 1]), [1]);
        });

        it('пустой массив', () => {
            assert.deepStrictEqual(core.filterUnique([]), []);
        });
    });

    describe('#calculateSalaryDifference', () => {
        it('считает разницу корректно', () => {
            assert.strictEqual(core.calculateSalaryDifference([1, 2, 3]), 3);
        });

        it('на пустой массив возвращается falsy значение', () => {
            assert.strictEqual(!!core.calculateSalaryDifference([]), false);
        });
    });

    describe('#Dictionary', () => {
        it('экземпляр класса создается', () => {
            const dic = new core.Dictionary();
            assert.strictEqual(!!dic, true);
        });

        it('добавление слова и определения', () => {
            const dic = new core.Dictionary();
            dic.addWord('apple', 'a fruit');
            assert.strictEqual(dic.getDescription('apple'), 'a fruit');
        });

        it('удаление слова', () => {
            const dic = new core.Dictionary();
            dic.addWord('apple', 'a fruit');
            dic.deleteWord('apple');
            assert.strictEqual(dic.hasWord('apple'), false);
        });

        it('проверка наличия слова', () => {
            const dic = new core.Dictionary();
            dic.addWord('apple', 'a fruit');
            assert.strictEqual(dic.hasWord('apple'), true);
            assert.strictEqual(dic.hasWord('car'), false);
        });

        it('проверка на пустоту', () => {
            const dic = new core.Dictionary();
            assert.strictEqual(dic.isEmpty(), true);

            dic.addWord('apple', 'a fruit');
            assert.strictEqual(dic.isEmpty(), false);
        });

        it('получение всех слов', () => {
            const dic = new core.Dictionary();
            dic.addWord('apple', 'a fruit');
            dic.addWord('car', 'a vehicle');
            const words = dic.getAllWords();
            assert.deepStrictEqual(words, ['apple', 'car']);
        });

        it('получение всех пар ключ-значение', () => {
            const dic = new core.Dictionary();
            dic.addWord('apple', 'a fruit');
            dic.addWord('car', 'a vehicle');
            const entries = dic.getAllEntries();
            assert.deepStrictEqual(entries, [ ['apple', 'a fruit'],['car', 'a vehicle']]);
        });

        it('получение пары ключ-значение по слову', () => {
            const dic = new core.Dictionary();
            dic.addWord('apple', 'a fruit');
            dic.addWord('car', 'a vehicle');

            const entry = dic.getEntry('apple');
            assert.deepStrictEqual(entry, ['apple', 'a fruit']);

            const nonExistentEntry = dic.getEntry('banana');
            assert.strictEqual(nonExistentEntry, null);
        });
    });
});