import { axiosNews } from './axiosClient';
const newApi = {
  async getAllNews() {
    const data = await axiosNews.get('/articles');
    return data;
  }
};
export default newApi;

// export const getCountries = () => axios.get('https://api.covid19api.com/countries');
// export const getSummary = () => axios.get('https://api.covid19api.com/summary');
// export const getReportByCountry = (country) =>
//   axios.get(`https://api.covid19api.com/dayone/country/${country}`);
