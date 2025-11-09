```markdown
# System-Architektur

## Überblick
Diese Systemarchitektur beschreibt eine App für KI-generierte Rezepte. Die App ermöglicht es Benutzern, Rezeptvorschläge basierend auf KI-Analyse zu erhalten, diese nach vegetarischen und glutenfreien Optionen zu filtern und jedes Rezept mit 1 bis 5 Sternen zu bewerten. Das System nutzt Supabase für Backend-Funktionalität und Datenbankmanagement, während das Frontend mit React, TypeScript und TailwindCSS entwickelt wird.

## Komponenten
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

## API-Endpunkte

### GET /api/recipes
- **Beschreibung**: Ruft eine Liste von KI-generierten Rezepten ab.
- **Request**:
  - `query` (optional): Suchbegriff für Rezepte.
  - `isVegetarian` (optional): `true` für vegetarische Rezepte.
  - `isGlutenFree` (optional): `true` für glutenfreie Rezepte.
- **Response**: `Array<{ id: string, title: string, description: string, imageUrl?: string, isVegetarian: boolean, isGlutenFree: boolean, averageRating?: number }>`

### GET /api/recipes/{id}
- **Beschreibung**: Ruft Details zu einem spezifischen Rezept ab.
- **Request**: `{id: string}` (Rezept-ID im Pfad)
- **Response**: `{ id: string, title: string, description: string, ingredients: string[], preparationSteps: string[], imageUrl?: string, isVegetarian: boolean, isGlutenFree: boolean, averageRating?: number }`

### POST /api/recipes/{id}/rate
- **Beschreibung**: Ermöglicht einem Benutzer, ein Rezept zu bewerten.
- **Request**:
  - `{id: string}` (Rezept-ID im Pfad)
  - `{ rating: number }` (Bewertung von 1 bis 5)
  - (Zusätzlich kann hier ein `userId` aus dem Authentifizierungskontext verwendet werden, um sicherzustellen, dass jeder Benutzer nur einmal bewerten kann oder seine Bewertung ändern kann.)
- **Response**: `{ success: boolean, message: string }`

### POST /api/generate-recipe (intern, nur für Backend-Nutzung)
- **Beschreibung**: Sendet eine Anfrage an den externen KI-Dienst, um ein neues Rezept zu generieren.
- **Request**: `{ prompt: string }`
- **Response**: `{ title: string, description: string, ingredients: string[], preparationSteps: string[], isVegetarian: boolean, isGlutenFree: boolean }`

## Datenflüsse

1. **Rezeptanzeige und Filterung:**
   - Frontend sendet `GET /api/recipes` mit optionalen Filtern (`isVegetarian`, `isGlutenFree`).
   - Backend ruft Rezepte aus der PostgreSQL-Datenbank ab, wendet Filter an und gibt die gefilterte Liste zurück.
   - Frontend rendert die Liste der Rezepte.

2. **Rezeptdetails:**
   - Benutzer klickt auf ein Rezept im Frontend.
   - Frontend sendet `GET /api/recipes/{id}`.
   - Backend ruft die detaillierten Rezeptinformationen aus der Datenbank ab und gibt sie zurück.
   - Frontend zeigt die Details an.

3. **Rezeptbewertung:**
   - Benutzer wählt eine Sternebewertung auf der Rezeptdetailseite.
   - Frontend sendet `POST /api/recipes/{id}/rate` mit der gewählten Bewertung.
   - Backend spe