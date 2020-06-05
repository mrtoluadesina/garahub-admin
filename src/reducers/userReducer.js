import {
	FETCHING_USER_END,
	FETCHING_USER_START,
	FETCH_ALL_USERS_FAILED,
	FETCH_ALL_USERS_SUCCESS,
	CREATE_USER_END,
	CREATE_USER_FAIL,
	CREATE_USER_START,
  CREATE_USER_SUCCESS,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL
} from "../actions/types";

const intialState = {
    users:[],
    userSuccess: false,
    editSuccess:false,
    userError:"",
    loading: false,
}

export default (state=intialState, action)=>{
    switch (action.type) {
			case FETCHING_USER_END:
				return {
					...state,
					loading: action.payload,
				};
			case FETCHING_USER_START:
				return {
					...state,
					loading: action.payload,
				};
			case FETCH_ALL_USERS_SUCCESS:
				return {
					...state,
					users: action.payload,
					userError: "",
				};
			case FETCH_ALL_USERS_FAILED:
				return {
					...state,
					users: [],
					userError: action.payload.message,
				};
			case CREATE_USER_START:
				return {
					...state,
					loading: action.payload,
				};
			case CREATE_USER_END:
				return {
					...state,
					loading: action.payload,
				};
			case CREATE_USER_SUCCESS:
				return {
					...state,
					userError: "",
					userSuccess: true,
				};
			case CREATE_USER_FAIL:
				return {
					...state,
					userError: action.payload,
					userSuccess: false,
				};
			case EDIT_USER_SUCCESS:
				return {
          ...state,
          editSuccess:true,
					users: []
        };

			case EDIT_USER_FAIL:
				return {
					...state,
					users: [],
					userError: action.payload.message,
				};

			default:
				return state;
		}
}
