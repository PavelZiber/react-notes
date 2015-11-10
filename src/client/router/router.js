import {create as RouterCreate} from 'react-router';
import routes from './routes';
var router;

router = RouterCreate({
  routes: routes
});

export default function() {
  return router;
}
