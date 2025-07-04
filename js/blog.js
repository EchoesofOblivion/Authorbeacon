const posts = [
  { title: "First Blog Post", file: "content/blog/first-blog-post.md" }
  // Add more blog posts here
];

function loadPostList() {
  const listDiv = document.getElementById("post-list");
  const postDiv = document.getElementById("post-content");
  const htmlDiv = document.getElementById("post-html");
  listDiv.innerHTML = "";

  posts.forEach(post => {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = post.title;
    link.onclick = () => loadPost(post.file, post.title);
    listDiv.appendChild(link);
    listDiv.appendChild(document.createElement("br"));
  });

  listDiv.style.display = "block";
  postDiv.style.display = "none";
}

function loadPost(file, title) {
  fetch(file)
    .then(res => res.text())
    .then(markdown => {
      document.getElementById("post-html").innerHTML = `<h2>${title}</h2>` + marked.parse(markdown);
      document.getElementById("post-list").style.display = "none";
      document.getElementById("post-content").style.display = "block";
    });
}

document.addEventListener("DOMContentLoaded", loadPostList);