// src/app/layout.js
import './styles/globals.css'; // Correct path to import global styles

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
