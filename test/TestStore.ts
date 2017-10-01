import { Token } from "../src/auth/Token";

interface TestStoreState {
    token: Token;
    active: {
        project: string;
        environment: string;
    };
}

export class TestStore {
    public readonly state: TestStoreState = {
        token: {
            access_token: process.env.TOKEN,
            refresh_token: process.env.REFRESH_TOKEN,
            expires_in: 0,
            scope: "",
            created: 0,
            token_type: "bearer",
        },
        active: {
            project: "",
            environment: "",
        }
    };
    
    public updateToken(t: Token) {
        this.state.token = t;
    }

    public updateActiveId = (k: keyof TestStoreState["active"], v: string) => {
        this.state.active[k] = v;
    }
}