'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

interface UniversityItem {
  name: string;
  logoUrl: string;
}

const UNIVERSITIES: UniversityItem[] = [
  {
    name: 'University of Queensland',
    logoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBugeYNbrXUrq61guEnRvH_CW3urE46tdBBd2x1BS3lF-zAQymubZezrILTE2b2xvgcPU9dhR0-5Dy12H_Cg6UyfDmoLlEcYib-AzL46b3hlLIzto75DSXP82979P42Zxu0bJpz2_xxXrlv2K2A7fX-QGTNOhcr8aGkzKhJCTMqAsQdveMHUuwZlm0owYt495y4TlC6vFpdFdEMUPqEJZ0su8gHp-fUbFc-72HKvpH86X_99xdIZvME',
  },
  {
    name: 'Florida International University',
    logoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD1rpKYJ2ziG37_XK28Pm4obfE0h7-Hhu_lU4EvWtHYMbv6GQ0QKFHMtlhZ4BWDH0IsPnysa9zdeDUNUsyUWJqz4AunQ7sNN9qLW5gZ_ffCgOZj5mrNMXUSFWxul84et1i4hAYcFexJYU5I9kKF_QWaPHEt061RM5S9NCKscvRAO2u0GPjLn7mG37buwP0_d6EZLMGijFQOkuDoHCMSFNVGV1gqFGz1j5lU2YrtjBGHt9uaAXZlqY2_',
  },
  {
    name: 'American University of the Middle East',
    logoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDWrS6fuhwzy7Rf9Rr81OeYet9zXi1RbrK4IhVNeq_hEAGLjlYo3K5l9rLmd-9AuWthoIexRWU_tVfLUjeBePFXfXVTSZgpLLvOAs1DZXZ60icU_wO9vkwDDLWO9yK4giRe9tiM22rUu8GODGQg-UGpREm7ieS6luCmKpNLoWFIsldmF3svuMs4UtxJ49YZemD53-VfSq9Sduuejv_-eYQsOGavcBVLwaRMN4sYCt39CFsj8Qs2nKyF',
  },
  {
    name: 'Vol State Community College',
    logoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCzTCRh-XY12i5qQefytVOfQRxU9mvw-vKyue84p03uCezQ3ezQn49axTcsmT2VkRXXlxTw3p7DmFwZBWhZTHfaViCHnqK6hRLCjWhlDBqV9dRzc3p5FIAR4G4BqkxXLoa4ttdtzBplQk0JK_wAstoJJaIBkbCpVQyG3M_BTRiLDfFb1wFrPHSeh9klc7qWHsfPaEFVqjC5DBqWr0SRsGslX3tZhHZPl1A0wBPavux2iYv8BGUksIh9',
  },
  {
    name: 'Auburn University at Montgomery',
    logoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDKIr_zZnw6ZYUtvyPzt96-yzb69brHXRxj7qN54IH3jFdS93WIBc5w1XWtV26X9zfD3aD0Meujy_TNQqDdZNtwZdNXEgj-GiEVlI8kXIbLRCLQtJYU_BUu9GnQKhlrXt2A46X64HVGTBzPPYGKJ3TEn24_CJUqF4Zp5RIWL731l7hD8yQOkq7QHsJAfMg-L2FVfGSowM59WxhPMe_x_HgH-r8ZXc5lconIjubI5kdWMYBaPvjcl7PA',
  },
  {
    name: 'Federation University Australia',
    logoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBUzGWcD02yJjE0Mjupz-33MJBKyYOt9c10yd3a6nos0_LUZ9yebWLCA7kv46mm6eSBJP7tHAL5WABxDmdY8LIncg41gKP0jqbWVS9pQzdxXTO4nRatafiC3Ns7XlkvWl9JcwOn-1UtfB3XcyCM6XjnO-NtQX4Fm5WJ0TdDIx-1qL7F2dKM-1n5DDlS28-Mr7sIeX1NeRvx3ONBDPQKB-2RWy6BDxWT1SelEay4jdYfSxYeWMFh0tNH',
  },
  {
    name: 'Coventry University',
    logoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCPzUwGoaeKG6QgQXgeMN6Joc6NMbAFGmTek_N6M-XWJnI6FXK_gEUkJ9Ty3nN2UA0Twsg-GMp6dYu2TuySO1Vzesl4A8nY0z9KDHlimifXuwl8Juq6tgYlkWjFdQqsqIvdhHAhHXs8ZrARvBtBswBOnmr5UxAdqGoRywFYGwSLABdjylud7DOJ_u1xw02CjtMA17BymocXBTYvp4Gmldkp-Bc8vko4esUf1SadSNYDckFmzDTaXhdk',
  },
  {
    name: 'CQ University Australia',
    logoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBPW9-8s1ExNJD4ngdD1z5e5hiTFQsTXRmLl1zPvnA2BgXZ_K5KV5Wor4V4pI16ACe325RKU4V67f5qTUFZk1izqbslPGoTLEt21rkbeh2T2oXdewBPOrHkVqWdIl7QgmtHfmtZ5cdISCLOnM7jEkPbz1sfPXhVFezwt4-SLj-vEvtha1o5M4XcFC-3K4jsu14Kp1iLFc3Mu5_vl3qeVM5B8ERsmkAnF5F8Mfd_CKNc3bwRscHIg_5m',
  },
  {
    name: 'La Trobe University',
    logoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDzT3ErEwTMtwSUxINDFe8OBtIYEk-GypzTl5_P1r95irKfuiGe-cdle2ZLH1CdFoEA3Lh_t6gSE7oGydQun5EsQFlpZNLyGcIWRcXvZxqjn5lyb1-aluczJ39hS2OQwnEJ4XlvBh_YriXW5eFu6JXIZhKuWnyN-EukJ5MiuOf65kiTdJ8CkSwrxP6LpDIs2jT1V7nO5YkslflDP0Cd9r_H0a8xLGTo5MVussnX4WzODkjBTtaHocka',
  },
  {
    name: 'The University of Tampa',
    logoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8__If31gZeUDbowCwzVN2Kgrgz6lsoly-hD9UdgKmYJRZtzQpjH55FiWPS75jVhmdFPsJ4EyRScVGQep3j-8oCU2HcFwy1YeetaHMkR30PO6Uy4SS3lEZnU4I1P0IRwEsYkaqJzdYyaIF6b_1XumS8JB5rB7agXhu0gPBTC1gAsziQKCn25Ygwn0fxsMZI8fNwy_sIMJ-mh5Z8sp51T7fHsQn0Xm4GZP21MS_bJJBeI-pMKvmGBPh',
  },
];

export default function UniversityMarquee() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let isDown = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let isHovered = false;
    let animationFrameId: number;
    let halfWidth = 0;

    const measureWidth = () => {
      const firstGroup = track.querySelector<HTMLDivElement>('.senior-group');
      if (firstGroup) {
        halfWidth = firstGroup.offsetWidth + 40; // 40px gap (gap-10)
      }
    };

    measureWidth();
    window.addEventListener('resize', measureWidth);

    const wrapPosition = () => {
      if (halfWidth <= 0) return;
      while (currentTranslate <= -halfWidth) {
        currentTranslate += halfWidth;
        prevTranslate += halfWidth;
      }
      while (currentTranslate > 0) {
        currentTranslate -= halfWidth;
        prevTranslate -= halfWidth;
      }
    };

    const animate = () => {
      if (!isDown && !isHovered && halfWidth > 0) {
        currentTranslate -= 1.0;
        prevTranslate = currentTranslate;
        wrapPosition();
        track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      isDown = true;
      startX = e.pageX;
      prevTranslate = currentTranslate;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      const deltaX = e.pageX - startX;
      currentTranslate = prevTranslate + deltaX;
      wrapPosition();
      track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
    };

    const onMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      prevTranslate = currentTranslate;
    };

    const onMouseEnter = () => {
      isHovered = true;
    };

    const onMouseLeave = () => {
      isHovered = false;
      if (isDown) {
        isDown = false;
        prevTranslate = currentTranslate;
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDown = true;
        startX = e.touches[0].pageX;
        prevTranslate = currentTranslate;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDown || e.touches.length !== 1) return;
      const deltaX = e.touches[0].pageX - startX;
      currentTranslate = prevTranslate + deltaX;
      wrapPosition();
      track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
    };

    const onTouchEnd = () => {
      isDown = false;
      prevTranslate = currentTranslate;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', measureWidth);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div
      id="senior-slider-container"
      ref={containerRef}
      className="w-full overflow-hidden py-3 bg-slate-50/80 rounded-xl cursor-grab active:cursor-grabbing select-none"
      style={{ touchAction: 'pan-y' }}
    >
      <div
        id="senior-slider-track"
        ref={trackRef}
        className="flex items-center gap-10 opacity-90 w-max will-change-transform"
      >
        {/* Group 1 */}
        <div className="senior-group flex items-center gap-10">
          {UNIVERSITIES.map((uni, idx) => (
            <div
              key={`u1-${idx}`}
              className="relative h-12 w-36 shrink-0 flex items-center justify-center pointer-events-none"
            >
              <Image
                src={uni.logoUrl}
                alt={uni.name}
                fill
                sizes="144px"
                loading="lazy"
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Group 2 (Duplicate for infinite seamless loop) */}
        <div className="senior-group flex items-center gap-10" aria-hidden="true">
          {UNIVERSITIES.map((uni, idx) => (
            <div
              key={`u2-${idx}`}
              className="relative h-12 w-36 shrink-0 flex items-center justify-center pointer-events-none"
            >
              <Image
                src={uni.logoUrl}
                alt={uni.name}
                fill
                sizes="144px"
                loading="lazy"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
