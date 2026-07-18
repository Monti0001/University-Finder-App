let baseUrl = "https://universities.hipolabs.com/search?country=";

let btn = document.querySelector("button");
let input = document.querySelector("input");

// Button click
btn.addEventListener("click", async () => {
    let country = input.value.trim().toLowerCase();

    if (country === "") {
        alert("Please enter a country name");
        return;
    }

    let colleges = await getcolleges(country);
    show(colleges);
});

// Enter key support
input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        btn.click();
    }
});

function show(colleges) {
    let list = document.querySelector("#list");
    list.innerText = "";

    if (!colleges || colleges.length === 0) {
        let li = document.createElement("li");
        li.innerText = "❌ No universities found. Try another country.";
        list.appendChild(li);
        return;
    }

    colleges.forEach(col => {
        let li = document.createElement("li");

        let name = document.createElement("strong");
        name.innerText = col.name;

        let br = document.createElement("br");

        let link = document.createElement("a");
        link.href = col.web_pages[0];
        link.innerText = col.web_pages[0];
        link.target = "_blank";

        li.appendChild(name);
        li.appendChild(br);
        li.appendChild(link);

        list.appendChild(li);
    });
}

async function getcolleges(country) {
    try {
        let url = baseUrl + country;
        let res = await axios.get(url);
        return res.data;
    } catch (e) {
        console.log("error - ", e);
        return [];
    }
}
