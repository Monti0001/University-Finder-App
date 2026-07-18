let baseUrl = "http://universities.hipolabs.com/search?country=";
let btn = document.querySelector("button");

btn.addEventListener("click", async () => {
    let country = document.querySelector("input").value;
    console.log(country);
    let colleges = await getcolleges(country);
    show(colleges);
});

function show(colleges) {
    let list = document.querySelector("#list");
    list.innerText = "";
    if (!colleges || colleges.length === 0) {
        let li = document.createElement("li");
        li.innerText = "No universities found. Try another country.";
        list.appendChild(li);
        return;
    }
    for (col of colleges) {
        console.log(col.name);
        let li = document.createElement("li");
        li.innerText = col.name;
        list.appendChild(li);
    }
}

async function getcolleges(country) {
    try {
        let targetUrl = baseUrl + country;
        let proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`;
        let res = await axios.get(proxyUrl);
        return res.data;
    } catch (e) {
        console.log('error - ', e);
        return [];
    }
}
