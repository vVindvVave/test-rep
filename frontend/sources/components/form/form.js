import formItem from './form-item/form-item.js';
import ajax from './ajax/ajax.js';
import inputPhone from './input-phone/input-phone.js';
import inputEmail from './input-email/input-email.js';
import textarea from './textarea/textarea.js';
import datepicker from './datepicker/datepicker.js';
import file from './file/file.js';
import zaprosDoc from './zapros_doc/zapros_doc.js';
import feedback from './feedback/feedback.js';

export default () => {

    formItem();
    ajax();
    inputPhone();
    inputEmail();
    textarea();
    datepicker();
    file();
    zaprosDoc();
    feedback();
    
}