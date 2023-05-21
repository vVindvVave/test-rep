import Accordion from 'accordion-js';

export default () => {

    App.Accordion = {
        init: ()=>{

            document.querySelectorAll('.js--accordion:not(._accordion-init)').forEach(function (accordion) {
                try {

                    let openOnInit = [];
                    accordion.querySelectorAll('.js--accordion-element').forEach((accordionEl, index) => {
                        if (accordionEl.classList.contains('_active')) openOnInit.push(index);
                    });

                    new Accordion(accordion, {
                        elementClass: 'js--accordion-element',
                        triggerClass: 'js--accordion-trigger',
                        panelClass: 'js--accordion-panel',
                        activeClass: '_active',
                        showMultiple: true,
                        onlyChildNodes: false,
                        openOnInit: openOnInit
                    });

                    accordion.classList.add('_accordion-init');

                } catch (e) {
                    console.log(e);
                }
            });

        }
    }

    App.Accordion.init();

}
