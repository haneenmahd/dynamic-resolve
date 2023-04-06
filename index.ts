import path = require("path");
import fs = require("fs");

function filterDir(list: string[]): string[] {
    const result: string[] = [];

    list.filter(l => {
        if (fs.statSync(l).isDirectory()) {
            return result.push(l);
        }
    });

    return result;
}

class ResolveFile {
    /**
      *
      * @param {string} pathTo Path in which the program should search for the file
      * @param {string} file File to find
      * @return {string} The exact path to the file Returns NULL if the does not exists
    */
    static Search(pathTo: string, file: string): string | undefined {
        if (!fs.existsSync(path.resolve(pathTo))) {
            throw new Error(`Path not found: ${path.resolve(pathTo)}`)
        }

        let resultPath = "";

        let startPath: string = path.resolve(path.join(pathTo, file));

        for (const index of fs.readdirSync(path.dirname(startPath))) {
            const currentPath = path.dirname(path.resolve(index));
            if (index == file) {
                resultPath = path.join(currentPath, index);

                return resultPath;
            }
        }

        return resultPath;
    }
};

export default ResolveFile;