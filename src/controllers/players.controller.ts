import { Request, Response } from 'express';
import playerRepository from "../repository/players.repository";
import {UNIQUE_CONSTRAINT} from "../constants/sqlErrors";
// import {PlayerTypeAPIOutput} from "./../types";

function findByNickname(req: Request, res: Response) {
  const nickname = req.params.nickname;
  playerRepository.findByNickname(nickname, (player: any) => {
    return res.json(player);
  });
}

function createPlayer(req: Request, res: Response) {
  const {nickname} = req.body;

  if (!nickname) {
    res.status(500).send({
      message: "Nickname can't be empty"
   });
   return;
  }

  playerRepository.createPlayer(nickname, (player: any) => {
    return res.json(player);
  }, (errorMessage: string) => {
    if (errorMessage.includes(UNIQUE_CONSTRAINT)) {
      res.status(500).send({
        message: "Nickname already in use. Chose a different one"
     });
    }
  });
}

const controller = {
  createPlayer,
  findByNickname,
}

export default controller;
