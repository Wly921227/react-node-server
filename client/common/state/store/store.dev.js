import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'
import DevTools from '../devTools'

export default function configureStore(preloadedState) {
    const enhancer = compose(
        applyMiddleware(thunk),
        //必须的！启用带有monitors（监视显示）的DevTools
        DevTools.instrument()
    )

    const store = createStore(
        reducers,
        preloadedState,
        enhancer
    )

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
