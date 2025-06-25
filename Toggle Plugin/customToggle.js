/**
 * Toggle Switch Plugin for formBuilder.
 * Author: Arshpreet Singh Sandhu
 * License: MIT
 */

export default function customTogglePlugin(controlMap) {
    const base = controlMap.text;
  
    class CustomToggleSwitch extends base {
      static get definition() {
        return {
          icon: '🔁',
          i18n: { default: 'Custom Toggle' },
          defaultAttrs: {
            label: 'Enable Option',
            description: 'Swipe between Yes / No',
            onText: 'Yes',
            offText: 'No'
          }
        };
      }
  
      build() {
        const { name, onText, offText } = this.config;
  
       
        const input = this.markup('input', null, {
          type: 'checkbox',
          name,
          id: name,
          style: 'opacity: 0; width: 0; height: 0; position: absolute;'
        });
  
        
        const sliderText = this.markup('span', offText, {
          style: `
            font-size: 14px;
            font-weight: bold;
            color: white;
            z-index: 1;
            pointer-events: none;
          `
        });
  
        
        const slider = this.markup('span', [sliderText], {
          style: `
            position: absolute;
            cursor: pointer;
            top: 0; left: 0;
            right: 0; bottom: 0;
            background-color: #ccc;
            border-radius: 34px;
            transition: 0.4s;
            display: flex;
            align-items: center;
            justify-content: center;
          `
        });
  
        
        const knob = this.markup('span', '', {
          style: `
            content: '';
            position: absolute;
            height: 26px;
            width: 26px;
            left: 2px;
            bottom: 2px;
            background-color: white;
            border-radius: 50%;
            transition: 0.4s;
          `
        });
  
        const toggle = this.markup('label', [input, slider, knob], {
          style: `
            position: relative;
            display: inline-block;
            width: 60px;
            height: 30px;
            margin: 10px;
          `
        });
  
       
        this.field = this.markup('div', [toggle], {});
        this.inputField = input;
        this.sliderText = sliderText;
        this.knob = knob;
  
        return {
          field: this.field,
          layout: 'noLabel'
        };
      }
  
      onRender() {
        const { onText, offText } = this.config;
        const input = this.inputField;
        const text = this.sliderText;
        const knob = this.knob;
  
        input.addEventListener('change', () => {
          const checked = input.checked;
          text.innerText = checked ? onText : offText;
  
        
          knob.style.transform = checked ? 'translateX(30px)' : 'translateX(0)';
          knob.style.transition = '0.4s';
          knob.parentElement.style.backgroundColor = checked ? '#4CAF50' : '#ccc';
        });
      }
  
      value() {
        return this.inputField.checked ? 'true' : 'false';
      }
  
      input(val) {
        const isChecked = val === 'true';
        this.inputField.checked = isChecked;
  
       
        this.inputField.dispatchEvent(new Event('change'));
      }
    }
  
    base.register('customToggle', CustomToggleSwitch);
    return CustomToggleSwitch;
  }
  