// init'd highlight.js
//// and showdown.js
const mdToHtml = new showdown.Converter();

const fetchPosts = async () => {
  const response = await fetch("https://raw.githubusercontent.com/daimessdn/whativelearned/master/src/data/data.json",
    {
      method: "GET"
    }
  );

  const postsData = response.json();
  return postsData;
};

const generateQuotes = () => {
  const currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  document.querySelector("header h2").innerHTML = `"${currentQuote.quotes}"`;
  document.querySelector("header h3").innerHTML = `&#8212; ${currentQuote.by}`;
};

const generateTags = (tags) => {
  return tags.reduce((spanTags, tag) => {
    return spanTags + "<span class=\"tag\">" + tag  + "</span>";
  }, "");
};



hljs.initHighlightingOnLoad();

document.addEventListener('DOMContentLoaded', (event) => {
  generateQuotes();
    
  const container = document.querySelector(".posts");

    fetchPosts().then(posts => {
      posts.reverse().forEach((post) => {
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
    });

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
  
