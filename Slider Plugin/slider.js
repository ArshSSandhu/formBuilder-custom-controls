/**
 * Slider Plugin for formBuilder
 * Author: Arshpreet Singh Sandhu
 * License: MIT
 */

export default function sliderPlugin(controlMap) {
    const base = controlMap.text;
  
    class SliderControl extends base {
      static get definition() {
        return {
          icon: '🎚️',
          i18n: {
            default: 'Slider'
          },
          defaultAttrs: {
            label: 'Select Value',
            className: 'slider-control',
            description: 'Use the slider to select a value.',
            min: 0,
            max: 100,
            step: 1,
            value: 50
          }
        };
      }
  
      configure() {
        this.classConfig = {
          min: this.config.min || 0,
          max: this.config.max || 100,
          step: this.config.step || 1,
          value: this.config.value || 50,
        };
      }
  
      build() {
        const config = this.config;
        const input = this.markup('input', null, {
          type: 'range',
          min: config.min,
          max: config.max,
          step: config.step,
          value: config.value,
          className: 'slider-input'
        });
  
        const output = this.markup('span', config.value, {
          className: 'slider-output'
        });
  
        input.addEventListener('input', e => {
          output.textContent = e.target.value;
        });
  
        const wrapper = this.markup('div', [input, output], {
          className: 'slider-wrapper'
        });
  
        this.field = wrapper;
        return {
          field: wrapper,
          layout: 'noLabel'
        };
      }
  
      value() {
        const input = this.field.querySelector('input');
        return input ? input.value : '';
      }
  
      input(value) {
        const config = this.config;
        const input = this.markup('input', null, {
          type: 'range',
          min: config.min,
          max: config.max,
          step: config.step,
          value: value,
          className: 'slider-input'
        });
  
        const output = this.markup('span', value, {
          className: 'slider-output'
        });
  
        input.addEventListener('input', e => {
          output.textContent = e.target.value;
        });
  
        return this.markup('div', [input, output], {
          className: 'slider-wrapper'
        });
      }
    }
  
    base.register('slider', SliderControl);
    return SliderControl;
  }
  