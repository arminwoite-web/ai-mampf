# Test-Plan

## Unit Tests
### Test 1: Frontend - Initialfilterzustand
- **Beschreibung**: Überprüft, ob die Filterkomponente korrekt mit den initialen Filterwerten initialisiert wird.
- **Eingabe**: `{ initialFilters: { isVegetarian: true, isGlutenFree: false } }`
- **Erwartetes Ergebnis**: Die Checkbox "Vegetarisch" ist aktiviert, "Glutenfrei" ist deaktiviert.
- **Status**: ✅ Bestanden

### Test 2: Frontend - Vegetarisch-Filter aktivieren
- **Beschreibung**: Überprüft, ob beim Aktivieren des Vegetarisch-Filters der `onFilterChange`-Callback korrekt mit den aktualisierten Werten aufgerufen wird.
- **Eingabe**: Benutzer klickt auf die Checkbox "Vegetarisch" (von false auf true).
- **Erwartetes Ergebnis**: `onFilterChange` wird mit `{ isVegetarian: true, isGlutenFree: false }` aufgerufen.
- **Status**: ✅ Bestanden

### Test 3: Frontend - Glutenfrei-Filter aktivieren
- **Beschreibung**: Überprüft, ob beim Aktivieren des Glutenfrei-Filters der `onFilterChange`-Callback korrekt mit den aktualisierten Werten aufgerufen wird.
- **Eingabe**: Benutzer klickt auf die Checkbox "Glutenfrei" (von false auf true).
- **Erwartetes Ergebnis**: `onFilterChange` wird mit `{ isVegetarian: false, isGlutenFree: true }` aufgerufen.
- **Status**: ✅ Bestanden

### Test 4: Frontend - Beide Filter aktivieren
- **Beschreibung**: Überprüft, ob beim Aktivieren beider Filter der `onFilterChange`-Callback korrekt mit den aktualisierten Werten aufgerufen wird.
- **Eingabe**: Benutzer klickt auf "Vegetarisch" und dann auf "Glutenfrei".
- **Erwartetes Ergebnis**: `onFilterChange` wird zuerst mit `{ isVegetarian: true, isGlutenFree: false }` und dann mit `{ isVegetarian: true, isGlutenFree: true }` aufgerufen.
- **Status**: ✅ Bestanden

### Test 5: Backend - GET /api/recipes ohne Filter
- **Beschreibung**: Ruft alle Rezepte ohne Filter ab.
- **Eingabe**: `GET /api/recipes`
- **Erwartetes Ergebnis**: Eine Liste aller Rezepte aus der Datenbank, paging angewendet.
  ```json
  [
    { "id": "...", "title": "...", "is_vegetarian": true, "is_gluten_free": false },
    { "id": "...", "title": "...", "is_vegetarian": false, "is_gluten_free": true }
  ]
  ```
- **Status**: ✅ Bestanden

### Test 6: Backend - GET /api/recipes mit is_vegetarian=true
- **Beschreibung**: Ruft nur vegetarische Rezepte ab.
- **Eingabe**: `GET /api/recipes?is_vegetarian=true`
- **Erwartetes Ergebnis**: Eine Liste von Rezepten, bei denen `is_vegetarian` `true` ist.
  ```json
  [
    { "id": "...", "title": "Vegetarisches Curry", "is_vegetarian": true, "is_gluten_free": false }
  ]
  ```
- **Status**: ✅ Bestanden

### Test 7: Backend - GET /api/recipes mit is_gluten_free=true
- **Beschreibung**: Ruft nur glutenfreie Rezepte ab.
- **Eingabe**: `GET /api/recipes?is_gluten_free=true`
- **Erwartetes Ergebnis**: Eine Liste von Rezepten, bei denen `is_gluten_free` `true` ist.
  ```json
  [
    { "id": "...", "title": "Glutenfreier Kuchen", "is_vegetarian": false, "is_gluten_free": true }
  ]
  ```
- **Status**: ✅ Bestanden

### Test 8: Backend - GET /api/recipes mit is_vegetarian=true und is_gluten_free=true
- **Beschreibung**: Ruft Rezepte ab, die sowohl vegetarisch als auch glutenfrei sind.
- **Eingabe**: `GET /api/recipes?is_vegetarian=true&is_gluten_free=true`
- **Erwartetes Ergebnis**: Eine Liste von Rezepten, bei denen sowohl `is_vegetarian` als auch `is_gluten_free` `true`