const ts = require('typescript');
const glob = require('glob');
const path = require('path')

const storage = {};
process.chdir(__dirname);
const cliArgs = process.argv.slice(2);

const PATH_TO_START = cliArgs[0];
const IGNORE_MASK = cliArgs[1];
let GLOB_OPTIONS = {};

if (!PATH_TO_START) {
    console.error('ERROR::You should provide entrypoint!');
    return;
}

if (IGNORE_MASK) {
    GLOB_OPTIONS = {
        ignore: path.resolve(IGNORE_MASK)
    }
}

/**
 * result - это все массив путей до файлов указанных в маске для glob()
 */
glob(PATH_TO_START, GLOB_OPTIONS, (err, result) => {
    const program = ts.createProgram(result, {});

    if (result && result.length) {
        result.forEach(file => {
            const source = program.getSourceFile(file);
            /**
             * resolvedModules это зарезолвленные модули относящиеся к текущему файлу
             * условно - импорты содержащиеся в файле
             * например:
             * { key: './lib/options', value: /projects/temp/ast/libs/.../options/index.ts }
             * То есть по нему мы можем понять импорт из барреля или нет
             */

            if (!source.resolvedModules) {
                // console.log('@EXCEPTION', source, source.resolvedModules)
                return;
            }

            const imports = [...source.resolvedModules.values()]
                .filter(v => v)
                .map(val => val.resolvedFileName)
                .filter(val => val !== undefined)


            if (imports.length) {
                imports.forEach(_import => {

                    /** Если среди импортов файла есть тот у которого в пути index.ts, сохраняем инфу:
                     * - имя файла
                     * - ссылку на индекс
                     */
                    if (_import.indexOf('index.ts') !== -1) {
                        if (!storage[file]) {
                            storage[file] = [];
                        }

                        storage[file].push(_import);
                    }
                })
            }
        })
    }

    console.log(storage);
    console.log('DONE');
});