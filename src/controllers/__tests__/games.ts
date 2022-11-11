import {server as app} from "../../index";
import request from "supertest";

describe("games endpoints", () => {
    // afterEach(async () => {
    //   await app.close();
    // });

    test("test get all users", async () => {
        const res = await request(app)
                    .get("/games")
        expect(res.status).toBe(200);
    });

    test("return data for findAll", (done) => {
      request(app)
        .get(`/games`)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toBeTruthy();
          done();
        })
    });

    test("return data for findById", (done) => {
      request(app)
        .get(`/games/14`)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toMatchObject({"guestNickname": "I_am_guest", "hostNickname": "I_am_host", "id": 14, "numberOfRounds": 3})
          done();
        })
    });

    test("success for createGame", (done) => {
      const hostNickname = `host_me_${new Date().valueOf()}`;
      request(app)
        .post(`/games/new`)
        .expect("Content-Type", /json/)
        .expect(200)
        .send({
          hostNickname,
          numberOfRounds: 10,
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toMatchObject({hostNickname: hostNickname, numberOfRounds: 10})
          done();
        })
    });

    test("success for joinGame", (done) => {
      request(app)
        .post(`/games/join-game`)
        .expect("Content-Type", /json/)
        .expect(200)
        .send({
          gameId: 14,
          nickname: "I_am_guest",
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toMatchObject({guestNickname: "I_am_guest", numberOfRounds: 3})
          done();
        })
    });
});
