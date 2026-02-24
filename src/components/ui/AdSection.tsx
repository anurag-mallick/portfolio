"use client";

import { useEffect } from "react";

interface AdBannerProps {
    dataAdSlot: string;
    dataAdFormat?: string;
    dataFullWidthResponsive?: boolean;
    className?: string;
}

export function AdBanner({
    dataAdSlot,
    dataAdFormat = "auto",
    dataFullWidthResponsive = true,
    className = "",
}: AdBannerProps) {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("Adsbygoogle error:", e);
        }
    }, []);

    return (
        <div className={`ad-container overflow-hidden flex justify-center py-8 ${className}`}>
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-0000000000000000"
                data-ad-slot={dataAdSlot}
                data-ad-format={dataAdFormat}
                data-full-width-responsive={dataFullWidthResponsive.toString()}
            />
        </div>
    );
}

export function AdSection() {
    return (
        <section id="ads" className="w-full bg-transparent">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40 mb-2">Advertisement</span>
                    <AdBanner dataAdSlot="0000000000" />
                </div>
            </div>
        </section>
    );
}
