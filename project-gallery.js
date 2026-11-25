const preview = document.querySelector("#project-preview");
const previewImage = preview.querySelector("img");
let activeLink;

if (typeof preview.showModal === "function") {
  document.querySelectorAll(".project-screenshot").forEach((link) => {
    link.setAttribute("aria-haspopup", "dialog");
    link.addEventListener("click", (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

      event.preventDefault();
      const thumbnail = link.querySelector("img");
      previewImage.alt = thumbnail.alt;
      previewImage.src = link.href;
      activeLink = link;
      preview.showModal();
    });
  });

  preview.addEventListener("click", (event) => {
    if (event.target !== preview) return;

    const bounds = preview.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) {
      preview.close();
    }
  });

  preview.addEventListener("close", () => {
    previewImage.removeAttribute("src");
    activeLink?.focus({preventScroll: true});
    activeLink = undefined;
  });
}
