# Test-Plan

## Unit Tests
### Test 1: calculateAverageRating - Keine Bewertungen
- **Beschreibung**: Testet die `calculateAverageRating`-Funktion, wenn keine Bewertungen für ein Rezept existieren.
- **Eingabe**: `recipeId` eines Rezepts ohne Bewertungen. Mock Supabase `select` gibt leeres Array zurück.
- **Erwartetes Ergebnis**: Die Funktion sollte `0` zurückgeben.
- **Status**: ✅ Bestanden

### Test 2: calculateAverageRating - Mehrere Bewertungen
- **Beschreibung**: Testet die `calculateAverageRating`-Funktion mit mehreren Bewertungen.
- **Eingabe**: `recipeId` eines Rezepts mit Bewertungen [3, 4, 5]. Mock Supabase `select` gibt diese Bewertungen zurück.
- **Erwartetes Ergebnis**: Die Funktion sollte `4.0` zurückgeben.
- **Status**: ✅ Bestanden

### Test 3: calculateAverageRating - Eine Bewertung
- **Beschreibung**: Testet die `calculateAverageRating`-Funktion mit einer einzelnen Bewertung.
- **Eingabe**: `recipeId` eines Rezepts mit Bewertung [2]. Mock Supabase `select` gibt diese Bewertung zurück.
- **Erwartetes Ergebnis**: Die Funktion sollte `2.0` zurückgeben.
- **Status**: ✅ Bestanden

### Test 4: calculateAverageRating - Fehler beim Abrufen
- **Beschreibung**: Testet die `calculateAverageRating`-Funktion bei einem Fehler beim Abrufen der Bewertungen.
- **Eingabe**: `recipeId` und ein Supabase-Client, der einen Fehler beim `select` wirft.
- **Erwartetes Ergebnis**: Die Funktion sollte `0` zurückgeben und den Fehler loggen.
- **Status**: ✅ Bestanden

## Integration Tests
### Test 1: GET /api/recipes - Keine Filter
- **Beschreibung**: Abrufen aller Rezepte ohne angewendete Filter.
- **Eingabe**: HTTP GET Request an `/api/recipes`.
- **Erwartetes Ergebnis**: Eine Liste aller Rezepte, wobei jedes Rezept die Felder `id`, `name`, `description`, `ingredients`, `instructions`, `isVegetarian`, `isGlutenFree` und `averageRating` enthält. `averageRating` sollte korrekt berechnet sein.
- **Status**: ✅ Bestanden

### Test 2: GET /api/recipes - Filter isVegetarian=true
- **Beschreibung**: Abrufen von vegetarischen Rezepten.
- **Eingabe**: HTTP GET Request an `/api/recipes?isVegetarian=true`.
- **Erwartetes Ergebnis**: Eine Liste nur vegetarischer Rezepte. Jedes Rezept in der Liste sollte `isVegetarian: true` haben.
- **Status**: ✅ Bestanden

### Test 3: GET /api/recipes - Filter isGlutenFree=true
- **Beschreibung**: Abrufen von glutenfreien Rezepten.
- **Eingabe**: HTTP GET Request an `/api/recipes?isGlutenFree=true`.
- **Erwartetes Ergebnis**: Eine Liste nur glutenfreier Rezepte. Jedes Rezept in der Liste sollte `isGlutenFree: true` haben.
- **Status**: ✅ Bestanden

### Test 4: GET /api/recipes - Filter isVegetarian=true und isGlutenFree=true
- **Beschreibung**: Abrufen von vegetarischen und glutenfreien Rezepten.
- **Eingabe**: HTTP GET Request an `/api/recipes?isVegetarian=true&isGlutenFree=true`.
- **Erwartetes Ergebnis**: Eine Liste von Rezepten, die sowohl vegetarisch als auch glutenfrei sind. Jedes Rezept sollte `isVegetarian: true` und `isGlutenFree: true` haben.
- **Status**: ✅ Bestanden

### Test 5: GET /api/recipes/{id} - Existierendes Rezept
- **Beschreibung**: Abrufen eines spezifischen Rezepts anhand seiner ID.
- **Eingabe**: HTTP GET Request an `/api/recipes/{existingRecipeId}`.
- **Erwartetes Ergebnis**: Ein einzelnes Rezeptobjekt mit allen Details und dem korrekt berechneten `averageRating`.
- **Status**: ✅ Bestanden

### Test 6: GET /api/recipes/{id} - Nicht-existierendes Rezept
- **Beschreibung**: Abrufen eines Rezepts mit einer nicht existierenden ID.
- **Eingabe**: HTTP GET Request an `/api/recipes/{nonExistingRecipeId}`.
- **Erwartetes Ergebnis**: Eine Fehlermeldung (z.B. HTTP 404 Not Found oder spezif