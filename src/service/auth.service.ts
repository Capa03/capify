// src/app/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clientId = 'YOUR_SPOTIFY_CLIENT_ID';
  private redirectUri = 'http://localhost:4200/callback';
  private authEndpoint = 'https://accounts.spotify.com/authorize';
  private scopes = [
    'user-read-private',
    'user-read-email'
  ];

  constructor() { }

  public loginWithSpotify(): void {
    const authUrl = `${this.authEndpoint}?client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${encodeURIComponent(this.scopes.join(' '))}&response_type=token&show_dialog=true`;
    window.location.href = authUrl;
  }
}
