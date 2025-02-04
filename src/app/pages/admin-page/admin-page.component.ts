import { Component, HostListener, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-admin-page',
  imports: [RouterLink, SidebarComponent, MainComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent implements OnInit {
  isSidebarSmall = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() < 768) {
      this.isSidebarSmall.set(true);
    }
  }

  ngOnInit(): void {
    this.isSidebarSmall.set(this.screenWidth() < 768);
  }

  changeSidebar(isSidebarSmall: boolean): void {
    this.isSidebarSmall.set(isSidebarSmall);
  }
}
