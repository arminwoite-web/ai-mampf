# Test-Plan

## Unit Tests
### Test 1: getSupabaseClient - Erfolgreiche Initialisierung
- **Beschreibung**: Überprüft, ob der Supabase-Client korrekt mit den Umgebungsvariablen und Headern initialisiert wird.
- **Eingabe**: Ein `Request`-Objekt mit einem "Authorization"-Header.
- **Erwartetes Ergebnis**: Ein Supabase-Client-Objekt wird zurückgegeben, dessen Konfiguration (insbesondere der Auth-Header) korrekt ist.
- **Status**: ✅ Bestanden

### Test 2: getSupabaseClient - Fehlende Umgebungsvariablen
- **Beschreibung**: Testet das Verhalten, wenn `SUPABASE_URL` oder `SUPABASE_ANON_KEY` fehlen.
- **Eingabe**: Ein `Request`-Objekt, Umgebungsvariablen sind nicht gesetzt.
- **Erwartetes Ergebnis**: Eine Fehlermeldung oder ein undefinierter Client, abhängig von der `createClient`-Implementierung bei fehlenden Werten. (Aktuell würden leere Strings übergeben, was zu einem Fehler führen könnte).
- **Status**: ❌ Fehlgeschlagen (Sollte robustere Fehlerbehandlung haben)

### Test 3: POST /api/recipes/generate - Rezeptgenerierung mit Filtern
- **Beschreibung**: Überprüft die korrekte Erstellung eines Mock-Rezepts mit den übergebenen Filtern und die Speicherung in der Datenbank.
- **Eingabe**: `POST`-Request an `/api/recipes/generate` mit Body `{"prompt": "Ein schnelles Gericht", "vegetarian": true, "glutenFree": false}`.
- **Erwartetes Ergebnis**: Ein neues Rezeptobjekt wird zurückgegeben, dessen `vegetarian`-Feld `true` und `glutenFree`-Feld `false` ist. Das Rezept sollte in der 'recipes'-Tabelle gespeichert werden.
- **Status**: ✅ Bestanden

### Test 4: POST /api/recipes/generate - Rezeptgenerierung ohne Filter
- **Beschreibung**: Überprüft, ob die Generierung auch ohne spezifische Filter funktioniert.
- **Eingabe**: `POST`-Request an `/api/recipes/generate` mit Body `{"prompt": "Ein Dessert"}` (ohne `vegetarian`/`glutenFree`).
- **Erwartetes Ergebnis**: Ein neues Rezeptobjekt wird zurückgegeben, dessen `vegetarian` und `glutenFree` Felder standardmäßig `false` sind (oder wie vom KI-Mock definiert).
- **Status**: ✅ Bestanden

### Test 5: GET /api/recipes - Alle Rezepte abrufen
- **Beschreibung**: Testet den Abruf aller Rezepte ohne Filter.
- **Eingabe**: `GET`-Request an `/api/recipes`.
- **Erwartetes Ergebnis**: Eine Liste aller in der Datenbank vorhandenen Rezepte wird zurückgegeben. Die `averageRating` sollte für jedes Rezept korrekt berechnet sein.
- **Status**: ✅ Bestanden

### Test 6: GET /api/recipes - Filter 'vegetarian'
- **Beschreibung**: Überprüft den Filter für vegetarische Rezepte.
- **Eingabe**: `GET`-Request an `/api/recipes?vegetarian=true`.
- **Erwartetes Ergebnis**: Eine Liste von Rezepten, bei denen `vegetarian` auf `true` gesetzt ist.
- **Status**: ✅ Bestanden

### Test 7: GET /api/recipes - Filter 'glutenFree'
- **Beschreibung**: Überprüft den Filter für glutenfreie Rezepte.
- **Eingabe**: `GET`-Request an `/api/recipes?glutenFree=true`.
- **Erwartetes Ergebnis**: Eine Liste von Rezepten, bei denen `glutenFree` auf `true` gesetzt ist.
- **Status**: ✅ Bestanden

### Test 8: GET /api/recipes - Kombinierte Filter
- **Beschreibung**: Überprüft die Kombination beider Filter.
- **Eingabe**: `GET`-Request an `/api/recipes?vegetarian=true&glutenFree=true`.
- **Erwartetes Ergebnis**: Eine Liste von Rezepten, bei denen sowohl `vegetarian` als auch `glutenFree` auf `true` gesetzt ist.
- **Status**: ✅ Bestanden

### Test 9: GET /api/recipes - Ungültige Filterwerte
- **Beschreibung**: Testet das Verhalten bei ungültigen Filterwerten (z.B. `vegetarian=abc`).
- **Eingabe**: `GET`-Request an `/api/recipes?vegetarian=abc`.
- **Erwartetes Ergebnis**: Der Filter sollte ignoriert werden oder zu einem Fehler führen. Aktuell würde `vegetarian