import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Mail, Linkedin } from "lucide-react";
import { SectionHead } from "@/components/section-head";
import { CONTACT } from "@/data/copy";
import { useT, useLang } from "@/hooks/use-lang";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
const TARGET_EMAIL = "emiliopastorzurita906@gmail.com";

export function Contact() {
  const t = useT();
  const { lang } = useLang();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "invalid" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const msgRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    function onPrefill(e: Event) {
      const detail = (e as CustomEvent<{ text?: string }>).detail;
      const text = detail?.text || "";
      const el = msgRef.current;
      if (!el) return;
      el.value = text;
      el.dispatchEvent(new Event("input", { bubbles: true }));
      window.setTimeout(() => {
        el.focus();
        el.setSelectionRange(el.value.length, el.value.length);
      }, 600);
    }
    window.addEventListener("prefill-contact", onPrefill);
    return () => window.removeEventListener("prefill-contact", onPrefill);
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const f = e.currentTarget;
    const data = new FormData(f);
    const honeypot = (data.get("website") as string) || "";
    if (honeypot) return;
    const name = ((data.get("name") as string) || "").trim();
    const email = ((data.get("email") as string) || "").trim();
    const msg = ((data.get("message") as string) || "").trim();
    if (!name || !EMAIL_RE.test(email) || msg.length < 5) {
      setStatus("invalid");
      setStatusMsg(t(CONTACT.form.invalid));
      return;
    }

    setStatus("sending");
    setStatusMsg(t(CONTACT.form.sending));

    try {
      if (!WEB3FORMS_KEY) {
        const subject = `Portfolio · contacto de ${name}`;
        const body = `Nombre: ${name}\nEmail: ${email}\n\n${msg}`;
        window.location.href = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(
          subject,
        )}&body=${encodeURIComponent(body)}`;
        setStatus("sent");
        setStatusMsg(t(CONTACT.form.success));
      } else {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `Portfolio · contacto de ${name}`,
            from_name: `${name} (portfolio)`,
            replyto: email,
            name,
            email,
            message: msg,
            redirect: false,
          }),
        });
        const json: { success?: boolean; message?: string } = await res
          .json()
          .catch(() => ({}));
        if (!res.ok || !json.success) {
          throw new Error(json.message || `HTTP ${res.status}`);
        }
        setStatus("sent");
        setStatusMsg(t(CONTACT.form.success));
      }
      f.reset();
      setTimeout(() => {
        setStatus("idle");
        setStatusMsg("");
      }, 5000);
    } catch (err) {
      setStatus("error");
      const detail = err instanceof Error ? err.message : "";
      setStatusMsg(
        (t(CONTACT.form.error) || "Error") +
          (detail ? ` · ${detail}` : "") +
          " · " +
          (lang === "es"
            ? "escríbeme directo a " + TARGET_EMAIL
            : "email me directly at " + TARGET_EMAIL),
      );
    }
  }

  return (
    <section
      id="contact"
      aria-label="Contacto"
      className="border-t border-line bg-ink px-6 py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHead
          dark
          label={t({ es: "Contacto", en: "Contact" })}
          title={t({ es: "Contacto", en: "Contact" })}
        />

        <motion.div
          initial={{ x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 overflow-hidden border-b border-paper/[0.06] pb-12 pt-8"
        >
          <span
            className="block select-none whitespace-nowrap font-serif italic leading-none text-paper/[0.08]"
            style={{ fontSize: "clamp(4rem, 9vw, 8.5rem)", letterSpacing: "-0.03em" }}
          >
            {t(CONTACT.big)}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <motion.p
              initial={{ y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8 }}
              className="mb-8 max-w-[42ch] text-[0.95rem] leading-[1.75] text-paper/60"
            >
              {t(CONTACT.desc)}
            </motion.p>
            <ul className="flex flex-col" role="list">
              {[
                {
                  href: "mailto:emiliopastorzurita906@gmail.com",
                  label: "Email",
                  value: "emiliopastorzurita906@gmail.com",
                  cursorLabel: "CORREO",
                  Icon: Mail,
                  external: false,
                },
                {
                  href: "https://www.linkedin.com/in/emilio-pastor-zurita/",
                  label: "LinkedIn",
                  value: "linkedin.com/in/emilio-pastor-zurita",
                  cursorLabel: "ABRIR",
                  Icon: Linkedin,
                  external: true,
                },
              ].map((it, i) => (
                <motion.li
                  key={i}
                  initial={{ x: -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={it.href}
                    target={it.external ? "_blank" : undefined}
                    rel={it.external ? "noopener noreferrer" : undefined}
                    data-cursor-label={it.cursorLabel}
                    className="group relative flex items-center justify-between gap-4 overflow-hidden border-b border-paper/[0.08] py-5"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-rust transition-transform duration-500 group-hover:scale-x-100"
                    />
                    <span className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-paper/40">
                      <it.Icon className="h-3.5 w-3.5" />
                      {it.label}
                    </span>
                    <span className="text-[0.9rem] font-medium text-paper transition-transform duration-200 group-hover:translate-x-1">
                      {it.value}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.form
            initial={{ y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={submit}
            noValidate
            aria-label="Formulario de contacto"
            className="flex flex-col"
          >
            <div className="hp-honeypot" aria-hidden>
              <label htmlFor="cf-website">No rellenar</label>
              <input
                id="cf-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {[
              { id: "cf-name", name: "name", type: "text", label: t(CONTACT.form.name), ph: t(CONTACT.form.namePh), max: 120, autoComplete: "name" },
              { id: "cf-email", name: "email", type: "email", label: t(CONTACT.form.email), ph: t(CONTACT.form.emailPh), max: 200, autoComplete: "email" },
            ].map((f) => (
              <div key={f.id} className="group relative mb-7">
                <label
                  htmlFor={f.id}
                  className="mb-2 block font-mono text-[0.56rem] uppercase tracking-[0.22em] text-paper/40"
                >
                  {f.label}
                </label>
                <input
                  id={f.id}
                  name={f.name}
                  type={f.type}
                  autoComplete={f.autoComplete}
                  maxLength={f.max}
                  placeholder={f.ph}
                  required
                  className="w-full border-0 border-b border-paper/15 bg-transparent pb-2.5 pt-1 font-serif text-[1.05rem] text-paper placeholder:text-paper/20 placeholder:font-sans placeholder:text-[0.85rem] focus:border-paper focus:outline-none focus:ring-0 transition-colors"
                />
              </div>
            ))}

            <div className="group relative mb-7">
              <label
                htmlFor="cf-msg"
                className="mb-2 block font-mono text-[0.56rem] uppercase tracking-[0.22em] text-paper/40"
              >
                {t(CONTACT.form.msg)}
              </label>
              <textarea
                ref={msgRef}
                id="cf-msg"
                name="message"
                maxLength={3000}
                placeholder={t(CONTACT.form.msgPh)}
                required
                className="min-h-[110px] w-full resize-y border-0 border-b border-paper/15 bg-transparent pb-2.5 pt-1 font-serif text-[1.02rem] leading-[1.5] text-paper placeholder:text-paper/20 placeholder:font-sans placeholder:text-[0.85rem] focus:border-paper focus:outline-none focus:ring-0 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className={cn(
                "group/btn relative isolate mt-4 inline-flex items-center justify-between gap-4 self-start border-0 border-b border-paper/30 py-3 pl-0 pr-1 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-paper transition-colors hover:border-rust hover:text-rust",
                "disabled:opacity-60",
              )}
            >
              <span>
                {status === "sending"
                  ? t(CONTACT.form.sending)
                  : status === "sent"
                    ? t(CONTACT.form.sent)
                    : t(CONTACT.form.send)}
              </span>
              <span
                aria-hidden
                className="text-[1.1rem] leading-none transition-transform duration-500 group-hover/btn:translate-x-2"
              >
                →
              </span>
            </button>

            <p
              role="status"
              aria-live="polite"
              className={cn(
                "mt-3 min-h-[1em] font-mono text-[0.65rem] uppercase tracking-[0.1em]",
                status === "invalid" && "text-rust",
                status === "error" && "text-rust",
                status === "sent" && "text-paper/60",
                status === "sending" && "text-paper/40",
                status === "idle" && "text-paper/40",
              )}
              lang={lang}
            >
              {statusMsg}
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
