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

    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    const btnCloseModal = modal.querySelector('.modal__close');
    setTimeout(() => {
        openModal();

        btnCloseModal.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
    }, 50000);

    function openModal() {

        // Блокировка прокрутки
        document.body.style.top = `-${window.pageYOffset}px`;
        document.body.style.position = 'fixed';

        modal.classList.remove('hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
        document.querySelector('body').style.position = "initial";

        // Восстанавливаем прокрутку
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);

        // Удаляем обработчики событий
        overlay.removeEventListener('click', closeModal);
        btnCloseModal.removeEventListener('click', closeModal);
    }

    // document.querySelector('.button.main__button').addEventListener('click', ev => {
    //     const modal = document.querySelector('.modal');
    //     modal.classList.remove('hidden');

    //     // Блокирвка прокрутки
    //     // When the modal is shown, we want a fixed body
    //     document.body.style.position = 'fixed';
    //     document.body.style.top = `-${window.scrollY}px`;

    //     // When the modal is hidden, we want to remain at the top of the scroll position
    //     document.body.style.position = '';
    //     document.body.style.top = '';


    //     modal.querySelector('.modal__close').addEventListener('click', ev => {
    //         modal.classList.add('hidden');
    //         document.querySelector('body').style.position = "initial";

    //         const scrollY = document.body.style.top;
    //         document.body.style.position = '';
    //         document.body.style.top = '';
    //         window.scrollTo(0, parseInt(scrollY || '0') * -1);
    //     });
    // });

    // /MODAL

    // FORM


    // /FORM

});