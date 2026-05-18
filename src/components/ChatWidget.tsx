import { useEffect, useRef, useState } from "react";
import { Mail, MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "31643798701";
const EMAIL_ADDRESS = "info@vraagovergod.nl";

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener("jt:open-chat", openHandler);
    return () => window.removeEventListener("jt:open-chat", openHandler);
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3"
    >
      {open && (
        <div className="flex flex-col items-end gap-3">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="nofollow noopener"
            aria-label="Stel je vraag via WhatsApp"
            className="group flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2"
            style={{ animationDuration: "200ms" }}
          >
            <span className="hidden sm:inline-block rounded-md bg-black/80 px-3 py-1 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
              WhatsApp
            </span>
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
              style={{ backgroundColor: "#49E670" }}
            >
              <svg viewBox="0 0 32 32" className="h-6 w-6" fill="white" aria-hidden="true">
                <path d="M19.11 17.5c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.61.14s-.7.89-.86 1.07c-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.97 2.63 1.11 2.81.14.18 1.91 2.92 4.63 4.09.65.28 1.15.45 1.55.57.65.21 1.24.18 1.71.11.52-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.12-.25-.18-.52-.32zM16 5C9.92 5 5 9.92 5 16c0 1.93.51 3.78 1.47 5.42L5 27l5.74-1.5A10.95 10.95 0 0 0 16 27c6.08 0 11-4.92 11-11S22.08 5 16 5zm0 20.18c-1.66 0-3.28-.44-4.7-1.28l-.34-.2-3.41.89.91-3.32-.22-.34A8.93 8.93 0 0 1 7.18 16C7.18 11.13 11.13 7.18 16 7.18S24.82 11.13 24.82 16 20.87 25.18 16 25.18z" />
              </svg>
            </span>
          </a>
          <a
            href={`mailto:${EMAIL_ADDRESS}`}
            aria-label="Stel je vraag via e-mail"
            className="group flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2"
            style={{ animationDuration: "260ms" }}
          >
            <span className="hidden sm:inline-block rounded-md bg-black/80 px-3 py-1 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
              E-mail
            </span>
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
              style={{ backgroundColor: "#fad150" }}
            >
              <Mail className="h-6 w-6 text-neutral-900" aria-hidden="true" />
            </span>
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Chat sluiten" : "Vraag over God, chat openen"}
        className="flex items-center gap-2 rounded-full px-4 py-3 text-neutral-900 shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
        style={{ backgroundColor: "#fad150" }}
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        )}
        <span className="hidden sm:inline text-sm font-semibold">
          {open ? "Sluiten" : "Vraag over God?"}
        </span>
      </button>
    </div>
  );
};

export default ChatWidget;