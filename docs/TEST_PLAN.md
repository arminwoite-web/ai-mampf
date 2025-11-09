```markdown
# Test-Plan

## Unit Tests
### Test 1: GET /api/recipes - Keine Filter
- **Beschreibung**: Überprüft, ob die API alle Rezepte ohne Filter zurückgibt.
- **Eingabe**: `GET /api/recipes`
- **Erwartetes Ergebnis**: Eine Liste aller Rezepte mit ihren Basisinformationen (id, title, description, imageUrl, isVegetarian, isGlutenFree, averageRating).
- **Status**: ✅ Bestanden

### Test 2: GET /api/recipes - Vegetarischer Filter
- **Beschreibung**: Überprüft, ob die API nur vegetarische Rezepte zurückgibt, wenn der Filter gesetzt ist.
- **Eingabe**: `GET /api/recipes?isVegetarian=true`
- **Erwartetes Ergebnis**: Eine Liste von Rezepten, bei denen `isVegetarian` `true` ist. Jedes Rezept in der Antwort sollte `isVegetarian: true` haben.
- **Status**: ✅ Bestanden

### Test 3: GET /api/recipes - Glutenfreier Filter
- **Beschreibung**: Überprüft, ob die API nur glutenfreie Rezepte zurückgibt, wenn der Filter gesetzt ist.
- **Eingabe**: `GET /api/recipes?isGlutenFree=true`
- **Erwartetes Ergebnis**: Eine Liste von Rezepten, bei denen `isGlutenFree` `true` ist. Jedes Rezept in der Antwort sollte `isGlutenFree: true` haben.
- **Status**: ✅ Bestanden

### Test 4: GET /api/recipes - Vegetarisch und Glutenfrei Filter
- **Beschreibung**: Überprüft, ob die API Rezepte zurückgibt, die sowohl vegetarisch als auch glutenfrei sind.
- **Eingabe**: `GET /api/recipes?isVegetarian=true&isGlutenFree=true`
- **Erwartetes Ergebnis**: Eine Liste von Rezepten, bei denen `isVegetarian` `true` UND `isGlutenFree` `true` ist.
- **Status**: ✅ Bestanden

### Test 5: GET /api/recipes/{id} - Gültige ID
- **Beschreibung**: Überprüft, ob die API die Details eines spezifischen Rezepts korrekt zurückgibt.
- **Eingabe**: `GET /api/recipes/a1b2c3d4e5f6` (Annahme: `a1b2c3d4e5f6` ist eine gültige Rezept-ID)
- **Erwartetes Ergebnis**: Ein einzelnes Rezeptobjekt mit allen Details (id, title, description, ingredients, preparationSteps, imageUrl, isVegetarian, isGlutenFree, averageRating).
- **Status**: ✅ Bestanden

### Test 6: GET /api/recipes/{id} - Ungültige ID
- **Beschreibung**: Überprüft das Verhalten der API bei einer ungültigen/nicht existierenden Rezept-ID.
- **Eingabe**: `GET /api/recipes/nonexistentid`
- **Erwartetes Ergebnis**: Eine HTTP-Statusantwort von `404 Not Found` mit einer JSON-Nachricht `{ error: 'Recipe not found' }`.
- **Status**: ✅ Bestanden

### Test 7: POST /api/recipes/{id}/rate - Gültige Bewertung
- **Beschreibung**: Überprüft das Speichern einer gültigen Bewertung für ein Rezept.
- **Eingabe**: `POST /api/recipes/a1b2c3d4e5f6/rate` mit Body `{ "rating": 4 }`
- **Erwartetes Ergebnis**: Eine HTTP-Statusantwort von `200 OK` mit einer JSON-Nachricht `{ success: true, message: 'Rating successfully processed.' }` und die Datenbank sollte die Bewertung speichern und möglicherweise den `average_rating` aktualisieren.
- **Status**: ❌ Fehlgeschlagen (Backend-Logik für POST /api/recipes/{id}/rate ist unvollständig)

### Test 8: POST /api/recipes/{id}/rate - Ungültige Bewertung (zu niedrig)
- **Beschreibung**: Überprüft das Verhalten bei einer Bewertung unter 1.
- **Eingabe**: `POST /api/recipes/a1b2c3d4e5f6/rate` mit Body `{ "rating": 0 }`
- **Erwartetes Ergebnis**: Eine HTTP-Statusantwort von `400 Bad Request` mit einer Fehlermeldung, die besagt, dass die Bewertung ungültig ist.
- **