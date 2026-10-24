/* Shared by index.html and events.html. Edit MEETUPS below to add an event. */
/* ──────────────────────────────────────────────────────────────
   MEETUPS — the only place to edit when you add an event.
   Past events (end time passed) drop off automatically; the hero
   shows the next 2 at most, and an "empty" card when none are left.
   Times include the -05:00 offset (Quintana Roo, no DST).
   Preview another day: add ?date=2026-11-02 to the URL.
─────────────────────────────────────────────────────────────── */
const MEETUPS = [
  {
    title: "Beach Coworking Meetup",
    chapter: "Puerto Morelos",
    headline: "Work from the beach in Puerto Morelos",
    note: "Puerto Morelos chapter · first edition",
    start: "2026-10-29T11:00:00-05:00",
    end:   "2026-10-29T16:00:00-05:00",
    time: "11:00 AM – 4:00 PM",
    timeShort: "11 AM – 4 PM",
    timeNote: "Drop in anytime",
    venue: "Día y Noche Beach Club",
    address: "Av. Javier Rojo Gómez y Rafael E. Melgar, Puerto Morelos, Q.R.",
    price: "Free",
    priceNote: "Limited spots, RSVP required",
    description: "New location, new format. Bring your laptop, work on whatever you're building, and meet fellow developers, indie hackers and founders by the Caribbean. No presentations, no pitches, no agenda.",
    bring: ["Charged laptop", "Mobile hotspot (backup)", "Cash for food & drinks"],
    rsvp: "https://luma.com/9oxpor7z",
    also: [
      { label: "Meetup", url: "https://www.meetup.com/riviera-maya-tech-builders/events/317094755" },
      { label: "Eventbrite", url: "https://www.eventbrite.com.mx/e/beach-coworking-riviera-maya-tech-builders-tickets-2003791291694" }
    ],
    recap: "/events#past-events"
  }
];

(function renderMeetups() {
  const TZ = "America/Cancun";
  const JOIN_FORM = "https://tally.so/r/J9OvqK";
  const param = new URLSearchParams(location.search).get("date");
  const now = param ? new Date(param + "T12:00:00-05:00") : new Date();

  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const part = (d, opts) => new Intl.DateTimeFormat("en-US", { timeZone: TZ, ...opts }).format(d);
  const ext = 'target="_blank" rel="noopener noreferrer"';

  const svg = (d, size = 16, sw = 2) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const I = {
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
    calPlus: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18M12 14v4M10 16h4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    ticket: '<path d="M3 9a3 3 0 0 0 0 6v3h18v-3a3 3 0 0 0 0-6V6H3z"/><path d="M13 6v12"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };

  const list = MEETUPS.map((e) => ({ ...e, s: new Date(e.start), f: new Date(e.end) }));
  const upcoming = list.filter((e) => e.f > now).sort((a, b) => a.s - b.s).slice(0, 2);
  const last = list.filter((e) => e.f <= now).sort((a, b) => b.s - a.s)[0];

  const d = (e) => ({
    mon: part(e.s, { month: "short" }).toUpperCase(),
    day: part(e.s, { day: "numeric" }),
    wd: part(e.s, { weekday: "short" }),
    weekday: part(e.s, { weekday: "long" }).toUpperCase(),
    monthYear: part(e.s, { month: "long", year: "numeric" }),
    short: part(e.s, { month: "short", day: "numeric" })
  });
  const maps = (e) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(e.venue + ", " + e.address);
  const gcal = (e) => {
    const z = (x) => x.toISOString().replace(/[-:]|\.\d{3}/g, "");
    return "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=" + encodeURIComponent(e.title + " · Riviera Maya Tech Builders") +
      "&dates=" + z(e.s) + "/" + z(e.f) +
      "&location=" + encodeURIComponent(e.venue + ", " + e.address) +
      "&details=" + encodeURIComponent(e.description + "\n\nRSVP: " + e.rsvp);
  };
  const dateBox = (e) => `<div class="ms-date"><span class="ms-mon">${d(e).mon}</span><span class="ms-day">${d(e).day}</span></div>`;

  /* ── Hero card ─────────────────────────────── */
  let hero;
  if (upcoming.length === 0) {
    hero = `
      <div class="meetup-strip is-empty">
        <div class="ms-body">
          <span class="ms-badge">${svg(I.cal, 12, 2.4)} NEXT MEETUP</span>
          <div class="ms-row">
            <div class="ms-date ms-date-empty">${svg(I.calPlus, 26, 1.8)}</div>
            <div class="ms-info">
              <span class="ms-title">Dates coming soon</span>
              <span class="ms-meta">Members get the invite first. Spots usually go fast.</span>
            </div>
          </div>
        </div>
        ${last ? `<a class="ms-footer" href="${esc(last.recap)}">
          <span>Last meetup: <strong>${esc(last.title)}</strong><span class="d-none d-sm-inline"> · ${esc(last.chapter)}</span> · ${d(last).short}</span>
          <span class="ms-footer-link">See recap ${svg(I.arrow, 15, 2.2)}</span>
        </a>` : ""}
      </div>`;
  } else if (upcoming.length === 1) {
    const e = upcoming[0];
    hero = `
      <div class="meetup-strip is-single">
        <div class="ms-body">
          <div class="ms-head">
            <span class="ms-badge">${svg(I.cal, 12, 2.4)} NEXT MEETUP</span>
            <span class="ms-chapter">${esc(e.chapter)} chapter</span>
          </div>
          <div class="ms-row">
            ${dateBox(e)}
            <div class="ms-info">
              <span class="ms-title">${esc(e.title)}</span>
              <span class="ms-meta">${d(e).wd} · <span class="d-sm-none">${esc(e.timeShort)}</span><span class="d-none d-sm-inline">${esc(e.time)} · ${esc(e.venue)}</span> · ${esc(e.price)}</span>
            </div>
            <a class="btn-rsvp" href="${esc(e.rsvp)}" ${ext}><span class="d-sm-none">RSVP to this meetup</span><span class="d-none d-sm-inline">RSVP</span> ${svg(I.arrow, 15, 2.4)}</a>
          </div>
        </div>
      </div>`;
  } else {
    hero = `
      <div class="meetup-strip is-multi">
        <div class="ms-head ms-head-multi">
          <span class="ms-badge">${svg(I.cal, 12, 2.4)} UPCOMING MEETUPS</span>
          <a class="ms-all" href="/events">All events</a>
        </div>
        ${upcoming.map((e) => `
        <div class="ms-item">
          ${dateBox(e)}
          <div class="ms-info">
            <span class="ms-title">${esc(e.title)}</span>
            <span class="ms-meta">${esc(e.chapter)} · <span class="d-sm-none">${esc(e.timeShort)}</span><span class="d-none d-sm-inline">${d(e).wd} ${esc(e.timeShort)} · ${esc(e.price)}</span></span>
          </div>
          <a class="btn-rsvp btn-rsvp-sm" href="${esc(e.rsvp)}" ${ext} aria-label="RSVP to ${esc(e.title)}">RSVP</a>
        </div>`).join("")}
      </div>`;
  }
  const heroEl = document.getElementById("hero-meetups");
  if (heroEl) heroEl.innerHTML = hero;

  /* ── Meetups section ───────────────────────── */
  const heading = document.getElementById("meetups-heading");
  // Per-page heading text: data-none / data-one ("event" = use the event's headline) / data-many
  const setHeading = (key, fallback) => { if (heading) heading.textContent = heading.dataset[key] || fallback; };
  let body;
  if (upcoming.length === 0) {
    setHeading("none", "Our next meetup is on its way");
    body = `
      <div class="event-empty">
        <div>
          <h3>Dates coming soon</h3>
          <p>We announce new meetups to members first: Playa del Carmen, Tulum, Puerto Morelos and Cancún. Join the community and you'll get the invite.</p>
        </div>
        <div class="event-empty-actions">
          <a class="btn cta js-join" href="${JOIN_FORM}" ${ext}>Join the community ${svg(I.arrow, 16, 2.2)}</a>
          ${last ? `<a class="link-arrow" href="${esc(last.recap)}">See the last meetup ${svg(I.arrow, 16, 2.2)}</a>` : ""}
        </div>
      </div>`;
  } else {
    if (upcoming.length === 1) {
      if (heading && heading.dataset.one === "event") heading.textContent = upcoming[0].headline;
      else setHeading("one", heading ? heading.textContent : "");
    } else setHeading("many", heading ? heading.textContent : "");
    body = upcoming.map((e) => `
      <article class="event-feature">
        <div class="ef-date">
          <div class="ef-when">
            <span class="ef-weekday">${d(e).weekday}</span>
            <span class="ef-num">${d(e).day}</span>
            <span class="ef-month">${d(e).monthYear}</span>
          </div>
          <div class="ef-tag">
            <span class="ms-badge">MEETUP</span>
            <span class="ef-note">${esc(e.note)}</span>
          </div>
        </div>
        <div class="ef-body">
          <h3>${esc(e.title)}</h3>
          <div class="ef-facts">
            <div class="ef-fact">${svg(I.clock, 20)}<div><strong>${esc(e.time)}</strong><span>${esc(e.timeNote)}</span></div></div>
            <div class="ef-fact">${svg(I.pin, 20)}<div><strong>${esc(e.venue)}</strong><a href="${maps(e)}" ${ext}>Open in Maps</a></div></div>
            <div class="ef-fact">${svg(I.ticket, 20)}<div><strong>${esc(e.price)}</strong><span>${esc(e.priceNote)}</span></div></div>
          </div>
          <p class="ef-desc">${esc(e.description)}</p>
          ${e.bring && e.bring.length ? `<div class="ef-bring"><span class="ef-bring-label">Bring</span>${e.bring.map((b) => `<span class="chip">${esc(b)}</span>`).join("")}</div>` : ""}
          <div class="ef-actions">
            <div class="ef-buttons">
              <a class="btn cta" href="${esc(e.rsvp)}" ${ext}>RSVP to this meetup</a>
              <a class="btn ghost" href="${gcal(e)}" ${ext}>${svg(I.cal, 18)} Add to calendar</a>
            </div>
            ${e.also && e.also.length ? `<span class="ef-also">Also on ${e.also.map((a) => `<a href="${esc(a.url)}" ${ext}>${esc(a.label)}</a>`).join(" and ")}</span>` : ""}
          </div>
        </div>
      </article>`).join("");
  }
  const listEl = document.getElementById("meetups-list");
  if (listEl) listEl.innerHTML = body;

  /* ── Join links open the Tally popup when it's loaded ── */
  document.addEventListener("click", (ev) => {
    const a = ev.target.closest(".js-join");
    if (!a || !window.Tally) return;
    ev.preventDefault();
    window.Tally.openPopup("J9OvqK", { layout: "modal", width: 374, emoji: { text: "👋", animation: "heart-beat" }, autoClose: 3000 });
  });
})();
