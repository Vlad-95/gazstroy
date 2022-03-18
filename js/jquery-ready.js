$(document).ready(function() {
    //===========Мобильное меню
    // let body = $('body')
    // let windowWidth = window.innerWidth;
    // let header = $('.header');
    // let headerWrap = $('.header__wrap');
    // let time = header.find('.nav__item.time');
    // let mail = header.find('.nav__item.mail');
    // let address = header.find('.nav__item.address');
    // let phone = header.find('.nav__item.phone')
    // let burger = $('.burger');
    // let windowHeight = $(window).height();

    // if (windowWidth <= 992) {
    //     //создаем контейнер для менюшки
    //     let mobileMenu = $(document.createElement('div'));
    //     let nav = $(document.createElement('div'));
    //     mobileMenu.addClass('mobile-menu');
    //     nav.addClass('nav');

    //     headerWrap.append(mobileMenu)
    //     mobileMenu.append(nav)

    //     //клонируем элементы хедера
    //     let mobileTime = time.clone();
    //     let mobileMail = mail.clone();
    //     let mobileAddress = address.clone();
    //     let mobilePhone = phone.clone();
        
    //     nav.append(mobilePhone); 
    //     nav.append(mobileMail);  
    //     nav.append(mobileAddress);  
    //     nav.append(mobileTime);   
              
    // }

    // function showMenu() {
    //     let mobileMenu = $('.mobile-menu');

    //     burger.toggleClass('active');
    //     body.toggleClass('no-scroll');
    //     mobileMenu.toggleClass('active');
    //     console.log(1)
    // }

    // burger.click(showMenu);

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
