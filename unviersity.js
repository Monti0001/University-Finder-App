let baseUrl = "http://universities.hipolabs.com/search?name=";

let btn = document.querySelector("button");

btn.addEventListener("click", async () => {
    let country = document.querySelector("input").value.trim();

    if (country === "") {
        alert("Enter something");
        return;
    }

    let colleges = await getcolleges(country);
    show(colleges);
});

function show(colleges) {
    let list = document.querySelector("#list");
    list.innerText = "";

    if (colleges.length === 0) {
        let li = document.createElement("li");
        li.innerText = "❌ No result found";
        list.appendChild(li);
        return;
    }

    for (let col of colleges) {
        let li = document.createElement("li");
        li.innerText = col.name;
        list.appendChild(li);
    }
}

async function getcolleges(country) {
    try {
        let url = `https://api.allorigins.win/raw?url=${encodeURIComponent(baseUrl + country)}`;

        let res = await axios.get(url);
        return res.data;

    } catch (e) {
        console.log("error - ", e);
        return [];
    }
}
