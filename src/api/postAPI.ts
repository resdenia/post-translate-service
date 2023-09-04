
const BASE_URL =
    'https://my.api.mockaroo.com';

const API_KEY = 'ad43d380'
class Posts {
    baseUrl: string;

    constructor() {
        this.baseUrl = BASE_URL;
    }

    checkResponse = async (res: Response) => {
        if (res.ok) {
            return await res.json();
        }
        // throw new Error('Something went wrong');
    };

    customFetch = async (slug: string, body: BodyInit, method: string, headers: HeadersInit) => {
        const bodyDisplay: BodyInit = body;

        const headerToSend: HeadersInit = headers || {};

        const fetchObject: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headerToSend,
            },
            ...(method !== 'GET' ? { body: bodyDisplay } : {}),
        };

        const res = await fetch(`${this.baseUrl}/${slug}`, fetchObject);
        return this.checkResponse(res);
    };

    getPosts = async () => this.customFetch('posts', {
    } as BodyInit, 'GET', {
        'X-API-Key': API_KEY
    });
}

const postsApi = new Posts();

export default postsApi;
