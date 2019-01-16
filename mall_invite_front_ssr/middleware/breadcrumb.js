import {UPDATE_BREADCRUMB} from '../store/mutation-types';

export default function ({route, store}) {
  const matchedRouteRecord = route.matched[route.matched.length - 1];
  if (!matchedRouteRecord) return;
  const matchedComponent = matchedRouteRecord.components.default;
  const componentBreadcrumb = matchedComponent.options.breadcrumb;
  let breadcrumb = null;
  if (componentBreadcrumb) {
    if (typeof componentBreadcrumb === 'function') {
      breadcrumb = componentBreadcrumb();
    } else {
      breadcrumb = componentBreadcrumb;
    }
  }
  store.commit(UPDATE_BREADCRUMB, breadcrumb);
}
