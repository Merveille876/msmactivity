import "./globals.css";

export const metadata = {
  title: "MSM ACTIVITY | Solutions informatiques",
  description: "Développement, services numériques, formation et conseil",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
