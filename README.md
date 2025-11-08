```markdown
# KI-Rezept-App

## Überblick
Diese Anwendung bietet KI-generierte Rezeptvorschläge. Nutzer können Rezepte entdecken und detaillierte Informationen dazu abrufen. Eine spezielle Funktion ermöglicht es, Rezepte nach vegetarischen und glutenfreien Optionen zu filtern, um den Ernährungspräferenzen der Nutzer gerecht zu werden.

## Features
- **KI-generierte Rezeptvorschläge**: Entdecken Sie neue und inspirierende Gerichte.
- **Detaillierte Rezeptansicht**: Umfassende Informationen zu Zutaten, Zubereitung, Zeit und Portionsgröße.
- **Filter für Ernährungspräferenzen**: Filtern Sie Rezepte nach "vegetarisch" und "glutenfrei".
- **Kombinierte Filter**: Wenden Sie beide Filter gleichzeitig an, um spezifische Ernährungsbedürfnisse zu erfüllen.

## Architektur
### Überblick
Die Anwendung basiert auf einem modernen Web-Technologie-Stack. Das Frontend wird mit React entwickelt, das Backend nutzt Supabase Edge Functions und die Daten werden in einer PostgreSQL-Datenbank gespeichert. Die KI-Funktionalität zur Rezeptgenerierung wird über externe APIs integriert.

### Komponenten
- **Frontend**: React + TypeScript + TailwindCSS
  - Verantwortlich für die Benutzeroberfläche, Benutzerinteraktionen und die Kommunikation mit dem Backend.
  - Implementiert die Filteroptionen für vegetarische und glutenfreie Gerichte.
- **Backend**: Supabase Edge Functions
  - **API-Gateway**: Leitet Anfragen vom Frontend an die entsprechenden Funktionen weiter.
  - **Rezept-Service**: Verwaltet Rezeptdaten (Speichern, Abrufen, Filtern).
  - **KI-Integrations-Service**: Schnittstelle zu externen KI-APIs für die Rezeptgenerierung.
- **Datenbank**: PostgreSQL (Supabase)
  - Speichert alle Rezeptinformationen und Metadaten.
  - Optimiert für schnelle Abfragen und Filterung von Rezepten.
- **Externe KI-API**: (z.B. OpenAI GPT-3/4)
  - Generiert Rezepttitel, Beschreibungen, Zutatenlisten, Anleitungen und Ernährungspräferenz-Informationen (vegetarisch, glutenfrei).

## Installation
```bash
# Frontend (Beispiel)
# Installieren Sie die Abhängigkeiten
npm install
# Starten Sie den Entwicklungsserver
npm run dev

# Backend (Supabase Edge Functions)
# Stellen Sie sicher, dass Deno installiert ist
# Die Funktionen werden direkt in Supabase deployed und verwaltet.
# Lokale Entwicklung:
# deno run --allow-net --allow-env --allow-read --allow-write --watch main.ts
```

## API-Dokumentation

### POST /api/recipes/generate
- **Beschreibung**: Fordert die Generierung neuer Rezeptvorschläge von der KI an.
- **Request Body**:
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
- **Response Body**:
  ```json
  [
    {
      "id": "uuid-recipe-1",
      "title": "Vegetarisches Curry mit Kokosmilch",
      "description": "Ein aromatisches Curry mit frischem Gemüse und cremiger Kokosmilch.",
      "image_url": "https://example.com/image1.jpg",
      "is_vegetarian": true,
      "is_gluten_free": true,
      "ingredients": ["Kokosmilch", "Currypaste", "Gemüse"],
      "instructions": ["Schritt 1", "Schritt 2"],
      "prep_time": "30 Min",
      "cook_time": "20 Min",
      "servings": 4
    }
  ]
  ```

### GET /api/recipes
- **Beschreibung**: Ruft eine Liste von Rezepten ab, optional gefiltert nach Ernährungspräferenzen.
- **Query-Parameter**:
  - `is_vegetarian`: `boolean` (optional, z.B. `?is_vegetarian=true`)
  - `is_gluten_free`: `boolean` (optional, z.B. `?is_gluten_free=true`)
  - `limit`: `number` (optional, Standard: 20)
  - `offset`: `number` (optional