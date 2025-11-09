```markdown
# Rezept-App für KI-generierte Rezepte

## Überblick
Die Rezept-App ermöglicht Nutzern, KI-generierte Rezepte zu entdecken, nach spezifischen Ernährungspräferenzen (vegetarisch, glutenfrei) zu filtern und Rezepte zu bewerten. Die durchschnittliche Bewertung wird prominent angezeigt, um Nutzern eine schnelle Einschätzung der Beliebtheit und Qualität eines Rezepts zu ermöglichen.

## Features
- KI-generierte Rezeptvorschläge mit Namen, Beschreibung, Zutaten und Zubereitungsanleitung.
- Filteroptionen für vegetarische Rezepte.
- Filteroptionen für glutenfreie Rezepte.
- Möglichkeit, Rezepte mit 1 bis 5 Sternen zu bewerten.
- Anzeige der durchschnittlichen Sternebewertung neben der Rezept-Überschrift.
- Aktualisierung der durchschnittlichen Bewertung in Echtzeit nach neuen Bewertungen.

## Architektur
Die Anwendung folgt einer modernen, serverlosen Architektur, die auf den folgenden Komponenten basiert:

- **Frontend**: React + TypeScript + TailwindCSS
  - Verantwortlich für die Darstellung der Benutzeroberfläche.
  - Interagiert über APIs mit dem Backend.
  - Implementiert die Filterlogik und die Anzeige von Rezepten sowie deren Bewertungen.
- **Backend**: Supabase Edge Functions
  - Bietet serverlose API-Endpunkte.
  - Verwaltet die Logik für Rezeptabrufe, Filterung, Bewertung und die Integration mit externen KI-Diensten.
- **Datenbank**: PostgreSQL (Supabase)
  - Speichert alle Anwendungsdaten: Rezepte, Zutaten, Anleitungen, Bewertungen und Benutzerdaten.
  - Nutzt Supabase Realtime für Echtzeit-Updates von Bewertungen.
- **KI-Service**: Externe AI API (z.B. OpenAI GPT-4)
  - Generiert Rezeptvorschläge basierend auf Prompts.
  - Wird über eine Supabase Edge Function aufgerufen.

## Installation
Um das Projekt lokal einzurichten und auszuführen, folgen Sie diesen Schritten:

1.  **Frontend-Installation:**
    ```bash
    npm install
    npm run dev
    ```
2.  **Backend (Supabase Edge Functions):**
    Die Backend-Logik ist in Supabase Edge Functions implementiert und wird dort bereitgestellt. Stellen Sie sicher, dass Ihre Supabase-Projekt-URL und der `SUPABASE_ANON_KEY` in der Umgebung der Edge Functions konfiguriert sind.

## API-Dokumentation

### GET /api/recipes
- **Beschreibung**: Ruft eine Liste von Rezepten ab, optional gefiltert nach Ernährungspräferenzen.
- **Request**:
  - Query-Parameter:
    - `isVegetarian`: `boolean` (optional, `true` für vegetarische Rezepte)
    - `isGlutenFree`: `boolean` (optional, `true` für glutenfreie Rezepte)
- **Response**: `Array<{ id: string; name: string; description: string; ingredients: string[]; instructions: string[]; averageRating: number; isVegetarian: boolean; isGlutenFree: boolean; }>`

### GET /api/recipes/{id}
- **Beschreibung**: Ruft Details zu einem spezifischen Rezept ab.
- **Request**:
  - Path-Parameter: `id`: `string` (ID des Rezepts)
- **Response**: `{ id: string; name: string; description: string; ingredients: string[]; instructions: string[]; averageRating: number; isVegetarian: boolean; isGlutenFree: boolean; }`

### POST /api/recipes/generate
- **Beschreibung**: Generiert ein neues Rezept mithilfe der KI.
- **Request**: `{ prompt: string }` (Optional: z.B. "mediterranes Gericht mit Hähnchen")
- **Response**: `{ id: string; name: string; description: string; ingredients: string[]; instructions: string[]; isVegetarian: boolean; isGlutenFree: boolean; }`

### POST /api/recipes/{id}/rate
- **Beschreibung**: Ermöglicht einem Nutzer, ein Rezept zu bewerten.
- **Request**:
  - Path-Parameter: `id`: `string` (ID des Rezepts)
  - Body: `{ userId: string; rating: number }` (rating: 1-5)
- **Response**: `{ success: boolean; message: string; newAverageRating: number; }`

### PUT /api/recipes/{id}/rate
- **Beschreibung**: Ermöglicht einem Nutzer, eine bestehende Bewertung zu aktualisieren