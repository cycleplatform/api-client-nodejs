import { resolve } from "path";

import {
    CompilerOptions,
    ModuleKind,
    ScriptTarget,
    ModuleResolutionKind,
} from "typescript";
import * as TJS from "typescript-json-schema";

const settings = {
    required: true,
    aliasRef: true,
    // dont allow untyped props
    noExtraProps: true,
};

const compilerOptions: CompilerOptions = {
    strictNullChecks: true,
    suppressImplicitAnyIndexErrors: true,
    module: ModuleKind.ES2015,
    strict: true,
    target: ScriptTarget.ES2018,
    experimentalDecorators: true,
    jsx: 2,
    moduleResolution: ModuleResolutionKind.NodeJs,
    lib: ["dom", "es6"],
};

export function getSchema(file: string, interfaceName: string) {
    const program = TJS.getProgramFromFiles(
        [resolve(`./src/${file}`)],
        compilerOptions as any,
    );
    const schema = TJS.generateSchema(program, interfaceName, settings as any);
    return schema;
}
