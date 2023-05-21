import axios from 'axios';

export default () => {

    App.FormsAjax = {
        init: () => {

            document.querySelectorAll('.js--webform:not(._ajax-webform-init)').forEach((form) => {

                function setErrors(errors) {

                    let otherErrorsTexts = [];

                    for (let key in errors) {

                        let input = form.querySelector('[name="' + key + '"]');
                        if (!input) input = form.querySelector('[name="' + key + '[]"]');
                        if (!input) {
                            otherErrorsTexts.push(errors[key]);
                        } else {
                            const inputContainer = input.closest('.form-item'),
                                errorText = inputContainer.querySelector('.form-item__error');
                            errorText.innerHTML = errors[key];
                            inputContainer.classList.add('_error');
                        }

                    }

                    if (otherErrorsTexts.length) {
                        const otherErrors = form.querySelector('.form-item._other-errors');
                        otherErrors.innerHTML = otherErrorsTexts.join('<br>');
                    }

                }

                function clearInputs(){

                    form.querySelectorAll('[type=text], [type=tel], [type=email]').forEach((input) => {
                        input.value = '';
                        input.dispatchEvent(new Event('change'));
                    });

                }

                form.addEventListener('submit', async (e) => {
                    e.preventDefault();

                    if (form.classList.contains('_disabled')) return;

                    form.classList.add('_disabled');

                    const formData = new FormData(form);
                    
                    if (form.dataset.recaptcha !== undefined) {
                        await grecaptcha.execute(App.RECAPTCHA_SITE_KEY, {action: 'submit'}).then((token) => {
                            formData.append('g_recaptcha_response', token);
                        });
                    }

                    axios.post(form.action, formData)
                        .then((response) => {

                            form.classList.remove('_disabled');

                            const data = response.data;

                            form.querySelectorAll('.form-item').forEach((formItem) => {
                                formItem.classList.remove('_error');
                            });

                            if (data.STATUS !== undefined) {

                                switch (data.STATUS) {
                                    case 'ERROR':

                                        setErrors(data.ERRORS);

                                        break;
                                    case 'OK':

                                        clearInputs();

                                        App.Popup.openPopupSuccess({
                                            title: data.SUCCESS_TITLE,
                                            text: data.SUCCESS_TEXT
                                        });

                                        App.Seo.send('formSend', data.WEBFORM_SID);

                                        break;
                                }

                            } else if (data.success !== undefined) {

                                if (data.success === false) {

                                    setErrors(data.errors);

                                } else if (data.success === true) {

                                    clearInputs();

                                    App.Popup.openPopupSuccess({
                                        title: data.response.SUCCESS_TITLE,
                                        text: data.response.SUCCESS_TEXT
                                    });

                                    App.Seo.send('formSend', data.response.WEBFORM_SID);

                                }

                            }

                        })
                        .catch((error) => {
                            form.classList.remove('_disabled');
                            console.log(error);
                        });

                });

                form.classList.add('_ajax-webform-init');

            });

        }
    }
    App.FormsAjax.init();

}