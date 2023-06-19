const delay = 500; // Delay in milliseconds (adjust as needed)

const openTabsSequentially = async (links) => {
  if (!links) return;

  for await (const link of links) {
    await new Promise((resolve) => setTimeout(resolve, delay));
    const text = (link.innerText || link.textContent).trim();
    if (text === "Review") {
      const tab = window.open(link.href + "?tab=review", "_blank");
      setTimeout(() => {
        tab.close();
      }, 5000);
    } else {
      // console.log("Not a review", link);
    }
  }
};

function addReviewAllButton() {
  const button = document.createElement("button");
  button.style.padding = "10px";
  button.style.backgroundColor = "const(--globalColorWin)";
  button.style.color = "white";
  button.style.float = "right";
  button.style.fontSize = "clamp(1.4rem,4vw,1.8rem)";
  button.style.borderRadius = "5px";
  button.style.border = "none";
  button.style.fontWeight = 600;
  button.style.margin = "15px 25px";
  button.innerText = "Review All games";
  button.addEventListener("click", function () {
    const links = document.querySelectorAll(
      ".archived-games-table a.archived-games-link, .archive-games-table a.archive-games-link"
    );
    openTabsSequentially(links);
  });

  // Append the button to the body element
  const list = document.querySelectorAll(
    ".archived-games-table, .archive-games-table"
  );
  const archivedGamesTable = list[0];
  if (archivedGamesTable && archivedGamesTable.parentNode) {
    archivedGamesTable.parentNode.insertBefore(button, archivedGamesTable);
  } else {
    console.error("Element with class '.archived-games-table' not found.");
  }
}

// Function to observe changes in the DOM
function observeDOMChanges() {
  const targetNode = document.documentElement; // Entire document

  const observer = new MutationObserver(function (mutationsList, observer) {
    const list = document.querySelectorAll(
      ".archived-games-table, .archive-games-table"
    );
    const archivedGamesTable = list[0];

    if (archivedGamesTable) {
      observer.disconnect();

      addReviewAllButton();
    }
  });

  const config = { childList: true, subtree: true };

  observer.observe(targetNode, config);
}

// Call the function to observe DOM changes
observeDOMChanges();
