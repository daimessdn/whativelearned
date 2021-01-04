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

// routing
const homepage = `
  <header>
    <h1>whativelearned</h1>

    <div class="quotes">
        <h2></h2>
        <h3></h3>
    </div>

    <h3>Recent post</h3>
    <ul class="links">
      <li><a href="#"
             id="4e50d820e59b5791bb7a"
             onclick="
              onNavigate(\`/whativelearned/\${this.id}\`);
              event.preventDefault();"
          >Execute Python file using Nodejs</a></li>
    </ul>
  </header>`;

const postpage = (posts, _id) => {
  const filteredPost = posts.filter(post => {
    return post._id == _id;
  })[0];

  return `
    <div class="posts">
      <div class="back">
        <a href="#"
           onclick="
             onNavigate('/whativelearned');
             event.preventDefault();"
        >&#8592; back to home</a>
      </div>

      <h1>${filteredPost.title}</h1>
      <h2>${filteredPost.description}</h2>
      <p>${generateTags(filteredPost.tags)}</p>

      ${filteredPost.htmlContent}
    </div>
  `;
};

const routes = {
  "/whativelearned": homepage
};

const rootDiv = document.getElementById('root');
rootDiv.innerHTML = routes[window.location.pathname];

const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname
  );

  rootDiv.innerHTML = routes[pathname];

  if (window.location.pathname !== "/") {
    rootDiv.style.cssText = `
      padding: 3em;
    `

    hljs.initHighlightingOnLoad();
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  } else {
    rootDiv.style.cssText = `
      padding: 0;
    `
    generateQuotes();
  }
}

window.onpopstate = () => {
  rootDiv.innerHTML = routes[window.location.pathname]
}

document.addEventListener('DOMContentLoaded', (event) => {
  hljs.initHighlightingOnLoad();
  generateQuotes();
    
  // const container = document.querySelector(".posts");

  fetchPosts().then(posts => {
    posts.reverse().forEach((post) => {
  //     container.innerHTML += `
  //       <div class="post">
  //         <details>
  //           <summary class="post-header">
  //             <h2>${post.title}</h2>
  //             <p>Published on ${post.date}</p>
  //             <p>${post.description}</p>
  //             <div class="tags">${generateTags(post.tags)}</div>
  //           </summary> 
  //         </details>
  //       </div>
  //     `;

      routes[`/whativelearned/${post._id}`] = postpage(posts, post._id);
    });  
  
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
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