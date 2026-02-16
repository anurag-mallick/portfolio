"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { FoodDelivery } from "@/components/apps/food-delivery/FoodDelivery";

export default function FoodDeliveryPage() {
    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-black to-black opacity-40 pointer-events-none" />
            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <Link href="/#apps">
                        <Button variant="ghost" className="text-muted-foreground hover:text-white">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Enterprise Solutions
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-8 h-8 text-primary" />
                        <h1 className="text-2xl md:text-3xl font-bold text-white">Food Delivery <span className="text-primary">Express</span></h1>
                    </div>
                </div>

                <div className="flex items-center justify-center py-10">
                    <FoodDelivery />
                </div>
            </div>
        </div>
    );
}
