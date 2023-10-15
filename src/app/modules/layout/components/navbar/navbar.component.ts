import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '@services/auth.service';
import { BoardsService } from '@services/boards.service';
import { Colors, NAVBARBACKGROUNDS } from '../../../../models/colors.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  isOpenOverlayCreateBoard = false;

  user$ = this.authService.user$;
  navbarBackgroundColor: Colors = 'sky';
  navColors = NAVBARBACKGROUNDS;

  constructor(
    private authService: AuthService,
    private router: Router,
    private boardsService: BoardsService
  ) {
    this.boardsService.backgroundColor$.subscribe((color) => {
      this.navbarBackgroundColor = color;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  close(event: boolean) {
    this.isOpenOverlayCreateBoard = event;
  }

  get colors() {
    const classes = this.navColors[this.navbarBackgroundColor];
    return classes ? classes : {};
  }
}
