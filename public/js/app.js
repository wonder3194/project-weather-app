//console.log("client side js file loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#message-1");
const msg2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  searchLocation = search.value;
  msg2.textContent = "";
  msg1.textContent = "Loading...";
  fetch("http://localhost:3000/weather?address=" + searchLocation).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          msg1.textContent = "unable to find data.Try another search!";
        } else {
          msg1.textContent = data.place;
          msg2.textContent = data.forecast;
        }
      });
    }
  );
});
