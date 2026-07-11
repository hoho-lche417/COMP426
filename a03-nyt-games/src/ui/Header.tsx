/**
 * DO NOT MODIFY
 * Site-wide header.
 */

export default function Header() {
  return (
    <div className="flex h-12 min-h-12 w-full flex-row items-center border-b border-b-gray-300 px-3">
      <a
        href="/"
        className="font-nyt-heading text-2xl font-extrabold hover:cursor-pointer"
      >
        NYT Games
      </a>
    </div>
  );
}
