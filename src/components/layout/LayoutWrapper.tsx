"use client";

import { useTheme } from "@/components/ThemeContext";
import { StandardLayout } from "./StandardLayout";
import { AppleGlassLayout } from "./AppleGlassLayout";
import { useEffect, useState } from "react";

export function LayoutWrapper() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <StandardLayout />; // Default to standard on server/initial render
    }

    if (theme === "apple-glass") {
        return <AppleGlassLayout />;
    }

    return <StandardLayout />;
}
