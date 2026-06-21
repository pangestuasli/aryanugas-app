import React from 'react';
import {
  Stethoscope,
  Syringe,
  Scissors,
  Hospital,
  Clock,
  MapPin,
  Phone,
  Star,
  Check,
  Crown,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
// Jika Anda menggunakan react-router-dom untuk navigasi
// import { Link } from 'react-router-dom';

const services = [
  {
    id: 1,
    Icon: Stethoscope,
    title: 'Konsultasi Medis',
    desc: 'Pemeriksaan menyeluruh dari dokter hewan berpengalaman untuk memastikan anabul Anda selalu dalam kondisi terbaik.',
  },
  {
    id: 2,
    Icon: Syringe,
    title: 'Vaksinasi & Imunisasi',
    desc: 'Program vaksinasi lengkap dan terjadwal untuk melindungi anabul dari penyakit menular berbahaya.',
  },
  {
    id: 3,
    Icon: Scissors,
    title: 'Grooming & Spa',
    desc: 'Perawatan bulu, kuku, dan kulit oleh groomer profesional, membuat anabul tampil bersih dan nyaman.',
  },
  {
    id: 4,
    Icon: Hospital,
    title: 'Rawat Inap',
    desc: 'Ruang rawat nyaman dengan pengawasan dokter jaga 24 jam untuk anabul yang membutuhkan perhatian khusus.',
  },
];

const standardPerks = [
  'Booking jadwal kunjungan online',
  'Riwayat kunjungan dasar',
  'Notifikasi info & promo klinik',
  'Akses ke seluruh layanan reguler',
];

const priorityPerks = [
  'Booking tanpa antre — slot prioritas tiap kunjungan',
  'Konsultasi chat dengan dokter, 24/7',
  'Diskon 15% untuk vaksinasi & grooming',
  'Rekam medis lengkap & pengingat otomatis',
  'Home visit gratis, 2x setahun',
  'Kartu anggota digital + fisik bertanda gold',
];

const GuestDashboard = () => {
  const year = new Date().getFullYear();

  return (
    <div className="vc-root">
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        .vc-root {
          --cream: #F8F4EC;
          --cream-dark: #EFE6D2;
          --ink: #1F3A2E;
          --ink-soft: #436354;
          --green: #2F6B4C;
          --green-dark: #1F3A2E;
          --terracotta: #C1693C;
          --gold: #9C732C;
          --gold-light: #EFE0BC;
          --text: #2E2A21;
          --text-soft: #6B6357;
          --line: rgba(31,58,46,0.14);

          font-family: 'vc-body', Arial, sans-serif;
          color: var(--text);
          background: var(--cream);
          -webkit-font-smoothing: antialiased;
        }

        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .vc-root, .vc-root * { box-sizing: border-box; }
        .vc-root { font-family: 'Plus Jakarta Sans', Arial, sans-serif; }
        .vc-display { font-family: 'Fraunces', Georgia, serif; }

        .vc-wrap { max-width: 1160px; margin: 0 auto; padding: 0 24px; }
        .vc-eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 12px;
          font-weight: 700;
          color: var(--green);
        }
        a { color: inherit; }
        button { font-family: inherit; cursor: pointer; border: none; background: none; }

        /* ---------- NAV ---------- */
        .vc-nav {
          position: sticky; top: 0; z-index: 50;
          background: rgba(248,244,236,0.92);
          backdrop-filter: blur(6px);
          border-bottom: 1px solid var(--line);
        }
        .vc-nav-inner {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 24px;
        }
        .vc-logo { display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 19px; color: var(--ink); }
        .vc-logo-mark {
          width: 34px; height: 34px; border-radius: 50%;
          background: var(--ink); color: var(--cream);
          display: flex; align-items: center; justify-content: center; font-size: 16px;
          flex-shrink: 0;
        }
        .vc-nav-links { display: flex; align-items: center; gap: 22px; }
        .vc-nav-link { font-size: 14.5px; font-weight: 600; color: var(--ink-soft); text-decoration: none; }
        .vc-nav-link:hover { color: var(--ink); }
        .vc-pill {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 700; color: var(--gold);
          border: 1px solid var(--gold-light); background: #FBF6E9;
          padding: 6px 12px; border-radius: 999px;
        }
        .vc-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 20px; border-radius: 8px;
          font-weight: 700; font-size: 14.5px; text-decoration: none;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .vc-btn:focus-visible { outline: 2px solid var(--green); outline-offset: 2px; }
        .vc-btn-primary { background: var(--green); color: #fff; }
        .vc-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(47,107,76,0.28); }
        .vc-btn-ghost { border: 1.5px solid var(--ink); color: var(--ink); }
        .vc-btn-ghost:hover { background: var(--ink); color: var(--cream); }

        /* ---------- HERO ---------- */
        .vc-hero { padding: 64px 0 56px; position: relative; overflow: hidden; }
        .vc-hero-grid {
          display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 56px; align-items: center;
        }
        .vc-hero h1 {
          font-size: clamp(34px, 4.4vw, 50px); line-height: 1.08; font-weight: 700;
          color: var(--ink); margin: 18px 0 20px;
        }
        .vc-hero h1 em { font-style: italic; color: var(--terracotta); font-weight: 500; }
        .vc-hero p.lead { font-size: 17px; line-height: 1.65; color: var(--text-soft); max-width: 480px; margin-bottom: 30px; }
        .vc-hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 22px; }
        .vc-trustline { font-size: 13.5px; color: var(--text-soft); display: flex; align-items: center; gap: 6px; }
        .vc-trustline strong { color: var(--ink); }

        /* health-record card (signature element) */
        .vc-card-stage { position: relative; display: flex; justify-content: center; }
        .vc-record {
          position: relative;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 14px;
          width: 100%; max-width: 380px;
          padding: 26px 26px 22px;
          box-shadow: 0 24px 48px -16px rgba(31,58,46,0.28);
          transform: rotate(-2deg);
        }
        .vc-record::before {
          content: ''; position: absolute; top: 0; left: 28px; right: 28px; height: 0;
          border-top: 2px dashed var(--line);
        }
        .vc-record::after {
          content: ''; position: absolute; top: -9px; left: 50%; transform: translateX(-50%);
          width: 56px; height: 18px; background: var(--cream-dark); border-radius: 0 0 10px 10px;
        }
        .vc-record-top { display: flex; justify-content: space-between; align-items: flex-start; padding-top: 14px; margin-bottom: 14px; }
        .vc-record-label { text-transform: uppercase; font-size: 10.5px; letter-spacing: 0.12em; color: var(--text-soft); font-weight: 700; }
        .vc-record-title { font-family: 'Fraunces', serif; font-size: 19px; font-weight: 600; color: var(--ink); margin-top: 2px; }
        .vc-stamp {
          width: 60px; height: 60px; border-radius: 50%;
          border: 2.5px solid var(--terracotta); color: var(--terracotta);
          display: flex; align-items: center; justify-content: center; text-align: center;
          font-size: 8.5px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;
          transform: rotate(11deg); flex-shrink: 0; line-height: 1.15; padding: 4px;
        }
        .vc-record-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 0; border-top: 1px solid var(--line); font-size: 14px;
        }
        .vc-record-row:first-of-type { border-top: 1px solid var(--line); }
        .vc-record-row span:first-child { color: var(--text); font-weight: 600; }
        .vc-check-ok { display: flex; align-items: center; gap: 4px; color: var(--green); font-weight: 700; font-size: 12.5px; }
        .vc-record-footer { margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--line); font-size: 12px; color: var(--text-soft); display: flex; justify-content: space-between; }
        .vc-tape {
          position: absolute; top: -14px; right: 26px; width: 70px; height: 26px;
          background: var(--gold-light); opacity: 0.9; transform: rotate(4deg);
          box-shadow: 0 2px 4px rgba(0,0,0,0.08);
        }

        /* ---------- TRUST STRIP ---------- */
        .vc-trust { background: var(--ink); color: var(--cream); padding: 28px 0; }
        .vc-trust-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; text-align: center; }
        .vc-trust-num { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 600; }
        .vc-trust-label { font-size: 12.5px; color: rgba(248,244,236,0.72); margin-top: 4px; }

        /* ---------- SECTION HEADERS ---------- */
        .vc-section { 
          padding: 72px 0; 
          scroll-margin-top: 80px;
        }
        .vc-section-head { text-align: center; max-width: 560px; margin: 0 auto 44px; }
        .vc-section-head h2 { font-family: 'Fraunces', serif; font-size: clamp(28px, 3vw, 36px); color: var(--ink); margin: 10px 0 10px; font-weight: 600; }
        .vc-section-head p { color: var(--text-soft); font-size: 15.5px; }

        /* ---------- SERVICES ---------- */
        .vc-services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .vc-svc-card {
          position: relative; background: #fff; border: 1px solid var(--line);
          border-radius: 4px 12px 12px 12px; padding: 28px 20px; text-align: left;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .vc-svc-card::before {
          content: ''; position: absolute; left: 0; top: 14px; bottom: 14px; width: 4px;
          background: var(--green); border-radius: 0 3px 3px 0; opacity: 0.55;
        }
        .vc-svc-card:hover { transform: translateY(-4px); box-shadow: 0 16px 30px -14px rgba(31,58,46,0.22); }
        .vc-svc-icon {
          width: 46px; height: 46px; border-radius: 10px; background: var(--cream-dark);
          color: var(--green); display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
        }
        .vc-svc-card h3 { font-size: 17px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .vc-svc-card p { font-size: 13.5px; line-height: 1.6; color: var(--text-soft); }

        /* ---------- PREMIUM ---------- */
        .vc-premium { background: var(--cream-dark); }
        .vc-plans-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; max-width: 880px; margin: 0 auto; align-items: stretch; }
        .vc-plan {
          background: #fff; border-radius: 16px; padding: 32px 28px; border: 1px solid var(--line);
          display: flex; flex-direction: column;
        }
        .vc-plan-priority {
          background: var(--ink); color: var(--cream); border: 1px solid var(--ink);
          position: relative; overflow: hidden;
        }
        .vc-plan-priority::after {
          content: ''; position: absolute; top: -40%; right: -20%; width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(156,115,44,0.35), transparent 70%);
        }
        .vc-plan-badge {
          display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 800;
          letter-spacing: 0.06em; text-transform: uppercase; color: var(--gold);
          background: var(--gold-light); padding: 5px 12px; border-radius: 999px; width: fit-content; margin-bottom: 16px;
        }
        .vc-plan-priority .vc-plan-badge { background: rgba(239,224,188,0.16); color: var(--gold-light); }
        .vc-plan h3 { font-family: 'Fraunces', serif; font-size: 23px; font-weight: 600; margin-bottom: 4px; }
        .vc-plan-price { font-size: 32px; font-weight: 800; margin: 14px 0 4px; }
        .vc-plan-price span { font-size: 14px; font-weight: 600; opacity: 0.65; }
        .vc-plan-sub { font-size: 13px; opacity: 0.7; margin-bottom: 22px; }
        .vc-plan-perks { list-style: none; padding: 0; margin: 0 0 26px; flex-grow: 1; }
        .vc-plan-perks li { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; padding: 8px 0; border-top: 1px solid rgba(31,58,46,0.1); line-height: 1.45; }
        .vc-plan-priority .vc-plan-perks li { border-top: 1px solid rgba(248,244,236,0.14); }
        .vc-plan-perks li:first-child { border-top: none; }
        .vc-plan-perks svg { flex-shrink: 0; margin-top: 2px; color: var(--green); }
        .vc-plan-priority .vc-plan-perks svg { color: var(--gold-light); }
        .vc-plan-cta {
          width: 100%; justify-content: center; padding: 12px 0; border-radius: 8px; font-weight: 700; font-size: 14.5px;
          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
          border: 1.5px solid var(--ink); color: var(--ink);
        }
        .vc-plan-priority .vc-plan-cta { background: var(--gold); color: var(--ink); border: none; }
        .vc-plan-cta:hover { transform: translateY(-1px); }

        /* ---------- HOURS / LOCATION ---------- */
        .vc-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .vc-info-card h3 { display: flex; align-items: center; gap: 10px; font-family: 'Fraunces', serif; font-size: 20px; font-weight: 600; color: var(--ink); margin-bottom: 18px; }
        .vc-hours-row { display: flex; justify-content: space-between; padding: 11px 0; border-top: 1px solid var(--line); font-size: 14.5px; }
        .vc-hours-row:first-of-type { border-top: 1px solid var(--line); }
        .vc-hours-row span:first-child { color: var(--text-soft); }
        .vc-hours-row span:last-child { font-weight: 700; color: var(--ink); }
        .vc-map-block {
          background: var(--cream-dark); border-radius: 12px; height: 140px; display: flex; align-items: center; justify-content: center;
          color: var(--ink-soft); margin-bottom: 16px; border: 1px solid var(--line);
        }
        .vc-info-card p { font-size: 14.5px; line-height: 1.7; color: var(--text-soft); }
        .vc-info-card .vc-phone { display: flex; align-items: center; gap: 8px; margin-top: 10px; font-weight: 700; color: var(--ink); }

        /* ---------- FOOTER ---------- */
        .vc-footer { background: var(--ink); color: rgba(248,244,236,0.85); padding: 52px 0 24px; }
        .vc-footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 32px; padding-bottom: 32px; border-bottom: 1px solid rgba(248,244,236,0.14); }
        .vc-footer-brand { display: flex; align-items: center; gap: 8px; font-weight: 800; color: var(--cream); font-size: 18px; margin-bottom: 10px; }
        .vc-footer-grid p { font-size: 13.5px; line-height: 1.6; color: rgba(248,244,236,0.6); max-width: 280px; }
        .vc-footer h4 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(248,244,236,0.55); margin-bottom: 14px; }
        .vc-footer ul { list-style: none; padding: 0; margin: 0; }
        .vc-footer li { margin-bottom: 9px; font-size: 14px; }
        .vc-footer a { text-decoration: none; color: rgba(248,244,236,0.85); }
        .vc-footer a:hover { color: var(--gold-light); }
        .vc-footer-bottom { text-align: center; font-size: 12.5px; color: rgba(248,244,236,0.5); padding-top: 20px; }

        @media (max-width: 860px) {
          .vc-hero-grid, .vc-info-grid, .vc-plans-grid, .vc-footer-grid { grid-template-columns: 1fr; }
          .vc-services-grid { grid-template-columns: repeat(2, 1fr); }
          .vc-trust-grid { grid-template-columns: 1fr; gap: 16px; }
          .vc-nav-links { display: none; }
          .vc-record { transform: rotate(0deg); max-width: 100%; }
        }
        @media (max-width: 520px) {
          .vc-services-grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vc-btn, .vc-svc-card, .vc-plan-cta { transition: none; }
        }
      `}</style>

      {/* NAV */}
      <nav className="vc-nav">
        <div className="vc-nav-inner vc-wrap" style={{ padding: '16px 0' }}>
          <div className="vc-logo">
            <span className="vc-logo-mark">🐾</span>
            VetCare Clinic
          </div>
          <div className="vc-nav-links">
            <a className="vc-nav-link" href="#services">Layanan</a>
            <a className="vc-nav-link" href="#premium">Prioritas</a>
            <a className="vc-nav-link" href="#info">Jam &amp; Lokasi</a>
            <a className="vc-pill" href="#premium"><Crown size={13} /> Premium</a>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <a className="vc-btn vc-btn-ghost" href="/login">Masuk</a>
            <a className="vc-btn vc-btn-primary" href="/register">Daftar</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="vc-hero">
        <div className="vc-wrap vc-hero-grid">
          <div>
            <span className="vc-eyebrow">Klinik Hewan Terpercaya · Buka 7 Hari</span>
            <h1 className="vc-display">
              Setiap kunjungan, <em>tercatat</em>. Setiap anabul, terjaga.
            </h1>
            <p className="lead">
              Layanan medis profesional dengan dokter hewan bersertifikat, fasilitas
              lengkap, dan rekam kesehatan yang tersimpan rapi untuk setiap kunjungan
              anabul kesayangan Anda.
            </p>
            <div className="vc-hero-ctas">
              <a className="vc-btn vc-btn-primary" href="/register">
                Daftar Sekarang <ArrowRight size={16} />
              </a>
              <a className="vc-btn vc-btn-ghost" href="#services">Lihat Layanan</a>
            </div>
            <div className="vc-trustline">
              <Star size={14} fill="#C1693C" color="#C1693C" />
              <span><strong>4.9/5</strong> dari 1.200+ pemilik hewan yang sudah berkunjung</span>
            </div>
          </div>

          <div className="vc-card-stage">
            <div className="vc-record">
              <div className="vc-tape" />
              <div className="vc-record-top">
                <div>
                  <div className="vc-record-label">Buku Kesehatan Hewan</div>
                  <div className="vc-record-title">Bella · Kucing Anggora</div>
                </div>
                <div className="vc-stamp">Terverifikasi Dokter</div>
              </div>
              <div className="vc-record-row">
                <span>Vaksinasi Rabies</span>
                <span className="vc-check-ok"><Check size={14} /> Selesai</span>
              </div>
              <div className="vc-record-row">
                <span>Vaksinasi Tricat</span>
                <span className="vc-check-ok"><Check size={14} /> Selesai</span>
              </div>
              <div className="vc-record-row">
                <span>Kontrol Berat Badan</span>
                <span className="vc-check-ok"><Check size={14} /> Selesai</span>
              </div>
              <div className="vc-record-footer">
                <span>Kunjungan terakhir: 12 Jun 2026</span>
                <span>No. RM-0182</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* TRUST STRIP */}
      <section className="vc-trust">
        <div className="vc-wrap vc-trust-grid">
          <div>
            <div className="vc-trust-num vc-display">12+</div>
            <div className="vc-trust-label">Dokter Hewan Bersertifikat</div>
          </div>
          <div>
            <div className="vc-trust-num vc-display">1.200+</div>
            <div className="vc-trust-label">Anabul Ditangani / Tahun</div>
          </div>
          <div>
            <div className="vc-trust-num vc-display">24 Jam</div>
            <div className="vc-trust-label">Layanan Darurat (IGD)</div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="vc-section">
        <div className="vc-wrap">
          <div className="vc-section-head">
            <span className="vc-eyebrow">Layanan Kami</span>
            <h2 className="vc-display">Penanganan lengkap untuk setiap kebutuhan anabul</h2>
            <p>Dari pemeriksaan rutin hingga perawatan intensif, semua ditangani tim profesional.</p>
          </div>
          <div className="vc-services-grid">
            {services.map(({ id, Icon, title, desc }) => (
              <div key={id} className="vc-svc-card">
                <div className="vc-svc-icon"><Icon size={22} /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM */}
      <section id="premium" className="vc-section vc-premium">
        <div className="vc-wrap">
          <div className="vc-section-head">
            <span className="vc-eyebrow">VetCare Prioritas</span>
            <h2 className="vc-display">Naik kelas, anabul lebih diutamakan</h2>
            <p>Pilih akun standar untuk kebutuhan dasar, atau Prioritas untuk layanan tanpa antre dan lebih banyak keuntungan.</p>
          </div>

          <div className="vc-plans-grid">
            <div className="vc-plan">
              <span className="vc-plan-badge"><ShieldCheck size={13} /> Standar</span>
              <h3 className="vc-display">Akun Standar</h3>
              <div className="vc-plan-price">Gratis</div>
              <div className="vc-plan-sub">Cocok untuk kunjungan sesekali</div>
              <ul className="vc-plan-perks">
                {standardPerks.map((p) => (
                  <li key={p}><Check size={16} />{p}</li>
                ))}
              </ul>
              <a className="vc-plan-cta" href="/register">Daftar Gratis</a>
            </div>

            <div className="vc-plan vc-plan-priority">
              <span className="vc-plan-badge"><Crown size={13} /> Prioritas</span>
              <h3 className="vc-display">VetCare Prioritas</h3>
              <div className="vc-plan-price">Rp99.000<span> /bulan</span></div>
              <div className="vc-plan-sub">Atau Rp990.000/tahun — hemat 2 bulan</div>
              <ul className="vc-plan-perks">
                {priorityPerks.map((p) => (
                  <li key={p}><Check size={16} />{p}</li>
                ))}
              </ul>
              <a className="vc-plan-cta" href="/register?plan=prioritas">
                Mulai Prioritas <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HOURS & LOCATION */}
      <section id="info" className="vc-section">
        <div className="vc-wrap vc-info-grid">
          <div className="vc-info-card">
            <h3><Clock size={20} color="#2F6B4C" /> Jam Operasional</h3>
            <div className="vc-hours-row"><span>Senin – Jumat</span><span>08.00 – 20.00 WIB</span></div>
            <div className="vc-hours-row"><span>Sabtu</span><span>09.00 – 17.00 WIB</span></div>
            <div className="vc-hours-row"><span>Minggu / Libur</span><span>Hanya Darurat (IGD)</span></div>
          </div>
          <div className="vc-info-card">
            <h3><MapPin size={20} color="#2F6B4C" /> Lokasi Kami</h3>
            <div className="vc-map-block">
              <MapPin size={22} /> &nbsp; Peta lokasi klinik
            </div>
            <p>
              Jl. Segar Asli Pekanbaru,<br />
              Kota Pekanbaru, Riau 28123<br />
              Indonesia
            </p>
            <div className="vc-phone"><Phone size={15} /> 083187781275 — Kontak Darurat</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="vc-footer">
        <div className="vc-wrap">
          <div className="vc-footer-grid">
            <div>
              <div className="vc-footer-brand">🐾 VetCare Clinic</div>
              <p>Layanan medis profesional, ramah, dan terpercaya untuk anabul kesayangan Anda, sejak konsultasi pertama hingga perawatan jangka panjang.</p>
            </div>
            <div>
              <h4>Layanan</h4>
              <ul>
                <li><a href="#services">Konsultasi Medis</a></li>
                <li><a href="#services">Vaksinasi</a></li>
                <li><a href="#services">Grooming &amp; Spa</a></li>
                <li><a href="#premium">VetCare Prioritas</a></li>
              </ul>
            </div>
            <div>
              <h4>Kontak</h4>
              <ul>
                <li>Jl. Segar Asli Pekanbaru</li>
                <li>083187781275</li>
                <li>arya@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="vc-footer-bottom">
            &copy; {year} VetCare Clinic. Dibuat dengan 🐾 untuk Anabul Indonesia.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GuestDashboard;