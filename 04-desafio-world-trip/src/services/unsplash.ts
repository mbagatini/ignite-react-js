const baseURL = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}`;

export async function getImage(query: string): Promise<string> {
  const filters = {
    page: 1,
    per_page: 1,
    orientation: "landscape",
    query: query,
  };

  const params = new URLSearchParams();

  for (var [key, value] of Object.entries(filters)) {
    params.append(key, String(value));
  }

  const response = await fetch(`${baseURL}&${params}`);
  const data = await response.json();
  const url = data.results[0]?.urls?.regular ?? "";

  return url;
}
