var dodaj_znacznik = false;
var dodaj_notatke = false;
var usun_marker = false;
var odleglosc = false;
var miejsce = false;
var zabytek = false;
var mapLayer = L.geoJson();
var map;
var markers = L.layerGroup();
var popups = L.layerGroup();
var punkt_pomierzony =null;
var kolka=[];
var kol=false;

window.onload = function() {
	map = L.map('map');
	okno_glowne();
	map.closePopupOnClick = false;
	L.tileLayer(
					'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
					{
						attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					}).addTo(map);


	map.on('click', klik_mapa);

	function klik_mapa(e) {
		if(odleglosc){
			console.log("Zmierz odległość");
			if(punkt_pomierzony==null){
				console.log("nieokreślony punkt");
				punkt_pomierzony=e.latlng;
			} else {
				console.log("wyswietlanie odleglosci");
				var dist = punkt_pomierzony.distanceTo(e.latlng);
				alert("Odległość: " + (dist/1000).toFixed(3)  + " km");
				punkt_pomierzony = null;
				odleglosc = false;
			}
		}
		if (usun_marker) {
			console.log("usuwanie znacznika");
		}
		if (dodaj_notatke) {
			dodaj_znacznik = false;
			console.log("Dodawanie notatki: " + e.latlng);
			var tekst_notatki = prompt("Podaj tekst notatki: ");

			var popup = L.popup();
			popup.keepInView = true;
			popup.closeOnClick = false;
			popup.autoPan = false;
			popup.setLatLng(e.latlng).setContent(tekst_notatki);
			popup.addTo(popups);
			popups.addTo(map);

			dodaj_notatke = false;
		}
		if (dodaj_znacznik) {
			var punkt_ikona = L.icon({
				iconUrl : 'punkt1.jpg',
				iconSize : [ 50, 50 ], 
				shadowSize : [ 50, 64 ], 
				iconAnchor : [ 22, 20 ], 
				shadowAnchor : [ -5, -10 ], 
			});
			var marker = L.marker([ 43.5147, 16.4469 ], {
				icon : punkt_ikona
			});
			marker.on('click', klik_znacznik);
			marker.setLatLng(e.latlng);
			markers.addLayer(marker);
			markers.addTo(map);
			dodaj_znacznik = false;
		}
		if (miejsce) {
			var miejsce_ikona = L.icon({
				iconUrl : 'miejsce2.png',
				iconSize : [ 50, 50 ], 
				shadowSize : [ 50, 64 ],
				iconAnchor : [ 22, 20 ], 
				shadowAnchor : [ 4, 62 ], 
				popupAnchor : [ -5, -10 ]
			});

			var marker = L.marker([ 43.5147, 16.4469 ], {
				icon : miejsce_ikona
			});
			marker.on('click', klik_znacznik);
			marker.setLatLng(e.latlng);
			markers.addLayer(marker);
			markers.addTo(map);
			marker.bindPopup("<b>Ciekawe miejsce</b>").openPopup();
			miejsce = false;
		}
		
		if (zabytek) {
			var zabytek_ikona = L.icon({
				iconUrl : 'zabytek.jpg',
				iconSize : [ 50, 50 ],
				shadowSize : [ 50, 64 ], 
				iconAnchor : [ 22, 20 ],
				shadowAnchor : [ 4, 62 ],
				popupAnchor : [ -5, -10 ]
			});
			var marker = L.marker([ 43.5147, 16.4469 ], {
				icon : zabytek_ikona
			});
			marker.on('click', klik_znacznik);
			marker.setLatLng(e.latlng);
			markers.addLayer(marker);
			markers.addTo(map);
			marker.bindPopup("<b>Zabytek</b>").openPopup();
			zabytek = false;
		}
		if (kol) {
			var promien = prompt("Podaj promień koła:");
			var circle = L.circle([e.latlng.lat, e.latlng.lng], promien, {color: 'red',fillColor: '#f03',fillOpacity: 0.5}).addTo(map);
			kolka.push(circle);
			kol=false;
			$('#circle').css( "background-color", "red");
		}
	
}
};

$("#circle").click(function(){
	$( this ).css( "background-color", "red");
	kol=true;  
});

	function klik_znacznik(e) {
		if (usun_marker) {
			markers.removeLayer(this);
		}
	}

function usun_znacznik() {
	usun_marker = true;
}

function usun_notatki() {
	popups.clearLayers();
}

function okno_glowne() {
	console.log("przywracanie okna glownego mapy");
	map.setView([ 43.5147, 16.4469 ], 14);
}


function dodaj_WMS() {
	var WMS = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
					{
						attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					}).addTo(map);
					map.setView([43.1713, 16.6199 ], 12);
}
	
function polozenie(){
	function klik_mapa(e) {
	    alert("Twoje współrzędne to:  " + "\n" +  e.latlng.lat  + "  "+  e.latlng.lng);
	}

	map.on('click', klik_mapa);
}

function zmierz_odleglosc(){
	console.log("zmierz odleglosc");
	odleglosc=true;
}

