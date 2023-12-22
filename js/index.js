import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const wait = (delay = 0) => new Promise(resolve => setTimeout(resolve, delay))

const setVisible = (elementOrSelector, visible, display) =>
  ((typeof elementOrSelector === 'string'
    ? document.querySelector(elementOrSelector)
    : elementOrSelector
  ).style.display = visible ? display : 'none')

document.addEventListener('DOMContentLoaded', () => {
  wait(1000).then(() => {
    setVisible('.page', true, 'block')
    setVisible('#loading', false, 'none')
  })

  //! Accordion

  const accordionSwiper = new Swiper('#instructions-swiper', {
    direction: 'vertical',

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    speed: 700,
    allowTouchMove: false,
    centeredSlides: true,
    centeredSlidesBounds: true,
    initialSlide: 3,
  })

  const accordionContainer = document.querySelector('.instructions__list'),
    accordionItems = Array.from(
      document.querySelectorAll('.instructions__item')
    ),
    swiper = document.querySelector('#instructions-swiper').swiper

  accordionContainer.addEventListener('click', e => {
    if (!e.target.closest('.instructions__item-top')) return

    accordionItems.forEach((el, i) => {
      el.classList.remove('instructions__item_active')
    })

    e.target
      .closest('.instructions__item')
      .classList.add('instructions__item_active')

    swiper.slideTo(
      Number(e.target.closest('.instructions__item').dataset.item) - 1
    )
  })

  //! Carousel

  const carouselSwiper = new Swiper('#customers-swiper', {
    direction: 'horizontal',
    slidesPerView: 1,
    speed: 700,
    allowTouchMove: false,
    breakpoints: {
      1141: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  })

  const customersSwiper = document.querySelector('#customers-swiper').swiper,
    btnContainer = document.querySelector('.customers__action'),
    smallSlide = document.querySelector('.swiper-slide-sm')

  btnContainer.addEventListener('click', e => {
    const btn = e.target.closest('.customers__action-btn')
    if (!btn) return

    const breakpoint = matchMedia('(min-width: 1141px)')

    const btnLeft = btn.classList.contains('left')

    btnLeft ? customersSwiper.slidePrev() : customersSwiper.slideNext()

    const slideIndex = customersSwiper.realIndex

    if (slideIndex > 0 && breakpoint.matches) {
      smallSlide.classList.add('swiper-slide-sm_active')
      smallSlide.nextElementSibling.classList.add('swiper-slide-opacity_active')
    } else {
      smallSlide.classList.remove('swiper-slide-sm_active')
      smallSlide.nextElementSibling.classList.remove(
        'swiper-slide-opacity_active'
      )
    }

    if (!btnLeft) {
      if (breakpoint.matches && slideIndex >= 1) {
        btn.disabled = true
      } else {
        btn.disabled = slideIndex >= 2
      }
      btn.previousElementSibling.disabled = false
    }
    if (btnLeft && slideIndex === 0) {
      btn.disabled = true
      btn.nextElementSibling.disabled = false
    }
  })
})
