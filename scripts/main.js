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
        const $results = $placeResults;

        const url = new URL(`https://www.zippopotam.us/${country}/${postCode}`);
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", handleXhrLoad.bind(xhr, $results));
        xhr.addEventListener("error", handleXhrError.bind(xhr, $results));

        xhr.open("GET", url);
        $results.text("Loading...");
        xhr.send();

        return false;
    });

    $btnPostCode.on("click", function () {
        const country = /** @type {string} */ ($postCodeCountry.val());
        const state = /** @type {string} */ ($postCodeState.val());
        const placeName = /** @type {string} */ ($postCodePlaceName.val());
        const $results = $postCodeResults;

        const url = new URL(`https://api.zippopotam.us/${country}/${state}/${placeName}`);
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", handleXhrLoad.bind(xhr, $results));
        xhr.addEventListener("error", handleXhrError.bind(xhr, $results));

        xhr.open("GET", url);
        $results.text("Loading...");
        xhr.send();

        return false;
    });

    $btnSunriseSunset.on("click", function () {
        const latitude = /** @type {string} */ ($sunriseSunsetLatitude.val());
        const longitude = /** @type {string} */ ($sunriseSunsetLongitude.val());
        const date = /** @type {string} */ ($sunriseSunsetDate.val());
        const timeZone = /** @type {string} */ ($sunriseSunsetTimeZone.val());
        const $results = $sunriseSunsetResults;

        const url = new URL(
            `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${date}&date=${date}&time=${timeZone}`
        );
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", handleXhrLoad.bind(xhr, $results));
        xhr.addEventListener("error", handleXhrError.bind(xhr, $results));

        xhr.open("GET", url);
        $results.text("Loading...");
        xhr.send();

        return false;
    });

    $btnWeatherForecast.on("click", function () {
        const latitude = /** @type {string} */ ($weatherForecastLatitude.val());
        const longitude = /** @type {string} */ ($weatherForecastLongitude.val());
        const $results = $weatherForecastResults;

        const url = new URL(
            `https://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=astro&output=json`
        );
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", handleXhrLoad.bind(xhr, $results));
        xhr.addEventListener("error", handleXhrError.bind(xhr, $results));

        xhr.open("GET", url);
        $results.text("Loading...");
        xhr.send();

        return false;
    });

    $btnBrewery.on("click", function () {
        const latitude = /** @type {string} */ ($breweryLatitude.val());
        const longitude = /** @type {string} */ ($breweryLongitude.val());
        const type = /** @type {string} */ ($breweryType.val());
        const $results = $breweryResults;

        const url = new URL(
            `https://api.openbrewerydb.org/breweries?by_dist=${latitude},${longitude}&per_page=3&by_type=${type}`
        );
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", handleXhrLoad.bind(xhr, $results));
        xhr.addEventListener("error", handleXhrError.bind(xhr, $results));

        xhr.open("GET", url);
        $results.text("Loading...");
        xhr.send();

        return false;
    });
});

/**
 * @param {JQuery} $results
 * @param {ProgressEvent<XMLHttpRequest>} event
 */
function handleXhrLoad($results, event) {
    const xhr = event.target;
    if (xhr.status !== 200) {
        const message = `Error: ${xhr.status}`;
        console.error(message);
        $results.text(message);
        return;
    }
    try {
        var data = JSON.parse(xhr.responseText);
    } catch (error) {
        const message = `Error: ${error.message}`;
        console.error(message);
        $results.text(message);
        return;
    }
    console.log(data);
    $results.text(JSON.stringify(data, null, 2));
}

/**
 * @param {JQuery} $results
 * @param {ProgressEvent<XMLHttpRequest>} event
 */
function handleXhrError($results, event) {
    const message = `Error: ${event.target.status}`;
    console.error(message);
    $results.text(message);
}
