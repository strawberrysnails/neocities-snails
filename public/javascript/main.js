document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE MENU
  ========================= */
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

  /* =========================
     ACTIVE NAV LINKS
  ========================= */
  document.querySelectorAll("header a").forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });

  /* =========================
     SCROLL-TO-TOP DOLL
  ========================= */
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

