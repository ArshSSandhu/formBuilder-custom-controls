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