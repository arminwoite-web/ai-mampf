# System-Architektur

## Überblick
Die Anwendung ermöglicht Benutzern, KI-generierte Rezepte zu erhalten, diese nach Ernährungspräferenzen zu filtern, zu bewerten und Fotos der zubereiteten Gerichte hochzuladen. Die Architektur setzt auf eine serverlose Backend-Infrastruktur mit Supabase für Datenbank, Authentifizierung und Edge Functions. Das Frontend wird als Single Page Application (SPA) mit React entwickelt.

## Komponenten
- **Frontend**: React + TypeScript + TailwindCSS
  - Interaktive Benutzeroberfläche zur Rezeptanzeige, Filterung, Bewertung und Foto-Upload.
  - Kommunikation mit dem Backend über RESTful APIs.
- **Backend**: Supabase Edge Functions
  - **Rezept-Generierung**: Schnittstelle zu einem externen KI-Modell (z.B. OpenAI GPT-4) zur Generierung von Rezepten basierend auf Benutzereingaben und Filtern.
  - **Rezept-Verwaltung**: Speicherung, Abruf und Aktualisierung von Rezeptdaten.
  - **Bewertungs-Verwaltung**: Speicherung und Berechnung von Rezeptbewertungen.
  - **Bild-Upload**: Verwaltung des Uploads von Bildern zu einem Supabase Storage Bucket.
  - **Authentifizierung**: Supabase Auth für Benutzerregistrierung und -login.
- **Datenbank**: PostgreSQL (Supabase)
  - Speicherung von Rezeptdetails, Benutzerdaten, Bewertungen und Bild-Metadaten.
- **Speicher**: Supabase Storage
  - Speicherung der hochgeladenen Rezeptbilder.
- **KI-Modell**: Externes API (z.B. OpenAI GPT-4)
  - Generierung von Rezepttexten.

## API-Endpunkte

### POST /api/recipes/generate
- **Beschreibung**: Generiert ein neues Rezept basierend auf Benutzereingaben.
- Request:
  ```json
  {
    "prompt": "Ein schnelles Abendessen mit Hähnchen und Brokkoli",
    "vegetarian": false,
    "glutenFree": false
  }
  ```
- Response:
  ```json
  {
    "id": "uuid-des-rezepts",
    "title": "Hähnchen-Brokkoli-Pfanne",
    "ingredients": ["Hähnchenbrust", "Brokkoli", "Knoblauch", "Sojasauce"],
    "instructions": ["Hähnchen anbraten...", "Brokkoli hinzufügen..."],
    "portions": 2,
    "vegetarian": false,
    "glutenFree": false,
    "averageRating": null,
    "imageUrl": null
  }
  ```

### GET /api/recipes
- **Beschreibung**: Ruft eine Liste von Rezepten ab, optional gefiltert.
- Request:
  ```
  GET /api/recipes?vegetarian=true&glutenFree=false
  ```
- Response:
  ```json
  [
    {
      "id": "uuid-rezept-1",
      "title": "Vegetarische Linsen-Curry",
      "ingredients": ["Linsen", "Kokosmilch", "Currypulver"],
      "instructions": ["Linsen kochen..."],
      "portions": 4,
      "vegetarian": true,
      "glutenFree": true,
      "averageRating": 4.5,
      "imageUrl": "url-zum-bild-1"
    },
    {
      "id": "uuid-rezept-2",
      "title": "Glutenfreier Schokoladenkuchen",
      "ingredients": ["Reismehl", "Kakao", "Eier"],
      "instructions": ["Zutaten mischen..."],
      "portions": 8,
      "vegetarian": false,
      "glutenFree": true,
      "averageRating": 3.8,
      "imageUrl": "url-zum-bild-2"
    }
  ]
  ```

### GET /api/recipes/{id}
- **Beschreibung**: Ruft ein einzelnes Rezept anhand seiner ID ab.
- Request: `GET /api/recipes/uuid-des-rezepts`
- Response:
  ```json
  {
    "id": "uuid-des-rezepts",
    "title": "Hähnchen-Brokkoli-Pfanne",
    "ingredients": ["Hähnchenbrust", "Brokkoli", "Knoblauch", "Sojasauce"],
    "instructions": ["Hähn