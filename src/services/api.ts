export const fetchCoincapApi = async (id: string = '') => {
  try {
    const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);
      if(!response) {
        throw new Response('', {status: 404, statusText: 'Error'})
      }
      return await response.json();
  } catch (error) {
    console.log(error)
  }
  }