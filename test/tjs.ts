import { resolve } from "path";

import { CompilerOptions } from "typescript";
import * as TJS from "typescript-json-schema";

const settings: TJS.PartialArgs = {
    required: true,
    ignoreErrors: true,
};

const compilerOptions: CompilerOptions = {
    strictNullChecks: true
}

export function getSchema(file: string, interfaceName: string) {
    const program = TJS.getProgramFromFiles([resolve(`./src/${file}`)], compilerOptions as any);
    const schema = TJS.generateSchema(program, interfaceName, settings);
    return schema;
}

