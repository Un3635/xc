export default function ({route, redirect}) {
  if (route.name === 'i') {
    return redirect('/i/account');
  }
}
