export default () => {

    App.FormTextarea = {
        init: () => {

            function maxLength(el) {
                if (!('maxLength' in el)) {
                    let max = el.attributes.maxLength.value;
                    el.onkeypress = function () {
                        if (this.value.length >= max) return false;
                    };
                }
            }

            document.querySelectorAll('.form-item textarea:not(._textarea-init)').forEach((textarea) => {

                const formItem = textarea.closest('.form-item'),
                    cnt = formItem.querySelector('.js--textarea-cnt');

                textarea.addEventListener('input', () => {

                    textarea.style.minHeight = 'auto';
                    if (textarea.scrollHeight > textarea.clientHeight) {
                        textarea.style.minHeight = textarea.scrollHeight + 'px';
                    }

                    cnt.innerHTML = textarea.value.length;

                });

                textarea.classList.add('_textarea-init');

                maxLength(textarea);

            });

        }
    }
    App.FormTextarea.init();

}