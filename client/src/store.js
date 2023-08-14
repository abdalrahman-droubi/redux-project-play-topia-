import { configureStore } from '@reduxjs/toolkit';
import userReducer , { fetchUser } from './actions/AllUsersActions';
import gamesReducer from './actions/ApiActions';
import favGamesReducer from './actions/FavGames';
import thunkMiddleware from 'redux-thunk';

import userNewReducer from './actions/UserActions'
       
const store = configureStore({
  reducer: {
    user: userReducer,
    games: gamesReducer,



    

    userNew:userNewReducer,








    favGames:favGamesReducer,

  },
  middleware: [thunkMiddleware],
});
export default store;
