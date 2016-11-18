import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index.js';

const configureStore = (preloadedState) => {
    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            thunkMiddleware
        )
    );

    return store;
};

export default configureStore;
