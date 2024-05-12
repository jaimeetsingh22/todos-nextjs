import { ContextProvider } from "../components/Client";
import "./globals.css";
import Header from "./Header";

export const metadata = {
  title: "Todo App",
  description: "Next js todo app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative">
        <ContextProvider>
          <>
            <Header />
            {children}
          </>
        </ContextProvider>
      </body>
    </html>
  );
}
