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
  Calendar,
  FileText,
  Award,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '../components/ui/accordion';

// =============================================================
// MOCK DATA (Static - No Supabase fetch)
// =============================================================

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

const memberFeatures = [
  {
    icon: Calendar,
    title: 'Booking Online Fleksibel',
    desc: 'Buat janji temu kapan saja, 24/7. Pilih dokter & waktu sesuai keinginanmu tanpa perlu antre.',
  },
  {
    icon: FileText,
    title: 'Rekam Medis Digital Lengkap',
    desc: 'Semua riwayat kesehatan anabul tersimpan rapi dan bisa diakses kapan saja dari mana saja.',
  },
  {
    icon: Award,
    title: 'Program Loyalitas & Poin',
    desc: 'Kumpulkan poin dari setiap kunjungan. Naik tier dan nikmati diskon hingga 20% untuk semua layanan.',
  },
];

const campaigns = [
  {
    title: 'Vaksinasi Diskon 10%',
    desc: 'Khusus member baru di bulan ini. Lindungi anabul dengan vaksinasi lengkap harga terjangkau.',
    badge: 'Member Baru',
  },
  {
    title: 'Grooming Paket Hemat',
    desc: 'Mandikan dan percantik anabul dengan paket grooming mulai dari Rp75.000 saja.',
    badge: 'Promo',
  },
  {
    title: 'Konsultasi Pertama GRATIS',
    desc: 'Member baru bisa konsultasi pertama tanpa biaya. Kenalan dulu dengan dokter kami.',
    badge: 'Gratis',
  },
];

const doctors = [
  { name: 'drh. Sarah Wijaya', spec: 'Bedah & Ortopedi', initials: 'SW' },
  { name: 'drh. Andi Pratama', spec: 'Penyakit Dalam & Vaksinasi', initials: 'AP' },
  { name: 'drh. Maya Putri', spec: 'Dermatologi & Grooming', initials: 'MP' },
];

const testimonials = [
  {
    name: 'Budi & Kucingnya',
    initials: 'BK',
    rating: 5,
    comment: 'Dokternya ramah, sistem bookingnya sangat mudah! Anabul saya selalu ditangani dengan profesional.',
  },
  {
    name: 'Rina & Anjing Poodle',
    initials: 'RA',
    rating: 5,
    comment: 'Rekam medis digital sangat membantu. Saya bisa lihat riwayat kesehatan anabul kapan saja. Recommended!',
  },
  {
    name: 'Doni & Kelinci Holland',
    initials: 'DH',
    rating: 5,
    comment: 'Poin loyalitasnya benar-benar worth it. Sudah dapat diskon 15% untuk grooming bulan lalu.',
  },
];

const faqs = [
  {
    q: 'Apakah mendaftar member berbayar?',
    a: 'Tidak! Mendaftar sebagai member sepenuhnya GRATIS. Anda langsung mendapatkan akses ke booking online, rekam medis digital, dan program poin loyalitas.',
  },
  {
    q: 'Bagaimana cara mendapatkan diskon 20%?',
    a: 'Kumpulkan poin dari setiap kunjungan ke klinik. Setelah mencapai tier Platinum (1500+ poin), Anda otomatis mendapatkan diskon 20% untuk semua layanan.',
  },
  {
    q: 'Apakah bisa ubah jadwal booking?',
    a: 'Tentu saja! Anda bisa membatalkan atau mengubah jadwal booking melalui halaman dashboard member. Kami sangat fleksibel.',
  },
  {
    q: 'Apakah data kesehatan anabul saya aman?',
    a: 'Ya, semua data medis tersimpan aman di sistem kami dan hanya bisa diakses oleh Anda dan tim dokter yang menangani. Privasi adalah prioritas kami.',
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

// =============================================================
// COMPONENT
// =============================================================

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

        /* ---------- MEMBER FEATURES (NEW) ---------- */
        .vc-features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .vc-feat-card {
          background: #fff; border: 1px solid var(--line); border-radius: 12px;
          padding: 28px 24px; text-align: center;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .vc-feat-card:hover { transform: translateY(-4px); box-shadow: 0 16px 30px -14px rgba(31,58,46,0.22); }
        .vc-feat-icon {
          width: 52px; height: 52px; border-radius: 12px; background: var(--cream-dark);
          color: var(--green); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;
        }
        .vc-feat-card h3 { font-size: 17px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .vc-feat-card p { font-size: 13.5px; line-height: 1.6; color: var(--text-soft); }

        /* ---------- CAMPAIGNS (NEW) ---------- */
        .vc-campaigns-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .vc-campaign-card {
          position: relative; background: #fff; border: 2px solid var(--gold-light);
          border-radius: 12px; padding: 24px; transition: border-color 0.18s ease;
        }
        .vc-campaign-card:hover { border-color: var(--gold); }
        .vc-campaign-badge {
          display: inline-block; background: var(--gold-light); color: var(--gold);
          font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 999px;
          text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 12px;
        }
        .vc-campaign-card h3 { font-size: 17px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .vc-campaign-card p { font-size: 13.5px; line-height: 1.6; color: var(--text-soft); margin-bottom: 14px; }
        .vc-campaign-link { font-size: 13px; font-weight: 700; color: var(--green); text-decoration: none; display: inline-flex; align-items: center; gap: 4px; }
        .vc-campaign-link:hover { color: var(--green-dark); }

        /* ---------- DOCTORS (NEW) ---------- */
        .vc-doctors-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; max-width: 780px; margin: 0 auto; }
        .vc-doctor-card {
          background: #fff; border: 1px solid var(--line); border-radius: 12px;
          padding: 28px 20px; text-align: center;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .vc-doctor-card:hover { transform: translateY(-4px); box-shadow: 0 16px 30px -14px rgba(31,58,46,0.22); }
        .vc-doctor-avatar {
          width: 64px; height: 64px; border-radius: 50%; background: var(--cream-dark);
          color: var(--green); display: flex; align-items: center; justify-content: center;
          font-size: 20px; font-weight: 800; margin: 0 auto 14px;
        }
        .vc-doctor-card h3 { font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
        .vc-doctor-card p { font-size: 13px; color: var(--text-soft); }

        /* ---------- TESTIMONIALS (NEW) ---------- */
        .vc-testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .vc-testimonial-card {
          background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 24px;
        }
        .vc-testimonial-stars { display: flex; gap: 2px; margin-bottom: 12px; }
        .vc-testimonial-card blockquote { font-size: 14px; line-height: 1.65; color: var(--text-soft); font-style: italic; margin-bottom: 14px; }
        .vc-testimonial-author { display: flex; align-items: center; gap: 10px; }
        .vc-testimonial-avatar {
          width: 32px; height: 32px; border-radius: 50%; background: var(--green);
          color: var(--cream); display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800;
        }
        .vc-testimonial-name { font-size: 14px; font-weight: 700; color: var(--ink); }

        /* ---------- FAQ (NEW) ---------- */
        .vc-faq-wrap { max-width: 720px; margin: 0 auto; }
        .vc-faq-item {
          background: #fff; border: 1px solid var(--line); border-radius: 12px;
          padding: 0 20px; margin-bottom: 12px;
        }
        .vc-faq-item button { color: var(--ink) !important; font-weight: 600 !important; }
        .vc-faq-item button:hover { text-decoration: none !important; }
        .vc-faq-item button[data-state="open"] { text-decoration: none !important; }

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
        .vc-plan h3 { font-family: 'Fraunces', serif; font-size: 23px; font-weight: 600; margin-bottom: 0; }
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
          .vc-features-grid, .vc-campaigns-grid, .vc-doctors-grid, .vc-testimonials-grid { grid-template-columns: 1fr; }
          .vc-trust-grid { grid-template-columns: 1fr; gap: 16px; }
          .vc-nav-links { display: none; }
          .vc-record { transform: rotate(0deg); max-width: 100%; }
        }
        @media (max-width: 520px) {
          .vc-services-grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vc-btn, .vc-svc-card, .vc-plan-cta, .vc-feat-card, .vc-doctor-card { transition: none; }
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
            <a className="vc-nav-link" href="#features">Keuntungan</a>
            <a className="vc-nav-link" href="#promo">Promo</a>
            <a className="vc-nav-link" href="#testimoni">Testimoni</a>
            <a className="vc-nav-link" href="#faq">FAQ</a>
            <a className="vc-nav-link" href="#premium">Prioritas</a>
            <a className="vc-nav-link" href="#info">Jam &amp; Lokasi</a>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link className="vc-btn vc-btn-ghost" to="/login">Masuk</Link>
            <Link className="vc-btn vc-btn-primary" to="/register">Daftar</Link>
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
              <Link className="vc-btn vc-btn-primary" to="/register">
                Daftar Sekarang <ArrowRight size={16} />
              </Link>
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

      {/* MEMBER FEATURES (NEW - v3) */}
      <section id="features" className="vc-section" style={{ background: 'var(--cream-dark)' }}>
        <div className="vc-wrap">
          <div className="vc-section-head">
            <span className="vc-eyebrow">Keuntungan Member</span>
            <h2 className="vc-display">Semua yang anabul Anda butuhkan, dalam satu sistem</h2>
            <p>Daftar sebagai member dan nikmati fitur eksklusif yang memudahkan perawatan anabul.</p>
          </div>
          <div className="vc-features-grid">
            {memberFeatures.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="vc-feat-card">
                <div className="vc-feat-icon"><Icon size={24} /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPAIGNS / PROMO (NEW - v3) */}
      <section id="promo" className="vc-section">
        <div className="vc-wrap">
          <div className="vc-section-head">
            <span className="vc-eyebrow">Promo Spesial</span>
            <h2 className="vc-display">Penawaran menarik untuk anabul Anda</h2>
            <p>Jangan lewatkan promo-promo terbaik untuk member baru dan lama.</p>
          </div>
          <div className="vc-campaigns-grid">
            {campaigns.map((item) => (
              <div key={item.title} className="vc-campaign-card">
                <span className="vc-campaign-badge">{item.badge}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <Link className="vc-campaign-link" to="/register">
                  Daftar untuk klaim <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTORS PREVIEW (NEW - v3) */}
      <section id="dokter" className="vc-section" style={{ background: 'var(--cream-dark)' }}>
        <div className="vc-wrap">
          <div className="vc-section-head">
            <span className="vc-eyebrow">Tim Profesional</span>
            <h2 className="vc-display">Dokter hewan berpengalaman &amp; bersertifikat</h2>
            <p>Tim dokter kami siap memberikan penanganan terbaik untuk anabul Anda.</p>
          </div>
          <div className="vc-doctors-grid">
            {doctors.map((doc) => (
              <div key={doc.name} className="vc-doctor-card">
                <div className="vc-doctor-avatar">{doc.initials}</div>
                <h3>{doc.name}</h3>
                <p>{doc.spec}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (NEW - v3) */}
      <section id="testimoni" className="vc-section">
        <div className="vc-wrap">
          <div className="vc-section-head">
            <span className="vc-eyebrow">Testimoni</span>
            <h2 className="vc-display">Apa kata member kami?</h2>
            <p>Cerita nyata dari para pemilik hewan yang sudah mempercayakan anabul mereka kepada kami.</p>
          </div>
          <div className="vc-testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.name} className="vc-testimonial-card">
                <div className="vc-testimonial-stars">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="#C1693C" color="#C1693C" />
                  ))}
                </div>
                <blockquote>"{t.comment}"</blockquote>
                <div className="vc-testimonial-author">
                  <div className="vc-testimonial-avatar">{t.initials}</div>
                  <span className="vc-testimonial-name">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (NEW - v3) */}
      <section id="faq" className="vc-section" style={{ background: 'var(--cream-dark)' }}>
        <div className="vc-wrap">
          <div className="vc-section-head">
            <span className="vc-eyebrow">FAQ</span>
            <h2 className="vc-display">Pertanyaan yang sering ditanyakan</h2>
            <p>Temukan jawaban untuk pertanyaan umum seputar layanan dan membership kami.</p>
          </div>
          <div className="vc-faq-wrap">
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="vc-faq-item">
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
              <Link className="vc-plan-cta" to="/register">Daftar Gratis</Link>
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
              <Link className="vc-plan-cta" to="/register?plan=prioritas">
                Mulai Prioritas <ArrowRight size={16} />
              </Link>
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
