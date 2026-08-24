import Image from "next/image";

export default function({ avatarUrl, size = 140 }) {
  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt="プロフィール写真"
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="relative shrink-0"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 142 140">
        <circle cx="70" cy="70" r="70" fill="#d9d9d9"/>
        <path fill="var(--color-ui-icon-1)" d="M71 80.58c14.462 0 26.666 2.35 26.666 11.417 0 9.07-12.284 11.337-26.666 11.337-14.458 0-26.667-2.351-26.667-11.417 0-9.07 12.285-11.337 26.667-11.337m0-43.913a17.58 17.58 0 0 1 17.647 17.636c0 9.79-7.85 17.64-17.647 17.641a17.583 17.583 0 0 1-17.646-17.64A17.58 17.58 0 0 1 71 36.666"/>
      </svg>
    </div>
  );
}