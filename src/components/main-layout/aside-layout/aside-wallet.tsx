export function AsideWallet({ show }: { show: boolean }) {
  return <div>{show && <h5>Wallet</h5>}</div>
}
