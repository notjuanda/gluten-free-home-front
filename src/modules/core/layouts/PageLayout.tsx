import React from "react";
import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

interface PageLayoutProps {
    children?: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="max-w-[1280px] mx-auto px-4 ">

            <main className="py-4">
                {children ? children : <Outlet />}
            </main>
            </div>
        </div>
    );
};

export default PageLayout;
