export default function dateRangePlugin(controlMap) {
    const base = controlMap.text;
  
    class DateRangeControl extends base {
      static get definition() {
        return {
          icon: '📅',
          i18n: { default: 'Date Range' },
          defaultAttrs: {
            label: 'Select Date Range',
            className: 'date-range-picker-control',
            description: 'Pick a start and end date.'
          }
        };
      }

      build() {
        const start = this.markup('input', null, {
          type: 'date',
          name: this.name + '-start',
          class: 'date-start'
        });
  
        const end = this.markup('input', null, {
          type: 'date',
          name: this.name + '-end',
          class: 'date-end'
        });
  
        const wrapper = this.markup('div', [start, ' to ', end], {
          className: 'date-range-wrapper'
        });
  
        this.field = wrapper; 
        return {
          field: wrapper,
          layout: 'noLabel'
        };
      }

      input(value) {
        
        const [startVal, endVal] = (value || '').split(' to ');
  
        const start = this.markup('input', null, {
          type: 'date',
          name: this.name + '-start',
          class: 'date-start',
          value: startVal || ''
        });
  
        const end = this.markup('input', null, {
          type: 'date',
          name: this.name + '-end',
          class: 'date-end',
          value: endVal || ''
        });
  
        const wrapper = this.markup('div', [start, ' to ', end], {
          className: 'date-range-wrapper'
        });
  
        this.field = wrapper; 
        return wrapper;
      }