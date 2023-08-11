export const fetchCoincapApi = async (id: string) => {
    try {
      const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);
      return await response.json();
    } catch(error) {
      console.log(error);
    }
  }