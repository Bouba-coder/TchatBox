import React from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'

import './index.scss'
import './app.styles.scss'
import Home from './pages/Home'
import Login from './pages/Login'
import Me from './pages/Me'
import Register from './pages/Register'
import PrivateRoute from './utils/PrivateRoute'
import ReactGA from 'react-ga'

const App = () => {
  const history = useHistory()
  history.listen((location, _action) => {
    ReactGA.set({ page: location.pathname })
    ReactGA.pageview(location.pathname)
  })

  return (
    <Switch>
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <PrivateRoute exact path='/channels' component={Home} />
      <PrivateRoute exact path='/channels/me' component={Me} />
      <PrivateRoute exact path='/channels/me/:dmId' component={Me} />
    </Switch>
  )
}

export default App
