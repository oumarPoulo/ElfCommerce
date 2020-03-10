import React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import localeEn from 'react-intl/locale-data/en';
import localeFr from 'react-intl/locale-data/fr';

import * as i18n from '../lib/i18n';

addLocaleData([...localeEn, ...localeFr]);

const Context = React.createContext();

class IntlProviderWrapper extends React.Component{

  constructor (props) {
    super(props);
    const locale = i18n.getLocale();
    const messages = i18n.getMessages(locale);
    // need to pass everything in component state to avoid creating object inside render method
    this.state = {
      locale: locale,
      messages: messages,
      switchLocale: this.switchLocale,
    };
  }

  switchLocale = (locale) => {
    i18n.saveLocale(locale);
    this.setState({
      locale:locale,
      messages: i18n.getMessages(locale),
    });
  };

  render () {
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    const { locale, messages } = this.state;
    return (
      <Context.Provider value={this.state}>
        <IntlProvider
          key={locale}
          locale={locale}
          messages={messages}
          defaultLocale={i18n.defaultLocale}
        >
          {children}
        </IntlProvider>
      </Context.Provider>
    );
  }
}

export { IntlProviderWrapper, Context as IntlContext };
