const url = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=4ad5eeea1a5b31382a642d4760a566fb`;
const city = "paris";

function hello() {
  axios
    .get(url)
    .then((response) => {
      console.log(
        response.status +
          `Temparature is :${response.data.main.temp - 273} at ${city}`
      );
    })
    .catch((error) => {
      console.error(error);
      // res.send(error.response.status);
    });
}
