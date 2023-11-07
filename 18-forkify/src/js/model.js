import { API_URL, PER_PAGE, KEY } from "./config.js";
import { AJAX } from "./helpers.js";

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: PER_PAGE,
    },
    bookmarks: []
};

const createRecipeObject = function (data) {
    const { recipe } = data.data;  // let recipe = data.data.recipe
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && { key: recipe.key })
    };

}

export const loadRecipe = async function (id) {
    try {

        const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

        state.recipe = createRecipeObject(data);

        if (state.bookmarks.some(bookmark => bookmark.id === id)) {
            state.recipe.bookmarked = true;
        } else {
            state.recipe.bookmarked = false;
        }

    } catch (error) {
        throw error;
    }
};

export const loadSearchResults = async function (query) {
    try {
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

        state.search.query = query;

        state.search.results = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
                ...(recipe.key && { key: recipe.key })
            };
        });
        state.search.page = 1;
    } catch (error) {
        throw error;
    }
};

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    });

    state.recipe.servings = newServings;
};

const persistBookmarks = function () {
    localStorage.setItem('bookmarksStorage', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
    state.bookmarks.push(recipe);

    // Mark current recipe as bookmarked
    if (recipe.id === state.recipe.id) {
        state.recipe.bookmarked = true;
    }

    persistBookmarks();
}

export const deleteBookmark = function (id) {
    const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
    state.bookmarks.splice(index, 1);

    // Mark current recipe as not bookmarked
    if (id === state.recipe.id) {
        state.recipe.bookmarked = false;
    }

    persistBookmarks();
}

export const uploadRecipe = async function (newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe)
            .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
            .map(ing => {
                const ingArray = ing[1].split(',').map(element => element.trim());

                if (ingArray.length !== 3) {
                    throw new Error('Wrong ingredient format.')
                }

                const [quantity, unit, description] = ingArray;

                return { quantity: quantity ? Number(quantity) : null, unit, description };
            });

        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: Number(newRecipe.cookingTime),
            servings: Number(newRecipe.servings),
            ingredients
        };

        const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
        state.recipe = createRecipeObject(data);
        addBookmark(state.recipe);
    } catch (error) {
        throw error;
    }
};

const init = function () {
    const storage = localStorage.getItem('bookmarksStorage');
    if (storage) {
        state.bookmarks = JSON.parse(storage);
    }
};

init();
