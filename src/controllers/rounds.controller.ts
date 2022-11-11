import { Request, Response } from 'express';
import gameRepository from "../repository/rounds.repository";
import {RoundTypeAPIOutput} from "./../types";

function findAllByGameId(req: Request, res: Response) {
  const gameId = req.params.gameId;
  gameRepository.findAllByGameId(parseInt(gameId), (data: RoundTypeAPIOutput[]) => {
    return res.json(data);
  });
}

function createRound(req: Request, res: Response) {
  const {gameId, hostAction, guestAction} = req.body;
  const cb = (rounds: RoundTypeAPIOutput[]) => {
    return res.json(rounds);
  };
  gameRepository.createRound(cb, gameId, hostAction, guestAction);
}

function updateRound(req: Request, res: Response) {
  const {id, gameId, hostAction, guestAction} = req.body;
  const cb = (rounds: RoundTypeAPIOutput[]) => {
    return res.json(rounds);
  };
  gameRepository.updateRound(cb, id, gameId, hostAction, guestAction);
}

const controller = {
  findAllByGameId,
  createRound,
  updateRound,
}

export default controller;