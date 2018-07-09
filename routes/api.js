const express = require("express");
const router = express.Router();

function isValidDate(date) {
    return ! isNaN(date.getTime());
}

function constructMessage(date) {
    let message = {};

    if (!isValidDate(date)) {
        message.error = "Invalid Date";
    } else {
        message.unix = date.getTime();
        message.utc = date.toUTCString();
    }

    return message;
}

function timestampHandler(req, res) {
    const date = req.params.date_string ? new Date(req.params.date_string)
                                        : new Date();

    res.json(
        constructMessage(date)
    );
}

router.get("/timestamp/:date_string", timestampHandler);
router.get("/timestamp", timestampHandler);

module.exports = router;
