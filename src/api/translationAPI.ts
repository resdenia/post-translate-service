
const BASE_URL =
    'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=es,fr&from=en';

const API_KEY = '083f98b1ea1e49bcbadc13de4616d9a8'
const LOCATION = 'centralus'


interface IBody {
    text: string;
}
interface ITranslation {
    text: string;
}
class Translation {
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

    customFetch = async (body: IBody[], method: string, headers: HeadersInit) => {
        const bodyDisplay: BodyInit = JSON.stringify(body);
        const headerToSend: HeadersInit = headers || {};

        const fetchObject: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headerToSend,
            },
            ...(method !== 'GET' ? { body: bodyDisplay } : {}),
        };

        const res = await fetch(`${this.baseUrl}`, fetchObject);
        return this.checkResponse(res);
    };

    translatePostAPI = async (data: ITranslation[]) => this.customFetch(data, 'POST', {
        'Ocp-Apim-Subscription-Key': API_KEY,
        'Ocp-Apim-Subscription-Region': LOCATION
    });
}

const translationApi = new Translation();

export default translationApi;
