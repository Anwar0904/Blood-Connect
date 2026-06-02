// app/layout.tsx
import AuthProvider from "@/components/providers/SessionProvider";
import ThemeSwitcher from "@/components/Layout/ThemeSwitcher";
import "./globals.css";
import { ThemeProvider } from "next-themes";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem >
          <AuthProvider>

          {children} {/* No Header/Footer here! */}
      </AuthProvider>

          <ThemeSwitcher/>
        </ThemeProvider>
      </body>
    </html>
  );
}