import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { checkToken } from '../../utils/localStorage/localStorage';

function AuthRoute({ component: Component, ...rest }) {
  return (
    <div>
      <Route
        {...rest}
        render={props => {
          return checkToken() === false ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/countries', state: { from: props.location } }} />
          );
        }}
      />
    </div>
  );
}

export default AuthRoute;

// import React from 'react'
// import { Redirect, Route } from 'react-router-dom'

// import { checkToken } from '../../untils/localStorage';

// function AuthRoute(props) {
//     const isLogin = checkToken();
//     const { path, component } = props;
//     if (!isLogin) {
//         return (
//             <Route exact path={path} component={component} />
//         )
//     } else {
//         return (
//             <Redirect to="/home" />
//         )
//     }
// }
// export default AuthRoute;
