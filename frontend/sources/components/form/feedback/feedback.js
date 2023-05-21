export default () => {

	App.FormFeedback = {

		init: () => {

			document.querySelectorAll('.js-feedback-hide-date:not(._feedback-hide-date-init)').forEach((el) => {

				const formFeedbackDatepicker = el.querySelector(".form__from-to-row");
				const formFeedbackToggler = el.querySelector(".form__toggler");

				formFeedbackToggler.addEventListener("click", function (){
					formFeedbackDatepicker.classList.toggle("is-hidden");
				});

				el.classList.add('_feedback-hide-date-init');

			});

			//Выбор специализации

			function selectSpec(el){
				const elementId = el.selectedIndex;
				let target = el[elementId];
				let doctors = target.getAttribute('data-doctors');
				const directionId = target.getAttribute('data-value-id');
				const currentForm = document.querySelector('.js--webform-doctor-and-spec');

				currentForm.querySelectorAll('.js-form-select-doctor-option').forEach((el) => {
					el.setAttribute("disabled", true);
				})
				currentForm.querySelector(".js-form-select-doctor-option[data-empty]").removeAttribute("disabled");
				if (directionId === 0) {
				} else {
					if (doctors && doctors.length > 0) {
						doctors = JSON.parse(doctors);
						doctors.forEach((element) => {
							if (document.getElementById('question-doctor-' + element) !== null) {
								document.getElementById('question-doctor-' + element).removeAttribute("disabled", false);
							}
						})
					} else {
						currentForm.querySelectorAll('.js-form-select-doctor-option').forEach((el) => {
							el.removeAttribute("disabled", false);
						})
					}
				}

				currentForm.querySelector("input.js-webform-direction-id").value = directionId
			}


			//Выбор врача

			function selectDoctor(el){
				const elementId = el.selectedIndex;
				let target = el[elementId];
				let directions = target.getAttribute('data-directions');
				const doctorId = target.getAttribute('data-value-id');
				const currentForm = document.querySelector('.js--webform-doctor-and-spec');

				currentForm.querySelectorAll('.js-form-select-direction-option').forEach((el) => {
					el.setAttribute("disabled", true);
				})
				currentForm.querySelector(".js-form-select-direction-option[data-empty]").removeAttribute("disabled");
				if (doctorId === 0) {
				} else {
					if (directions && directions.length > 0) {
						directions = JSON.parse(directions);
						directions.forEach((element) => {
							if (document.getElementById('question-direction-' + element) !== null) {
								document.getElementById('question-direction-' + element).removeAttribute("disabled");
							}
						})
					} else {
						currentForm.querySelectorAll('.js-form-select-direction-option').forEach((el) => {
							el.removeAttribute("disabled");
						})
					}
				}

				currentForm.querySelector("input.js-webform-doctor-id").value = doctorId
			}

			document.querySelectorAll('.js--webform-doctor-and-spec').forEach((el) => {
				const doctorFormSelect = el.querySelector(".js-form-question-doctor")
				const specFormSelect = el.querySelector(".js-form-question-direction")
				doctorFormSelect.addEventListener("change", () => {selectDoctor(doctorFormSelect)})
				specFormSelect.addEventListener("change", () => {selectSpec(specFormSelect)})
				selectSpec(specFormSelect)
				selectDoctor(doctorFormSelect)
			})

		},
		checkHash: () => {

			if (location.hash === '#callback_form') {
				App.Popup.openAjax('/ajax/forms/feedback.php');
			}

		}

	}
	App.FormFeedback.init();
	App.FormFeedback.checkHash();

}