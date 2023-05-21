export default () => {

    App.FormFile = {

        init: () => {

            document.querySelectorAll('.js--webform .js--input-file:not(._input-file-init)').forEach((component) => {

                const inputFile = component.querySelector('input[type=file]'),
                    addBtn = component.querySelector('.js--input-file-add'),
                    text = component.querySelector('.js--input-file-text'),
                    deleteBtn = component.querySelector('.js--input-file-delete');

                addBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    inputFile.click();
                });

                inputFile.addEventListener('change', (e) => {
                    const files = e.target.files,
                        length = files.length;
                    if (length) {
                        if (length === 1) {
                            text.innerHTML = files[0].name;
                            component.classList.add('_filled');
                        } else {
                            text.innerHTML = text.dataset.multitext+': '+length;
                            component.classList.add('_filled');
                        }
                    } else {
                        component.classList.remove('_filled');
                    }
                });

                if (deleteBtn){
                    deleteBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        inputFile.value = null;
                        text.innerHTML = '';
                        component.classList.remove('_filled');
                    });
                }
                component.classList.add('_input-file-init');

            });

        }

    }
    App.FormFile.init();

}