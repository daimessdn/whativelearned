// init'd highlight.js
//// and showdown.js
const mdToHtml = new showdown.Converter();

const container = document.querySelector(".posts");

const generateQuotes = () => {
    const currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    document.querySelector("header h2").innerHTML = `"${currentQuote.quotes}"`;
    document.querySelector("header h3").innerHTML = `&#8212; ${currentQuote.by}`;
};

const generateTags = (tags) => {
    return tags.reduce((spanTags, tag) => {
        console.log(spanTags, tag);
        return spanTags + "<span class=\"tag\">" + tag  + "</span>";
    }, "");
};

data.reverse().forEach((post) => {
    container.innerHTML += `
        <div class="post">
            <details>
                <summary class="post-header">
                    <h2>${post.title}</h2>
                    <p>Published on ${post.date}</p>
                    <p>${post.description}</p>
                    <div class="tags">${generateTags(post.tags)}</div>
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
  generateQuotes();
  
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("./serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
}
  
