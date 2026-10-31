const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const yearTarget = document.getElementById("year");
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

document.querySelectorAll(".avatar-img").forEach((image) => {
  image.addEventListener("error", () => {
    image.style.visibility = "hidden";
  });
});

function updateAge() {
  const now = new Date();
  const age = now.getFullYear() - 2012 - (now.getMonth() < 7 || (now.getMonth() === 7 && now.getDate() < 20) ? 1 : 0);
  document.querySelectorAll("[data-age]").forEach((target) => {
    target.textContent = age;
  });
}

updateAge();
setInterval(updateAge, 60000);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) updateAge();
});

const certificateDialog = document.querySelector(".certificate-dialog");
const certificateImage = document.querySelector(".certificate-full");
const certificateTitle = document.getElementById("certificate-dialog-title");
const certificatePdf = document.querySelector(".certificate-pdf");

document.querySelectorAll(".certificate-item").forEach((item) => {
  item.addEventListener("click", () => {
    certificateImage.src = item.dataset.image;
    certificateImage.alt = item.dataset.title;
    certificateTitle.textContent = item.dataset.title;
    certificatePdf.href = item.dataset.pdf;
    certificateDialog.showModal();
  });
});

document.querySelector(".certificate-close").addEventListener("click", () => certificateDialog.close());
certificateDialog.addEventListener("click", (event) => {
  if (event.target === certificateDialog) certificateDialog.close();
});
