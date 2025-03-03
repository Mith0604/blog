document.addEventListener("DOMContentLoaded", function () {
  const MAX_VISIBLE_COMMENTS = 15;

  // Handle comment submission for each form
  const commentForms = document.querySelectorAll(".comment-form");
  commentForms.forEach(form => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameInput = form.querySelector('input[name="name"]');
      const commentInput = form.querySelector('textarea[name="comment"]');
      const name = nameInput.value.trim();
      const commentText = commentInput.value.trim();

      if (!name || !commentText) {
        alert("Please fill in both fields.");
        return;
      }

      // Create new comment element
      const newComment = document.createElement("p");
      newComment.innerHTML = `<strong>${name}:</strong> ${commentText}`;

      // Append comment to the comment list for this blog section
      const commentList = form.parentElement.querySelector(".comment-list");
      commentList.appendChild(newComment);

      // Reset the form
      form.reset();

      // Update comment visibility after new comment is added
      updateComments(commentList, form.parentElement.querySelector(".see-more"));
    });
  });

  // Search function: searches each .blog element's title and content
  window.searchPosts = function searchPosts() {
    const input = document.getElementById('searchbar').value.toLowerCase();
    const blogPosts = document.querySelectorAll('.blog');

    blogPosts.forEach((post) => {
      const title = post.querySelector('.blog-content h4').textContent.toLowerCase();
      const content = post.querySelector('.blog-content p').textContent.toLowerCase();

      // If input matches title or content, show the post; otherwise hide it.
      if (title.includes(input) || content.includes(input)) {
        post.style.display = '';
      } else {
        post.style.display = 'none';
      }
    });
  };

  // Attach click event to the search button
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', window.searchPosts);

  // Optionally, trigger search on keyup in the searchbar
  const searchBar = document.getElementById('searchbar');
  searchBar.addEventListener('keyup', window.searchPosts);

  // Update comments to show only MAX_VISIBLE_COMMENTS and toggle the see-more button
  function updateComments(commentList, seeMoreButton) {
    const comments = Array.from(commentList.children);
    let hidden = false;
    comments.forEach((comment, index) => {
      if (index < MAX_VISIBLE_COMMENTS) {
        comment.style.display = "block";
      } else {
        comment.style.display = "none";
        hidden = true;
      }
    });
    if (hidden) {
      seeMoreButton.style.display = "block";
      seeMoreButton.textContent = "See More";
    } else {
      seeMoreButton.style.display = "none";
    }
  }

  // Toggle visibility when clicking the "see more" button
  const seeMoreButtons = document.querySelectorAll(".see-more");
  seeMoreButtons.forEach(button => {
    button.addEventListener("click", function () {
      const commentList = this.parentElement.querySelector(".comment-list");
      const comments = Array.from(commentList.children);
      if (this.textContent === "See More") {
        // Show all comments
        comments.forEach(comment => comment.style.display = "block");
        this.textContent = "Show Less";
      } else {
        // Hide comments beyond MAX_VISIBLE_COMMENTS
        comments.forEach((comment, index) => {
          if (index >= MAX_VISIBLE_COMMENTS) {
            comment.style.display = "none";
          }
        });
        this.textContent = "See More";
      }
    });
  });

  // Light/Dark Mode Toggle
  const modeToggle = document.getElementById("mode-toggle");
  modeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    // Update button text based on mode
    if (document.body.classList.contains("dark-mode")) {
      this.textContent = "Light Mode";
    } else {
      this.textContent = "Dark Mode";
    }
  });
});
