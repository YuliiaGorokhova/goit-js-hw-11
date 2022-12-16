// import axios from 'axios';

// export default async function fetchImages(value, page) {
//   const url = 'https://pixabay.com/api/';
//   const key = '32109010-54ccacdb2baec85304d59bdb8';
//   const filter = `?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

//   return await axios.get(`${url}${filter}`).then(response => response.data);
//  }




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