jquery.star-rating
===============================

Lightweight (no external graphics) jquery plugin for star rating.

## Installation

Include script *after* the jQuery library (unless you are packaging scripts somehow else):

    <script src="/path/to/jquery.star-rating.js"></script>

## Demo page

[http://siciarek.linuxpl.info/jquery-star-rating-plugin/demo/index.html](http://siciarek.linuxpl.info/jquery-star-rating-plugin/demo/index.html)

## Usage

###Basic usage (html):

&lt;p&gt;1. Some text for the first rate&lt;/p&gt;
&lt;div class="starrate" id="first"&gt;&lt;/div&gt;

###Basic usage (javascript):

    $('.starrate').starRating({stars: 10});


## Options

Number of stars, 5 as default.

    stars: 5

Icon images, can be customized with your own value base64 encoded or just url.

    onImage: 'data:image/png;base64,iVBOR...CYII=',
    offImage: 'data:image/png;base64,iVBOR...ggg==',
    spinner: 'data:image/gif;base64,R0lG...AAA==',

Callback function, *container* is rate id value. In example above *first*.

    callback: function(container) {
        // Overwrite me.
    }

## Development

- Source hosted at [GitHub](https://github.com/siciarek/jquery-star-rating-plugin)
- Report issues, questions, feature requests on [GitHub Issues](https://github.com/siciarek/jquery-star-rating-plugin/issues)

## Authors

[Jacek Siciarek](https://github.com/siciarek)
