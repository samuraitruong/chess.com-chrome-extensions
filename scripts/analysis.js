// Function to observe changes in the DOM
function observeDOMChanges() {
  const targetNode = document.documentElement; // Entire document

  const observer = new MutationObserver(function (mutationsList, observer) {
    console.log("DOM changed");

    const el = document.querySelector(".accuracy-score-value");
    if (el && +el.innerHTML.trim() > 0 && !window.closed) {
      console.log("review ready, close tab", el.innerHTML);
      chrome.runtime.sendMessage({ action: "closeTab" });
      window.closed = true;
    }
  });

  const config = { childList: true, subtree: true };

  observer.observe(targetNode, config);
}

observeDOMChanges();
