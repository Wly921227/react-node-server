import {DemoFilter} from '../constants'
import _ from 'lodash'

const demoDefault = {
    num: 0,
    name: 'demo reducer init name '
}

const DemoState = (state = demoDefault, action) => {
    if (action.type === DemoFilter.ADD_NUM) {
        let newState = _.assign({}, state)
        newState.num++
        return newState
    } else if (action.type === DemoFilter.CLEAR_NUM) {
        let newState = _.assign({}, state)
        newState.num = 0
        return newState
    } else if (action.type === DemoFilter.SET_NAME) {
        let newState = _.assign({}, state)
        newState.num = state.name
        return newState
    } else {
        return state
    }
}

export default DemoState