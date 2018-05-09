import { ScreengroupChild } from './../models/ScreengroupChild';
import { Router } from '@angular/router';
import { Screengroup } from './../models/Screengroup';
import { ScreengroupService } from './../services/screengroup.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  screengroups: Screengroup[] = [];
  selectedScreengroup: Screengroup;
  selectedChild: Screengroup;
  childName: string;
  screengroupName: string;
  mode: string;
  notifications: any[] = [];
  childLoading: boolean;
  constructor(private router: Router, private authService: AuthService, private screengroupService: ScreengroupService) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.screengroupService.get().subscribe(
        (res: any) => this.screengroups = res.mainScreenGroups,
        error => this.notifications.push(<any>error)
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadChildren(screengroup: Screengroup) {
    this.childLoading = true;
    this.screengroupService.getChildren(screengroup).subscribe(
      (res: any) => screengroup.children = res.children,
      error => this.notifications.push(<any>error),
      () => this.childLoading = false
    );
  }

  loadChildrenFirstLevel(screengroup: Screengroup) {
    this.childLoading = true;
    this.screengroupService.getChildrenFirstLevel(screengroup).subscribe(
      (res: any) => screengroup.children = res.children,
      error => this.notifications.push(<any>error),
      () => this.childLoading = false
    );
  }

  selectScreengroup(screengroup: Screengroup) {
    this.selectedScreengroup = screengroup;
  }

  hideChildren(screengroup: Screengroup) {
    this.selectedScreengroup.children = [];
  }

  selectChild(child: Screengroup) {
    this.selectedChild = child;
  }

  addChild() {
    this.screengroupService.addChild(this.selectedScreengroup, this.childName).subscribe(
      res => this.notifications.push(<any>res),
      error => this.notifications.push(<any>error)
    );
  }

  editScreengroup() {
    this.screengroupService.edit(this.selectedScreengroup, this.screengroupName).subscribe(
      (res: any) => {
        this.notifications.push('Screengroup name updated successfully');
        console.log(res);
        this.selectedScreengroup.name = res.name;
      },
      error => {
        this.notifications.push(<any>error);
        console.log(error);
      }
    );
  }

  removeChild() {
    this.screengroupService.removeChild(this.selectedChild).subscribe(
      res => {
        this.notifications.push(<any>res);
        this.selectedScreengroup.children = this.selectedScreengroup.children.filter(child => child.id !== this.selectedChild.id);
      },
      error => this.notifications.push(<any>error)
    );
  }

  setMode(mode: string) {
    this.mode = mode;
    if (this.mode === 'Edit') {
      this.screengroupName = this.selectedScreengroup.name;
    } else if (this.mode === 'Add') {
      this.childName = '';
    }
  }

  handleAction() {
    if (this.mode === 'Add') {
      this.addChild();
    } else if (this.mode === 'Edit') {
      this.editScreengroup();
    } else if (this.mode === 'Remove') {
      this.removeChild();
    }
  }

  removeNotification(notification: string) {
    this.notifications = this.notifications.filter(item => item !== notification);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
