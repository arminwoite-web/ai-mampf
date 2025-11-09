# System-Architektur

## Überblick
Die Rezept-App ermöglicht Nutzern, KI-generierte Rezepte zu entdecken, nach spezifischen Ernährungspräferenzen (vegetarisch, glutenfrei) zu filtern und Rezepte zu bewerten. Die durchschnittliche Bewertung wird prominent angezeigt. Die Architektur setzt auf eine serverlose Backend-Lösung mit Supabase, einem modernen Frontend mit React und TypeScript und einer leistungsstarken KI-Integration für die Rezeptgenerierung.

## Komponenten
- **Frontend**: React + TypeScript + TailwindCSS
  - Stellt die Benutzeroberfläche bereit, interagiert mit dem Backend über APIs.
  - Implementiert Filterfunktionen und die Anzeige von Rezepten und Bewertungen.
- **Backend**: Supabase Edge Functions
  - Serverlose Funktionen für die API-Endpunkte.
  - Verwaltet die Logik für Rezeptabrufe, Filterung, Bewertung und KI-Integration.
- **Datenbank**: PostgreSQL (Supabase)
  - Speichert Rezepte, Zutaten, Anleitungen, Bewertungen und Benutzerdaten.
  - Nutzt Supabase Realtime für Echtzeit-Updates bei Bewertungen.
- **KI-Service**: Externe AI API (z.B. OpenAI GPT-4)
  - Generiert Rezeptvorschläge basierend auf vordefinierten Prompts oder Nutzereingaben.
  - Wird über eine Supabase Edge Function aufgerufen.

## API-Endpunkte

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
- **Beschreibung**: Ermöglicht einem Nutzer, eine bestehende Bewertung zu aktualisieren.
- **Request**:
  - Path-Parameter: `id`: `string` (ID des Rezepts)
  - Body: `{ userId: string; rating: number }` (rating: 1-5)
- **Response**: `{ success: boolean; message: string; newAverageRating: number; }`

## Datenbank-Schema

```sql
-- Tabelle für Rezepte
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  ingredients TEXT[] NOT NULL, -- Array von Zutaten-Strings
  instructions TEXT[] NOT NULL, -- Array von Anweisungs-Strings
  is_vegetarian BOOLEAN DEFAULT FALSE,
  is_gluten_free BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabelle für Bewertungen
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  user_id UUID, -- Annahme: Benutzer-ID aus Supabase Auth