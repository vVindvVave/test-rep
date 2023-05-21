export default () => {

    const inputTextSelector = 'input[type=text], input[type=email], input[type=tel],  input[type=hidden], textarea, select';

    function toggleClass(formItem){

        const input = formItem.querySelector(inputTextSelector);

        if (input) {

            if (input.value !== '' || input.placeholder) {
                formItem.classList.add('_not-empty');
            } else {
                formItem.classList.remove('_not-empty');
            }

        }

    }

    App.FormItems = {

        init: () => {

            document.querySelectorAll('.form-item:not(._form-item-init)').forEach((formItem) => {

                toggleClass(formItem);

                const input = formItem.querySelector(inputTextSelector);

                if (input) {

                    switch (input.tagName) {
                        case 'SELECT':

                            input.addEventListener('change', (e) => {
                                toggleClass(formItem);
                            });

                            break;
                        default:

                            input.addEventListener('focus', (e) => {
                                formItem.classList.add('_not-empty');
                            });

                            input.addEventListener('blur', (e) => {
                                toggleClass(formItem);
                            });

                            input.addEventListener('change', (e) => {
                                toggleClass(formItem);
                            });

                    }

                }

                formItem.classList.add('_form-item-init');

            });

        }

    }
    App.FormItems.init();

}