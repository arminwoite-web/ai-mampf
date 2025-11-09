# Rezeptify

## Überblick
Rezeptify ist eine innovative App, die KI-generierte Rezeptvorschläge bietet. Nutzer können neue und kreative Gerichte entdecken, Rezepte nach vegetarischen oder glutenfreien Optionen filtern und jedes Rezept mit einer Sternebewertung versehen. Die Plattform zielt darauf ab, Kochinteressierten eine personalisierte und vielseitige Kocherfahrung zu bieten.

## Features
- **KI-generierte Rezeptvorschläge**: Entdecke dynamisch generierte Rezepte, die bei jedem Aufruf variieren.
- **Detaillierte Rezeptansicht**: Erhalte umfassende Informationen zu jedem Rezept, inklusive Titel, Beschreibung, Zutatenliste und Zubereitungsschritten.
- **Filteroptionen**: Filtere Rezepte nach "Vegetarisch" und "Glutenfrei", um diätetischen Präferenzen gerecht zu werden.
- **Rezeptbewertung**: Bewerte Rezepte mit 1 bis 5 Sternen, um anderen Nutzern bei der Auswahl zu helfen und Feedback zu geben.

## Architektur
### Überblick
Die Systemarchitektur von Rezeptify basiert auf einer modernen, serverlosen Infrastruktur. Sie nutzt Supabase für Backend-Funktionalität und Datenbankmanagement, während das Frontend mit React, TypeScript und TailwindCSS entwickelt wird. Externe KI-Dienste werden für die Rezeptgenerierung integriert.

### Komponenten
- **Frontend**: React + TypeScript + TailwindCSS
  - Verantwortlich für die Darstellung der Benutzeroberfläche, Interaktion mit dem Benutzer und Kommunikation mit dem Backend.
  - Implementiert Filterfunktionen und die Anzeige von Rezeptdetails sowie die Bewertungsmechanik.
- **Backend**: Supabase Edge Functions
  - Stellt die API-Endpunkte für das Frontend bereit.
  - Verwaltet die Logik zur Generierung von Rezepten (Anbindung an KI-Dienst), Filterung und Speicherung von Bewertungen.
  - Nutzt Supabase Authentication für potenzielle zukünftige Benutzerverwaltung.
- **Datenbank**: PostgreSQL (Supabase)
  - Speichert Rezeptinformationen (Titel, Beschreibung, Zutaten, Zubereitung, Bild-URL, KI-generiert, vegetarisch, glutenfrei).
  - Speichert Benutzerbewertungen für Rezepte.
- **KI-Dienst (extern)**: GPT-Modell (oder ähnliches)
  - Wird vom Backend über eine API angesprochen, um Rezeptvorschläge basierend auf Anfragen zu generieren.

## Installation
```bash
npm install
npm run dev
```

## API-Dokumentation

### `GET /api/recipes`
- **Beschreibung**: Ruft eine Liste von KI-generierten Rezepten ab.
- **Request**:
  - `query` (optional, String): Suchbegriff für Rezepte.
  - `isVegetarian` (optional, Boolean): `true` für vegetarische Rezepte.
  - `isGlutenFree` (optional, Boolean): `true` für glutenfreie Rezepte.
- **Response**: `Array<{ id: string, title: string, description: string, imageUrl?: string, isVegetarian: boolean, isGlutenFree: boolean, averageRating?: number }>`

### `GET /api/recipes/{id}`
- **Beschreibung**: Ruft Details zu einem spezifischen Rezept ab.
- **Request**: `{id: string}` (Rezept-ID im Pfad)
- **Response**: `{ id: string, title: string, description: string, ingredients: string[], preparationSteps: string[], imageUrl?: string, isVegetarian: boolean, isGlutenFree: boolean, averageRating?: number }`

### `POST /api/recipes/{id}/rate`
- **Beschreibung**: Ermöglicht einem Benutzer, ein Rezept zu bewerten.
- **Request**:
  - `{id: string}` (Rezept-ID im Pfad)
  - `{ rating: number }` (Bewertung von 1 bis 5)
  - (Zusätzlich kann hier ein `userId` aus dem Authentifizierungskontext verwendet werden, um sicherzustellen, dass jeder Benutzer nur einmal bewerten kann oder seine Bewertung ändern kann.)
- **Response**: `{ success: boolean, message: string }`

### `POST /api/generate-recipe` (intern, nur für Backend-Nutzung)
- **Beschreibung**: Sendet eine Anfrage an den externen KI-Dienst, um ein neues Rezept zu generieren.
- **Request**: `{ prompt: string }`
- **Response**: `{ title: string, description: string, ingredients: string[], preparationSteps: string[], isVegetarian: boolean, isGlutenFree: