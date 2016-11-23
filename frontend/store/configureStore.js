import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer } from 'universal-route';

// include each reducer
import adminRegister from './../reducers/adminRegister.js';

const rootReducer = reducer({
    adminRegister
});

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
