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

})

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
}

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
})

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
  // console.log(e);
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


//// Lectures

// Selecting elements
// console.log(document.documentElement); // Selects complete document
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section--1');

// const allButtons =  document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// // Creating and inserting elements

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookies for improved functionality and analytics.'
// message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// // header.prepend(message);
// header.append(message)
// header.append(message.cloneNode(true))

// header.before(message)
// header.after(message)

// Delete elements
// document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  // message.remove()
  // message.parentElement.removeChild(message);
// }) 

// Styles, Attributes and Classes
// message.style.backgroundColor = '#37383d'
// message.style.width = '120%';

// console.log(message.style.backgroundColor);
// console.log(message.style.color);

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// console.log(message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px');

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes 
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// logo.alt = 'Beautiful minimalist logo';

// Non-standard
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');

// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// Data attributes
// console.log(logo.dataset.versionNumber)

// Classes 
// logo.classList.add('c', 'j')
// logo.classList.remove('c', 'j')
// logo.classList.toggle('c')
// logo.classList.contains('c', 'j') // contains is not equal to includes

// Dont use this
// logo.className = 'jonas';

// Events and Event handlers

// const h1 = document.querySelector('h1');

// const alertH1 =  function (e) {
//   alert('addEventListerner: Great! You are reading the heading :D')

//   // h1.removeEventListener('mouseenter', alertH1)
// };

// h1.addEventListener('mouseenter',alertH1)

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1)
// ,3000)

// h1.onmouseenter = function (e) {
//   alert('onmouse enter: Great! You are reading the heading :D')
// };

// rgb(255, 255, 255)

// const randomInt = (min, max) => Math.floor(Math.random() * (max-min+1) + min);

// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`

// document.querySelector('.nav__link').addEventListener('click', function(e) {
//   // console.log('LINK');
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

//   // Stop propagation
//   // e.stopPropagation();
// })

// document.querySelector('.nav__links').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Container', e.target, e.currentTarget);
// })

// document.querySelector('.nav').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
// })

// document.querySelector('.header').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
// })

// Scrolling animation

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function(e) {

  // //returns the size of an element and its position relative to the viewport
  // const s1coords = section1.getBoundingClientRect();   
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);

  // console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);


  // DOM tranversing
  // const h1 = document.querySelector('h1');

  // // Going downwards: selecting child elements
  // console.log(h1.querySelectorAll('.highlight'));
  // console.log(h1.childNodes);
  // console.log(h1.children);
  // h1.firstElementChild.style.color = 'white';
  // h1.lastElementChild.style.color = 'orangered';

  // //Going upwards: selecting parent elements
  // console.log(h1.parentNode);
  // console.log(h1.parentElement);
  
  // h1.closest('.header').style.background = 'var(--gradient-secondary)';
  // h1.closest('h1').style.background = 'var(--gradient-primary)';

  // // Going sideways: selecting sibling elements
  // console.log(h1.previousElementSibling);
  // console.log(h1.nextElementSibling);

  // console.log(h1.previousSibling);
  // console.log(h1.nextSibling);

  // console.log(h1.parentElement.children);
  // [...h1.parentElement.children].forEach(function(el) {
  //   if (el !== h1) el.style.color = 'purple';
  // })

  document.addEventListener('DOMContentLoaded', function(e) {
    console.log('HTML parsed and DOM tree built!', e);
  });

  window.addEventListener('load', function(e) {
    console.log('Page fully loaded', e);
  });

  // window.addEventListener('beforeunload', function(e) {
  //   e.preventDefault();
  //   console.log(e);
  //   e.returnValue = '';
  // })

