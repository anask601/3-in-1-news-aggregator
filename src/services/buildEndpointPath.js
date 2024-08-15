import { API_DOMAINS } from "../config/apiDomains";
import { GUARDIAN_API_KEY, NEWS_API_KEY, NYT_API_KEY } from "../config/apiKeys";

const buildEndpointPath = (params) => {
  const {
    source,
    searchQuery,
    country = "us",
    category = "general",
    date,
    query,
    fromDate,
    toDate,
    orderBy = "newest",
    sortBy = "publishedAt",
    isSearch = false,
    pageSize = 10,
  } = params;

  let url = "";

  switch (source) {
    case "guardianapis":
      url = `${API_DOMAINS[source]}?api-key=${GUARDIAN_API_KEY}`;
      if (query || searchQuery) url += `&q=${query || searchQuery}`;
      if (isSearch) {
        url += `&page-size-${pageSize}`;
      } else {
        if (category) url += `&section=${category}`;
        if (fromDate) url += `&from-date=${fromDate}`;
        if (toDate) url += `&to-date=${toDate}`;
      }
      url += `&order-by=${orderBy}&show-fields=all`;
      break;

    case "newsapi":
      if (isSearch) {
        url = `${API_DOMAINS[source].search}?apiKey=${NEWS_API_KEY}`;
        if (searchQuery) url += `&q=${searchQuery}`;
        if (fromDate) url += `&from=${fromDate}`;
        url += `&sortBy=${sortBy}`;
      } else {
        url = `${API_DOMAINS[source].headlines}?apiKey=${NEWS_API_KEY}`;
        if (country) url += `&country=${country}`;
        if (category) url += `&category=${category}`;
        if (date) url += `&from=${date}`;
      }
      break;

    case "nyt":
      if (isSearch) {
        url = `${API_DOMAINS[source].search}?api-key=${NYT_API_KEY}`;
        if (searchQuery) url += `&q=${searchQuery}`;
        if (fromDate) url += `&begin_date=${fromDate.replace(/-/g, "")}`;
        if (toDate) url += `&end_date=${toDate.replace(/-/g, "")}`;
        if (orderBy) url += `&sort=${orderBy}`;
      } else {
        url = `${API_DOMAINS[source].headlines}/${
          category ? category : "home"
        }.json?api-key=${NYT_API_KEY}`;
      }
      break;

    default:
      throw new Error("Unsupported API source");
  }

  return url;
};

export default buildEndpointPath;
