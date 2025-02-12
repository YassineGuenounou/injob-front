import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakInstance } from 'keycloak-js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  keycloakInstance!: KeycloakInstance;
  headerPageClicked: string = 'Offers';
  tabs = {
    offers: 'Offers',
    second: 'second',
  };
  constructor(private readonly keycloakService: KeycloakService) {}
  ngOnInit(): void {
    this.keycloakInstance = this.keycloakService.getKeycloakInstance();
  }
  detectTabChange(tab: string): void {
    this.headerPageClicked = tab;
  }
}
