import {server as app} from "../../index";
import request from "supertest";

describe("player endpoints", () => {
    // afterEach(async () => {
    //   await app.close();
    // });

    test("return data for findByNickname", (done) => {
      const nickname = "I_am_host";
      request(app)
        .get(`/players/${nickname}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toMatchObject({nickname});
          done();
        })
    });

    test("success for createPlayer", (done) => {
      const nickname = `host_me_${new Date().valueOf()}`;
      request(app)
        .post(`/players/new`)
        .expect("Content-Type", /json/)
        .expect(200)
        .send({
          nickname,
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toMatchObject({nickname});
          done();
        })
    });

    test("error for duplicate for createPlayer", (done) => {
      const nickname = `I_am_host`;
      request(app)
        .post(`/players/new`)
        .expect("Content-Type", /json/)
        .expect(500)
        .send({
          nickname,
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toMatchObject({message: "Nickname already in use. Chose a different one"})
          done();
        })
    });

});
