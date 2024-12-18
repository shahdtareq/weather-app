const today = document.getElementById("today");
const todayDate = document.getElementById("todayDate");
const tomorrow = document.getElementById("tomorrow");
const tomorrowDate = document.getElementById("tomorrowDate");
const DayAfter = document.getElementById("DayAfter");
const DayAfterDate = document.getElementById("DayAfterDate");
const Location_ = document.getElementById("Location_");
const Temperature = document.getElementById("Temperature");
const icon1 = document.getElementById("icon1");
const status1 = document.getElementById("status1");
const willRain = document.getElementById("willRain");
const maxWind = document.getElementById("maxWind");
const DayTwoIcon = document.getElementById("DayTwoIcon");
const DayTowMaxTemp = document.getElementById("DayTowMaxTemp");
const DayTowMinTemp = document.getElementById("DayTowMinTemp");
const DayTwoStatus = document.getElementById("DayTwoStatus");
const DayThreeIcon = document.getElementById("DayThreeIcon");
const DayThreeMaxTemp = document.getElementById("DayThreeMaxTemp");
const DayThreeMinTemp = document.getElementById("DayThreeMinTemp");
const DayThreeStatus = document.getElementById("DayThreeStatus");
const LocationInput = document.getElementById("LocationInput");
const Home = document.getElementById("Home");
const homeLink = document.getElementById("homeLink");
const Contact = document.getElementById("Contact");

const Locat = "Cairo";
const TodayCard = {
  Loc: undefined,
  Temp: undefined,
  icon: undefined,
  status: undefined,
  rain: undefined,
  wind: undefined,
};
const DayTwoCard = {
  maxTemp: undefined,
  minTemp: undefined,
  icon: undefined,
  status: undefined,
};
const DayThreeCard = {
  maxTemp: undefined,
  minTemp: undefined,
  icon: undefined,
  status: undefined,
};
setTheDate();
getCurrentWeather(Locat);
if (LocationInput) {
  LocationInput.addEventListener("input", function () {
    let regex = /^[a-zA-z]{3,}$/;
    if (regex.test(LocationInput.value)) {
      getCurrentWeather(LocationInput.value);
    } else {
      getCurrentWeather(Locat);
    }
  });
}
if (Home) {
  Home.addEventListener("click", function () {
    location.href = "../index.html";
  });
}

if (Contact) {
  Contact.addEventListener("click", function () {
    location.href = "pages/contact.html";
  });
}

if (homeLink) {
  homeLink.addEventListener("click", function () {
    location.href = "../index.html";
  });
}

async function getCurrentWeather(Locat) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=78210d6e91144662a31160055240912&q=${Locat}&days=3&aqi=no&alerts=no`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  let data = await response.json();
  TodayCard.Loc = data.location.name;
  TodayCard.Temp = data.current.temp_c;
  TodayCard.icon = data.current.condition.icon;
  TodayCard.status = data.current.condition.text;
  TodayCard.rain = data.forecast.forecastday[0].day.daily_will_it_rain;
  TodayCard.wind = data.forecast.forecastday[0].day.maxwind_kph;
  DayTwoCard.icon = data.forecast.forecastday[1].day.condition.icon;
  DayTwoCard.maxTemp = data.forecast.forecastday[1].day.maxtemp_c;
  DayTwoCard.minTemp = data.forecast.forecastday[1].day.mintemp_c;
  DayTwoCard.status = data.forecast.forecastday[1].day.condition.text;
  DayThreeCard.icon = data.forecast.forecastday[2].day.condition.icon;
  DayThreeCard.maxTemp = data.forecast.forecastday[2].day.maxtemp_c;
  DayThreeCard.minTemp = data.forecast.forecastday[2].day.mintemp_c;
  DayThreeCard.status = data.forecast.forecastday[2].day.condition.text;
  displayData();
}

function displayData() {
  if (Location_) {
    Location_.innerHTML = TodayCard.Loc;
    Temperature.innerHTML = TodayCard.Temp;
    icon1.setAttribute("src", TodayCard.icon);
    status1.innerHTML = TodayCard.status;
    willRain.innerHTML = `${TodayCard.rain} %`;
    maxWind.innerHTML = `${TodayCard.wind} Km/h`;

    DayTwoIcon.setAttribute("src", DayTwoCard.icon);
    DayTowMaxTemp.innerHTML = DayTwoCard.maxTemp;
    DayTowMinTemp.innerHTML = DayTwoCard.minTemp;
    DayTwoStatus.innerHTML = DayTwoCard.status;

    DayThreeIcon.setAttribute("src", DayThreeCard.icon);
    DayThreeMaxTemp.innerHTML = DayThreeCard.maxTemp;
    DayThreeMinTemp.innerHTML = DayThreeCard.minTemp;
    DayThreeStatus.innerHTML = DayThreeCard.status;
  }
}

function displayWeather() {}

function setTheDate() {
  let now = new Date();
  let tomorrowDateObj = new Date(now);
  tomorrowDateObj.setDate(now.getDate() + 1);
  let theDayAfterDateObj = new Date();
  theDayAfterDateObj.setDate(now.getDate() + 2);
  let TheDay = {
    day: [
      "sunday",
      "Monday",
      "Thursday",
      "Wednesday",
      "Tuesday",
      "Friday",
      "Saturday",
    ],
    month: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };
  if (today) {
    today.innerHTML = TheDay.day[now.getDay()];
    todayDate.innerHTML = `${now.getDate()}${TheDay.month[now.getMonth()]}`;
    tomorrow.innerHTML = TheDay.day[tomorrowDateObj.getDay()];
    tomorrowDate.innerHTML = `${tomorrowDateObj.getDate()} ${
      TheDay.month[tomorrowDateObj.getMonth()]
    }`;
    DayAfter.innerHTML = TheDay.day[theDayAfterDateObj.getDay()];
    DayAfterDate.innerHTML = `${theDayAfterDateObj.getDate()} ${
      TheDay.month[theDayAfterDateObj.getMonth()]
    }`;
  }
}