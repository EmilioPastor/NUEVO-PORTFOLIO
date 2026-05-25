import { motion } from "motion/react";
import { useState } from "react";
import { Mail, Linkedin } from "lucide-react";
import { SectionHead } from "@/components/section-head";
import { CONTACT } from "@/data/copy";
import { useT, useLang } from "@/hooks/use-lang";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Contact() {
  const t = useT();
  const { lang } = useLang();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "invalid">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
    setTimeout(() => {
      setStatus("sent");
      setStatusMsg(t(CONTACT.form.success));
      f.reset();
      setTimeout(() => {
        setStatus("idle");
        setStatusMsg("");
      }, 4500);
    }, 700);
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
              <label
                key={f.id}
                htmlFor={f.id}
                className="mb-2 flex flex-col border border-paper/10 bg-paper/[0.04] transition-colors focus-within:border-paper/30"
              >
                <span className="px-4 pt-3 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-paper/35">
                  {f.label}
                </span>
                <input
                  id={f.id}
                  name={f.name}
                  type={f.type}
                  autoComplete={f.autoComplete}
                  maxLength={f.max}
                  placeholder={f.ph}
                  required
                  className="w-full bg-transparent px-4 pb-3 pt-1.5 font-sans text-[0.9rem] text-paper placeholder:text-paper/20 focus:outline-none"
                />
              </label>
            ))}

            <label
              htmlFor="cf-msg"
              className="mb-2 flex flex-col border border-paper/10 bg-paper/[0.04] transition-colors focus-within:border-paper/30"
            >
              <span className="px-4 pt-3 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-paper/35">
                {t(CONTACT.form.msg)}
              </span>
              <textarea
                id="cf-msg"
                name="message"
                maxLength={3000}
                placeholder={t(CONTACT.form.msgPh)}
                required
                className="min-h-[100px] w-full resize-y bg-transparent px-4 pb-3 pt-1.5 font-sans text-[0.9rem] text-paper placeholder:text-paper/20 focus:outline-none"
              />
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className={cn(
                "relative isolate mt-2 w-full overflow-hidden border-0 bg-paper px-6 py-3.5 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-ink transition-colors",
                "before:absolute before:inset-0 before:-z-10 before:origin-right before:scale-x-0 before:bg-rust before:transition-transform before:duration-500",
                "hover:before:origin-left hover:before:scale-x-100 hover:text-paper",
                "disabled:opacity-60",
              )}
            >
              {status === "sending" ? t(CONTACT.form.sending) : status === "sent" ? t(CONTACT.form.sent) : t(CONTACT.form.send)}
            </button>

            <p
              role="status"
              aria-live="polite"
              className={cn(
                "mt-3 min-h-[1em] font-mono text-[0.65rem] uppercase tracking-[0.1em]",
                status === "invalid" && "text-rust",
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
