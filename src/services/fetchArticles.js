import axios from "axios";
import { normalizeNewsData } from "../utils/util";

const fetchArticles = async (url, source) => {
  try {
    const response = await axios.get(url);

    const normalizedArticles = normalizeNewsData(source, response);

    return normalizedArticles;
  } catch (error) {
    console.error("Error fetching articles: ", error);
    return [];
  }
};

export default fetchArticles;
