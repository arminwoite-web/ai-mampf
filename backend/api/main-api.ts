```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { v4 as uuidv4 } from "https://deno.land/std@0.168.0/uuid/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function to get Supabase client
function getSupabaseClient(req: Request) {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: {
        headers: { Authorization: req.headers.get("Authorization")! },
      },
      auth: {
        persistSession: false,
      },
    },
  );
  return supabaseClient;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = getSupabaseClient(req);
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method;

    // Helper to get user from JWT
    const { data: { user } } = await supabaseClient.auth.getUser();

    // POST /api/recipes/generate
    if (path === '/api/recipes/generate' && method === 'POST') {
      const { prompt, vegetarian, glutenFree } = await req.json();

      // --- KI-Generierung (Mock-Up für diese Implementierung) ---
      // In einer echten Anwendung würde hier ein API-Aufruf zu OpenAI oder einem ähnlichen Dienst erfolgen.
      // Die Parameter 'vegetarian' und 'glutenFree' würden an die KI übergeben, um die Generierung zu steuern.
      const generatedRecipe = {
        id: uuidv4(),
        title: `KI-Rezept für ${prompt}`,
        ingredients: ["Zutat 1", "Zutat 2", "Zutat 3"],
        instructions: ["Schritt 1", "Schritt 2", "Schritt 3"],
        portions: Math.floor(Math.random() * 4) + 2,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        averageRating: null,
        imageUrl: null,
      };

      const { data, error } = await supabaseClient
        .from('recipes')
        .insert([generatedRecipe])
        .select();

      if (error) throw error;

      return new Response(JSON.stringify(data[0]), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // GET /api/recipes
    if (path === '/api/recipes' && method === 'GET') {
      const vegetarianFilter = url.searchParams.get('vegetarian');
      const glutenFreeFilter = url.searchParams.get('glutenFree');

      let query = supabaseClient
        .from('recipes')
        .select(`
          *,
          average_rating:ratings(rating_value)
        `);

      if (vegetarianFilter === 'true') {
        query = query.eq('vegetarian', true);
      }
      if (glutenFreeFilter === 'true') {
        query = query.eq('glutenFree', true);
      }

      const { data: recipes, error } = await query;

      if (error) throw error;

      // Calculate average rating for each recipe
      const recipesWithAvgRating = recipes.map(recipe => {
        const ratings = recipe.average_rating.map((r: { rating_value: number }) => r.rating_value);
        const averageRating = ratings.length > 0
          ? parseFloat((ratings.reduce((sum: number, r: number) => sum + r, 0) / ratings.length).toFixed(1))
          : null;
        return {
          ...recipe,
          averageRating: averageRating,
          average_rating: undefined // remove the