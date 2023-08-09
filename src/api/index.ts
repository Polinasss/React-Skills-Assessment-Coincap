export const fetchData = async (id?: string) => {
    const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);
    return await response.json();
  }