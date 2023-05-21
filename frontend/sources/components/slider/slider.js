import Swiper, {Navigation, Pagination, Autoplay, Thumbs, HashNavigation} from 'swiper';
import LazyLoad from 'vanilla-lazyload';

export default () => {

    App.Slider = {
        init: function () {

            document.querySelectorAll('.js--slider').forEach((component) => {

                const $slider = component.querySelector('.slider__slider'),
                    $pagination = component.querySelector('.slider__pagination');

                let slidesPerView = 1;
                let items = component.dataset.items;
                if (items) slidesPerView = items;
                let slidesPerViewTablet = slidesPerView;
                let itemsTablet = component.dataset.itemsTablet;
                if (itemsTablet) slidesPerViewTablet = itemsTablet;
                let slidesPerViewDesktop = slidesPerViewTablet;
                let itemsDesktop = component.dataset.itemsDesktop;
                if (itemsDesktop) slidesPerViewDesktop = itemsDesktop;

                let loop = false;
                let dataLoop = component.dataset.loop;
                if (dataLoop !== undefined) loop = true;
                let loopTablet = loop;
                let dataLoopTablet = component.dataset.loopTablet;
                if (dataLoopTablet === 'true') loopTablet = true;
                else if (dataLoopTablet === 'false') loopTablet = false;

                let autoHeigth = component.hasAttribute("data-auto-heigth") ?? false;

                let hash = component.hasAttribute("data-hash-nav") ? {watchState: true} : false;
                let hashLink = component.dataset.hashLink ?? false;

                let thumbsOn = component.hasAttribute("data-thumbs");
                let $thumbs, thumbs, thumbsInit
                if (thumbsOn) {
                    $thumbs = component.querySelector(".slider__thumbs-slider")

                    let thumbsWidth;
                    $thumbs.querySelectorAll(".slider__thumb").forEach(el => {
                        thumbsWidth += el.clientWidth;
                    });

                    let thumbsCount = $thumbs.querySelectorAll(".slider__thumb:not(.swiper-slide-duplicate)").length;

                    thumbs = new Swiper($thumbs, {
                        loop: thumbsWidth < component.clientWidth ? false : loop,
                        wrapperClass: 'slider__thumbs',
                        slideClass: 'slider__thumb',
                        slidesPerView: "auto",
                        watchSlidesProgress: true
                    })

                    thumbsInit = {
                        swiper: thumbs
                    };
                }

                let allowTouchMove = true;
                let dataAllowTouchMove = component.dataset.allowtouchmove;
                if (dataAllowTouchMove === 'false') allowTouchMove = false;

                let autoplay = false;
                let dataAutoplay = component.dataset.autoplay;
                if (dataAutoplay !== undefined) {
                    autoplay = {
                        delay: Number(dataAutoplay),
                        disableOnInteraction: false
                    };
                }

                let pagination = false;
                if ($pagination)
                    pagination = {
                        el: $pagination,
                        clickable: true,
                        bulletClass: 'slider__pagination__item',
                        bulletActiveClass: '_active',
                    }

                if (component.classList.contains('_slider-init')) {

                    $slider.swiper.update();

                } else {

                    const lazy = new LazyLoad({
                        elements_selector: '.swiper-lazy'
                    });

                    let slidesCount = $slider.querySelectorAll(".slider__slide").length;

                    new Swiper($slider, {
                        modules: [Navigation, Pagination, Autoplay, Thumbs, HashNavigation],
                        allowTouchMove: allowTouchMove,
                        wrapperClass: 'slider__slides',
                        slideClass: 'slider__slide',
                        speed: 1000,
                        loop: slidesCount < 2 ? false : loop,
                        autoplay: autoplay,
                        pagination: pagination,
                        slidesPerView: slidesPerView,
                        preloadImages: false,
                        watchOverflow: true,
                        hashNavigation: hash,
                        autoHeight: autoHeigth,
                        navigation: {
                            nextEl: component.querySelector('.js--slider-next'),
                            prevEl: component.querySelector('.js--slider-prev')
                        },
                        thumbs: thumbsInit,
                        breakpoints: {
                            767: {
                                slidesPerView: slidesPerViewTablet,
                                loop: slidesCount < slidesPerViewTablet ? false : loopTablet,
                            },
                            1024: {
                                slidesPerView: slidesPerViewDesktop,
                                loop: slidesCount < slidesPerViewDesktop ? false : loopTablet,
                            }
                        },
                        on: {
                            slideChange: () => {
                                lazy.update();
                            }
                        }
                    });

                    component.classList.add('_slider-init');

                }

            });

        }
    }
    App.Slider.init();

}