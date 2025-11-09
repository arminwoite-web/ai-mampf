```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
    const pathSegments = url.pathname.split('/').filter(Boolean); // ['api', 'recipes', '123', 'rate']

    // Handle GET /api/recipes or GET /api/recipes/{id}
    if (req.method === 'GET' && pathSegments[1] === 'recipes') {
      if (pathSegments.length === 2) { // GET /api/recipes
        const { searchParams } = url;
        const isVegetarian = searchParams.get('isVegetarian') === 'true';
        const isGlutenFree = searchParams.get('isGlutenFree') === 'true';

        let query = supabaseClient.from('recipes').select(`
          id, 
          title, 
          description, 
          image_url, 
          is_vegetarian, 
          is_gluten_free,
          average_rating
        `);

        if (isVegetarian) {
          query = query.eq('is_vegetarian', true);
        }
        if (isGlutenFree) {
          query = query.eq('is_gluten_free', true);
        }

        const { data, error } = await query;

        if (error) throw error;

        return new Response(JSON.stringify(data.map(recipe => ({
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
          imageUrl: recipe.image_url,
          isVegetarian: recipe.is_vegetarian,
          isGlutenFree: recipe.is_gluten_free,
          averageRating: recipe.average_rating,
        }))), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      } else if (pathSegments.length === 3) { // GET /api/recipes/{id}
        const recipeId = pathSegments[2];
        const { data, error } = await supabaseClient
          .from('recipes')
          .select(`
            id, 
            title, 
            description, 
            ingredients, 
            preparation_steps, 
            image_url, 
            is_vegetarian, 
            is_gluten_free,
            average_rating
          `)
          .eq('id', recipeId)
          .single();

        if (error) throw error;
        if (!data) {
          return new Response(JSON.stringify({ error: 'Recipe not found' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        return new Response(JSON.stringify({
          id: data.id,
          title: data.title,
          description: data.description,
          ingredients: data.ingredients,
          preparationSteps: data.preparation_steps,
          imageUrl: data.image_url,
          isVegetarian: data.is_vegetarian,
          isGlutenFree: data.is_gluten_free,
          averageRating: data.average_rating,
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Handle POST /api/recipes/{id}/rate
    if (req.method === 'POST' && pathSegments[1] === 'recipes