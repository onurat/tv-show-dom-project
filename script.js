function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);

  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", performSearch);

  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", performSearch);
}

function makePageForEpisodes(episodeData) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  episodeData.forEach((episode) => {
    const episodeElem = document.createElement("div");
    episodeElem.classList.add("episode");

    const titleElem = document.createElement("h2");
    titleElem.textContent = episode.name;
    episodeElem.appendChild(titleElem);

    const codeElem = document.createElement("p");
    const seasonNumber = episode.season.toString().padStart(2, "0");
    const episodeNumber = episode.number.toString().padStart(2, "0");
    codeElem.textContent = `S${seasonNumber}E${episodeNumber}`;
    episodeElem.appendChild(codeElem);

    const imageElem = document.createElement("img");
    imageElem.src = episode.image.medium;
    imageElem.alt = `Episode ${codeElem.textContent} Image`;
    episodeElem.appendChild(imageElem);

    const summaryElem = document.createElement("p");
    summaryElem.innerHTML = episode.summary;
    episodeElem.appendChild(summaryElem);

    const sourceLinkElem = document.createElement("p");
    const sourceLink = document.createElement("a");
    sourceLink.href = episode.url;
    sourceLink.textContent = "View on TVMaze.com";
    sourceLinkElem.appendChild(sourceLink);
    episodeElem.appendChild(sourceLinkElem);

    rootElem.appendChild(episodeElem);
  });
}

function performSearch() {
  const searchTerm = document.getElementById("search-input").value.toLowerCase();
  const allEpisodes = getAllEpisodes();

  const filteredEpisodes = allEpisodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(searchTerm) ||
      episode.summary.toLowerCase().includes(searchTerm)
  );

  makePageForEpisodes(filteredEpisodes);
  updateSearchCount(filteredEpisodes.length);
}

function updateSearchCount(count) {
  const searchCountElem = document.getElementById("search-count");
  searchCountElem.textContent = `Episodes found: ${count}`;
}

window.onload = setup;
