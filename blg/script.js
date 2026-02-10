// Theme Toggle
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  toggleBtn.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
});

// Comment System
const form = document.querySelector(".comment-form");
const commentList = document.querySelector(".comment-list");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = form.name.value.trim();
  const comment = form.comment.value.trim();

  if (!name || !comment) return;

  const p = document.createElement("p");
  p.innerHTML = `<strong>${name}:</strong> ${comment}`;
  commentList.appendChild(p);

  form.reset();
});
