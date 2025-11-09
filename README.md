```markdown
# Rezept-App mit KI-Generierung

## Überblick
Diese Anwendung ermöglicht es Benutzern, KI-generierte Rezeptideen zu erhalten, diese nach vegetarischen oder glutenfreien Optionen zu filtern, zu bewerten und eigene Fotos der zubereiteten Gerichte hochzuladen. Sie bietet eine Plattform für kulinarische Inspiration und den Austausch von Kochergebnissen.

## Features
- **KI-generierte Rezepte**: Erhalte auf Anfrage neue und inspirierende Rezeptideen.
- **Filteroptionen**: Filtere Rezepte nach "vegetarisch" und/oder "glutenfrei".
- **Rezeptbewertung**: Bewerte Rezepte mit 1 bis 5 Sternen.
- **Durchschnittliche Bewertung**: Sieh die durchschnittliche Sternebewertung direkt neben der Rezeptüberschrift.
- **Foto-Upload**: Lade Fotos deiner zubereiteten Gerichte hoch, um sie mit anderen zu teilen.

## Architektur
Die Anwendung ist als Single Page Application (SPA) konzipiert, die ein React-Frontend mit einem serverlosen Backend auf Basis von Supabase kombiniert.

- **Frontend**: Entwickelt mit React, TypeScript und TailwindCSS für eine moderne und interaktive Benutzeroberfläche.
- **Backend (Supabase Edge Functions)**: Stellt die API-Schnittstellen bereit und beinhaltet:
    - **Rezept-Generierung**: Schnittstelle zu einem externen KI-Modell (z.B. OpenAI GPT-4) zur Erstellung von Rezepten.
    - **Datenmanagement**: Verwaltung von Rezepten, Bewertungen und Benutzerdaten.
    - **Bild-Upload**: Handhabung des Hochladens von Fotos zu Supabase Storage.
    - **Authentifizierung**: Nutzung von Supabase Auth für Benutzerverwaltung.
- **Datenbank (PostgreSQL via Supabase)**: Speichert alle Anwendungsdaten wie Rezepte, Zutaten, Anweisungen, Benutzerprofile, Bewertungen und Metadaten zu hochgeladenen Bildern.
- **Speicher (Supabase Storage)**: Dient zur Speicherung der hochgeladenen Rezeptbilder.
- **KI-Modell**: Ein externes API (z.B. OpenAI GPT-4) wird für die eigentliche Textgenerierung der Rezepte verwendet.

## Installation
Um das Projekt lokal einzurichten und zu starten:

```bash
# Frontend-Installation (angenommen, es gibt ein 'frontend'-Verzeichnis)
cd frontend
npm install
npm run dev

# Backend-Installation (Supabase Edge Functions sind direkt auf Supabase deployt)
# Für lokale Entwicklung und Tests:
# Installiere Supabase CLI und starte das lokale Supabase-Projekt
# supabase start
# supabase functions serve --no-verify-jwt
```

## API-Dokumentation

### `POST /api/recipes/generate`
Generiert ein neues Rezept basierend auf Benutzereingaben und optionalen Filtern.
- **Request Body**:
  ```json
  {
    "prompt": "Ein schnelles Abendessen mit Hähnchen und Brokkoli",
    "vegetarian": false,
    "glutenFree": false
  }
  ```
- **Response**:
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

### `GET /api/recipes`
Ruft eine Liste von Rezepten ab, optional gefiltert nach Ernährungspräferenzen.
- **Query Parameters**:
  - `vegetarian`: `true` oder `false`
  - `glutenFree`: `true` oder `false`
- **Beispiel Request**: `GET /api/recipes?vegetarian=true&glutenFree=false`
- **Response**:
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
      "average