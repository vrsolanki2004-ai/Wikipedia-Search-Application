console.log("JavaScript is working!");
let inputEl = document.getElementById("searchInput");
let resultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResults(results) {
    let {
        link,
        title,
        description
    } = results;
    let containerEl = document.createElement("div");
    containerEl.classList.add("result-item");

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.classList.add("result-title");
    titleEl.textContent = title;
    containerEl.appendChild(titleEl);

    let brelement = document.createElement("br");
    containerEl.appendChild(brelement);

    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.classList.add("result-url");
    urlEl.textContent = link;
    containerEl.appendChild(urlEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    containerEl.appendChild(descriptionEl);

    resultsEl.appendChild(containerEl);


}

function displayresults(searchResults) {
    spinnerEl.classList.add("d-none");

    for (let results of searchResults) {
        createAndAppendSearchResults(results);
    }
}

function getSearchResults(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        resultsEl.textContent = "";
        let url = "https://apis.ccbp.in/wiki-search?search=" + inputEl.value;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                let {
                    search_results
                } = data;
                displayresults(search_results);
            });
    }
}

inputEl.addEventListener("keydown", getSearchResults);