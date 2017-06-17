export const ApiRequestInit: RequestInit = {
    method: "GET",
    headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
    }),
    mode: "cors",
    credentials: "omit",
    cache: "no-cache",
};

export function timeout(f: Promise<Response>, t: number) {
    return Promise.race([
        f,
        new Promise((_, rej) =>
            setTimeout(() => rej(new Error("Request Timeout")), t),
        ),
    ]);
}

export async function retry(req: Request): Promise<Response> {
    try {
        return fetch(req);
    } catch (e) {
        await new Promise(res => setTimeout(() => res(), 2000));
        return retry(req);
    }
}
