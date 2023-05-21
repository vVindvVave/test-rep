import intlTelInput from 'intl-tel-input';
import intl_tel_input_utils from 'intl-tel-input/build/js/utils.js';
import 'intl-tel-input/build/css/intlTelInput.css';
import IMask from 'imask';

export default () => {

    App.FormInputPhone = {
        init: () => {

            document.querySelectorAll('.js--input-phone:not(._init-input-phone)').forEach((inputTel) => {


                // создаю поле в котором будет номер телефона с кодом страны
                let inputHidden = document.createElement("input");
                inputHidden.setAttribute('type', "hidden");
                inputHidden.setAttribute('name', inputTel.name);
                inputTel.after(inputHidden);

                // удаляю атрибут name у изначального поля телефона
                inputTel.removeAttribute('name');

                let placeholder = '';

                // инициализирую выбор кода страны
                const iti = intlTelInput(inputTel, {
                    preferredCountries: ["ru"],
                    separateDialCode: true,
                    customPlaceholder: function (selectedCountryPlaceholder) {
                        placeholder = selectedCountryPlaceholder;
                        return placeholder.replace(/[0-9]/g, 'X');
                    },
                    utilsScript: intl_tel_input_utils,
                });

                // инициализирую маску
                const mask = new IMask(inputTel, {
                    mask: placeholder.replace(/[0-9]/g, '0'),
                    lazy: false,
                    placeholderChar: 'X'
                });

                // при смене кода страны чищу поле и переопределяю маску
                inputTel.addEventListener('countrychange', () => {
                    inputHidden.value = '';
                    mask.value = '';
                    mask.updateOptions({mask: placeholder.replace(/[0-9]/g, '0')});
                });

                // при изменении поля телефона изменяю скрытое поле
                inputTel.addEventListener('input', () => {
                    inputHidden.value = iti.getSelectedCountryData().dialCode + ' ' + mask.value;
                });

                inputTel.classList.add('_init-input-phone');

                inputTel.style.paddingLeft = "18px"
                inputTel.style.color = "transparent";

                let label = inputTel.closest(".form-item").querySelector(".form-item__label")

                label.style.fontSize = "16px";
                label.style.paddingTop = "17px";

                inputTel.addEventListener("focus", function (){
                    inputTel.closest(".iti").classList.add("iti_active")
                    inputTel.style.paddingLeft = "90px"
                    inputTel.style.color = "";
                    label.style.fontSize = "12px";
                    label.style.paddingTop = "3px";
                })

                let itiElem = inputTel.closest(".form-item")
                let phInput = itiElem.querySelector(".js--input-phone");

                document.addEventListener("click", function (e){
                    itiElem = inputTel.closest(".form-item")
                    if (!e.path.includes(itiElem) && !phInput.value.indexOf("X") > 0 && screen.width > 768){
                        inputTel.closest(".iti").classList.remove("iti_active")
                        inputTel.style.paddingLeft = "18px"
                        inputTel.style.color = "transparent";
                        label.style.fontSize = "16px";
                        label.style.paddingTop = "17px";
                    }
                })
            });

        }
    }
    App.FormInputPhone.init();

}