import axios from 'axios';
export { fetchImages };

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '32109010-54ccacdb2baec85304d59bdb8';

async function fetchImages(name, page, perPage) {
  try {
    const response = await axios.get(
      `?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );

    return await response.data;
  } catch (error) {
    console.log(error.messege);
  }
}