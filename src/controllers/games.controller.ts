import { Request, Response } from 'express';
import gameRepository from "../repository/games.repository";
import {GameTypeAPIOutput} from "./../types";

function findAll(req: Request, res: Response) {
  gameRepository.findAll((data: GameTypeAPIOutput[]) => {
    return res.json(data);
  });
}

function findById(req: Request, res: Response) {
  const id = req.params.id;
  gameRepository.findById(parseInt(id), (data: GameTypeAPIOutput) => {
    return res.json(data);
  });
}

function createGame(req: Request, res: Response) {
  const {hostNickname, numberOfRounds} = req.body;
  gameRepository.createGame(hostNickname, numberOfRounds, (game: any) => {
    return res.json(game);
  });
}

function joinGame(req: Request, res: Response) {
  const {gameId, nickname} = req.body;
  gameRepository.joinGame(parseInt(gameId), nickname, (game: any) => {
    return res.json(game);
  }, (errorMessage: string) => {
    return res.status(403).send({
      message: errorMessage
    });
  });
}

const controller = {
  findAll,
  findById,
  createGame,
  joinGame,
}

export default controller;