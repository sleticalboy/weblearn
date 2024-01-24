const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = 5

/* Declaring the alternative text for each image file */

/* Looping through images */
for (let index = 5; index > 0; index--) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/pic${index}.jpg`);
  newImage.setAttribute('alt', `pic${index}`);
  thumbBar.appendChild(newImage);
  newImage.addEventListener('click', (e) => {
    const newSrc = e.target.getAttribute('src');
    // console.log(newSrc, displayedImage);
    displayedImage.setAttribute('src', newSrc);
  });
}

/* Wiring up the Darken/Lighten button */
// const dark = document.querySelector('.dark');
btn.addEventListener('click', (e) => {
  // console.log(e.target);
  if (e.target.getAttribute('class') === 'dark') {
    e.target.setAttribute('class', 'light');
    btn.textContent = 'Lighten'
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  } else {
    e.target.setAttribute('class', 'dark');
    btn.textContent = 'Darken'
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  }
});

