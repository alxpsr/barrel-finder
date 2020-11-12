# NodeJS script that find imports from barrel in each Typescript file
## Usage
- `npm i`
- `node barrel-finder <GLOBLIKE_PATH_TO_START> <GLOBLIKE_MASK_TO_IGNORE>`
- Example `node barrel-finder ../libs/**/*.ts ../libs/**/*.index.ts`

## Description
Script will parse only typescript files, so you should provide path like this: `../../libs/**/*.ts` (glob-like path)

In program you may see this line: `const source = program.getSourceFile(file);`
- source is for `SourceFileObject` object (from Typescript API) that include Map called `resolveModules`. 
- `resolveModules` contains metadata about each module (file that you imported)
- Example import without barrel:
    ```ts
    {
        resolveModules: {
            key: './simple-request.dto',
            value: {
                originalPath: undefined, 
                extension: '.ts', 
                isExternalLibraryImport: false, 
                packageId: undefined,
                resolvedFileName: '/path/to/libs/http-lib/data/requests/simple-request.dto.ts', 
            }
        } as Map<string, any>
    }
    ```
- Example import WITH barrel:
    ```ts
    {
        resolveModules: {
            key: '../requests',
            value: {
                originalPath: undefined, 
                extension: '.ts', 
                isExternalLibraryImport: false, 
                packageId: undefined,
                resolvedFileName: '/path/to/libs/http-lib/data/requests/index.ts', // This is our barrel file, we can use it for mark
            }
        } as Map<string, any>
    }
    ```

## Use cases
If you develop some angular libraries with ng-packagr you may got a looooot of errors when you using barrel files. This script will help you to find imports from barrels!