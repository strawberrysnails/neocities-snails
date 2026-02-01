document.addEventListener("DOMContentLoaded", () => {
  const mybutton = document.getElementById("myBtn");
  if (!mybutton) return;

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.classList.add("show");
    } else {
      mybutton.classList.remove("show");
    }
  }

  // Initial state
  scrollFunction();

  // Watch scroll
  window.addEventListener("scroll", scrollFunction);

  // Click = scroll up
  mybutton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
