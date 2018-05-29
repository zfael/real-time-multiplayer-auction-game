'use strict';

module.exports = {
    "plugins": [],
    "recurseDepth": 10,
    "source": {
        "include": [
            "./lib/auth.js",
            "./lib/auctionJob.js",
            "./lib/api/auction.js",
            "./lib/api/inventory.js",
            "./lib/api/user.js",
            "./lib/controller/auctionController.js",
            "./lib/controller/inventoryController.js",
            "./lib/controller/userController.js",
            "./lib/models/auction.js",
            "./lib/models/inventory.js",
            "./lib/models/items.js",
            "./lib/models/user.js",
        ],
        "includePattern": ".+\\.js(doc|x)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    },
    "sourceType": "module",
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc", "closure"]
    },
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false
    }
};