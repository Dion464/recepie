// Correct import path from 'src/app'
import './globals.css';  // Since layout.js is in the same 'app' folder

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}