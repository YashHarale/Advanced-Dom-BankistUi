
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

