import { Component, HostListener } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GameState } from './constants';
import { GameStateService } from './game-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isNotInProgress$:Observable<boolean>;
  isWon$:Observable<boolean>;
  constructor(public gameStateService:GameStateService){
    this.isNotInProgress$ = gameStateService.gameState$.pipe(map(item => item !== GameState.inProgress));
    this.isWon$ = gameStateService.gameState$.pipe(map(item => item === GameState.won));
  }

  @HostListener('window:keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        this.gameStateService.moveLeft();
        break;
      case 'ArrowRight':
        this.gameStateService.moveRight();
        break;
      case 'ArrowUp':
        this.gameStateService.moveUp();
        break;
      case 'ArrowDown':
        this.gameStateService.moveDown();
        break;
      default:
        break;
    }
  }
  resetGame(){

    this.gameStateService.resetGame();
  }
  onSwipeLeft() {
    this.gameStateService.moveLeft();
  }

  onSwipeRight() {
    this.gameStateService.moveRight();
  }

  onSwipeUp() {
    this.gameStateService.moveUp();
  }

  onSwipeDown() {
    this.gameStateService.moveDown();
  }

}
