export default function ({route, redirect}) {
  if(route.name === 'p-center') {
    return redirect('/p-center/general')
  }
}
