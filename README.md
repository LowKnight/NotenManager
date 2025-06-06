# NotenManager

**Welcome!**  
Ein Webprojekt zur Verwaltung von Schülernoten für Volksschullehrer.  
Lehrer können täglich Bewertungen zu einzelnen Fächern und Schülern eintragen, Monatsauswertungen abrufen und eigene Statistiken einsehen.

---

## 🚀 Features

- **Registrierung & Login** mit sicherem JWT-Token-Handling
- **Schülerverwaltung**: Anlegen, Bearbeiten und Löschen von Schülern
- **Fächerverwaltung**: Anlegen und Löschen von Unterrichtsfächern
- **Bewertungssystem**: Tägliche Noten- und Kommentarerfassung
- **Monatsauswertung**: Durchschnittsnoten & Gesamtnoten je Schüler
- **Lehrerstatistiken**: Fachspezifische Auswertungen mit Notenverteilungen
- **Responsives modernes Frontend** (eigenständiges Projekt)
- **REST-API** nach Best Practices entwickelt

---

## ⚙️ Verwendete Technologien

**Backend:**

- Java 21
- Spring Boot 3
- Spring Security (JWT-Authentifizierung)
- Spring Data JPA (Datenbankzugriff)
- Lombok (Code-Reduzierung)
- PostgreSQL / MySQL (flexibel)
- Maven (Build-Management)

**Frontend:**

- TypeScript
- React.js
- Tailwind CSS (modernes UI)

**Weitere Tools:**

- Docker-Containerisierung möglich
- OpenAPI / Swagger-Dokumentation (optional)

---

## 🛠️ Setup-Anleitung (lokale Entwicklung)

### Voraussetzungen

- Java 21 installiert
- Maven installiert
- PostgreSQL oder MySQL-Datenbank aufgesetzt (z.\u202fB. Datenbankname: `notenmanager`)
- Optional: Docker Desktop (für Containerisierung)

### Projekt klonen

```bash
git clone https://github.com/LowKnight/NotenManager.git
cd NotenManager
```

### Backend konfigurieren

In der Datei `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/notenmanager
spring.datasource.username=dein_db_username
spring.datasource.password=dein_db_passwort

jwt.secret=dein_secret
spring.jpa.hibernate.ddl-auto=update
```

*(Hinweis: Für MySQL bitte den JDBC-URL und Treiber anpassen.)*

### Backend starten

```bash
./mvnw spring-boot:run
```
oder

```bash
mvn spring-boot:run
```

### Frontend starten

```bash
cd frontend
npm install
npm run dev
```

Das Frontend läuft dann standardmäßig auf:  
http://localhost:3000

---

## 📚 API-Endpunkte

| HTTP Methode | Pfad                      | Beschreibung                             |
|--------------|----------------------------|------------------------------------------|
| POST         | `/api/auth/register`       | Registrierung neuer Lehrer              |
| POST         | `/api/auth/login`           | Login & Token erhalten                  |
| GET          | `/api/lehrer/dashboard`     | Dashboard-Daten des Lehrers abrufen      |
| POST         | `/api/lehrer/schueler`      | Schüler anlegen                         |
| POST         | `/api/lehrer/faecher`       | Fach anlegen                             |
| POST         | `/api/lehrer/bewertung`     | Bewertung speichern                      |
| GET          | `/api/lehrer/statistik`     | Lehrerstatistik abrufen                  |

---

---

**Screenshots:**

![image](https://github.com/user-attachments/assets/01d492ab-5c55-46fc-8d25-8d955c61c545)

![image](https://github.com/user-attachments/assets/860e4c09-0fd3-47bb-bd52-98affc77ae5e)

![image](https://github.com/user-attachments/assets/98823808-d8e7-41e7-ad21-ccda2f0f700a)

![image](https://github.com/user-attachments/assets/a08d58af-0c87-4ceb-83d2-26e5ef57b166)


