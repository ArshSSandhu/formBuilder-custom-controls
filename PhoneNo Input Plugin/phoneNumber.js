"use strict";

/**
 * Phone Number with Country Picker Plugin
 * Author: Arshpreet Singh Sandhu
 * License: MIT
 */

if (!window.fbControls) window.fbControls = [];

window.fbControls.push(function (controlClass) {
  class controlPhoneNumber extends controlClass {
    static get definition() {
      return {
        icon: '📞',
        i18n: {
          default: 'Phone Number',
        },
        defaultAttrs: {
          label: 'Phone Number',
          className: 'phone-number-control',
          description: 'Enter your number with country code.',
        },
      };
    }

    build() {
      const wrapper = this.markup('div', null, { className: 'phone-wrapper' });

      const select = this.markup('select', null, {
        class: 'country-code-select',
        name: this.name + '-code',
      });

      const countries = [
        { code: '+1', label: '🇺🇸 +1' },
        { code: '+91', label: '🇮🇳 +91' },
        { code: '+44', label: '🇬🇧 +44' },
        { code: '+81', label: '🇯🇵 +81' },
        { code: '+61', label: '🇦🇺 +61' },
      ];

      countries.forEach((c) => {
        const option = this.markup('option', c.label, {
          value: c.code,
        });
        select.appendChild(option);
      });

      const input = this.markup('input', null, {
        type: 'tel',
        class: 'phone-input',
        placeholder: '1234567890',
        name: this.name + '-number',
      });

      wrapper.appendChild(select);
      wrapper.appendChild(input);

      this.field = wrapper;
      return {
        field: wrapper,
      };
    }

    value() {
      const wrapper = this.field || this.element;
      const code = wrapper.querySelector('.country-code-select')?.value || '';
      const number = wrapper.querySelector('.phone-input')?.value || '';
      return `${code} ${number}`;
    }

    input(value = '') {
      const wrapper = this.markup('div', null, { className: 'phone-wrapper' });

      const [code = '+1', number = ''] = value.split(' ');

      const select = this.markup('select', null, {
        class: 'country-code-select',
        name: this.name + '-code',
      });

      const countries = [
        { code: '+1', label: '🇺🇸 +1' },
        { code: '+91', label: '🇮🇳 +91' },
        { code: '+44', label: '🇬🇧 +44' },
        { code: '+81', label: '🇯🇵 +81' },
        { code: '+61', label: '🇦🇺 +61' },
      ];

      countries.forEach((c) => {
        const option = this.markup('option', c.label, {
          value: c.code,
          selected: c.code === code,
        });
        select.appendChild(option);
      });

      const input = this.markup('input', null, {
        type: 'tel',
        class: 'phone-input',
        name: this.name + '-number',
        value: number,
      });

      wrapper.appendChild(select);
      wrapper.appendChild(input);
      return wrapper;
    }

    onRender() {
      console.log('📞 Phone Number control rendered');
    }
  }

  controlClass.register('phoneNumber', controlPhoneNumber);
});
