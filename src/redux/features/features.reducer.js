import featuresActionTypes from "./features.types";

export const initState = {
  pricingItems: [],
  contacts: [],
  blogs: [],
  groups: [],
  newsLetter: [],
  stats: [],
};

function FeaturesReducer(state = initState, action) {
  switch (action.type) {
    case featuresActionTypes.GET_PRICING_ITEMS_SUCCESS:
      return {
        ...state,
        ...{ pricingItems: action.itemsResult },
      };
    case featuresActionTypes.GET_CONTACTS_SUCCESS:
      return {
        ...state,
        ...{ contacts: action.itemsResult },
      };
    case featuresActionTypes.GET_BLOGS_SUCCESS:
      return {
        ...state,
        ...{ blogs: action.itemsResult },
      };
    case featuresActionTypes.GET_GROUP_SUCCESS:
      return {
        ...state,
        ...{ groups: action.itemsResult },
      };
    case featuresActionTypes.GET_NEWSLETTER_SUCCESS:
      return {
        ...state,
        ...{ newsLetter: action.itemsResult },
      };
    case featuresActionTypes.GET_STATS_SUCCESS:
      return {
        ...state,
        ...{ stats: action.itemsResult },
      };

    default:
      return state;
  }
}

export default FeaturesReducer;
