// The maker's mark in the corner of the cover, like an artist signing a painting.
export function Signature() {
  return (
    <aside className="signature" aria-label="about the creator">
      <img src="/lea.svg" alt="cartoon portrait of lea" className="signature-face" width={44} height={44} />
      <div>
        <p className="signature-name hand">created by lea</p>
        <p className="signature-line">software engineer who grades her ai agents like a 2nd grade teacher.</p>
        <p className="signature-links mono">
          <a href="https://github.com/lea-tinoso" target="_blank" rel="noreferrer">
            github ↗
          </a>
          <span aria-hidden> · </span>
          <a href="https://lea-showcase.vercel.app" target="_blank" rel="noreferrer">
            portfolio ↗
          </a>
        </p>
      </div>
    </aside>
  );
}
