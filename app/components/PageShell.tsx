import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function PageShell({ children, className = "" }: Props) {
  return (
    <div className={`min-h-screen flex flex-col bg-gray-100 ${className}`}>
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
