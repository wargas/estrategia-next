"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { useEffect, useState } from "react";


type Props = React.ComponentProps<typeof NextThemesProvider>

export function ThemeProvider({ children, ...props }: Props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>; // Render children without ThemeProvider during SSR
    }

    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}