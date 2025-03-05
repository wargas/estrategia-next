"use client"
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";

const ToggleTheme = () => {

    const { setTheme, theme } = useTheme()
    return (
        <>
            <span className="flex-1">
                Modo escuro
            </span>

            <Switch
                id="select-theme"
                onCheckedChange={() => setTheme(t => t == 'dark' ? 'light' : 'dark')}
                checked={theme == 'dark'} />
        </>
    );
};

export default ToggleTheme;