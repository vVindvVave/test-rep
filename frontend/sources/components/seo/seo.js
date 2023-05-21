export default () => {

    App.Seo =  {

        init: function(){

            this.phoneClick();
            this.emailClick();
            this.socClick();
            this.callbackClick();
            this.doctorClick();
            this.appointmentClick();
            this.questionSeoClick();
            this.nalogClick();

        },

        send: function(eventType, eventName){

            try {

                switch (eventType) {

                    case 'formSend':

                        switch (eventName) {

                            case 'feedback':

                                // dataLayer.push({'event':'Feedback', 'eventCategory':'Feedback', 'eventAction':'send'});
                                
                                // ym(4782397, 'reachGoal', 'callback-form-send');
                                VK.Goal('lead');

                                gtag("event" , "event_name",{ "event_category": "callback-send_new", "event_action": "send"});
                                ym(4782397,'reachGoal','callback-send_new')

                                break;

                            case 'question-reproduct':

                                // dataLayer.push({'event':'POPREPRO', 'eventCategory':'POPREPRO', 'eventAction':'send'});

                                ym(4782397,'reachGoal','POPREPRO');

                                break;

                            case 'vacancies':

                                // dataLayer.push({'event':'Vacancy-response', 'eventCategory':'Vacancy-response', 'eventAction':'send'});

                                break;

                            case 'SUBSCRIBE':

                                // dataLayer.push({'event':'Subscribe', 'eventCategory':'Subscribe', 'eventAction':'send'});

                                // ym(4782397,'reachGoal','subscribe-form-send');
                                gtag("event" , "event_name",{ "event_category": "subscription_new", "event_action": "send"});
                                ym(4782397,'reachGoal','subscription_new')


                                break;
                                
                            case 'question-seo':

                                gtag("event" , "event_name",{ "event_category": "CEO_question_new", "event_action": "send"});
                                ym(4782397,'reachGoal','CEO_question_new-send')

                                break;

                            case 'nalog':

                                gtag("event" , "event_name",{ "event_category": "nalog-form_new", "event_action": "send"});
                                ym(4782397,'reachGoal','nalog_new-send')
                            
                                break;

                        }

                        break;

                }

            } catch (e) {
                console.log(e);
            }

        },

        phoneClick: function(){

            if(document.querySelector('.js-call-phone')){
                document.querySelectorAll('.js-call-phone').forEach(phone=>{
                    phone.addEventListener('click', function(){
                        gtag("event" , "event_name",{ "event_category": "phone_new", "event_action": "click"});
                        ym(4782397,'reachGoal','phone_new')
                    })
                })
            }

            // document.querySelectorAll('a[href^=tel]').forEach((tel) => {
            //
            //     tel.addEventListener('click', () => {
            //
            //         if (tel.closest('.header')) {
            //             dataLayer.push({'event':'Phone', 'eventCategory':'Phone', 'eventAction':'click', 'eventLabel': 'head'});
            //         } else if (tel.closest('.footer')) {
            //             dataLayer.push({'event':'Phone', 'eventCategory':'Phone', 'eventAction':'click', 'eventLabel': 'footer'});
            //         } else if (tel.closest('#charitable-foundation-contacts')) {
            //             dataLayer.push({'event':'Phone', 'eventCategory':'Phone', 'eventAction':'click', 'eventLabel': 'charitable-foundation'});
            //         } else if (tel.closest('#academy-rcc-contacts')) {
            //             dataLayer.push({'event':'Phone', 'eventCategory':'Phone', 'eventAction':'click', 'eventLabel': 'academy-rcc'});
            //         } else if (tel.closest('#career-contacts')) {
            //             dataLayer.push({'event':'Phone', 'eventCategory':'Phone', 'eventAction':'click', 'eventLabel': 'career'});
            //         } else if (tel.closest('#vacancy-contacts')) {
            //             dataLayer.push({'event':'Phone', 'eventCategory':'Phone', 'eventAction':'click', 'eventLabel': 'vacancies'});
            //         } else if (tel.closest('#contacts-contacts')) {
            //             dataLayer.push({'event':'Phone', 'eventCategory':'Phone', 'eventAction':'click', 'eventLabel': 'contacts'});
            //         } else if (tel.closest('#production-supliers-contacts')) {
            //             dataLayer.push({'event':'Phone', 'eventCategory':'Phone', 'eventAction':'click', 'eventLabel': 'supliers'});
            //         }
            //
            //     });
            //
            // });

        },

        emailClick: function(){

            // document.querySelectorAll('a[href^=mailto]').forEach((tel) => {
            //
            //     tel.addEventListener('click', () => {
            //
            //         if (tel.closest('.footer')) {
            //             dataLayer.push({'event':'Email', 'eventCategory':'Email', 'eventAction':'click', 'eventLabel': 'footer'});
            //         } else if (tel.closest('#charitable-foundation-contacts')) {
            //             dataLayer.push({'event':'Email', 'eventCategory':'Email', 'eventAction':'click', 'eventLabel': 'charitable-foundation'});
            //         } else if (tel.closest('#academy-rcc-contacts')) {
            //             dataLayer.push({'event':'Email', 'eventCategory':'Email', 'eventAction':'click', 'eventLabel': 'academy-rcc'});
            //         } else if (tel.closest('#career-contacts')) {
            //             dataLayer.push({'event':'Email', 'eventCategory':'Email', 'eventAction':'click', 'eventLabel': 'career'});
            //         } else if (tel.closest('#vacancy-contacts')) {
            //             dataLayer.push({'event':'Email', 'eventCategory':'Email', 'eventAction':'click', 'eventLabel': 'vacancies'});
            //         } else if (tel.closest('#contacts-contacts')) {
            //             dataLayer.push({'event':'Email', 'eventCategory':'Email', 'eventAction':'click', 'eventLabel': 'contacts'});
            //         } else if (tel.closest('#production-supliers-contacts')) {
            //             dataLayer.push({'event':'Email', 'eventCategory':'Email', 'eventAction':'click', 'eventLabel': 'supliers'});
            //         }
            //
            //     });
            //
            // });

        },

        socClick: function(){

            if(document.querySelector('.footer__soc__item')){
                document.querySelectorAll('.footer__soc__item').forEach(item=>{
                    item.addEventListener('click', function(){
                        ym(4782397,'reachGoal','social_new-click')

                        switch(item.dataset.network){
                            case 'vk':
                                gtag("event" , "event_name",{ "event_category": "social_new-click", "event_action": "vk"});

                                break;

                            case 'youtube':
                                gtag("event" , "event_name",{ "event_category": "social_new-click", "event_action": "youtube"});

                                break;

                            case 'telegram':
                                gtag("event" , "event_name",{ "event_category": "social_new-click", "event_action": "telegram"});

                                break;
                        }  
                    })
                })
            }

            // document.querySelectorAll('.f-soc a').forEach((btn) => {
            //
            //     btn.addEventListener('click', () => {
            //
            //         if (btn.textContent === 'Facebook') {
            //             dataLayer.push({'event':'Social', 'eventCategory':'Social', 'eventAction':'click', 'eventLabel': 'facebook'});
            //         } else if (btn.textContent === 'YouTube') {
            //             dataLayer.push({'event':'Social', 'eventCategory':'Social', 'eventAction':'click', 'eventLabel': 'youtube'});
            //         }  else if (btn.textContent === 'ВКонтакте') {
            //             dataLayer.push({'event':'Social', 'eventCategory':'Social', 'eventAction':'click', 'eventLabel': 'vk'});
            //         }  else if (btn.textContent === 'Instgram') {
            //             dataLayer.push({'event':'Social', 'eventCategory':'Social', 'eventAction':'click', 'eventLabel': 'inst'});
            //         }  else if (btn.textContent === 'Telegram') {
            //             dataLayer.push({'event':'Social', 'eventCategory':'Social', 'eventAction':'click', 'eventLabel': 'telegram'});
            //         }
            //
            //     });
            //
            // });

        },

        callbackClick: function(){
            if(document.querySelector('.js-call-callback')){
                document.querySelectorAll('.js-call-callback').forEach(callback=>{
                    callback.addEventListener('click', function(){
                        gtag("event" , "event_name",{ "event_category": "callback-click_new", "event_action": "click"});
                        ym(4782397,'reachGoal','callback-click_new')
                    })
                })
            }
        },

        doctorClick: function(){
            if(document.querySelector('.js-call-doctor')){
                document.querySelectorAll('.js-call-doctor').forEach(doctor=>{
                    doctor.addEventListener('click', function(){
                        gtag("event" , "event_name",{ "event_category": "call-doctor-click_new", "event_action": "click"});
                        ym(4782397,'reachGoal','call-doctor-click_new')
                    })
                })
            }
        },

        appointmentClick: function(){
            if(document.querySelector('.js-call-appointment')){
                document.querySelectorAll('.js-call-appointment').forEach(appointment=>{
                    appointment.addEventListener('click', function(){
                        gtag("event" , "event_name",{ "event_category": "entry-click_new", "event_action": "click"});
                        ym(4782397,'reachGoal','entry-click_new')
                    })
                })
            }
        },

        questionSeoClick: function(){
            if(document.querySelector('.js-call-question-seo')){
                document.querySelectorAll('.js-call-question-seo').forEach(question=>{
                    question.addEventListener('click', function(){
                        gtag("event" , "event_name",{ "event_category": "CEO_question_new", "event_action": "click"});
                        ym(4782397,'reachGoal','CEO_question_new-click')
                    })
                })
            }
        },

        nalogClick: function(){
            if(document.querySelector('.js-call-nalog')){
                document.querySelectorAll('.js-call-nalog').forEach(nalog=>{
                    nalog.addEventListener('click', function(){
                        gtag("event" , "event_name",{ "event_category": "nalog_new", "event_action": "click"});
                        ym(4782397,'reachGoal','nalog_new-click')
                    })
                })
            }
        },


    };

    App.Seo.init();

}