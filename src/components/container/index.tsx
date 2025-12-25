"use client"
import { ReactNode } from "react";
import Snowfall from "react-snowfall";

export function Container({ children }: { children: ReactNode }) {
    return (
        <div className="max-w-7xl mx-auto px-3 relative">


            <Snowfall
                snowflakeCount={560}
                style={{
                    position: "fixed",
                    width: "100vw",
                    height: "100vh",
                    zIndex: 50
                }}
            />

            {children}
        </div>
    );
}