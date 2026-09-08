import Image from "next/image";

const mark = "/svgs/logo/mahraj-mark.svg";

export function AdminLogo() {
  return (
    <a className="mahraj-admin-logo" href="/" aria-label="Mahraj Flooring home">
      <Image
        src={mark}
        alt="Mahraj Flooring"
        width={42}
        height={42}
        priority
        unoptimized
      />
      <span className="mahraj-admin-logo__wordmark">
        <strong>Mahraj</strong>
        <span>Flooring</span>
        <small>Admin Panel</small>
      </span>
    </a>
  );
}

export function AdminIcon() {
  return (
    <Image
      className="mahraj-admin-icon"
      src={mark}
      alt="Mahraj Flooring"
      width={32}
      height={32}
      priority
      unoptimized
    />
  );
}
