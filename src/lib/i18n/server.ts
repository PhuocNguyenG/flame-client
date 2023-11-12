import {createInstance} from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import {initReactI18next} from 'react-i18next/initReactI18next';
import {getOptions, Locale} from './setting';

// Initialize the i18n instance
const initI18next = async (lang: Locale) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string) =>
          // load the translation file depending on the language and namespace
          import(`./dictionaries/${language}.json`),
      ),
    )
    .init(getOptions(lang));

  return i18nInstance;
};

// It will accept the locale and namespace for i18next to know what file to load
export async function useTransServer(lang: Locale) {
  const i18nextInstance = await initI18next(lang);

  return {
    // This is the translation function we'll use in our components
    // e.g. t('Product')
    t: i18nextInstance.getFixedT(lang),
  };
}
