import { useEffect, useContext } from 'react';
import { AppContext } from '../store';
import {
  getLargestCitiesInfo,
  getFavorites,
  getLargestCitesWeather,
  getNotes
} from './index';
import {
  ADD_WEATHER_INFO,
  SET_LOADING,
  ADD_FAVORITE,
  SAVE_NOTES
} from '../constants';

const usePopulateStore = () => {
  const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        const fetchData = async () => {
    
          dispatch({
            type: SET_LOADING,
            isLoading: true
          });
          await getLargestCitiesInfo();
         
          dispatch({
            type: SET_LOADING,
            isLoading: false
          });
  
          const citiesInfo = getLargestCitesWeather();
          dispatch({
            type: ADD_WEATHER_INFO,
            weatherInfo: citiesInfo
          })

          const favorites = getFavorites();

          dispatch({ type: ADD_FAVORITE, favoriteItem: favorites });

          const notes = getNotes();

          dispatch({ type: SAVE_NOTES, notes })
        }

        if(!state.weatherInfo.length) {
          fetchData(); 
        }
      }, [dispatch, state.weatherInfo.length]);
}

export default usePopulateStore;
