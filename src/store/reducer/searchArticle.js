import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
} from "../action/actionTypes";

const initialState = {
  articles: [],
  query: "",
  loading: false,
  error: null,
  totalArticles: 0,
};

const searchArticle = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return {
        ...state,
        articles: action.payload.articles,
        query: action.payload.query,
        loading: false,
        totalArticles: action.payload.totalResults,
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
export default searchArticle;
