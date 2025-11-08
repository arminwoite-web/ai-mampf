# System-Architektur

## Überblick
Diese Architektur beschreibt ein System für eine App, die KI-generierte Rezeptvorschläge anbietet. Nutzer können Rezepte nach "vegetarisch" und "glutenfrei" filtern. Die Anwendung nutzt eine moderne Web-Technologie-Stack mit React für das Frontend, Supabase Edge Functions für das Backend und PostgreSQL als Datenbank. KI-Funktionalität wird über externe APIs integriert.

## Komponenten
- **Frontend**: React + TypeScript + TailwindCSS
  - Verantwortlich für die Darstellung der Benutzeroberfläche, Interaktion mit dem Benutzer und Kommunikation mit dem Backend.
  - Implementiert Filteroptionen für vegetarische und glutenfreie Gerichte.
- **Backend**: Supabase Edge Functions
  - **API-Gateway**: Routet Anfragen vom Frontend an die entsprechenden Funktionen.
  - **Rezept-Service**: Verwaltet die Rezeptdaten, einschließlich Speicherung, Abruf und Filterung.
  - **KI-Integrations-Service**: Schnittstelle zu externen KI-APIs zur Generierung von Rezeptvorschlägen.
  - **Authentifizierungs-Service**: (Optional, falls Benutzerverwaltung benötigt wird)
- **Datenbank**: PostgreSQL (Supabase)
  - Speichert Rezeptinformationen, Benutzerdaten (falls vorhanden) und Metadaten.
  - Wird für schnelle Abfragen und Filterung von Rezepten genutzt.
- **Externe KI-API**: (z.B. OpenAI GPT-3/4, Google AI, etc.)
  - Generiert Rezepttitel, Beschreibungen, Zutatenlisten und Anleitungen basierend auf Prompts.
  - Generiert ggf. auch Informationen zu Ernährungspräferenzen (vegetarisch, glutenfrei).

## API-Endpunkte

### POST /api/recipes/generate
- **Beschreibung**: Fordert die Generierung neuer Rezeptvorschläge von der KI an.
- **Request**:
  ```json
  {
    "preferences": {
      "dietary": ["vegetarian", "gluten-free"],
      "cuisine": ["italian", "asian"],
      "ingredients_available": ["chicken", "rice"]
    },
    "count": 5
  }
  ```
- **Response**:
  ```json
  [
    {
      "id": "uuid-recipe-1",
      "title": "Vegetarisches Curry mit Kokosmilch",
      "description": "Ein aromatisches Curry mit frischem Gemüse und cremiger Kokosmilch.",
      "image_url": "https://example.com/image1.jpg",
      "is_vegetarian": true,
      "is_gluten_free": true
    }
  ]
  ```

### GET /api/recipes
- **Beschreibung**: Ruft eine Liste von Rezepten ab, optional gefiltert nach Ernährungspräferenzen.
- **Query-Parameter**:
  - `is_vegetarian`: `boolean` (optional, z.B. `?is_vegetarian=true`)
  - `is_gluten_free`: `boolean` (optional, z.B. `?is_gluten_free=true`)
  - `limit`: `number` (optional, Standard: 20)
  - `offset`: `number` (optional, Standard: 0)
- **Response**:
  ```json
  [
    {
      "id": "uuid-recipe-1",
      "title": "Vegetarisches Curry mit Kokosmilch",
      "description": "Ein aromatisches Curry mit frischem Gemüse und cremiger Kokosmilch.",
      "image_url": "https://example.com/image1.jpg",
      "is_vegetarian": true,
      "is_gluten_free": true
    },
    {
      "id": "uuid-recipe-2",
      "title": "Glutenfreier Quinoasalat mit geröstetem Gemüse",
      "description": "Ein leichter und gesunder Salat, perfekt für den Sommer.",
      "image_url": "https://example.com/image2.jpg",
      "is_vegetarian": true,
      "is_gluten_free": true
    }
  ]
  ```

### GET /api/recipes/{id}
- **Beschreibung**: Ruft detaillierte Informationen zu einem spezifischen Rezept ab.
- **URL-Parameter**:
  - `id`: `UUID` (ID des Rezepts)
- **Response**:
  ```json
  {
    "id": "uuid-