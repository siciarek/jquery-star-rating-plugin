/**
 * jQuery Star Rating Plugin v1.0
 * https://github.com/siciarek/jquery-star-rating-plugin
 *
 * Copyright 2012, Jacek Siciarek
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function ($) {

    $.fn.starRating = function (options) {

        var cls = null;
        var tempRates = {};
        var isOver = false;

        var settings = $.extend({}, $.fn.starRating.defaults, options);

        $(document).delegate('.single-star', 'click', function () {

            var parent = $(this).parent();
            var container = parent.attr('id');

            for (var key in $.fn.starRating.rates) {
                $.fn.starRating.previous[key] = $.fn.starRating.rates[key];
            }

            for (var key in $.fn.starRating.rates) {
                $.fn.starRating.rates[key] = tempRates[key];
            }

            options.callback(container);
            isOver = false;
        });

        $(document).delegate('.single-star', 'dblclick', function () {
            var parent = $(this).parent();
            var key = parent.attr('id');

            $.fn.starRating.rates[key] = 0;
            tempRates[key] = 0;

            $(this).mouseout();

            options.callback(key);
            isOver = false;
        });

        $(document).delegate('.single-star', 'mouseover', function () {

            if (isOver == false) {
                for (var key in $.fn.starRating.rates) {
                    tempRates[key] = $.fn.starRating.rates[key];
                }

                isOver = true;
            }

            var parent = $(this).parent();
            var index = parent.attr('id');

            var stars = parent.children('.single-star');

            for (var i = 0; i < stars.length; i++) {
                $(stars[i]).attr('src', settings.offImage);
            }

            for (var i = 0; i < stars.length; i++) {
                tempRates[index] = i + 1;
                if (stars[i] == this) {
                    break;
                }
            }

            for (var i = 0; i < tempRates[index]; i++) {
                $(stars[i]).attr('src', settings.onImage);
            }
        });

        return this.each(function () {
            cls = $(this).attr('class');
            $.fn.starRating.rates[$(this).attr('id')] = 0;
            $.fn.starRating.previous[$(this).attr('id')] = 0;
            tempRates[$(this).attr('id')] = 0;

            $(document).delegate('.' + cls + '', 'mouseout', function () {

                if (isOver = false) {
                    return;
                }

                var parent = $(this);
                var index = parent.attr('id');

                var stars = parent.children('.single-star');

                for (var i = 0; i < stars.length; i++) {
                    $(stars[i]).attr('src', settings.offImage);
                }

                for (var i = 0; i < $.fn.starRating.rates[index]; i++) {
                    $(stars[i]).attr('src', settings.onImage);
                }

                isOver = false;
            });

            for (var i = 0; i < settings.stars; i++) {
                $(this).append('<img class="single-star" style="cursor:pointer; margin-right:4px" src="' + settings.offImage + '" />');
            }

            $(this).append('<img class="spinner" style="cursor:none;" src="' + settings.spinner + '" />');
            $('.spinner').hide();
        });
    }

    $.fn.starRating.getRates = function () {
        return $.fn.starRating.rates;
    };

    $.fn.starRating.rollback = function () {
        for (var key in $.fn.starRating.previous) {
            $.fn.starRating.rates[key] = $.fn.starRating.previous[key];
            $('#' + key).mouseout();
        }
    };

    $.fn.starRating.rates = {};
    $.fn.starRating.previous = {};

    $.fn.starRating.defaults = {
        stars: 5,
        onImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACPElEQVR42mJgwAPOpJneB2F8agACiAmPZgNhI1MFEAayHXCpAwggJjyGxwtoaDII66iB2bgUAQQQTgNYWP8ECChLM/AqazGw87IGAF0hgE0dQAAx4XI+v6qyAsOfrwwMP14wCGvIgDQHYFMLEECMQMUJQFoByucHYgNm1j8GykHOArxyYmDBXx+/MNxavuPDz8//L6DpfwAQQIyXCvT+y9qKMDBzCwPdzc/AK/IJTDOwAvH//1B1/yH4+yM4++/37wyXl75iAAggpl/f2BOfn/7AwCX0jIFXGuhkDnagAT+Aal4AFULxfyjmYGNgYPsD1Hyb4damlwx/fzMnAgQQI9TPAcxsf+ared8U4BJnBRogxMDAyIKwHWzpdwaGv58Zvr38w3Brq/qHv79YEk1mnd4AEECMyAHHwvFnvbzzAwUB5fdYY+bbay6GW+uAmn+yOAI1g8MDIIDgsQAS+PODxfHVZXEGBi4GrPjjY0EGoOZCmGYQAAgg9GhU4JT+xsDAyQDBIPf9ZYDzeVQ/gdToI2sACCB0Axx41T7DNf96xcrw7RkHMPSBfCDFq/mZAT09AAQQugH2vNpAW/4xMLw6JMxwfZH6g+sLNTbcXS0PDD9mYAwwMAjovQflDVi6YQAIIBQDuGS/OYA0312oyPB4l8KGP785DU3mXQj8cEck8HKX9ocP54HpRA3sCnjmAggglFjgkvp6/uc71g9/v7Mmmsw+swEteQsw/P83n0vqW8C3Z9yNQPkGkDhAgAEAm1TBef2lpI0AAAAASUVORK5CYII=',
        offImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAeNJREFUeNpi/P//PwMuUFdXxwyim5qa/uJSw4RLoqamhpmRkfE9CIPYJBvw588fOzMzMzYrKys2INuFZAP+/v3rq6WlxaKmpsYCZLuTbMDv3789REVFmUAYxCbJgJycHG0FBQV5JiYmRhAGukQBKGaJTS0LiEhPT+8EUslAzAaT0NHRYQXaDGarqqqynD17didQHdyHQDwXiKsYExMTU5ycnKY4OzuzMzPjDGwUAIr6/fv3/9q1a1cBI4gTGxvbqa6unhMSEsIJBIz4NH///v3/mjVrvt+8eXM62AWwhBQeHl4hKChYExUVxSEhIYHVKS9evPi7bNmyH+/fv29buXJlG0iMETklBgUFxbGysk7JyMjgFhYWRgngt2/f/psxY8ZXYLjkrFu3bhHWWABKrgYmGgYBAQFg4DMxIGMhISEmYKpkBKrZjDMaQakPGGWs3NzcDGxsbGAnP3ny5C+IDQwbBn19fVb0VInuAndg8mXh4OBgOH369O+Ojo6tPT09a/bt2/cL6DUGU1NTFvRExYSWfA2BSZd5/vz5P+bMmTMJyE/es2dPBDDAeoHgm6SkJEh9qKOjIzyQ4YFoa2vLzc/P/5KPj4/h8ePH6YcPH16KbDhQPgDojUXQqBQByv8CsQECDAByRsuhvgL1HwAAAABJRU5ErkJggg==',
        spinner: 'data:image/gif;base64,R0lGODlhEAAQAPQAAP///wAAAPj4+Dg4OISEhAYGBiYmJtbW1qioqBYWFnZ2dmZmZuTk5JiYmMbGxkhISFZWVgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==',
        callback: function(container) {
            // Overwrite me.
        }
    }

})(jQuery);
