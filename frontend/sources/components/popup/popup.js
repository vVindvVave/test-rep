import { Fancybox } from "@fancyapps/ui/src/Fancybox";
import "@fancyapps/ui/dist/fancybox.css";

export default () => {

    App.Popup = {
        popupOptions: {
            autoFocus: false,
            trapFocus: false,
            placeFocusBack: false,
            dragToClose: false,
            hideScrollbar: true,
            mainClass: 'popup',
            showClass: 'showClass',
            hideClass: 'hideClass',
            animated: false,
            template: {
                closeButton: '<svg class="svg-icon"><use xlink:href="#X"></use></svg>'
            },
            l10n: {
                CLOSE: "Закрыть",
            },
            on: {
                done: (fancybox, slide) => {
                    App.update();
                }
            }
        },
        init: function(){

            // переопределяю метод. т.к. есть проблема. см. внутри метода
            Fancybox.prototype.onClick = this.onClick;

            Fancybox.bind('.js--popup', this.popupOptions);

        },
        openAjax: function(src){

            new Fancybox([
                {
                    src: src,
                    type: "ajax"
                }
            ], this.popupOptions);

        },
        openPopupSuccess: function(opt){

            Fancybox.close();

            let html = '<div class="popup-success"><div>';
            if (opt.title != undefined) html += '<div class="title">'+opt.title+'</div>';
            if (opt.text != undefined) html += '<div class="text">'+opt.text+'</div>';
            html += '</div></div>';

            new Fancybox([
                {
                    src: html,
                    type: "html"
                }
            ], this.popupOptions);

        },
        onClick: function (event) {

            if (event.defaultPrevented) {
                return;
            }

            let eventTarget = event.composedPath()[0];

            if (eventTarget.matches("[data-fancybox-close]")) {
                event.preventDefault();
                Fancybox.close(false, event);

                return;
            }

            if (eventTarget.matches("[data-fancybox-next]")) {
                event.preventDefault();
                Fancybox.next();

                return;
            }

            if (eventTarget.matches("[data-fancybox-prev]")) {
                event.preventDefault();
                Fancybox.prev();

                return;
            }

            const activeElement = document.activeElement;

            if (activeElement) {
                if (activeElement.closest("[contenteditable]")) {
                    return;
                }
            }

            // Skip if clicked inside content area

            // меняю проверку в этом месте, т.к. она не учитывает теневой DOM
            // if (eventTarget.closest(".fancybox__content")) {
            if (event.composedPath().includes(document.querySelector('.fancybox__content'))) {
                return;
            }

            // Skip if text is selected
            if (getSelection().toString().length) {
                return;
            }

            if (this.trigger("click", event) === false) {
                return;
            }

            const action = this.option("click");

            switch (action) {
                case "close":
                    this.close();
                    break;
                case "next":
                    this.next();
                    break;
            }

        }
    };
    App.Popup.init();

}