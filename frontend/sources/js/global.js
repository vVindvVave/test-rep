import { createApp, defineAsyncComponent } from 'vue/dist/vue.esm-bundler';

const VueAppSelector = document.querySelector("#app");
if (VueAppSelector) {
    const VueAppProps = VueAppSelector.dataset;
    const VueApp = createApp({
        data(){
            return {}
        },
        methods: {},
        mounted() {}
    }, VueAppProps);

    const Dropdown = defineAsyncComponent(() => import("../components/form/dropdown/Dropdown.vue")); VueApp.component('Dropdown', Dropdown);

    VueApp.mount(VueAppSelector);
}

import lazy from "../components/lazy/lazy.js"; lazy();
import popup from '../components/popup/popup.js'; popup();
import slider from '../components/slider/slider.js'; slider();
import form from '../components/form/form.js'; form();
import callButton from '../components/call-button/call-button.js'; callButton();
import seo from '../components/seo/seo.js'; seo();
import cookiePopup from '../components/cookie-popup/cookie-popup.js'; cookiePopup();

// pages
//['clinic'].map((pageName) => {
//    if (document.querySelector('.page').classList.contains('_'+pageName)) {
//        import('../pages/'+pageName+'/'+pageName+'.js').then(src => src.default());
//    }
//});

// components
// [].map((moduleName) => {
//     import('../components/'+moduleName+'/'+moduleName+'.js).then(src => src.default());
// });

App.update = () => {

    App.Lazy.update();
    App.FormItems.init();
    App.FormInputPhone.init();
    App.FormInputEmail.init();
    App.FormTextarea.init();
    App.FormsAjax.init();
    App.FormDatepicker.init();
    App.FormFile.init();

}