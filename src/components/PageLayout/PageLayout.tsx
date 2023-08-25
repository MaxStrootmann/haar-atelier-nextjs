import Header from "./Header";
import Footer from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="bg-wolken">
      <Header />
      <div className="bg-wolken bg-cover container max-w-screen-lg mx-auto px-4 py-12 z-10 relative min-h-[75vh]">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
