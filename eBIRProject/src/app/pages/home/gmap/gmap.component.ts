import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { MapsService } from 'src/app/services/maps.service';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnInit {
  zoom = 8;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions

  constructor(private ms: MapsService) { }

  ngOnInit(): void {
    console.log("calling initMap");

    this.center = {
      lat: this.ms.myLat,
      lng: this.ms.myLong
    }

    let markers: object[] = this.ms.getMarkers();
  }

  loadGM() {
    let script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCWPS2gQyPHfuIps7MxjDT6rY7wNM3BOpQ&callback=initMap";
    script.defer = true;

    document.head.appendChild(script);
  }

}
