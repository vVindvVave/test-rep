export default () => {
    var file = App.svg_symbol_file_path,
        revision = App.svg_symbol_file_revision;
    if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) return true;

    var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
        request,
        data,
        insertIT = function insertIT() {
            data = data.substr(0, 4) + ' style="display:none"' + data.substr(4);
            document.body.insertAdjacentHTML('afterbegin', data);
        },
        insert = function insert() {
            if (document.body) insertIT();else document.addEventListener('DOMContentLoaded', insertIT);
        };

    if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
        data = localStorage.getItem('inlineSVGdata');

        if (data) {
            insert();
            return true;
        }
    }

    try {
        request = new XMLHttpRequest();
        request.open('GET', file + '?v=' + revision, true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                data = request.responseText;
                insert();

                if (isLocalStorage) {
                    localStorage.setItem('inlineSVGdata', data);
                    localStorage.setItem('inlineSVGrev', revision);
                }
            }
        };

        request.send();
    } catch (e) {}
}