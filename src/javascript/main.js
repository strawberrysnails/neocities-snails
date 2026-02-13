document.addEventListener("DOMContentLoaded", () => {

// MOBILE MENU
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("mobileMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });

    document.querySelectorAll(".mobile-menu a").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");
      });
    });
  }

  // SCROLL-TO-TOP FUNCTION
  const doll = document.getElementById("myBtn");

  if (doll) {
    const onScroll = () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        doll.classList.add("show");
      } else {
        doll.classList.remove("show");
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    doll.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

});

// MARQUEE
[...document.querySelectorAll(".buttons-n-blinkers")] // get everything we want to marquee
.map((div) => div.children[0]) // turn all of them into their first child that actually holds all the images
.forEach((innerDiv) => { // run a function on all of these...
  let follower = innerDiv.cloneNode(true); // that copies the image container
  follower.classList.add("follower"); // makes the new one a follower
  innerDiv.parentElement.appendChild(follower); // and puts the follower right after the original
  follower.classList.add("play"); // and makes them both play
  innerDiv.classList.add("play");
})

// CODE COPY BUTTON

document.querySelectorAll("pre > code").forEach((codeBlock) => {
  const pre = codeBlock.parentNode;

  const button = document.createElement("button");
  button.className = "copy-button";
  button.type = "button";
  button.textContent = "Copy";

  button.addEventListener("click", () => {
    navigator.clipboard.writeText(codeBlock.innerText).then(() => {
      button.textContent = "Copied!";
      setTimeout(() => (button.textContent = "Copy"), 1500);
    });
  });

  pre.appendChild(button);
});

// UP ARROW

const scrollbtn = document.querySelector(".up");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    scrollbtn.style.display = "block";
  } else {
    scrollbtn.style.display = "none";
  }
});
