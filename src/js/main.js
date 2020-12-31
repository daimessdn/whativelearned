// init'd highlight.js
//// and showdown.js
const mdToHtml = new showdown.Converter();

const container = document.querySelector("main");

data.forEach((post) => {
    container.innerHTML = `
        <div class="post">
            <details>
                <summary class="post-header">
                    <h2>${post.title}</h2>
                    <p>Published on ${post.date}</p>
                    <p>${post.description}</p>
                </summary>

                <article class="content">
                    ${mdToHtml.makeHtml(post.content)}
                </article>
            </details>
        </div>
    `;
});


hljs.initHighlightingOnLoad();

document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
});