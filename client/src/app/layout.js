import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "../styles/globals.css";

export const metadata = {
  title: "HomeSync - Home Automation Dashboard",
  description: "Intelligent home automation and monitoring dashboard",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "HomeSync Dashboard",
    description: "Intelligent home automation and monitoring dashboard",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
