import { DisableLoading } from "@/components/handle-loading";
import Footer from "./Footer";

export default function Section(
    {className, children}
    : {
        className?: string;
        children: React.ReactNode;
    }
) {
    return (
        <section className={`min-h-screen overflow-x-hidden overflow-y-auto grow p-4 animate-fade-in flex flex-col ${className && className}`}>
            <DisableLoading />
            <div className="grow">
                {children}
            </div>
            <Footer />
        </section>
    )
}