import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  playlists = [
    { name: 'Chill Hits', description: 'Relax and unwind with these chill tracks.', image: 'assets/image.jpg' },
    { name: 'Top 50', description: 'The top 50 songs globally right now.', image: 'assets/image.jpg' },
    { name: 'Workout', description: 'Get your heart pumping with these workout tracks.', image: 'assets/image.jpg' },

  ];

  constructor() { }

  ngOnInit() {
  }

  surpriseMe(): void {
    // Logic to play a random song
    console.log('Surprise Me button clicked!');
  }

}
