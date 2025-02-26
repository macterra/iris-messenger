import { html } from 'htm/preact';
import { route } from 'preact-router';

import Component from '../../BaseComponent';
import Helpers from '../../Helpers';
import Icons from '../../Icons';
import localState from '../../LocalState';
import { translate as t } from '../../translations/Translation';

const SETTINGS = {
  account: 'account',
  iris_account: 'iris.to',
  appearance: 'appearance',
  media: 'media',
  network: 'network',
  backup: 'backup',
  language: 'language',
  social_network: 'social_network',
};

export default class SettingsMenu extends Component {
  menuLinkClicked(url, e) {
    e.preventDefault();
    localState.get('toggleSettingsMenu').put(false);
    localState.get('scrollUp').put(true);
    route(`/settings/${url}`);
  }

  render() {
    const activePage = this.props.activePage || 'account';
    return (
      <>
        <div className={!this.props.activePage ? 'settings-list' : 'settings-list hidden-xs'}>
          {Helpers.isElectron
            ? html`<div class="electron-padding" />`
            : html` <h3 class="visible-xs-block" style="padding: 0px 15px;">${t('settings')}</h3> `}
          {Object.keys(SETTINGS).map((page) => {
            return (
              <a
                href="#"
                class={activePage === page && window.innerWidth > 624 ? 'active' : ''}
                onClick={(e) => this.menuLinkClicked(page, e)}
                key={page}
              >
                <span class="text">
                  {t(SETTINGS[page])}
                  {page === 'language' && <small className="mar-left5">{Icons.language}</small>}
                </span>
              </a>
            );
          })}
        </div>
      </>
    );
  }
}
