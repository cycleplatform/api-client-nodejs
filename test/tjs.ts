import { resolve } from "path";

import { CompilerOptions } from "typescript";
import * as TJS from "typescript-json-schema";

const settings: TJS.PartialArgs = {
    required: true,
    aliasRef: true,
    // dont allow untyped props
    noExtraProps: true,
};

const compilerOptions: CompilerOptions = {
    strictNullChecks: true,
    suppressImplicitAnyIndexErrors: true,
    module: 1,
    strict: true,
    target: 4,
    experimentalDecorators: true,
    jsx: 2,
    moduleResolution: 2,
};

export function getSchema(file: string, interfaceName: string) {
    const program = TJS.getProgramFromFiles(
        [resolve(`./src/${file}`)],
        compilerOptions as any,
    );
    const schema = TJS.generateSchema(program, interfaceName, settings);
    return schema;
}
