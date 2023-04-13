// @ts-check

$(function () {
    const $placeCountry = $("#placeCountry");
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
        const country = /** @type {string} */ ($placeCountry.val());
        const postCode = /** @type {string} */ ($placePostCode.val());
        const $results = $placeResults;

        const url = new URL(`https://www.zippopotam.us/${country}/${postCode}`);
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", handleXhrLoad.bind(xhr, $results, writePlaceData));
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
        xhr.addEventListener("load", handleXhrLoad.bind(xhr, $results, writePostCodeData));
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

        setLatestCoordinates(latitude, longitude);

        const url = new URL(
            `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${date}&date=${date}&time=${timeZone}`
        );
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", handleXhrLoad.bind(xhr, $results, writeSunriseSunsetData));
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

        setLatestCoordinates(latitude, longitude);

        const url = new URL(
            `https://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=astro&output=json`
        );
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", handleXhrLoad.bind(xhr, $results, null));
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

        setLatestCoordinates(latitude, longitude);

        const url = new URL(
            `https://api.openbrewerydb.org/breweries?by_dist=${latitude},${longitude}&per_page=3&by_type=${type}`
        );
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", handleXhrLoad.bind(xhr, $results, null));
        xhr.addEventListener("error", handleXhrError.bind(xhr, $results));

        xhr.open("GET", url);
        $results.text("Loading...");
        xhr.send();

        return false;
    });

    /**
     * @param {string} country
     */
    function setLatestCountry(country) {
        if ($placeCountry.val().toString().toLowerCase() !== country.toLowerCase()) {
            $placeCountry.val(country);
            $placeResults.empty();
        }
        if ($postCodeCountry.val().toString().toLowerCase() !== country.toLowerCase()) {
            $postCodeCountry.val(country);
            $postCodeResults.empty();
        }
    }

    /**
     * @param {string} postCode
     */
    function setLatestPostCode(postCode) {
        if ($placePostCode.val() !== postCode) {
            $placePostCode.val(postCode);
            $placeResults.empty();
        }
    }

    /**
     * @param {string} state
     * @param {string} placeName
     */
    function setLatestStateAndPlaceName(state, placeName) {
        if (
            $postCodeState.val().toString().toLowerCase() !== state.toLowerCase() ||
            $postCodePlaceName.val().toString().toLowerCase() !== placeName.toLowerCase()
        ) {
            $postCodeState.val(state);
            $postCodePlaceName.val(placeName);
            $postCodeResults.empty();
        }
    }

    /**
     * @param {string} latitude
     * @param {string} longitude
     */
    function setLatestCoordinates(latitude, longitude) {
        if (
            $sunriseSunsetLatitude.val() !== latitude ||
            $sunriseSunsetLongitude.val() !== longitude
        ) {
            $sunriseSunsetLatitude.val(latitude);
            $sunriseSunsetLongitude.val(longitude);
            $sunriseSunsetResults.empty();
        }
        if (
            $weatherForecastLatitude.val() !== latitude ||
            $weatherForecastLongitude.val() !== longitude
        ) {
            $weatherForecastLatitude.val(latitude);
            $weatherForecastLongitude.val(longitude);
            $weatherForecastResults.empty();
        }
        if ($breweryLatitude.val() !== latitude || $breweryLongitude.val() !== longitude) {
            $breweryLatitude.val(latitude);
            $breweryLongitude.val(longitude);
        }
    }

    /**
     * @param {JQuery} $results
     * @param {Function | null} dataHandler
     * @param {ProgressEvent<XMLHttpRequest>} event
     */
    function handleXhrLoad($results, dataHandler, event) {
        const xhr = event.target;
        if (xhr.status !== 200) {
            writeError($results, `The request was not successful. Status code: ${xhr.status}`);
            return;
        }
        try {
            var data = JSON.parse(xhr.responseText);
        } catch (error) {
            let message;
            if (error instanceof SyntaxError) {
                message = "The response was not valid JSON.";
            } else {
                message = `An unknown error occurred. ${error.message}`;
            }
            writeError($results, message);
            return;
        }
        console.log(data);
        if (dataHandler) {
            dataHandler($results, data);
        } else {
            const pre = document.createElement("pre");
            pre.textContent = JSON.stringify(data, null, 2);
            $results[0].replaceChildren(pre);
        }
    }

    /**
     * @param {JQuery} $results
     * @param {ProgressEvent<XMLHttpRequest>} event
     */
    function handleXhrError($results, event) {
        writeError($results, "The request encountered an error.");
    }

    /**
     * @param {JQuery} $results
     * @param {string} message
     */
    function writeError($results, message) {
        console.error(`Error: ${message}`);
        $results.text(`Error: ${message}`);
    }

    /**
     * @param {JQuery<HTMLDivElement>} $target
     * @param {{
     *      country: string;
     *      "country abbreviation": string;
     *      "post code": string;
     *      places: {
     *          "place name": string;
     *          state: string;
     *          "state abbreviation": string;
     *          latitude: string;
     *          longitude: string;
     *      }[];
     * }} data
     */
    function writePlaceData($target, data) {
        const country = data.country;
        const countryAbbreviation = data["country abbreviation"];
        const postCode = data["post code"];
        const places = data.places;

        setLatestCountry(countryAbbreviation);
        setLatestStateAndPlaceName(places[0]["state abbreviation"], places[0]["place name"]);
        setLatestCoordinates(places[0].latitude, places[0].longitude);

        const $places = $(document.createElement("ul"));
        places.forEach((place) => {
            $places.append(
                `<li><dl><dt>Place Name</dt><dd>${place["place name"]}</dd>` +
                    `<dt>State</dt><dd>${place.state} (${place["state abbreviation"]})</dd>` +
                    `<dt>Latitude</dt><dd>${place.latitude}</dd>` +
                    `<dt>Longitude</dt><dd>${place.longitude}</dd></dl></li>`
            );
        });

        $target.html(
            `<dl><dt>Country</dt><dd>${country} (${countryAbbreviation})</dd>` +
                `<dt>Post Code</dt><dd>${postCode}</dd></dl>`
        );
        $target.append($places);
    }

    /**
     * @param {JQuery<HTMLDivElement>} $target
     * @param {{
     *      country: string;
     *      "country abbreviation": string;
     *      state: string;
     *      "state abbreviation": string;
     *      places: {
     *          "post code": string;
     *          "place name": string;
     *          latitude: string;
     *          longitude: string;
     *      }[];
     * }} data
     */
    function writePostCodeData($target, data) {
        const country = data.country;
        const countryAbbreviation = data["country abbreviation"];
        const state = data.state;
        const stateAbbreviation = data["state abbreviation"];
        const places = data.places;

        setLatestCountry(countryAbbreviation);
        setLatestPostCode(places[0]["post code"]);
        setLatestCoordinates(places[0].latitude, places[0].longitude);

        const $places = $(document.createElement("ul"));
        places.forEach((place) => {
            $places.append(
                `<li><dl><dt>Post Code</dt><dd>${place["post code"]}</dd>` +
                    `<dt>Place Name</dt><dd>${place["place name"]}</dd>` +
                    `<dt>Latitude</dt><dd>${place.latitude}</dd>` +
                    `<dt>Longitude</dt><dd>${place.longitude}</dd></dl></li>`
            );
        });

        $target.html(
            `<dl><dt>Country</dt><dd>${data.country} (${countryAbbreviation})</dd>` +
                `<dt>State</dt><dd>${state} (${stateAbbreviation})</dd></dl>`
        );
        $target.append($places);
    }

    /**
     * @param {JQuery<HTMLDivElement>} $target
     * @param {{
     *      results: {
     *          sunrise: string;
     *          sunset: string;
     *          first_light: string;
     *          last_light: string;
     *          dawn: string;
     *          dusk: string;
     *          solar_noon: string;
     *          golden_hour: string;
     *          day_length: string;
     *          timezone: string;
     *      };
     * }} data
     */
    function writeSunriseSunsetData($target, data) {
        const results = data.results;

        $target.html(
            `<dl><dt>Sunrise</dt><dd>${results.sunrise}</dd>` +
                `<dt>Sunset</dt><dd>${results.sunset}</dd>` +
                `<dt>First Light</dt><dd>${results.first_light}</dd>` +
                `<dt>Last Light</dt><dd>${results.last_light}</dd>` +
                `<dt>Dawn</dt><dd>${results.dawn}</dd>` +
                `<dt>Dusk</dt><dd>${results.dusk}</dd>` +
                `<dt>Solar Noon</dt><dd>${results.solar_noon}</dd>` +
                `<dt>Golden Hour</dt><dd>${results.golden_hour}</dd>` +
                `<dt>Day Length</dt><dd>${results.day_length}</dd>` +
                `<dt>Time Zone</dt><dd>${results.timezone}</dd></dl>`
        );
    }
});
