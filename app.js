const proxyurl = "https://cors-anywhere.herokuapp.com/http://cnos.herokuapp.com/predict";
const url = "https://immo-dev-api.herokuapp.com/predict";
let answer = null;
const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
fetch(proxyurl)
    .then(response => response.json())
    .then((data) => {
		let arrzip = [];
    	let content =data.properties.data.properties['zip-code'].enum;
    	content.sort();
    	let zip = null;
		content.forEach(element => {
				zip = `<option value="${element}">${element}</option>`;
			document.getElementById("zip").insertAdjacentHTML("beforeend", zip);
		});
	});

document.querySelector("#submit").addEventListener("click", (event) => {
	event.preventDefault();
	let property_type = document.getElementById('type').value;
	let room_number = document.getElementById("rooms").value;
	let zip_code = document.getElementById("zip").value;
	let area = document.getElementById("area").value;
	let price = null;
	let data = {
	    	"property-type": property_type.toUpperCase(),
	    	"area": new Number(area),
	    	"rooms-number": new Number(room_number),
	    	"zip-code": new Number(zip_code)
	};		
fetch(url,{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        data
    })
})
.then(response => response.json())
.then((contents) =>{
    console.log(contents);
       	if(document.querySelector("#price")){
           document.querySelector("#price").remove();
		}
       	answer = "<p id='price' style = 'text-align:center;'>With those parameters, the average result for the " + property_type + " is : " + formatter.format(Math.floor(contents.prediction.price)) + " .</p>";
        document.querySelector("#container").insertAdjacentHTML("beforeend",answer);
	})
.catch(() => console.log("Can’t access " + " response. Blocked by browser?"))
});
