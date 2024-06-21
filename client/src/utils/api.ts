export async function fetchRecipes() {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/recipe`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return await res.json()
}
