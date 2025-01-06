import "./globals.css";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>My Next App</title>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
