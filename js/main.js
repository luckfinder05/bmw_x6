document.addEventListener('DOMContentLoaded', ev => {
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

    const designTabsHeaders = document.querySelectorAll('.design-list__item');
    const designTabs = document.querySelectorAll('.design__descr');

    designTabsHeaders.forEach((el, index) => {
        el.addEventListener('click', ev => {
            if (!el.classList.contains('design-list__item_active')) {
                designTabsHeaders.forEach(el => {
                    el.classList.remove('design-list__item_active');
                });
                designTabs.forEach(el => {
                    el.classList.add('hidden');
                });
                el.classList.add('design-list__item_active');
                designTabs[index].classList.remove('hidden');
            }
        });
    });
});