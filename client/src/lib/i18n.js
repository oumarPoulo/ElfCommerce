import Cookie from 'js-cookie';
import messagesEn from '../utils/translations/en';
import messagesFr from '../utils/translations/fr';

const messages = { 'en': messagesEn, 'fr': messagesFr };

export const defaultLocale = 'en';

export const getLocale = () => Cookie.get('locale') || defaultLocale;

export const saveLocale = (locale) => {
  Cookie.set('locale', locale, { expires: 365 });
};

export const getMessages = (locale) => messages[locale];
