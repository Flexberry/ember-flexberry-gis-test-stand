import Ember from 'ember';

export default Ember.Controller.extend({
  sitemap: Ember.computed('i18n.locale', function () {
    let i18n = this.get('i18n');

    return {
      nodes: [
        {
          link: 'index',
          caption: i18n.t('forms.application.sitemap.index.caption'),
          title: i18n.t('forms.application.sitemap.index.title'),
          children: null
        }, {
          link: null,
          caption: i18n.t('forms.application.sitemap.flexberry-gis-test-stand.caption'),
          title: i18n.t('forms.application.sitemap.flexberry-gis-test-stand.title'),
          children: [{
            link: 'i-i-s-flexberry-gis-test-stand-request-l',
            caption: i18n.t('forms.application.sitemap.flexberry-gis-test-stand.i-i-s-flexberry-gis-test-stand-request-l.caption'),
            title: i18n.t('forms.application.sitemap.flexberry-gis-test-stand.i-i-s-flexberry-gis-test-stand-request-l.title'),
            children: null
          }, {
            link: 'i-i-s-flexberry-gis-test-stand-address-l',
            caption: i18n.t('forms.application.sitemap.flexberry-gis-test-stand.i-i-s-flexberry-gis-test-stand-address-l.caption'),
            title: i18n.t('forms.application.sitemap.flexberry-gis-test-stand.i-i-s-flexberry-gis-test-stand-address-l.title'),
            children: null
          }, {
            link: 'i-i-s-flexberry-gis-test-stand-author-l',
            caption: i18n.t('forms.application.sitemap.flexberry-gis-test-stand.i-i-s-flexberry-gis-test-stand-author-l.caption'),
            title: i18n.t('forms.application.sitemap.flexberry-gis-test-stand.i-i-s-flexberry-gis-test-stand-author-l.title'),
            children: null
          }]
        }, {
        link: 'maps',
        caption: i18n.t('forms.application.sitemap.maps.caption'),
        title: i18n.t('forms.application.sitemap.maps.title'),
        children: null
      }]
    };
  }),

  /**
    Locales supported by application.

    @property locales
    @type String[]
    @default ['ru', 'en']
  */
  locales: ['ru', 'en'],

  /**
    Handles changes in userSettingsService.isUserSettingsServiceEnabled.

    @method _userSettingsServiceChanged
    @private
  */
  _userSettingsServiceChanged: Ember.observer('userSettingsService.isUserSettingsServiceEnabled', function() {
    this.get('target.router').refresh();
  }),

  /**
    Initializes controller.
  */
  init() {
    this._super(...arguments);

    let i18n = this.get('i18n');
    if (Ember.isNone(i18n)) {
      return;
    }

    // If i18n.locale is long value like 'ru-RU', 'en-GB', ... this code will return short variant 'ru', 'en', etc.
    let shortCurrentLocale = this.get('i18n.locale').split('-')[0];
    let availableLocales = Ember.A(this.get('locales'));

    // Force current locale to be one of available,
    // if browser's current language is not supported by dummy application,
    // or if browser's current locale is long value like 'ru-RU', 'en-GB', etc.
    if (!availableLocales.contains(shortCurrentLocale)) {
      i18n.set('locale', 'en');
    } else {
      i18n.set('locale', shortCurrentLocale);
    }
  },

  /**
    Service that triggers objectlistview events.

    @property objectlistviewEventsService
    @type Service
  */
  objectlistviewEventsService: Ember.inject.service('objectlistview-events'),

  actions: {
    toggleSidebar() {
      let sidebar = Ember.$('.ui.sidebar.main.menu');
      let objectlistviewEventsService = this.get('objectlistviewEventsService');
      sidebar.sidebar({
        closable: false,
        dimPage: false,
        onHide: function() {
          Ember.$('.sidebar.icon.text-menu-1').removeClass('hidden-menu');
          Ember.$('.sidebar.icon.text-menu-2').addClass('hidden-menu');
        },
        onHidden: function() {
          objectlistviewEventsService.updateWidthTrigger();
        }
      }).sidebar('toggle');

      if (Ember.$('.inverted.vertical.main.menu').hasClass('visible')) {
        Ember.$('.sidebar.icon.text-menu-1').removeClass('hidden-menu');
        Ember.$('.sidebar.icon.text-menu-2').addClass('hidden-menu');
      } else {
        Ember.$('.sidebar.icon.text-menu-1').addClass('hidden-menu');
        Ember.$('.sidebar.icon.text-menu-2').removeClass('hidden-menu');
      }

      if (Ember.$('.inverted.vertical.main.menu').hasClass('visible')) {
        Ember.$('.full.height').css({ transition: 'width 0.45s ease-in-out 0s', width: '100%' });
      } else {
        Ember.$('.full.height').css({ transition: 'width 0.3s ease-in-out 0s', width: 'calc(100% - ' + sidebar.width() + 'px)' });
      }
    },

    toggleSidebarMobile() {
      let sidebar = Ember.$('.ui.sidebar.main.menu');
      let objectlistviewEventsService = this.get('objectlistviewEventsService');
      sidebar.sidebar({
        onHide: function() {
          Ember.$('.sidebar.icon.text-menu-1').removeClass('hidden-menu');
          Ember.$('.sidebar.icon.text-menu-2').addClass('hidden-menu');
        },
        onHidden: function() {
          objectlistviewEventsService.updateWidthTrigger();
        }
      }).sidebar('toggle');

      if (Ember.$('.inverted.vertical.main.menu').hasClass('visible')) {
        Ember.$('.sidebar.icon.text-menu-1').removeClass('hidden-menu');
        Ember.$('.sidebar.icon.text-menu-2').addClass('hidden-menu');
        Ember.$('.bgw-opacity').addClass('hidden');
      } else {
        Ember.$('.sidebar.icon.text-menu-1').addClass('hidden-menu');
        Ember.$('.sidebar.icon.text-menu-2').removeClass('hidden-menu');
        Ember.$('.bgw-opacity').removeClass('hidden');
      }
    }
  }
});
