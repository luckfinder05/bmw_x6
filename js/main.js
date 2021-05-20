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
    const designTabs = document.querySelectorAll('.design__descr');
    const designSectionTitle = document.querySelectorAll('.design .section__title');

    designTabsHeaders.forEach((el, index) => {
        el.addEventListener('click', ev => {
            if (!el.classList.contains('design-list__item_active')) {
                designTabsHeaders.forEach(el => {
                    el.classList.remove('design-list__item_active');
                });
                designTabs.forEach(el => {
                    el.classList.add('hidden');
                });
                designSectionTitle.forEach(el => {
                    el.classList.add('hidden');
                });
                el.classList.add('design-list__item_active');
                designTabs[index].classList.remove('hidden');
                designSectionTitle[index].classList.remove('hidden');
            }
        });
    });

    // /TABS

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
        // Блокировка прокрутки
        // body.style.top = `-${window.pageYOffset}px`;
        // console.log('window.pageYOffset: ', window.pageYOffset);
        // document.body.style.position = 'fixed';
        document.body.style.overflow = 'hidden';

        modal.classList.remove('hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
        body.style.removeProperty('overflow');
        // document.querySelector('body').style.position = "initial";

        // Восстанавливаем прокрутку
        // const scrollY = document.body.style.top;
        // console.log('document.body.style.top: ', document.body.style.top);
        // console.log('scrollY: ', scrollY);
        // document.body.style.position = '';
        // document.body.style.top = '';
        // window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    function submit(ev) {
        ev.preventDefault();
        closeModal();

    }

    // /MODAL

    // FORM


    // /FORM

});