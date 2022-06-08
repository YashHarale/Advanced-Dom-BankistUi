'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnsScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  e.preventDefault()
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Scrolling

  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

  // This is OLD SCHOOL NIGGA
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // })

  // This is modern NIGGA
  // section1.scrollIntoView({behavior: 'smooth'});

//});


/////////////////////////////////////////
// Page Navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault()
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   })
// })

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault()

  // Matching strategy
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
});

// Tabbed component 
tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  // Guard Clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(tc => tc.classList.remove('operations__content--active'));
  
  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  // console.log(clicked.dataset.tab);
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

  clicked.classList.add('operations__content--active');

});

// Menu fade animation

const handleHover = function(e) {

  // console.log(this, e.currentTarget);
  
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    // console.log(link);
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;
    })
    logo.style.opacity = this;
  }
}
// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation
const initialCoords = section1.getBoundingClientRect()
// console.log(initialCoords);

window.addEventListener('scroll', function() {
  // console.log(window.scrollY);

  if(window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');

});

// Sticky navigation: Intersection Observer API
const header = document.querySelector('.header');

const stickyNav = function (entries) {    // The callback function
  const [entry] = entries; // destructuringe  -- this is the same as entries[0] -- already learned 
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // We need to look for the viewport so thats why we set 'root: null'
  threshold: 0, // This means - When 0% of header is visible then we want something to happen
});
headerObserver.observe(header);

// Reveal Sections while scrolling
const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer) {   // The callback func
  const [entry] = entries;
  // console.log(entry);

  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
}; 

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach( function(section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img))

// Slider
const slider = function() {

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length;

// Functions
const createDots = function() {
  slides.forEach(function(_, i){
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  });
};

const activateDot = function(slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};

const goToSlide = function(slide) {
  slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`)
};

// Next and Previous Slides
const nextSlide = () => {
  if(curSlide === maxSlide - 1) {
    curSlide = 0
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = () => {
  if(curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide)
  activateDot(curSlide);
};

const init = function() {
 goToSlide(0);
 createDots();
 activateDot(0);
};
init();

// Event handlers
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function(e) {
  e.key === 'ArrowRight' && nextSlide(); // short circuiting
  e.key === 'ArrowLeft' && prevSlide();
});

dotContainer.addEventListener('click', function(e) {
  if(e.target.classList.contains('dots__dot')){
    const {slide} = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

};
slider();

