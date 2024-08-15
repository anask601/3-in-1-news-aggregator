import moment from "moment";

export const navbarBrand = "3-in-1 News";
export const header = (category) => `News - Top ${category} Headlines`;
export const noFound = "No Results Found";
export const searching = "Searching...";
export const arrow = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
  </svg>
);

export const summary = "Channel and PublishedAt";
export const newsChannel = (channel) => `${channel}`;
export const lastUpdate = (published) =>
  `${moment(published).format("ddd, DD MMM YYYY HH:mm:ss")}`;

export const normalizeNewsData = (source, response) => {
  let articles = [];

  switch (source) {
    case "newsapi":
      articles = response.data.articles.map((article) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        imageUrl: article.urlToImage,
        publishedAt: article.publishedAt,
        source: article.source.name,
        content: article.content,
      }));
      break;

    case "guardianapis":
      articles = response.data.response.results.map((article) => ({
        title: article.webTitle,
        description: article.fields ? article.fields.headline : "",
        url: article.webUrl,
        imageUrl: article.fields ? article.fields.thumbnail : "",
        publishedAt: article.webPublicationDate,
        source: article.sectionName,
        content: article.fields ? article.fields.body : "",
      }));
      break;

    case "nyt":
      const isSearchFormat = response?.data?.response?.docs;
      const isCategoryFormat = response?.data?.results;
      const articleData = isSearchFormat ? isSearchFormat : isCategoryFormat;
      articles = articleData.map((article) => ({
        title: isSearchFormat ? article.headline.main : article.title,
        description: article.abstract,
        url: isSearchFormat ? article.web_url : article.url,
        imageUrl:
          article.multimedia && article.multimedia.length > 0
            ? isSearchFormat
              ? `https://www.nytimes.com/${article.multimedia[0].url}`
              : article.multimedia[0].url
            : "",
        publishedAt: isSearchFormat ? article.pub_date : article.published_date,
        source: isSearchFormat ? article.section_name : article.section,
        content: article.lead_paragraph,
      }));
      break;

    default:
      throw new Error("Unsupported news source");
  }

  return articles;
};
