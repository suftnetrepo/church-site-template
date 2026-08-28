'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/hooks/use-settings';
import { churchConfig } from '@/church.config';
import type { Slider } from '@/types/church';

export function Hero() {
  const { settings } = useSettings();

  const sliders = settings?.sliders ?? [];
  const flyers = sliders.length > 0 ? sliders.filter((j) => j.status === true && j.imageOnly === true) : FALLBACK_FLYERS;

  const [idx, setIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lbIdx, setLbIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flyers.length]);

  function startAutoplay() {
    stopAutoplay();
    timer.current = setInterval(() => setIdx((i) => (i + 1) % flyers.length), 4500);
  }
  function stopAutoplay() {
    if (timer.current) clearInterval(timer.current);
  }

  function openLightbox() {
    setLbIdx(idx);
    setLightboxOpen(true);
    stopAutoplay();
  }
  function closeLightbox() {
    setLightboxOpen(false);
    startAutoplay();
  }

  const current = flyers[idx];
  const lbCurrent = flyers[lbIdx];

  return (
    <header className="relative overflow-hidden text-white pt-[88px] px-8 pb-[90px]">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo via-indigo to-indigo-deep">
        {churchConfig.heroPhoto && (
          <Image
            src={churchConfig.heroPhoto}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo/88 via-indigo/82 to-indigo-deep/92" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-deep/70 via-indigo-deep/80 to-indigo-deep/90" />
      </div>
      <div
        className="pointer-events-none absolute -right-[10%] -top-[10%] w-[600px] h-[380px] rounded-full opacity-30"
        style={{ background: 'radial-gradient(600px 380px, rgba(217,164,65,0.16), transparent 60%)' }}
      />
      <div className="relative max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
        <div className="max-w-[560px]">
          <h1 className="text-[38px] lg:text-[50px] leading-[1.08] text-white">
            Come as you are.
            <br />
            Grow in faith.
            <br />
            <em className="not-italic italic text-gold font-medium">Live victorious.</em>
          </h1>
          <p className="text-lg text-[#C7CBDA] max-w-[500px] my-6">
            {churchConfig.tagline} Join us this Sunday for worship, teaching, and real community.
          </p>
          <div className="flex gap-3.5">
            <Button href="/new-here">Plan your visit</Button>
            <Button href="/service-times" variant="outline-dark">
              Watch online
            </Button>
          </div>
        </div>

        <div className="relative flex items-center justify-center h-[300px] lg:h-[380px] mt-5 lg:mt-0">
          <div className="absolute w-[200px] lg:w-[250px] aspect-[4/5] rounded-[3px] bg-[#EDE6D3] opacity-75 rotate-[7deg] translate-x-[30px] translate-y-[10px] shadow-[0_22px_40px_rgba(6,8,20,0.45)]" />
          <button
            onClick={openLightbox}
            aria-label="View flyer full size"
            className="group absolute w-[200px] lg:w-[250px] aspect-[4/5] rounded-[3px] bg-paper -rotate-[4deg] hover:-translate-y-1 transition-transform overflow-hidden shadow-[0_22px_40px_rgba(6,8,20,0.45)] hover:shadow-[0_28px_46px_rgba(6,8,20,0.5)]"
          >
            <span className="absolute top-3 right-3 z-10 w-[26px] h-[26px] rounded-full bg-indigo/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 size={13} />
            </span>

            {current?.secure_url ? (
              <>
                <Image
                  src={current.secure_url}
                  alt={current.title || 'Church flyer'}
                  fill
                  sizes="250px"
                  className="object-cover"
                  priority={idx === 0}
                />
                {!current.imageOnly && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 pt-10">
                    <span className="block font-mono text-[10px] tracking-[0.1em] uppercase text-gold mb-1.5">{current.title}</span>
                    <span className="block font-display text-[15px] leading-[1.25] text-white">{current.message}</span>
                  </div>
                )}
              </>
            ) : (
              <div className="p-5 h-full flex flex-col text-left">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 -rotate-3 w-16 h-[22px] bg-gold/55 border border-gold/70" />
                <span className="self-start font-mono text-[10px] tracking-[0.1em] uppercase bg-indigo text-gold px-[9px] py-[5px] rounded-[2px] mb-4">
                  {current.title || 'This Sunday'}
                </span>
                <span className="h-16 rounded-[2px] mb-4" style={{ background: flyerSwatch(idx) }} />
                <span className="font-display text-lg lg:text-[22px] leading-[1.18] text-ink mb-2.5">
                  {current.message || 'Sunday Encounter'}
                </span>
                <span className="text-[12.5px] text-ink-soft font-semibold mt-auto pt-3.5 border-t border-ink/10">
                  10:00 &amp; 12:00 · Main auditorium
                </span>
              </div>
            )}
          </button>
          <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 flex gap-1.5">
            {flyers.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Flyer ${i + 1}`}
                className={`w-[7px] h-[7px] rounded-full ${i === idx ? 'bg-gold' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-[rgba(10,12,24,0.86)] flex items-center justify-center gap-5 p-6"
          onClick={(e) => e.target === e.currentTarget && closeLightbox()}
        >
          <button
            onClick={() => setLbIdx((i) => (i - 1 + flyers.length) % flyers.length)}
            aria-label="Previous flyer"
            className="w-[42px] h-[42px] rounded-full bg-white/10 border border-white/25 text-white flex items-center justify-center hover:bg-white/20"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="relative bg-paper w-[min(460px,84vw)] max-h-[86vh] aspect-[4/5] rounded overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.55)]">
            <button
              onClick={closeLightbox}
              aria-label="Close flyer view"
              className="absolute top-3 right-3 z-10 w-[34px] h-[34px] rounded-full bg-black/60 text-white flex items-center justify-center"
            >
              <X size={16} />
            </button>

            {lbCurrent.secure_url ? (
              <>
                <Image src={lbCurrent.secure_url} alt={lbCurrent.title || 'Church flyer'} fill sizes="460px" className="object-contain bg-ink" />
                {!lbCurrent.imageOnly && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-14">
                    <span className="block font-mono text-[10px] tracking-[0.1em] uppercase text-gold mb-2">{lbCurrent.title}</span>
                    <p className="text-white text-sm leading-relaxed">{lbCurrent.message}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="p-9 h-full flex flex-col">
                <span className="self-start font-mono text-[10px] tracking-[0.1em] uppercase bg-indigo text-gold px-[9px] py-[5px] rounded-[2px] mb-[22px]">
                  {lbCurrent.title || 'This Sunday'}
                </span>
                <div className="flex-1 rounded-[2px] mb-[18px]" style={{ background: flyerSwatch(lbIdx) }} />
                <h4 className="font-display text-[30px] leading-[1.16] text-ink mb-3.5">{lbCurrent.message || 'Sunday Encounter'}</h4>
                <div className="text-[13px] text-ink-soft font-semibold pt-4 border-t border-ink/10">9:00 &amp; 11:00 · Main auditorium</div>
              </div>
            )}
          </div>

          <button
            onClick={() => setLbIdx((i) => (i + 1) % flyers.length)}
            aria-label="Next flyer"
            className="w-[42px] h-[42px] rounded-full bg-white/10 border border-white/25 text-white flex items-center justify-center hover:bg-white/20"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </header>
  );
}

const swatches = [
  'linear-gradient(135deg,#D9A441,#8C6420)',
  'linear-gradient(135deg,#5E7052,#3E4E37)',
  'linear-gradient(135deg,#2C3763,#1B2340)'
];
function flyerSwatch(i: number) {
  return swatches[i % swatches.length];
}

// Shown only if the settings API returns no sliders yet — real flyers replace this immediately once uploaded.
const FALLBACK_FLYERS: Slider[] = [
  { title: 'This Sunday', message: 'Sunday Encounter', status: true, imageOnly: false, secure_url: '' },
  { title: 'This Friday', message: 'Prayer Conference', status: true, imageOnly: false, secure_url: '' },
  { title: 'Every Sat', message: 'Youth Night', status: true, imageOnly: false, secure_url: '' }
];
