// User
export const login = async (username, password) => {
  return fetch('/api/user', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ username: username, password: password })
  }).then(res => res.json());
};

export const signup = async (username, email, password) => {
  return fetch('/api/user?action=register', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ username: username, email: email, password: password })
  }).then(res => res.json());
};

export const updateUser = async (id, username, email, password) => {
  return fetch(`/api/user/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'put',
    body: JSON.stringify({ username: username, email: email, password: password })
  }).then(res => res.json());
}

export const deleteOneUser = () => {

}

// Recipe
export const fetchAllRecipes = async () => {
  return fetch('/api/recipe', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'get'
  }).then(res => res.json());
}

export const fetchRecipeLength = async () => {
  return fetch(`/api/recipe/length`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'get'
  }).then(res => res.json());
};

export const fetchRecipeById = async (recipeId) => {
  return fetch(`/api/recipe/${recipeId}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'get'
  }).then(res => res.json());
};

export const createRecipe = async (recipeData) => {
  return fetch('/api/recipe', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify(recipeData)
  }).then(res => res.json());
};

export const updateRecipe = async (recipeId, recipeData) => {
  return fetch(`/api/recipe/${recipeId}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'put',
    body: JSON.stringify(recipeData)
  }).then(res => res.json());
};

export const deleteRecipe = async (recipeId) => {
  return fetch(`/api/recipe/${recipeId}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'delete'
  }).then(res => res.json());
};

// Favorite
export const addFavorite = async (userId, recipeId) => {
  return fetch(`/api/favourites/${userId}/${recipeId}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'put',
  }).then(res => res.json());
};

export const removeFavorite = async (userId, recipeId) => {
  return fetch(`/api/favourites/${userId}/${recipeId}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'delete',
  }).then(res => res.json());
};

// Comments
export const getCommentsById = async (recipeId) => {
  return fetch(`/api/comments/${recipeId}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'get',
  }).then(res => res.json());
}

export const addComment = async (commentData) => {
  return fetch(`/api/comments`, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: commentData,
    method: 'post',
  }).then(res => res.json());
}

export const editComment = async (commentId, commentData) => {
  return fetch(`/api/comments/${commentId}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: commentData,
    method: 'put',
  }).then(res => res.json());
}

export const deleteComment = async (commentId) => {
  return fetch(`/api/comments/${commentId}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'delete',
  }).then(res => res.json());
}

// Recommend
export const getRecommend = async (area, category) => {
  console.log(area, category)
  return fetch(`/api/recommend`, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      area: area,
      category: category,
    }),
    method: 'post',
  }).then(res => res.json());
}