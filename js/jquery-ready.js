$(document).ready(function() {
    //===========Мобильное меню
    const body = document.querySelector('body')
    const windowWidth = window.innerWidth;
    const nav = document.querySelector('.header .nav .menu');
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuWrap = mobileMenu.querySelector('.mobile-menu__wrap');
    const mobileMenuClose = document.querySelector('.mobile-menu .close');

    if (windowWidth <= 992) {
        //клонируем элементы хедера
        const mobileNav = nav.cloneNode(true);
        
        mobileMenuWrap.append(mobileNav);

        //Открытие-скрытие подменю
        const mobileMenuDropItem = mobileNav.querySelectorAll('.menu__item.menu__item_drop');

        $(mobileMenuDropItem).click(function() {
            $(this).toggleClass('active').find('.sub').slideToggle();
        })
        // mobileMenuDropItem.forEach(item => {
        //     item.addEventListener('click', () => {
        //         item.classList.toggle('active')
        //     })
        // })
    }

    function toggleMenu() {
        burger.classList.toggle('active');
        body.classList.toggle('no-scroll');
        mobileMenu.classList.toggle('active');
    }

    burger.addEventListener('click', toggleMenu);
    mobileMenuClose.addEventListener('click', toggleMenu);

    //============Мобильное меню (КОНЕЦ)

    //Главная - слайдер
    if ($('.intro .slider').length) {
        $('.intro .slider').slick({
            dots: false,
            arrows: false
        })
    }

    //Главная - проекты
    if ($('.projects-main .slider').length) {
        $('.projects-main .slider').slick({
            dots: false,
            arrows: false
        })
    }

    //Компетенции - выравнивание текста
    if (document.querySelector('.competence')) {
        const competenceItem = document.querySelectorAll('.competence__item');

        competenceItem.forEach(item => {
            if (!item.querySelector('.wysiwyg ul')) {
                item.classList.add('align-center');
            }
            
        })
    }

    //Техническое оснащение - покраска элементов таблицы
    if (document.querySelector('.equipment .table')) {
        const tableItem = document.querySelectorAll('.table__item');
        const tableItemName = document.querySelectorAll('.name');
        const tableItemLi = document.querySelectorAll('li p');
        const arr = [];
        const colors = ['#e5f0f8', '#f0f6fb'];

        tableItem.forEach(elem => {
            const name = elem.querySelector('.name').textContent;
            const li = elem.querySelectorAll('li p');

            arr.push({name})

            li.forEach(elem => {
                arr.push({name: elem.textContent})
            })           
        })

        let colorsArr = arr.map((elem, i) => {
            if (i % 2 == 0) {
                return {...elem, color: colors[0]}
            } else {
                return {...elem, color: colors[1]}
            }
        })

        addColor = (elems, typeElems) => {
            if (typeElems == 'titles') {
                elems.forEach(elem => {
                    colorsArr.find(item => {
                        if (item.name == elem.textContent) {
                            elem.style.backgroundColor = item.color; 
                        }
                    })
                })
            } else {
                elems.forEach(elem => {
                    colorsArr.find(item => {
                        if (item.name == elem.textContent) {
                            elem.parentElement.style.backgroundColor = item.color; 
                        }
                    })
                })
            }            
        }

        addColor(tableItemName, 'titles');
        addColor(tableItemLi, 'li');
    }
});
