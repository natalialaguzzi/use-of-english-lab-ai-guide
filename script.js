(() => {
  "use strict";

  const progressBar = document.getElementById("reading-progress-bar");

  const updateReadingProgress = () => {
    if (!progressBar) return;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = documentHeight > 0 ? (window.scrollY / documentHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  };

  let scheduled = false;
  window.addEventListener("scroll", () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      updateReadingProgress();
      scheduled = false;
    });
  }, { passive: true });

  window.addEventListener("resize", updateReadingProgress);
  updateReadingProgress();

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      window.setTimeout(() => {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }, 250);
    });
  });
})();
