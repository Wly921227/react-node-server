// Hook for server
if (typeof require.ensure !== 'function') {
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}

const config = {
    childRoutes: [{
        path: '/',
        component: require('../common/app'),
        indexRoute: {
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/demo'))
                }, 'demo')
            }
        },
        childRoutes: [{
            path: '/demo',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/demo'))
                }, 'demo')
            }
        }, {
            path: '/demo1',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/demo1'))
                }, 'demo1')
            }
        }, {
            path: '/demo2',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/demo2'))
                }, 'demo2')
            }
        }]
    }]
}

export default config
