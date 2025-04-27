Welcome!
Ein Webprojekt zur Verwaltung von Schülernoten für Volksschullehrer.
Lehrer können täglich Bewertungen zu einzelnen Fächern und Schülern eintragen, Monatsauswertungen abrufen und eigene Statistiken einsehen.

Features:
Registrierung & Login mit sicherem JWT-Token-Handling
Schülerverwaltung: Anlegen, Bearbeiten, Löschen von Schülern
Fächerverwaltung: Anlegen und Löschen von Unterrichtsfächern
Bewertungssystem: Tägliche Noten- und Kommentarerfassung
Monatsauswertung: Durchschnittsnoten & Gesamtnoten je Schüler
Lehrerstatistiken: Fachspezifische Auswertungen mit Notenverteilungen
Responsives modernes Frontend (getrenntes Projekt)
REST-API nach Best Practices entwickelt

Verwendete Technologien 

Backend:
Java 21
Spring Boot 3
Spring Security (JWT-Authentifizierung)
Spring Data JPA (Datenbankzugriff)
Lombok (Code-Reduzierung)
PostgreSQL / MySQL (flexibel einsetzbar)
Maven (Build-Management)

Frontend:
TypeScript
React.js
Tailwind CSS (modernes UI)
Sonstiges:
Docker-Containerisierung möglich
OpenAPI / Swagger Dokumentation (optional integrierbar)

Setup-Anleitung:
Voraussetzungen:
Java 21 installiert
Maven installiert
PostgreSQL oder MySQL Datenbank aufgesetzt (Datenbankname z. B. notenmanager)
Optional: Docker Desktop (für Containerisierung)

1. Projekt klonen

git clone https://github.com/dein-github-username/notenmanager.git
cd notenmanager

2. Datenbank konfigurieren
In der Datei application.properties:

spring.datasource.url=jdbc:postgresql://localhost:5432/notenmanager
spring.datasource.username=dein_db_username
spring.datasource.password=dein_db_passwort

jwt.secret=dein_secret
spring.jpa.hibernate.ddl-auto=update
(Hinweis: Für MySQL bitte den JDBC-URL und Treiber anpassen.)

3. Backend starten
./mvnw spring-boot:run
oder
mvn spring-boot:run

4. Frontend starten:
cd frontend
npm install
npm run dev
Frontend läuft dann standardmäßig auf:
http://localhost:3000

API-Endpunkte:

HTTP Methode	Pfad	Beschreibung
POST	/api/auth/register	Registrierung neuer Lehrer
POST	/api/auth/login	Login & Token erhalten
GET	/api/lehrer/dashboard	Dashboard-Daten des Lehrers
POST	/api/lehrer/schueler	Schüler anlegen
POST	/api/lehrer/faecher	Fach anlegen
POST	/api/lehrer/bewertung	Bewertung speichern
GET	/api/lehrer/statistik	Lehrerstatistik abrufen
