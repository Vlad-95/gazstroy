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
            dots: true,
            arrows: false,
            autoplay: true,
            pauseOnHover: false,
            autoplaySpeed: 5000,
            appendDots: $('.intro .dots .dots__wrap')
        });

        $('.intro .arrows__item.prev').click(function() {
            $('.intro .slider').slick('slickPrev')
        });

        $('.intro .arrows__item.next').click(function() {
            $('.intro .slider').slick('slickNext')
        });

        $('.intro .dots .pause').click(function() {
            $(this).toggleClass('active');

            if ($(this).hasClass('active')) {
                $('.intro .slider').slick('slickPause')
            } else {
                $('.intro .slider').slick('slickPlay')
            }
        })
    }

    //Главная - наведение на стрелки

    //Главная - проекты
    if ($('.projects-main .slider').length) {
        $('.projects-main .slider').slick({
            dots: false,
            arrows: false
        })

        $('.projects-main .arrows__item.prev').click(function() {
            $('.projects-main .slider').slick('slickPrev')
        });

        $('.projects-main .arrows__item.next').click(function() {
            $('.projects-main .slider').slick('slickNext')
        });
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

    //Компетенции - подсветка активного элемента из LocalStorage
    if (document.querySelector('.advantages-main__wrap')) {
        document.querySelectorAll('.advantages-main__item').forEach(item => {
            item.addEventListener('click', () => {
                let name = item.querySelector('.name').textContent;
                
                localStorage.setItem('competence', name)
            })
        })
    }
    if (document.querySelector('.competence')) {
        if (localStorage.getItem('competence')) {
            document.querySelectorAll('.competence__item').forEach(item => {
                item.classList.remove('active');
                document.querySelector(`.competence__item[data-advantage="${localStorage.getItem('competence')}"]`).classList.add('active');

                $('html, body').animate({
                    scrollTop: $(`.competence__item[data-advantage="${localStorage.getItem('competence')}"]`).offset().top
                })
                
            })
        } else {
            document.querySelector('.competence__item').classList.add('active');
        }
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

    //Открытие/Закрытие модалок
    if (document.querySelector('.modal')) {
        let link = document.querySelectorAll('.js-open-modal');
        let modalClose = document.querySelector('.modal .close')
        
        link.forEach(item => {
            const modalSrc = item.getAttribute('data-modal');

            item.addEventListener('click', () => {
                body.classList.add('no-scroll');
                $(`.modal#${modalSrc}`).fadeIn();
            })
        });

        modalClose.addEventListener('click', () => {
            body.classList.remove('no-scroll');
            $('.modal').fadeOut();
        })
    }

    //Вакансии аккордион
    if (document.querySelector('.vacancy')) {
        $('.js-accardion-toggle').click(function() {
            $(this)
                .closest('.vacancy__item').toggleClass('active')
                .find('.content').slideToggle();

            $('.js-accardion-toggle').not($(this)).closest('.vacancy__item').removeClass('active').find('.content').slideUp()
        })
    }
});
