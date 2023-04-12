// @ts-check

$(function () {
    const $placeCodeCountry = $("#placeCodeCountry");
    const $placePostCode = $("#placePostCode");
    const $btnPlace = $("#btnPlace");
    const $placeResults = $("#placeResults");

    const $postCodeCountry = $("#postCodeCountry");
    const $postCodeState = $("#postCodeState");
    const $postCodePlaceName = $("#postCodePlaceName");
    const $btnPostCode = $("#btnPostCode");
    const $postCodeResults = $("#postCodeResults");

    const $sunriseSunsetLatitude = $("#sunriseSunsetLatitude");
    const $sunriseSunsetLongitude = $("#sunriseSunsetLongitude");
    const $sunriseSunsetDate = $("#sunriseSunsetDate");
    const $sunriseSunsetTimeZone = $("#sunriseSunsetTimeZone");
    const $btnSunriseSunset = $("#btnSunriseSunset");
    const $sunriseSunsetResults = $("#sunriseSunsetResults");

    const $weatherForecastLatitude = $("#weatherForecastLatitude");
    const $weatherForecastLongitude = $("#weatherForecastLongitude");
    const $btnWeatherForecast = $("#btnWeatherForecast");
    const $weatherForecastResults = $("#weatherForecastResults");

    const $breweryLatitude = $("#breweryLatitude");
    const $breweryLongitude = $("#breweryLongitude");
    const $breweryType = $("#breweryType");
    const $btnBrewery = $("#btnBrewery");
    const $breweryResults = $("#breweryResults");

    $btnPlace.on("click", function () {
        const country = /** @type {string} */ ($placeCodeCountry.val());
        const postCode = /** @type {string} */ ($placePostCode.val());

        const url = new URL(`https://www.zippopotam.us/${country}/${postCode}`);
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
            if (this.status === 200) {
                const data = JSON.parse(this.responseText);
                $placeResults.text(JSON.stringify(data, null, 2));
            } else {
                $placeResults.text("Error: " + this.status);
            }
        });

        xhr.open("GET", url);
        $placeResults.text("Loading...");
        xhr.send();

        return false;
    });

    $btnPostCode.on("click", function () {
        const country = /** @type {string} */ ($postCodeCountry.val());
        const state = /** @type {string} */ ($postCodeState.val());
        const placeName = /** @type {string} */ ($postCodePlaceName.val());

        const url = new URL(`https://api.zippopotam.us/${country}/${state}/${placeName}`);
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
            if (this.status === 200) {
                const data = JSON.parse(this.responseText);
                $postCodeResults.text(JSON.stringify(data, null, 2));
            } else {
                $postCodeResults.text("Error: " + this.status);
            }
        });

        xhr.open("GET", url);
        $postCodeResults.text("Loading...");
        xhr.send();

        return false;
    });

    $btnSunriseSunset.on("click", function () {
        const latitude = /** @type {string} */ ($sunriseSunsetLatitude.val());
        const longitude = /** @type {string} */ ($sunriseSunsetLongitude.val());
        const date = /** @type {string} */ ($sunriseSunsetDate.val());
        const timeZone = /** @type {string} */ ($sunriseSunsetTimeZone.val());

        const url = new URL(
            `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${date}&date=${date}&time=${timeZone}`
        );
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
            if (this.status === 200) {
                const data = JSON.parse(this.responseText);
                $sunriseSunsetResults.text(JSON.stringify(data, null, 2));
            } else {
                $sunriseSunsetResults.text("Error: " + this.status);
            }
        });

        xhr.open("GET", url);
        $sunriseSunsetResults.text("Loading...");
        xhr.send();

        return false;
    });

    $btnWeatherForecast.on("click", function () {
        const latitude = /** @type {string} */ ($weatherForecastLatitude.val());
        const longitude = /** @type {string} */ ($weatherForecastLongitude.val());

        const url = new URL(
            `https://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=astro&output=json`
        );
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
            if (this.status === 200) {
                const data = JSON.parse(this.responseText);
                $weatherForecastResults.text(JSON.stringify(data, null, 2));
            } else {
                $weatherForecastResults.text("Error: " + this.status);
            }
        });

        xhr.open("GET", url);
        $weatherForecastResults.text("Loading...");
        xhr.send();

        return false;
    });

    $btnBrewery.on("click", function () {
        const latitude = /** @type {string} */ ($breweryLatitude.val());
        const longitude = /** @type {string} */ ($breweryLongitude.val());
        const type = /** @type {string} */ ($breweryType.val());

        const url = new URL(
            `https://api.openbrewerydb.org/breweries?by_dist=${latitude},${longitude}&per_page=3&by_type=${type}`
        );
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function () {
            if (this.status === 200) {
                const data = JSON.parse(this.responseText);
                $breweryResults.text(JSON.stringify(data, null, 2));
            } else {
                $breweryResults.text("Error: " + this.status);
            }
        });

        xhr.open("GET", url);
        $breweryResults.text("Loading...");
        xhr.send();

        return false;
    });
});
