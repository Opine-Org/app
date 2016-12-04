import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer } from 'universal-route';

// include each reducer
import adminForm from './../reducers/adminForm.js';

const rootReducer = reducer({
    adminForm
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
