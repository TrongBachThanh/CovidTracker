import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { checkToken } from '../../utils/localStorage/localStorage';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        checkToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;

// import React from 'react'
// import {Redirect, Route} from 'react-router-dom'

// import { checkToken } from '../../untils/localStorage';

// function PrivateRoute(props) {
//     const isLogin = checkToken();
//     const {path, component} = props;
//    if(isLogin) {
//     return (
//         <Route exact path={path} component={component} />
//     )
//    } else {
//        return (
//             <Redirect to="/login"/>
//        )

//    }
// }
// export default PrivateRoute;
