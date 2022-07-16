import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameState } from './constants';
import {
  GridMoveResult,
  emptyGrid,
  moveGridDown,
  moveGridLeft,
  moveGridRight,
  moveGridUp,
  setNextNumber,
  checkGameStatus,
} from './game.util';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  private scoreSubject = new BehaviorSubject(0);
  public score$ = this.scoreSubject.asObservable();
  private gridSubject = new BehaviorSubject(this.initialGrid());
  public grid$ = this.gridSubject.asObservable();
  private gameStateSubject = new BehaviorSubject<GameState>(
    GameState.inProgress
  );
  public gameState$ = this.gameStateSubject.asObservable();
  constructor() {
    this.resetGame();
  }
  resetGame() {
    this.gridSubject.next(this.initialGrid());
    this.scoreSubject.next(0);
    this.gameStateSubject.next(GameState.inProgress);
  }
  private initialGrid() {
    return setNextNumber(setNextNumber(emptyGrid()));
  }
  private moveAction(moveFunction: (grid: number[][]) => GridMoveResult) {
    const result = moveFunction(this.gridSubject.getValue());
    this.scoreSubject.next(this.scoreSubject.getValue() + result.score);
    const grid = setNextNumber(result.grid);
    this.gridSubject.next(grid);
    this.gameStateSubject.next(checkGameStatus(grid));
  }
  public moveLeft() {
    this.moveAction(moveGridLeft);
  }
  public moveRight() {
    this.moveAction(moveGridRight);
  }
  public moveUp() {
    this.moveAction(moveGridUp);
  }
  public moveDown() {
    this.moveAction(moveGridDown);
  }
}
