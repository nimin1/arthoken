"use client";

import { useState } from "react";
import { site } from "@/lib/content";
import styles from "./ContactForm.module.css";

type Errors = Partial<Record<"name" | "email" | "problem", string>>;

const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = {
      name: String(data.get("name") ?? "").trim(),
      organization: String(data.get("organization") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      problem: String(data.get("problem") ?? "").trim(),
    };

    const next: Errors = {};
    if (!values.name) next.name = "Please tell us who you are.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Please enter an email address we can reply to.";
    if (values.problem.length < 20)
      next.problem = "A sentence or two about the problem helps us respond usefully.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = document.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }

    if (!ENDPOINT) {
      const subject = encodeURIComponent(`Enquiry from ${values.organization || values.name}`);
      const body = encodeURIComponent(
        `Name: ${values.name}\nOrganization: ${values.organization || "not given"}\nEmail: ${values.email}\n\n${values.problem}\n`
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setState("sent");
      return;
    }

    try {
      setState("sending");
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      setState(response.ok ? "sent" : "failed");
    } catch {
      setState("failed");
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.field}>
        <label className="label" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          className={styles.control}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name ? (
          <p id="name-error" className={styles.error}>
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className="label" htmlFor="organization">
          Organization
        </label>
        <input
          id="organization"
          name="organization"
          className={styles.control}
          autoComplete="organization"
        />
      </div>

      <div className={`${styles.field} ${styles.wide}`}>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={styles.control}
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email ? (
          <p id="email-error" className={styles.error}>
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className={`${styles.field} ${styles.wide}`}>
        <label className="label" htmlFor="problem">
          What is the problem?
        </label>
        <textarea
          id="problem"
          name="problem"
          className={styles.control}
          rows={5}
          placeholder="What has to change, what has been tried, and what is in the way."
          aria-invalid={Boolean(errors.problem)}
          aria-describedby={errors.problem ? "problem-error" : undefined}
        />
        {errors.problem ? (
          <p id="problem-error" className={styles.error}>
            {errors.problem}
          </p>
        ) : null}
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.submit} disabled={state === "sending"}>
          {state === "sending" ? "Sending" : "Send"}
          <svg viewBox="0 0 12 10" width="12" height="10" fill="none" aria-hidden="true">
            <path d="M0 5h10.5M7 1.5 10.5 5 7 8.5" stroke="currentColor" strokeWidth="1.25" />
          </svg>
        </button>
        <p className={styles.note}>
          A senior engineer reads every enquiry. We reply within two working days.
        </p>
      </div>

      <p className={styles.status} role="status">
        {state === "sent"
          ? "Thank you. Your message is on its way and we will come back to you shortly."
          : state === "failed"
            ? `Something went wrong sending that. Please write to ${site.email} instead.`
            : ""}
      </p>
    </form>
  );
}
