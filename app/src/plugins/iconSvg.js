import IconSvg from '@/svg/IconSvg.vue';

// register global component
export default {
  install: (app, options) => { //eslint-disable-line
    app.component('IconSvg', IconSvg);
  },
};
