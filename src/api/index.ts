import axios from 'axios';

const BASE_URL = 'https://api.punkapi.com/v2';

const fetchBeers = async (perPage = 10, page = 1) => {
    console.log('fetchBeers')
    try {
        const response = await axios.get(`${BASE_URL}/beers`, {
            params: {
              per_page: perPage,
              page: page,
            },
          });
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching beers: ${error}`);
    }
};

export { fetchBeers };
