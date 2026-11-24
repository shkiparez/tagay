const IC = {
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>',
  max: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.2 2 11.4c0 2.7 1.2 5.1 3.2 6.8L4.5 22l4.1-2.1c1.1.3 2.2.5 3.4.5 5.5 0 10-4.2 10-9.4S17.5 2 12 2zm-4 11.2a1.4 1.4 0 110-2.8 1.4 1.4 0 010 2.8zm4 0a1.4 1.4 0 110-2.8 1.4 1.4 0 010 2.8zm4 0a1.4 1.4 0 110-2.8 1.4 1.4 0 010 2.8z"/></svg>',
  tel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  logo: '<svg viewBox="0 0 32 32" fill="none"><path d="M9 6c-3 0-5 2.6-5 6.2 0 4 1.6 6.4 2.6 10.3.7 2.9 1.4 4.5 2.8 4.5 1.6 0 1.8-2.4 2.5-5.4.4-1.7 1.2-2.6 2.1-2.6s1.7.9 2.1 2.6c.7 3 .9 5.4 2.5 5.4 1.4 0 2.1-1.6 2.8-4.5 1-3.9 2.6-6.3 2.6-10.3C27 8.6 25 6 22 6c-2.4 0-3.8 1.4-6 1.4S11.4 6 9 6z" stroke="#1d5fae" stroke-width="2.2"/><path d="M8.5 12.5c3.2 2.8 11.8 2.8 15 0" stroke="#3faa4a" stroke-width="2.2" stroke-linecap="round"/></svg>',
};
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const svcById = id => SERVICES.find(s => s.id === id);
const docById = id => TEAM.find(d => d.id === id);
const DOCTORS = TEAM.filter(d => !d.admin);
const priceText = s => s.price || "После осмотра";
const waLink = t => `https://wa.me/${SITE.wa}?text=${encodeURIComponent(t || "Здравствуйте! Хочу записаться на приём в стоматологию «Тагай».")}`;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ---------- toast + clipboard */
function toast(msg) {
  let t = $(".toast"); if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.append(t); }
  t.textContent = msg; t.classList.add("show"); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 5500);
}
async function copy(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch (e) {
    const ta = document.createElement("textarea"); ta.value = text; ta.style.cssText = "position:fixed;opacity:0";
    document.body.append(ta); ta.select(); let ok = false; try { ok = document.execCommand("copy"); } catch (_) {}
    ta.remove(); return ok;
  }
}
async function sendMax(text) {
  const w = window.open(SITE.max, "_blank");
  const ok = await copy(text);
  if (!w) location.href = SITE.max;
  toast(ok ? "Текст скопирован — вставьте его в чат с клиникой в Max и отправьте." : `Откройте Max и напишите нам на номер ${SITE.phoneText}.`);
}

/* ---------- карточки */
function svcCard(s) {
  return `<a class="svc reveal" href="service.html?id=${s.id}">
    <div class="svc-img"><img src="${s.img}" alt="${esc(s.title)}" loading="lazy"></div>
    <div class="svc-body"><span class="n">${s.n}</span><h3>${s.title}</h3><p>${s.short}</p>
    <div class="svc-foot"><span>${priceText(s)}</span><span class="more">Подробнее ${IC.arrow.replace("<svg", '<svg width="16" height="16"')}</span></div></div></a>`;
}
function docCard(d) {
  return `<a class="doc reveal" href="doctor.html?id=${d.id}" data-spec="${d.spec.join(" ")}">
    <div class="doc-photo"><img src="${d.imgs[0]}" alt="${esc(d.name)}" loading="lazy"><span class="exp">Стаж ${d.exp}</span></div>
    <div class="doc-body"><div class="role">${d.role}</div><h3>${d.name}</h3>
    <div class="go"><span>Подробнее</span><span>→</span></div></div></a>`;
}
const soonCards = () => Array.from({ length: SOON }, () => `<div class="doc soon reveal" data-spec="ortho thera hyg"><div class="doc-photo"><span>Скоро<br>в команде</span></div>
  <div class="doc-body"><div class="role">Врач-стоматолог</div><h3>Информация появится в ближайшее время</h3></div></div>`).join("");

/* ---------- выбор услуги: вкладки + фото + описание (как выбор домика) */
function picker(el, startId) {
  el.innerHTML = `<div class="pick-tabs">${SERVICES.map(s => `<button type="button" data-id="${s.id}"><small>${s.n}</small><b>${s.title}</b></button>`).join("")}</div>
    <div class="pick-view"><div class="pick-photo"></div><div class="pick-info"></div></div>`;
  const pick = id => {
    const s = svcById(id);
    $$(".pick-tabs button", el).forEach(b => b.classList.toggle("on", b.dataset.id === id));
    const docs = s.docs.map(docById).filter(Boolean);
    $(".pick-photo", el).innerHTML = `<img src="${s.img}" alt="${esc(s.title)}"><span class="tag">${s.tag}</span>`;
    $(".pick-info", el).innerHTML = `<span class="eyebrow ${el.classList.contains("light") ? "" : "l"}">Услуга ${s.n}</span><h3>${s.title}</h3><p>${s.text}</p>
      <ul class="ticks">${s.includes.map(x => `<li>${x}</li>`).join("")}</ul>
      <div class="pick-meta"><div><small>Стоимость</small><b>${priceText(s)}</b></div><div><small>Длительность</small><b>${s.time}</b></div></div>
      <div class="who"><div class="avatars">${docs.map(d => `<img src="${d.imgs[0]}" alt="${esc(d.short)}" title="${esc(d.short)}">`).join("")}</div><span>Принимают ${docs.length} ${docs.length > 4 ? "врачей" : "врача"}</span></div>
      <div class="pick-btns"><button class="btn btn-green" data-book data-service="${s.id}">${IC.cal}Записаться</button>
      <a class="btn btn-ghost ${el.classList.contains("light") ? "" : "l"}" href="service.html?id=${s.id}">Подробнее</a></div>`;
  };
  $$(".pick-tabs button", el).forEach(b => b.onclick = () => { pick(b.dataset.id); b.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" }); });
  pick(startId || SERVICES[0].id);
}

/* ---------- форма записи (WhatsApp / Max) */
function bookForm(root, pre = {}) {
  const st = { service: pre.service || "", day: -1, time: "" };
  // ближайшие 14 дней по новосибирскому времени
  const WD = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"], MON = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
  const MONF = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  const base = new Date(Date.now() + 7 * 3600e3);
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate() + i));
    const wd = d.getUTCDay();
    return { wd: wd || 7, top: i === 0 ? "сегодня" : i === 1 ? "завтра" : WD[wd], num: d.getUTCDate(), mon: MON[d.getUTCMonth()],
      full: `${WD[wd]}, ${d.getUTCDate()} ${MONF[d.getUTCMonth()]}`, today: i === 0 };
  });
  const fmt = m => String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
  const slotsFor = d => {
    const h = SITE.hours.find(x => x.d.includes(d.wd)); if (!h) return [];
    const out = [], nowMin = nskNow().min;
    for (let m = toMin(h.from); m <= toMin(h.to) - 60; m += 30) if (!d.today || m >= nowMin + 60) out.push(fmt(m));
    return out;
  };
  root.innerHTML = `
    <div class="field"><span class="flabel">Услуга <span class="req">*</span></span>
      <div class="svc-chips">${SERVICES.map(s => `<button type="button" data-v="${s.id}">${s.title}</button>`).join("")}<button type="button" data-v="other">Другое / не знаю</button></div></div>
    <div class="f-row">
      <div class="field"><label>Ваше имя <span class="req">*</span></label><input name="name" autocomplete="name" placeholder="Как к вам обращаться"></div>
      <div class="field"><label>Телефон <span class="req">*</span></label><input name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+7 ___ ___-__-__"></div>
    </div>
    <div class="field"><label>Врач</label><select name="doctor"><option value="">Любой свободный врач</option>
      ${DOCTORS.map(d => `<option value="${d.id}">${d.short} — ${d.role.toLowerCase()}</option>`).join("")}</select></div>
    <div class="field"><span class="flabel">День</span><div class="day-chips">${days.map((d, i) => `<button type="button" data-i="${i}"><small>${d.top}</small><b>${d.num}</b><small>${d.mon}</small></button>`).join("")}</div></div>
    <div class="field"><span class="flabel">Время</span><div class="slots"><p class="slots-empty">Сначала выберите день</p></div>
      <p class="slot-note">Администратор подтвердит, что выбранное время свободно.</p></div>
    <div class="field"><label>Комментарий</label><textarea name="comment" placeholder="Что беспокоит, есть ли боль, удобное время для звонка…"></textarea></div>
    <span class="flabel">Ваше сообщение</span>
    <div class="preview"></div>
    <div class="f-err">Выберите услугу, укажите имя и телефон.</div>
    <div class="send"><button type="button" class="btn btn-wa" data-send="wa">${IC.wa}Отправить в WhatsApp</button>
      <button type="button" class="btn btn-max" data-send="max">${IC.max}Отправить в Max</button></div>
    <p class="f-hint">Откроется мессенджер с готовым текстом — останется нажать «Отправить». Данные на сайте не сохраняются.</p>`;
  const f = n => $(`[name=${n}]`, root);
  if (pre.doctor) f("doctor").value = pre.doctor;

  const text = () => {
    const s = svcById(st.service), d = docById(f("doctor").value), day = days[st.day];
    const when = day ? day.full + (st.time && st.time !== "any" ? ", " + st.time : ", любое время") : "";
    return ["Здравствуйте! Хочу записаться на приём в стоматологию «Тагай».", "", ...[
      "Имя: " + (f("name").value.trim() || "—"),
      "Телефон: " + (f("phone").value.trim() || "—"),
      "Услуга: " + (s ? s.title : st.service === "other" ? "другое / нужна консультация" : "—"),
      d && "Врач: " + d.name,
      when && "Когда удобно: " + when,
      f("comment").value.trim() && "Комментарий: " + f("comment").value.trim(),
    ].filter(Boolean)].join("\n");
  };
  const upd = () => {
    $$(".svc-chips button", root).forEach(b => b.classList.toggle("on", b.dataset.v === st.service));
    $$(".day-chips button", root).forEach(b => b.classList.toggle("on", +b.dataset.i === st.day));
    $$(".slots button", root).forEach(b => b.classList.toggle("on", b.dataset.v === st.time));
    $(".preview", root).textContent = text();
  };
  $$(".svc-chips button", root).forEach(b => b.onclick = () => { st.service = b.dataset.v; $(".svc-chips", root).classList.remove("invalid"); upd(); });
  const drawSlots = () => {
    const box = $(".slots", root), d = days[st.day];
    if (!d) { box.innerHTML = `<p class="slots-empty">Сначала выберите день</p>`; return; }
    const list = slotsFor(d);
    if (!list.includes(st.time) && st.time !== "any") st.time = "";
    box.innerHTML = list.length
      ? `<button type="button" data-v="any" class="any">Любое</button>` + list.map(t => `<button type="button" data-v="${t}">${t}</button>`).join("")
      : `<p class="slots-empty">На сегодня запись уже закрыта — выберите другой день</p>`;
    $$("button", box).forEach(b => b.onclick = () => { st.time = st.time === b.dataset.v ? "" : b.dataset.v; upd(); });
  };
  $$(".day-chips button", root).forEach(b => b.onclick = () => { st.day = +b.dataset.i; drawSlots(); upd(); });
  f("phone").addEventListener("input", e => {
    let v = e.target.value.replace(/\D/g, "");
    if (v[0] === "8") v = "7" + v.slice(1); if (v && v[0] !== "7") v = "7" + v; v = v.slice(0, 11);
    const p = [v.slice(1, 4), v.slice(4, 7), v.slice(7, 9), v.slice(9, 11)];
    e.target.value = v ? "+7" + (p[0] ? " " + p[0] : "") + (p[1] ? " " + p[1] : "") + (p[2] ? "-" + p[2] : "") + (p[3] ? "-" + p[3] : "") : "";
  });
  root.addEventListener("input", e => { e.target.classList?.remove("invalid"); upd(); });
  root.addEventListener("change", upd);
  const valid = () => {
    const bad = [];
    if (!st.service) { $(".svc-chips", root).classList.add("invalid"); bad.push(1); }
    if (f("name").value.trim().length < 2) { f("name").classList.add("invalid"); bad.push(1); }
    if (f("phone").value.replace(/\D/g, "").length !== 11) { f("phone").classList.add("invalid"); bad.push(1); }
    $(".f-err", root).style.display = bad.length ? "block" : "none";
    return !bad.length;
  };
  $$("[data-send]", root).forEach(b => b.onclick = () => {
    if (!valid()) return;
    if (b.dataset.send === "wa") window.open(waLink(text()), "_blank");
    else sendMax(text());
  });
  upd();
}

function modal() {
  document.body.insertAdjacentHTML("beforeend", `<div class="modal" id="bookModal" role="dialog" aria-modal="true" aria-label="Запись на приём">
    <div class="bform"><button class="m-close" aria-label="Закрыть">✕</button><h3>Запись на приём</h3>
    <p class="sub">Новым пациентам — скидка 5%. Ответим и подтвердим время.</p><div class="m-body"></div></div></div>`);
  const m = $("#bookModal");
  const close = () => { m.classList.remove("show"); document.body.classList.remove("lock"); };
  window.openBook = (pre = {}) => { bookForm($(".m-body", m), pre); m.classList.add("show"); document.body.classList.add("lock"); };
  $(".m-close", m).onclick = close;
  m.onclick = e => { if (e.target === m) close(); };
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-book]"); if (!b) return;
    e.preventDefault(); openBook({ service: b.dataset.service, doctor: b.dataset.doctor });
  });
}

/* ---------- шапка, подвал, кнопки */
function chrome() {
  const page = { service: "services", doctor: "doctors" }[document.body.dataset.page] || document.body.dataset.page;
  const nav = [["index", "Главная"], ["services", "Услуги"], ["doctors", "Врачи"], ["about", "О клинике"], ["contacts", "Контакты"]];
  const logo = `<a class="logo" href="index.html" aria-label="Тагай — на главную"><span class="logo-mark">${IC.logo}</span><span><b>ТАГАЙ</b><small>стоматология</small></span></a>`;
  const dd = `<div class="dd"><div class="dd-grid">${SERVICES.map(s => `<a href="service.html?id=${s.id}"><img src="${s.img}" alt="" loading="lazy"><span><b>${s.title}</b><small>${s.tag}</small></span></a>`).join("")}</div><a class="dd-all" href="services.html">Все услуги →</a></div>`;
  const hdr = $("#hdr");
  hdr.innerHTML = `<div class="wrap">${logo}<nav class="nav">${nav.map(([p, t]) => { const a = `<a href="${p}.html" class="${p === page ? "on" : ""}">${t}</a>`; return p === "services" ? `<span class="dd-wrap">${a}${dd}</span>` : a; }).join("")}</nav>
    <div class="hdr-cta"><a class="hdr-tel" href="tel:${SITE.phone}">${SITE.phoneText}</a><button class="btn btn-green btn-sm" data-book>Записаться</button></div>
    <button class="burger" aria-label="Меню"><span></span></button></div>`;
  $(".burger", hdr).onclick = () => hdr.classList.toggle("open");
  const onScroll = () => hdr.classList.toggle("solid", scrollY > 40 || hdr.classList.contains("open"));
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  $(".burger", hdr).addEventListener("click", onScroll);

  $("#ftr").innerHTML = `<div class="wrap"><div class="ftr-grid">
    <div>${logo}<p style="margin-top:20px;max-width:34ch">Стоматологическая клиника в Октябрьском районе Новосибирска. Лечим бережно, без боли и переплат.</p></div>
    <div><h4>Разделы</h4>${nav.map(([p, t]) => `<a href="${p}.html">${t}</a>`).join("")}</div>
    <div><h4>Услуги</h4>${SERVICES.map(s => `<a href="service.html?id=${s.id}">${s.title}</a>`).join("")}</div>
    <div><h4>Контакты</h4><a href="tel:${SITE.phone}">${SITE.phoneText}</a>${SITE.phones.map(([p, t]) => `<a href="tel:${p}">${t}</a>`).join("")}
      <a href="mailto:${SITE.email}">${SITE.email}</a><a href="${SITE.maps}" target="_blank" rel="noopener">${SITE.address}</a>
      ${SITE.hours.map(h => `<span style="display:block;padding:4px 0">${h.days}: ${h.from}–${h.to}</span>`).join("")}</div>
    </div><div class="copy"><span>© ${new Date().getFullYear()} Стоматология «Тагай», Новосибирск</span><span>Имеются противопоказания. Необходима консультация специалиста.</span></div></div>`;

  document.body.insertAdjacentHTML("beforeend", `<div class="fab"><a class="t" href="tel:${SITE.phone}" aria-label="Позвонить">${IC.tel}</a>
    <a class="w" href="${waLink()}" target="_blank" rel="noopener" aria-label="Написать в WhatsApp">${IC.wa}</a></div>
    <div class="mbar"><a class="btn btn-dark ic" href="tel:${SITE.phone}" aria-label="Позвонить">${IC.tel}</a><button class="btn btn-green" data-book>${IC.cal}Записаться на приём</button></div>`);

  $$("[data-tel]").forEach(a => { a.href = "tel:" + SITE.phone; if (a.dataset.tel === "text") a.textContent = SITE.phoneText; });
  $$("[data-wa]").forEach(a => { a.href = waLink(a.dataset.wa || undefined); a.target = "_blank"; a.rel = "noopener"; });
  $$("[data-max]").forEach(a => a.onclick = e => { e.preventDefault(); sendMax("Здравствуйте! Хочу записаться на приём в стоматологию «Тагай»."); });
  $$("[data-ic]").forEach(e => e.insertAdjacentHTML("afterbegin", IC[e.dataset.ic]));
}

function lightbox() {
  document.body.insertAdjacentHTML("beforeend", `<div class="lb"><button class="x" aria-label="Закрыть">✕</button><button class="p" aria-label="Назад">‹</button><img alt=""><button class="n" aria-label="Вперёд">›</button><span class="cnt"></span></div>`);
  const lb = $(".lb"), img = $("img", lb); let list = [], i = 0;
  const show = k => { i = (k + list.length) % list.length; img.src = list[i]; $(".cnt", lb).textContent = `${i + 1} / ${list.length}`; };
  window.openLb = (arr, k = 0) => { list = arr; show(k); lb.classList.add("show"); };
  const close = () => lb.classList.remove("show");
  $(".x", lb).onclick = close; $(".p", lb).onclick = () => show(i - 1); $(".n", lb).onclick = () => show(i + 1);
  lb.onclick = e => { if (e.target === lb) close(); };
  document.addEventListener("keydown", e => { if (!lb.classList.contains("show")) return; if (e.key === "Escape") close(); if (e.key === "ArrowLeft") show(i - 1); if (e.key === "ArrowRight") show(i + 1); });
}
function mosaic(el, list, pattern) {
  el.innerHTML = list.map((s, i) => `<figure class="${pattern[i % pattern.length]} reveal" data-i="${i}"><img src="${s}" alt="Стоматология Тагай" loading="lazy"></figure>`).join("");
  $$("figure", el).forEach(f => f.onclick = () => openLb(list, +f.dataset.i));
}
function reveal() {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .08 });
  $$(".reveal:not(.in)").forEach(el => io.observe(el));
}
/* время в Новосибирске (UTC+7) */
function nskNow() {
  const t = new Date(Date.now() + 7 * 3600e3);
  return { day: t.getUTCDay() || 7, min: t.getUTCHours() * 60 + t.getUTCMinutes() };
}
const toMin = s => { const [h, m] = s.split(":"); return h * 60 + +m; };
function openStatus() {
  const n = nskNow(), today = SITE.hours.find(h => h.d.includes(n.day));
  if (today && n.min >= toMin(today.from) && n.min < toMin(today.to))
    return `<span class="big"><span class="dot on"></span>Открыто до ${today.to}</span>`;
  let next, label;
  if (today && n.min < toMin(today.from)) { next = today; label = "сегодня"; }
  else { const d = n.day % 7 + 1; next = SITE.hours.find(h => h.d.includes(d)); label = "завтра"; }
  return `<span class="big"><span class="dot"></span>Закрыто</span><span style="opacity:.6">Откроется ${label} в ${next.from}</span>`;
}
function hoursText() {
  return SITE.hours.map(h => `${h.days}: ${h.from}–${h.to}`).join(" · ");
}
function contactsBlock(el) {
  if (!el) return;
  el.innerHTML = `<div class="c-card">
      <div class="c-item"><i>${IC.pin}</i><div><small>Адрес</small><a class="big" href="${SITE.maps}" target="_blank" rel="noopener">${SITE.address}</a>${SITE.district}</div></div>
      <div class="c-item"><i>${IC.clock}</i><div style="flex:1"><small>Режим работы</small>${openStatus()}
        <table class="hours">${SITE.hours.map(h => `<tr class="${h.d.includes(nskNow().day) ? "today" : ""}"><td>${h.days}</td><td>${h.from}–${h.to}</td></tr>`).join("")}</table></div></div>
      <div class="c-item"><i>${IC.tel}</i><div><small>Телефоны</small><a class="big" href="tel:${SITE.phone}">${SITE.phoneText}</a>${SITE.phones.map(([p, t]) => `<a href="tel:${p}">${t}</a>`).join("<br>")}</div></div>
      <div class="c-item"><i>${IC.mail}</i><div><small>Почта</small><a href="mailto:${SITE.email}">${SITE.email}</a></div></div>
      <div class="msgs"><a href="${waLink()}" target="_blank" rel="noopener" style="--c:#25d366">WhatsApp</a><a href="${SITE.tg}" target="_blank" rel="noopener" style="--c:#2aabee">Telegram</a><a href="#" data-max style="--c:#7a5cff">Max</a></div>
    </div>
    <div class="map"><iframe src="${SITE.mapEmbed}" title="Карта: ${SITE.address}" loading="lazy" allowfullscreen></iframe></div>`;
}

/* ---------- страницы */
const PAGES = {
  index() {
    picker($("#pick"));
    $("#strip").innerHTML = TEAM.map(docCard).join("");
    const st = $("#strip");
    $("#sPrev").onclick = () => st.scrollBy({ left: -300, behavior: "smooth" });
    $("#sNext").onclick = () => st.scrollBy({ left: 300, behavior: "smooth" });
    mosaic($("#mosaic"), GALLERY.slice(0, 7), ["w2 h2", "", "", "h2", "", "w2", ""]);
    bookForm($("#form"));
    contactsBlock($("#contacts"));
  },
  services() {
    picker($("#pick"), new URLSearchParams(location.search).get("id"));
    $("#list").innerHTML = SERVICES.map(svcCard).join("");
  },
  service() {
    const s = svcById(new URLSearchParams(location.search).get("id")) || SERVICES[0];
    document.title = `${s.title} — стоматология «Тагай», Новосибирск`;
    const head = $("#head");
    head.style.backgroundImage = `url(${s.img})`;
    head.innerHTML = `<div class="wrap"><div class="crumbs"><a href="index.html">Главная</a> / <a href="services.html">Услуги</a> / ${s.title}</div>
      <span class="eyebrow l">${s.tag}</span><h1>${s.title}</h1><p class="lead">${s.short}</p></div>`;
    const docs = s.docs.map(docById).filter(Boolean);
    $("#svc").innerHTML = `<div class="prose">
        <div class="big-img"><img src="${s.img}" alt="${esc(s.title)}"></div>
        <p>${s.text}</p>
        <h3>Что входит</h3><ul class="ticks">${s.includes.map(x => `<li>${x}</li>`).join("")}</ul>
        <h3>Как проходит запись</h3>
        <ol class="steps"><li>Оставляете заявку на сайте, в WhatsApp или Max</li><li>Администратор подтверждает удобное время</li><li>Врач проводит осмотр и называет стоимость до начала лечения</li></ol>
        <h3>Кто принимает</h3><div class="team-grid" style="grid-template-columns:repeat(3,1fr);margin-top:20px">${docs.map(docCard).join("")}</div>
      </div>
      <aside class="panel"><span class="eyebrow l">Услуга ${s.n}</span><h3>${s.title}</h3>
        <div class="price">${priceText(s)}</div><p class="note">${s.price ? "Точная стоимость зависит от клинической ситуации." : "Врач назовёт точную стоимость после осмотра — до начала лечения."}<br>Длительность: ${s.time}</p>
        <button class="btn btn-green" data-book data-service="${s.id}">${IC.cal}Записаться онлайн</button>
        <div class="row2"><a class="btn btn-wa" href="${waLink(`Здравствуйте! Хочу записаться на услугу «${s.title}» в стоматологию «Тагай».`)}" target="_blank" rel="noopener">${IC.wa}WhatsApp</a>
        <a class="btn btn-max" href="#" data-maxsvc>${IC.max}Max</a></div>
        <a class="btn btn-ghost l" href="tel:${SITE.phone}">${IC.tel}${SITE.phoneText}</a>
      </aside>`;
    $("[data-maxsvc]").onclick = e => { e.preventDefault(); sendMax(`Здравствуйте! Хочу записаться на услугу «${s.title}» в стоматологию «Тагай».`); };
    $("#others").innerHTML = SERVICES.filter(x => x !== s).slice(0, 3).map(svcCard).join("");
  },
  doctors() {
    const draw = k => {
      $("#list").innerHTML = TEAM.filter(d => k === "all" || d.spec.includes(k)).map(docCard).join("") + (k === "all" ? soonCards() : "");
      reveal();
    };
    $(".filters").innerHTML = `<button class="on" data-f="all">Все</button>` + Object.entries(SPECS).map(([k, t]) => `<button data-f="${k}">${t}</button>`).join("");
    $$(".filters button").forEach(b => b.onclick = () => { $$(".filters button").forEach(x => x.classList.toggle("on", x === b)); draw(b.dataset.f); });
    draw("all");
  },
  doctor() {
    const d = docById(new URLSearchParams(location.search).get("id")) || TEAM[0];
    document.title = `${d.name} — стоматология «Тагай»`;
    $("#crumb").textContent = d.short;
    const svcs = SERVICES.filter(s => s.docs.includes(d.id));
    $("#doctor").innerHTML = `<div class="doctor-photos"><div class="doctor-main"><img id="mainimg" src="${d.imgs[0]}" alt="${esc(d.name)}"></div>
        ${d.imgs.length > 1 ? `<div class="thumbs">${d.imgs.map((s, i) => `<img src="${s}" data-i="${i}" class="${i ? "" : "on"}" alt="Фото ${i + 1}">`).join("")}</div>` : ""}</div>
      <div><span class="eyebrow">${d.role}</span><h1 style="font-size:clamp(30px,4vw,52px)">${d.name}</h1>
        ${d.alt ? `<p class="lead" style="margin-top:12px">${d.alt}</p>` : ""}
        <div class="specs"><div><span>Стаж</span><b>${d.exp}</b></div><div><span>Специализация</span><b>${d.role}</b></div>
          ${d.edu.length ? `<div style="grid-column:1/-1"><span>Образование</span><b>${d.edu.join(" · ")}</b></div>` : ""}</div>
        ${d.admin ? `<p class="prose" style="font-size:18px;color:#3a332c;margin-bottom:30px">Дарья встретит вас в клинике, ответит на вопросы, подберёт удобное время и врача.</p>`
          : `<h3>Услуги врача</h3><div class="mini-svcs">${svcs.map(s => `<a href="service.html?id=${s.id}"><img src="${s.img}" alt=""><span>${s.title}</span><span>→</span></a>`).join("")}</div>`}
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-green" data-book ${d.admin ? "" : `data-doctor="${d.id}"`}>${IC.cal}${d.admin ? "Записаться на приём" : "Записаться к врачу"}</button>
          <a class="btn btn-ghost" href="tel:${SITE.phone}">${IC.tel}Позвонить</a></div>
      </div>`;
    $$(".thumbs img").forEach(t => t.onclick = () => { $("#mainimg").src = t.src; $$(".thumbs img").forEach(x => x.classList.toggle("on", x === t)); });
    $(".doctor-main").onclick = () => openLb(d.imgs, d.imgs.indexOf($("#mainimg").getAttribute("src")));
    $("#others").innerHTML = TEAM.filter(x => x !== d && !x.admin).slice(0, 4).map(docCard).join("");
  },
  about() { mosaic($("#mosaic"), GALLERY, ["w2 h2", "", "", "h2", "", "", "w2", "", "", "h2", "w2", "", "w2 h2", "h2", "", "w2", "w2", "w2"]); },
  contacts() { contactsBlock($("#contacts")); bookForm($("#form"), { service: new URLSearchParams(location.search).get("service") || "" }); },
};

document.addEventListener("DOMContentLoaded", () => {
  chrome(); modal(); lightbox();
  PAGES[document.body.dataset.page]?.();
  reveal();
});
