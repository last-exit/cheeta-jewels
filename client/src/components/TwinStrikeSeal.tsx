/**
 * Miami Empire identity detail: the official CJ remains intact inside a paired-strike
 * archival seal. It is a house frame, not a replacement logo.
 */
const mark = "/manus-storage/cheeta-cj-official_8dcc9825.png";

export default function TwinStrikeSeal({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <span className={`twin-strike-seal ${dark ? "is-dark" : ""} ${className}`} aria-hidden="true">
      <i className="twin-strike-line twin-strike-line-one" />
      <i className="twin-strike-line twin-strike-line-two" />
      <img src={mark} alt="" className="twin-strike-mark" />
    </span>
  );
}
