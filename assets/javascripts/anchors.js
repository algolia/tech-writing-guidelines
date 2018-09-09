import {getCookie} from "./components/utils";

function onLoadAnchors(selectors) {
  const selectorNodes = selectors.reduce(
    (prev, next) => prev.concat(...document.querySelectorAll(next)),
    []
  );

  const currentUrl = window.location.origin + window.location.pathname;
  const currentLanguage = getCookie('last_snippet_language') || 'php';

  selectorNodes.forEach(node => {
    if (node.id) {
      const a = document.createElement('a');
      a.href = `${currentUrl}?language=${currentLanguage}#${node.id}`;
      a.className = `block pos-abt anchor-link m-l-mini inline`;
      a.innerHTML = `#`;

      node.classList.add('anchor-container');
      node.appendChild(a);

      const anchor = document.createElement('a');
      anchor.href = `${currentUrl}?language=${currentLanguage}#${node.id}`;
      anchor.className = `anchor`;
      anchor.id = node.id;

      node.appendChild(anchor);
      node.removeAttribute('id');
    }
  });
}

const selectors = '.linkable, .api-client-parameter h1, main.content-container h2, main.content-container h3, main.content-container h4, main.content-container h5, main.content-container h6, main.content-container td, main.content-container .rest-table-column-first'.split(',');

onLoadAnchors(selectors);