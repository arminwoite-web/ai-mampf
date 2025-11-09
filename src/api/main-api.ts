```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function to calculate average rating
async function calculateAverageRating(supabaseClient: any, recipeId: string): Promise<number> {
  const { data, error } = await supabaseClient
    .from('ratings')
    .select('rating')
    .eq('recipe_id', recipeId);

  if (error) {
    console.error('Error fetching ratings:', error);
    return 0;
  }

  if (data && data.length > 0) {
    const totalRating = data.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0);
    return parseFloat((totalRating / data.length).toFixed(1));
  }
  return 0;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const url = new URL(req.url);
    const path = url.pathname;

    // GET /api/recipes
    if (path === '/api/recipes' && req.method === 'GET') {
      let query = supabaseClient.from('recipes').select('*');

      const isVegetarian = url.searchParams.get('isVegetarian');
      const isGlutenFree = url.searchParams.get('isGlutenFree');

      if (isVegetarian === 'true') {
        query = query.eq('is_vegetarian', true);
      }
      if (isGlutenFree === 'true') {
        query = query.eq('is_gluten_free', true);
      }

      const { data: recipes, error } = await query;

      if (error) throw error;

      // Calculate average ratings for all recipes
      const recipesWithRatings = await Promise.all(recipes.map(async (recipe) => {
        const averageRating = await calculateAverageRating(supabaseClient, recipe.id);
        return { ...recipe, averageRating };
      }));

      return new Response(JSON.stringify(recipesWithRatings), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // GET /api/recipes/{id}
    if (path.startsWith('/api/recipes/') && req.method === 'GET') {
      const recipeId = path.split('/').pop();
      if (!recipeId) throw new Error('Recipe ID is missing.');

      const { data: recipe, error } = await supabaseClient
        .from('recipes')
        .select('*')
        .eq('id', recipeId)
        .single();

      if (error) throw error;
      if (!recipe) throw new Error('Recipe not found.');

      const averageRating = await calculateAverageRating(supabaseClient, recipeId);

      return new Response(JSON.stringify({ ...recipe, averageRating }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // POST /api/recipes/generate
    if (path === '/api/recipes/generate' && req.method === 'POST') {
      const { prompt } = await req.json();

      // Placeholder for AI generation logic
      // In a real scenario, you'd call an external AI API here
      // For now, we'll return a mock recipe
      const newRecipe = {
        id: crypto.randomUUID(),
        name: `KI-generiertes Gericht: ${prompt || 'Zufälliges Gericht'}`,
        description: 'Eine köstliche Kreation