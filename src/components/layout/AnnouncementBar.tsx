import Link from "next/link";
import { announcement } from "@/config/announcement";

export function AnnouncementBar() {
  if (!announcement.enabled || !announcement.message) return null;
  const text = <span className="font-medium">{announcement.message}</span>;
  return (
    <div role="region" aria-label="Announcement" className="bg-accent px-4 py-2 text-center text-sm text-accent-fg">
      {announcement.href ? (
        <Link href={announcement.href} className="underline underline-offset-4">
          {text}
        </Link>
      ) : (
        text
      )}
    </div>
  );
}
