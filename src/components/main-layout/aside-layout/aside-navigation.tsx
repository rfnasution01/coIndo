export function AsideNavigation({ show }: { show: boolean }) {
  return <div className="flex-1">{show && <h5>Navigation</h5>}</div>
}
