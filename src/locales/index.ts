import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import XHR, { BackendOptions } from 'i18next-xhr-backend';

export interface IPayload {
    [key: string]: string | IPayload
}

export interface IResponse {
    status: number
}

export type TCallback = (payload: IPayload | null, response: IResponse) => void;

const context = require.context('locale/', true, /index.json/, 'lazy');
const contextKeys = context.keys();

i18n
    .use(XHR)
    .use(initReactI18next)
    .init({
        debug        : __DEVELOPMENT__,
        fallbackLng  : __DEVELOPMENT__ ? false : 'ru',
        lowerCaseLng : true,
        lng          : 'ru',
        interpolation: { escapeValue: false },
        keySeparator : '.',
        whitelist    : ['ru', 'en'],
        defaultNS    : 'index',
        ns           : 'index',
        react        : { useSuspense: true },
        backend      : {
            loadPath: './{{lng}}/{{ns}}.json',
            parse   : (payload: IPayload): IPayload => payload,
            ajax    : (url: string, options: BackendOptions, callback: TCallback) => {
                if(contextKeys.includes(url)) {
                    context(url)
                        .then((payload: IPayload) => {
                            callback(payload, { status: 200 });
                        })
                        .catch(() => {
                            callback(null, { status: 500 });
                        });
                } else {
                    callback(null, { status: 500 });
                }
            }
        }
    })
    .catch(console.error);

export default i18n;
