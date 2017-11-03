import { Token } from "../src/auth";
import { ProjectRequiredSettings } from "../src/common/api";

interface TestStoreState {
    token: Token;
    settings: ProjectRequiredSettings;
    active: {
        project: string;
        environment: string;
        provider: string;
    };
}

export class TestStore {
    public readonly state: TestStoreState = {
        token: {
            access_token: process.env.TOKEN || "",
            refresh_token: process.env.REFRESH_TOKEN || "",
            expires_in: 0,
            scope: "",
            created: 0,
            token_type: "bearer",
        },
        settings: {
            url: process.env.API_URL,
            useHttp: process.env.USE_HTTP === "true" || false,
            project: process.env.PROJECT_ID || "",
        },
        active: {
            project: "",
            environment: "",
            provider: "59544adc9b150a87da042d4c", // packet
        },
    };

    public updateToken(t: Token) {
        this.state.token = t;
    }

    public updateActiveId = (k: keyof TestStoreState["active"], v: string) => {
        this.state.active[k] = v;
    };
}
