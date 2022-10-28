const nav = document.querySelector("nav");
const navClosableAreaOffset =
  document.querySelector(".closable-area").offsetWidth;
const navShownArea = document.querySelector(".shown-area");
const burgerIcon = document.querySelector(".nav-icon .fa-bars");
const closeIcon = document.querySelector(".nav-icon .fa-xmark");

// console.log(navClosableAreaOffset.offsetWidth);
// console.log(burgerIcon, closeIcon);
let isHidden = true;
nav.style.left = `-${navClosableAreaOffset}px`;

closeIcon.addEventListener("click", function () {
  closeAndOpenNav();
});

burgerIcon.addEventListener("click", function () {
  closeAndOpenNav();
});

function closeAndOpenNav() {
  if (isHidden) {
    isHidden = false;
    // nav.style.left = `0px`;
    closeIcon.classList.remove("visually-hidden");
    burgerIcon.classList.add("visually-hidden");

    console.log("here");

    // animation with JS (Not Finished)
    // let id = setInterval(frame, 200);
    // function frame() {
    //   if (nav.style.left == "0px") {
    //     clearInterval(id);
    //   } else {
    //     nav.style.left += `${nav.style.left++}px`;
    //     console.log(nav.style.left);
    //     /* code to change the element style */
    //   }
    // }
  } else {
    isHidden = true;
    nav.style.left = `-${navClosableAreaOffset}px`;
    closeIcon.classList.add("visually-hidden");
    burgerIcon.classList.remove("visually-hidden");
  }
}

// function animateCloseAndOpen() {
//   let id = setInterval(frame, 5);
//   if (isHidden) {
//     function frame() {
//       if (nav.style.left == "0px") {
//         clearInterval(id);
//       } else {
//         nav.style.left = `0px`;
//         /* code to change the element style */
//       }
//     }
//   }
// }
