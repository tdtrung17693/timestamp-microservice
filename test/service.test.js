const request = require("supertest");

const app = require("../app");

const agent = request.agent(app);

describe("/GET /api/timestamp", () => {
    it("should return a time if date string is empty.", () => {
        return agent.get("/api/timestamp")
            .then((res) => {
                expect(res.body).toBeInstanceOf(Object);
                expect("message" in res.body).toBe(false);
            });
    });
});

describe("/GET /api/timestamp/:date_string", () => {
    it("should return a time if date string is valid.", () => {
        return agent.get("/api/timestamp/2017-08-08")
            .then((res) => {
                expect(res.body).toBeInstanceOf(Object);
                expect("error" in res.body).toBe(false);
            });
    });

    it("should not return a time if date string is invalid.", () => {
        return agent.get("/api/timestamp/asdasd")
            .then((res) => {
                expect(res.body).toBeInstanceOf(Object);
                expect("error" in res.body).toBe(true);
                expect(res.body.error).toBe("Invalid Date");
            });
    });
});