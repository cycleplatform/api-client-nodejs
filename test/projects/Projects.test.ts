// import { assert } from "chai";
import { Projects } from "../../src/";
import { AccessToken } from "../common";

export function testProjects() {
    describe("Projects", () => {
        // it("should create a new project", async () => {
        //     const resp = await Projects.create({
        //         value: { name: "First Cycle Project" },
        //         settings: { url: process.env.API_URL },
        //         token: AccessToken
        //     });
        //     if (!resp.ok) {
        //         throw new Error(JSON.stringify(resp.error));
        //     }

        //     console.log(resp.value);
        // });

        it("should list all projects", async () => {
            const resp = await Projects.getCollection({
                settings: { url: process.env.API_URL },
                token: AccessToken,
            });
            if (!resp.ok) {
                throw new Error(JSON.stringify(resp.error));
            }

            console.log(resp.value);
        });
    });
}
