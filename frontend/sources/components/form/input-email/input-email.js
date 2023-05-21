import Inputmask from "inputmask";

export default () => {

    App.FormInputEmail = {
        init: () => {

            document.querySelectorAll('.js--input-email:not(._init-input-email)').forEach((inputEmail) => {

                Inputmask({
                    alias: 'email',
                    showMaskOnHover: false,
                }).mask(inputEmail);

                inputEmail.classList.add('_init-input-email');

            });

        }
    }
    App.FormInputEmail.init();

}