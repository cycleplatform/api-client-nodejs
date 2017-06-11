export interface OAuthToken {
    access_token: string;
    token_type: string;
    expires_in: number;
    created: number;
    refresh_token: string;
    scope: string;
}

export class Token implements OAuthToken {
    // tslint:disable-next-line:variable-name
    public access_token: string;
    // tslint:disable-next-line:variable-name
    public token_type: string;
    // tslint:disable-next-line:variable-name
    public expires_in: number;
    public created: number;
    // tslint:disable-next-line:variable-name
    public refresh_token: string;
    public scope: string;

    constructor(token: OAuthToken) {
        this.access_token = token.access_token;
        this.token_type = token.token_type;
        this.expires_in = token.expires_in;
        this.created = token.created;
        this.refresh_token = token.refresh_token;
        this.scope = token.scope;

        if (this.created === undefined) {
            this.created = Math.floor(Date.now() / 1000);
        }
    }
}
