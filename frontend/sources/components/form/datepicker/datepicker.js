import Datepicker from 'vanillajs-datepicker/Datepicker';
import ru from 'vanillajs-datepicker/locales/ru';

Object.assign(Datepicker.locales, ru)

export default () => {

    App.FormDatepicker = {

        init: () => {

            document.querySelectorAll('.js--datepicker:not(._datepicker-init)').forEach((input) => {

                new Datepicker(input, {
                    language: 'ru',
                    autohide: true
                });

                input.classList.add('_datepicker-init');

            });

        }

    }
    App.FormDatepicker.init();

}