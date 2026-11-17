'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

export default function RatingCards() {
  const [asImgError, setAsImgError] = useState(false);
  const [sitejabberImgError, setSitejabberImgError] = useState(false);
  const [trustpilotImgError, setTrustpilotImgError] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {/* 1. AS Reviews */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            {!asImgError ? (
              <div className="relative w-7 h-7 shrink-0">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSk51D_mh8disIUEJFYjNMbgHaTkBgM6S3oLdPRfyRn4sRC6M7l7IFRp7CvbZincEdSuGlGm8_5sUtnuquHLmSCLbcUk2KNntgM_CIDPcaPTWeujsGgs7_Kgf6EYt9FfUIVLMpBan8CYcl_7Ms3EHNueENpUGtwD-ZyBZpgbnsZZIiV1nzLTA2kOwETK-YnkOaLCv22xdcl81UR83FNVyjOCIhcl5g3KFwp0qEiFHW4JO0NW3DuSqa"
                  alt="AS Reviews"
                  fill
                  sizes="28px"
                  loading="lazy"
                  onError={() => setAsImgError(true)}
                  className="object-contain rounded"
                />
              </div>
            ) : (
              <div className="w-7 h-7 rounded bg-[#243445] text-amber-400 font-extrabold text-xs flex items-center justify-center shrink-0">
                AS
              </div>
            )}
            <span className="font-heading text-base font-bold text-[#243445]">AS Reviews</span>
          </div>
          <div className="flex items-center gap-1 text-[#FF641A] mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#FF641A] text-[#FF641A]" />
            ))}
          </div>
        </div>
        <div className="text-right">
          <span className="font-heading text-2xl font-bold text-[#243445]">4.8</span>
          <span className="block text-xs text-slate-400">out of 5.0</span>
        </div>
      </div>

      {/* 2. Sitejabber */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            {!sitejabberImgError ? (
              <div className="relative w-7 h-7 shrink-0">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFfRJjV6lbsyedo6QZbIqtsISHK-VZpCVBz09Bygj16890bhKosyg6-NhbKPKLY1SiM2UK6ptFty0AjXVXO3toclUzIy36jGCjS46P0GcCBZh0zA55VJefcbOwpQnuT5nj1KhTo8DzaKyU3dI6Mc5T5oLVd5DCalroPS8fyEFNSrj-vT61rkaZYJS79FLEenCY4913m29JWGXwMPKhKAoWNC06EWfrSZtaPx7jW1o_qF36dcA9RWwq"
                  alt="Sitejabber"
                  fill
                  sizes="28px"
                  loading="lazy"
                  onError={() => setSitejabberImgError(true)}
                  className="object-contain rounded"
                />
              </div>
            ) : (
              <div className="w-7 h-7 rounded bg-[#FF641A] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                SJ
              </div>
            )}
            <span className="font-heading text-base font-bold text-[#243445]">Sitejabber</span>
          </div>
          <div className="flex items-center gap-1 text-[#FF641A] mt-1">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#FF641A] text-[#FF641A]" />
            ))}
            <div className="relative">
              <Star className="w-4 h-4 text-[#FF641A]" />
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star className="w-4 h-4 fill-[#FF641A] text-[#FF641A]" />
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="font-heading text-2xl font-bold text-[#243445]">4.6</span>
          <span className="block text-xs text-slate-400">out of 5.0</span>
        </div>
      </div>

      {/* 3. Trustpilot */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            {!trustpilotImgError ? (
              <div className="relative w-7 h-7 shrink-0">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFo8fu5qq65IKaO962ZWj37iI-BSTm98wcSc4xyQaGatIrCloxP_Wx3CsogSh81oLeGyWnPGLG13jbbIK6WVjKsLZULngtP1XfH3ch1C0nSgJ0j3buXp3nJNnm8FTWp5E3Y7JdX72ZsTsa7TgXtecnd5oFp_Mh-Bi6s9APovyCCkG39os1RDRZnT9YtKQ1qRPDjdOzS-JFtWgi4A0ktIUaCmYmtIhjKosbFyK6oVuRJD3G2W2Hv_mJ"
                  alt="Trustpilot"
                  fill
                  sizes="28px"
                  loading="lazy"
                  onError={() => setTrustpilotImgError(true)}
                  className="object-contain rounded"
                />
              </div>
            ) : (
              <div className="w-7 h-7 rounded bg-[#059669] text-white flex items-center justify-center shrink-0">
                <Star className="w-4 h-4 fill-white text-white" />
              </div>
            )}
            <span className="font-heading text-base font-bold text-[#243445]">Trustpilot</span>
          </div>
          <div className="flex items-center gap-1 text-[#059669] mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#059669] text-[#059669]" />
            ))}
          </div>
        </div>
        <div className="text-right">
          <span className="font-heading text-2xl font-bold text-[#243445]">4.7</span>
          <span className="block text-xs text-slate-400">out of 5.0</span>
        </div>
      </div>
    </div>
  );
}
