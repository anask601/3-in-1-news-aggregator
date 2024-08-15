import buildEndpointPath from "../../services/buildEndpointPath";
import axios from "axios";
import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from "./actionTypes";
import { normalizeNewsData } from "../../utils/util";

const fetchDataRequest = () => ({
  type: SEARCH_REQUEST,
});

const fetchDataSuccess = (result, query) => ({
  type: SEARCH_SUCCESS,
  payload: {
    articles: result,
    query: query,
  },
});

const fetchDataFailure = (error) => ({
  type: SEARCH_FAILURE,
  payload: error,
});

export const searchArticle = (searchQuery, source) => async (dispatch) => {
  try {
    dispatch(fetchDataRequest());
    const response = await axios.get(
      buildEndpointPath({ searchQuery, source, isSearch: true })
    );
    const normalizeNews = normalizeNewsData(source, response);

    dispatch(fetchDataSuccess(normalizeNews, searchQuery));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};
