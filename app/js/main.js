//mobile menu
function showMobileMenu() {
    document.querySelector('body').classList.add('scroll-locked');
    document.querySelector('.header-overlay').classList.add('show');
    if(window.innerWidth > 767.98) {
        document.querySelector('.tablet-menu').classList.add('show');
    } else if(window.innerWidth < 767.99) {
        document.querySelector('.mobile-header').classList.add('show');
    }
}
function hideMobileMenu() {
    document.querySelector('.tablet-menu').classList.remove('show');
    document.querySelector('.mobile-header').classList.remove('show');
    document.querySelector('.header-overlay').classList.remove('show');
    document.querySelector('body').classList.remove('scroll-locked');
}
document.querySelector('.show-mobile-menu').onclick = showMobileMenu;
document.querySelector('.close-mobile-menu').onclick = hideMobileMenu;
document.querySelector('.header-overlay').onclick = hideMobileMenu;

document.querySelectorAll('.header-nav-link').forEach(link => {
    link.addEventListener('click', hideMobileMenu);
});


//переключение языка на мобилке
const languageToggleBtnList = document.querySelectorAll('.lang-toggle-link');
languageToggleBtnList.forEach(btn => {
    btn.addEventListener('click', () => {
        // Удаляем класс 'active' у всех кнопок
        languageToggleBtnList.forEach(item => item.classList.remove('active'));

        // Добавляем класс 'active' только к нажатой кнопке
        btn.classList.add('active');
    });
});


//news slider
let swiper = new Swiper(".news-list", {
    speed: 400,
    spaceBetween: 32,
    slidesPerView: 1,

    navigation: {
        nextEl: '.news-next',
        prevEl: '.news-prev',
    },

    pagination: {
        el: '.news-pagination',
        type: 'bullets',
    },

    breakpoints: {
        768: {
            slidesPerView: 'auto',
        }
    }
});


//animations
document.addEventListener("DOMContentLoaded", function () {
    function doAnimations() {
        const offset = window.scrollY + window.innerHeight;
        const animatables = document.querySelectorAll(".animatable");

        if (animatables.length === 0) {
            window.removeEventListener("scroll", doAnimations);
        }

        animatables.forEach((animatable) => {
            if (animatable.getBoundingClientRect().top + animatable.offsetHeight - 20 < offset) {
                animatable.classList.remove("animatable");
                animatable.classList.add("animated");
            }
        });
    }

    window.addEventListener("scroll", doAnimations);
    doAnimations();
});


//настройка отсутпа main блока и добавление скролл отступа
document.addEventListener("DOMContentLoaded", function () {
    const height = document.querySelector('header').offsetHeight;
    document.querySelector('.main').style.paddingTop = height + 'px';

    document.querySelectorAll('section').forEach(section => {
        section.style.scrollMarginTop = height + 'px';
    })
})


//news page slider
let news = new Swiper(".news-page-list", {
    speed: 400,
    spaceBetween: 32,
    slidesPerView: 1,
    grid: {
        rows: 3,
        fill: 'row'
    },

    navigation: {
        nextEl: '.news-page-next',
        prevEl: '.news-page-prev',
    },

    pagination: {
        el: '.news-page-pagination',
        type: 'bullets',
    },

    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1200: {
            slidesPerView: 3,
        }
    }
});


//toastify (https://github.com/apvarun/toastify-js)
function showToast(message, type = "success") {
    const toastConfig = {
        text: message,
        avatar: type === "error" ? "icon/i.svg" : "icon/checkmark.svg",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        style: {
            background: type === "error" ? "#F44E44" : "#29B593",
            borderRadius: "10px",
        },
        onClick: function () {} // Callback after click
    };

    Toastify(toastConfig).showToast();
}
// Использование
showToast("Произошла ошибка при отправке сообщения. Попробуйте еще раз.", "error");
showToast("Сообщение успешно отправлено.", "success");