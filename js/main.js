'use strict';

document.addEventListener('DOMContentLoaded', ev => {

    // SMOOTH SCROLL
    const smoothScrollElems = document.querySelectorAll('a[href^="#"]:not(a[href="#"])');
    smoothScrollElems.forEach((elem, index) => {
        elem.addEventListener('click', ev => {
            ev.preventDefault();

            //  Первый вариант
            // const blockScroll = document.querySelector(elem.getAttribute("href"));
            // blockScroll.scrollIntoView({
            //     behavior: 'smooth'
            // });

            // ================================================================
            // Второй вариант, работающий во всех браузерах
            // behavior: 'smooth' - не поддерживается Safari (macOS)
            // 
            //      С настраиваемоей скоростью прокрутки
            const SPEED = 0.1;

            let start = 0;
            const blockScroll = elem.getAttribute("href");
            const elemScrollTo = document.querySelector(blockScroll);

            const coordinateElem = elemScrollTo.getBoundingClientRect().top;
            const pageY = window.pageYOffset;

            const step = time => {
                if (!start) {
                    start = time;
                }
                const progress = time - start;

                const r = (coordinateElem < 0 ?
                    Math.max(pageY - progress / SPEED, pageY + coordinateElem) :
                    Math.min(pageY + progress / SPEED, pageY + coordinateElem));
                window.scrollTo(0, r);

                if (r < pageY + coordinateElem) {
                    requestAnimationFrame(step);
                }
            };
            requestAnimationFrame(step);
        });
    });
    // /SMOOTH SCROLL

    // BURGER MENU
    const burger = document.querySelector('.humburger-menu');
    burger.addEventListener('click', toggleMenu);
    const menu = document.querySelector('.menu');

    function toggleMenu() {
        menu.classList.toggle('menu-active');
        burger.classList.toggle('humburger-menu-active');
    }
    document.body.addEventListener('keydown', ev => {
        if (ev.code == 'Escape') {
            closeModal();
            menuClose();
        }
    });
    document.body.addEventListener('click', ev => {
        if (ev.target == burger) {
            burger.addEventListener('click', toggleMenu);
        } else if (ev.target.closest('.menu') == null && menu.classList.contains('menu-active')) {
            menuClose();
        }
    });

    const menuListItems = document.querySelectorAll('.menu-list__item');
    menuListItems.forEach(elem => {
        elem.addEventListener('click', ev => {
            menuClose();
        });
    });

    function menuClose() {
        menu.classList.remove('menu-active');
        burger.classList.remove('humburger-menu-active');
    }


    // /BURGER MENU


    // ACCORDEON 
    const featureLinkElems = document.querySelectorAll('.feature__link');
    const featureSubElems = document.querySelectorAll('.feature-sub');


    featureLinkElems.forEach((btn, index) => {
        btn.addEventListener('click', ev => {
            if (btn.classList.contains('feature__link_active')) {
                btn.classList.remove('feature__link_active');
                featureSubElems[index].classList.add('hidden');
            } else {
                featureSubElems.forEach((featureSubElem) => {
                    featureSubElem.classList.add('hidden');
                });
                featureLinkElems.forEach((featureLinkElem) => {
                    featureLinkElem.classList.remove('feature__link_active');
                });
                featureSubElems[index].classList.remove('hidden');
                btn.classList.add('feature__link_active');
            }
        });
    });
    // /ACCORDEON 

    // TABS

    const designTabsHeaders = document.querySelectorAll('.design-list__item');
    const designBlockImages = document.querySelectorAll('.design-block__img');
    const designTabs = document.querySelectorAll('.design__descr');
    const designSectionTitle = document.querySelectorAll('.design .section__title');
    const designImagesLists = document.querySelectorAll('.design-images');

    designTabsHeaders.forEach((el, index) => {
        el.addEventListener('click', ev => {
            if (!el.classList.contains('design-list__item_active')) {
                designTabsHeaders.forEach(el => {
                    el.classList.remove('design-list__item_active');
                });
                designBlockImages.forEach(el => {
                    el.classList.add('hidden');
                });

                designTabs.forEach(el => {
                    el.classList.add('hidden');
                });
                designSectionTitle.forEach(el => {
                    el.classList.add('hidden');
                });
                designImagesLists.forEach(el => {
                    el.classList.add('hidden');
                });
                el.classList.add('design-list__item_active');
                designBlockImages[index].classList.remove('hidden');
                designTabs[index].classList.remove('hidden');
                designSectionTitle[index].classList.remove('hidden');
                designImagesLists[index].classList.remove('hidden');
            }
        });
    });

    // /TABS


    // BLOCK__SCROLLED
    function disableScroll() {
        //1 вариант
        // document.body.style.overflow = 'hidden';
        // 2 вариант
        // document.body.style.cssText = 'overflow:hidden;position:relative;height:100vh;';
        document.body.dataset.scrollY = window.scrollY;
        const scrollWidth = window.innerWidth - document.body.offsetWidth;
        document.body.style.cssText = `
        overflow:hidden;
        position:fixed;
        top:-${window.scrollY}px;
        left:0;
        width:100%;
        height:100vh;
        padding-right:${scrollWidth}px`;


    }


    function enableScroll() {
        //1 вариант
        // body.style.removeProperty('overflow');
        // 2 вариант
        document.body.style.cssText = '';
        window.scroll({
            top: document.body.dataset.scrollY
        });
    }

    // /BLOCK__SCROLLED


    // MODAL

    const modal = document.querySelector('.modal'),
        overlay = document.querySelector('.overlay'),
        btnCloseModal = modal.querySelector('.modal__close'),
        body = document.querySelector('body');

    btnCloseModal.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    document.querySelector('.modal__button').addEventListener('click', submit, ev);

    document.querySelectorAll('button.more').forEach(elem => {
        elem.addEventListener('click', openModal);
    });
    // let scrollY = document.body.style.top;

    function openModal() {
        disableScroll();
        modal.classList.remove('hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
        enableScroll();
    }

    function submit(ev) {
        ev.preventDefault();
        closeModal();

    }

    // /MODAL

    // FORM


    // /FORM

});