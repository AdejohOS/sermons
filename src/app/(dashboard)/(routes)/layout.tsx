import Footer from "../_components/footer";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 w-full p-6">{children}</div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;
