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
      const { name, onText = 'Yes', offText = 'No' } = this.config;
      const charWidth = 9; 
      const padding = 40;  
      const maxTextLength = Math.max(onText.length, offText.length);
      const toggleWidth = Math.max(70, maxTextLength * charWidth + padding);

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
          user-select: none;
        `
      });

      const slider = this.markup('span', [sliderText], {
        className: 'custom-toggle-slider',
        style: `
          position: absolute;
          cursor: pointer;
          top: 0; left: 0;
          right: 0; bottom: 0;
          background-color: #ccc;
          border-radius: 34px;
          transition: background-color 0.4s;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 10px;
        `
      });

      const knobSize = 26;
      const knobTranslate = toggleWidth - knobSize - 4;

      const knob = this.markup('span', '', {
        style: `
          position: absolute;
          height: ${knobSize}px;
          width: ${knobSize}px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          border-radius: 50%;
          transition: transform 0.4s;
        `
      });

      const toggle = this.markup('label', [input, slider, knob], {
        style: `
          position: relative;
          display: inline-block;
          width: ${toggleWidth}px;
          height: 30px;
          margin: 5px 0;
        `
      });

      this.field = this.markup('div', [toggle], {
        className: 'custom-toggle-wrapper'
      });

      this.inputField = input;
      this.sliderText = sliderText;
      this.knob = knob;
      this.slider = slider;
      this.knobTranslate = knobTranslate;

      return {
        field: this.field
      };
    }

    onRender() {
      const { onText = 'Yes', offText = 'No' } = this.config;
      const input = this.inputField;
      const text = this.sliderText;
      const knob = this.knob;
      const slider = this.slider;
      const knobTranslate = this.knobTranslate;

      const updateUI = () => {
        const checked = input.checked;
        text.innerText = checked ? onText : offText;
        knob.style.transform = checked ? `translateX(${knobTranslate}px)` : 'translateX(0)';
        slider.style.backgroundColor = checked ? '#4CAF50' : '#ccc';
      };

      input.addEventListener('change', updateUI);
      updateUI();
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
