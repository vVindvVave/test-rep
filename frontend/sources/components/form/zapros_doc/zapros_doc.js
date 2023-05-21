export default () => {

    App.FormZaprosDoc = {

        init: () => {

            document.querySelectorAll('.form-item__checkbox._one-person:not(._persCheckb_init)').forEach((persCheckb) => {

                const checkbox = persCheckb.querySelector('input[type=checkbox]');

                checkbox.addEventListener('change', () => {

                    if (checkbox.checked) {
                        document.querySelector('.patient_fields').style.display = 'none';
                        document.querySelector('input[name=condition_face_taxpayer]').value = 'Да'
                    }else{
                        document.querySelector('.patient_fields').style.display = 'block';
                        document.querySelector('input[name=condition_face_taxpayer]').value = 'Нет'
                    }
                });

                persCheckb.classList.add('_persCheckb_init');

            });

            document.querySelectorAll('select[name=addressSelect]:not(._addressSelect_init)').forEach((select) => {

                select.addEventListener('change', () => {
                    console.log(select.value);
                    if (select.value == 'Почтой России (за пределы Москвы и МО)'){
                        document.querySelector('.home_adress').style.display = 'block';
                    }else{
                        document.querySelector('.home_adress').style.display = 'none';
                    }
                });

                select.classList.add('_addressSelect_init');

            });

            document.querySelectorAll('.onlyNumber:not(._onlyNumber_init)').forEach((onlyNumber) => {

                onlyNumber.addEventListener('input', (e) => {
                    e.target.value = e.target.value.replace(/[A-Za-zА-Яа-яЁё]/, '');
                });

                onlyNumber.classList.add('_onlyNumber_init');

            });



        }

    }
    App.FormZaprosDoc.init();

}