"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Star,
    Clock,
    ChevronRight,
    ShoppingBag,
    Plus,
    Minus,
    X,
    MapPin,
    Bike,
    CheckCircle2,
    ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const RESTAURANTS = [
    {
        id: "1",
        name: "Cyber Spice Kitchen",
        rating: 4.8,
        time: "15-20 min",
        cuisine: "Modern Fusion",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80",
        menu: [
            { id: "m1", name: "Nano Dumplings", price: 12.99, description: "Bite-sized dumplings with neon vegetable filling." },
            { id: "m2", name: "Quantum Noodles", price: 15.49, description: "Cold-pressed noodles in umami broth." },
            { id: "m3", name: "Deep Meta Salad", price: 10.99, description: "Kale, quinoa, and futuristic citrus dressing." }
        ]
    },
    {
        id: "2",
        name: "Neo Tokyo Ramen",
        rating: 4.9,
        time: "20-25 min",
        cuisine: "Japanese",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80",
        menu: [
            { id: "m4", name: "Midnight Tonkotsu", price: 18.99, description: "Rich pork broth with 64-hour cured eggs." },
            { id: "m5", name: "Cyber Spicy Miso", price: 16.99, description: "Heat-intensive miso with metallic-colored sprouts." },
            { id: "m6", name: "Gyoza 2.0", price: 8.50, description: "Perfectly crisped dumplings with soy foam." }
        ]
    },
    {
        id: "3",
        name: "The Pizza Protocol",
        rating: 4.5,
        time: "30-35 min",
        cuisine: "Italian",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
        menu: [
            { id: "m7", name: "Mainframe Margarita", price: 14.99, description: "Classic tomato and mozzarella on sourdough." },
            { id: "m8", name: "Pepperoni Overload", price: 17.50, description: "Double-layered pepperoni with spicy honey." },
            { id: "m9", name: "Glitch Truffle Pie", price: 21.99, description: "Black truffle, mushrooms, and white sauce." }
        ]
    }
];

export function FoodDelivery() {
    const [view, setView] = useState<"home" | "menu" | "cart" | "tracking">("home");
    const [selectedRestaurant, setSelectedRestaurant] = useState<typeof RESTAURANTS[0] | null>(null);
    const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number }[]>([]);
    const [orderStatus, setOrderStatus] = useState(0);

    const addToCart = (item: { id: string; name: string; price: number }) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id: string) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === id);
            if (existing && existing.quantity > 1) {
                return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
            }
            return prev.filter(i => i.id !== id);
        });
    };

    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        if (view === "tracking" && orderStatus < 3) {
            const timer = setTimeout(() => {
                setOrderStatus(prev => prev + 1);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [view, orderStatus]);

    const handlePlaceOrder = () => {
        setView("tracking");
        setOrderStatus(0);
    };

    return (
        <div className="max-w-md mx-auto bg-[#121212] rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl relative overflow-hidden h-[800px] flex flex-col font-sans text-white">
            {/* Header */}
            <header className="p-6 pb-2 border-b border-white/5 flex items-center justify-between">
                {view !== "home" ? (
                    <button onClick={() => setView("home")} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                ) : (
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span className="text-sm font-semibold truncate max-w-[150px]">221B Baker St, London</span>
                    </div>
                )}

                {view === "home" && (
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <ShoppingBag className="w-6 h-6 text-white" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-black text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </header>

            <div className="flex-1 overflow-y-auto scrollbar-hide py-4 px-6 pb-24">
                <AnimatePresence mode="wait">
                    {view === "home" && (
                        <motion.div
                            key="home"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-6"
                        >
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <input
                                    type="text"
                                    placeholder="Search for food or restaurants"
                                    className="w-full bg-zinc-900 border-none rounded-2xl py-3 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary outline-none"
                                />
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-xl font-bold">Featured Restaurants</h2>
                                {RESTAURANTS.map((res) => (
                                    <motion.div
                                        key={res.id}
                                        whileHover={{ y: -4 }}
                                        onClick={() => {
                                            setSelectedRestaurant(res);
                                            setView("menu");
                                        }}
                                        className="bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer group"
                                    >
                                        <div className="h-40 overflow-hidden relative">
                                            <img src={res.image} alt={res.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                {res.rating}
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-lg">{res.name}</h3>
                                            <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {res.time}</span>
                                                <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                                                <span>{res.cuisine}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {view === "menu" && selectedRestaurant && (
                        <motion.div
                            key="menu"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            <div className="relative h-48 -mx-6 -mt-4 mb-6">
                                <img src={selectedRestaurant.image} alt={selectedRestaurant.name} className="w-full h-full object-cover opacity-50" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent" />
                                <div className="absolute bottom-4 left-6">
                                    <h2 className="text-3xl font-bold">{selectedRestaurant.name}</h2>
                                    <p className="text-zinc-400 text-sm">{selectedRestaurant.cuisine} • {selectedRestaurant.rating} rating</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {selectedRestaurant.menu.map((item) => (
                                    <div key={item.id} className="bg-zinc-900/50 p-4 rounded-2xl flex justify-between gap-4 border border-white/5 hover:border-primary/20 transition-colors">
                                        <div className="flex-1">
                                            <h4 className="font-bold">{item.name}</h4>
                                            <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{item.description}</p>
                                            <p className="text-primary font-bold mt-2">${item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex flex-col items-end justify-between">
                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => addToCart(item)}
                                                className="bg-primary hover:bg-primary/90 text-black p-2 rounded-xl"
                                            >
                                                <Plus className="w-5 h-5" />
                                            </motion.button>
                                            {cart.find(i => i.id === item.id) && (
                                                <span className="text-primary text-xs font-black">
                                                    {cart.find(i => i.id === item.id)?.quantity} IN CART
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {view === "tracking" && (
                        <motion.div
                            key="tracking"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center h-full text-center space-y-8"
                        >
                            <div className="relative">
                                <motion.div
                                    className="w-32 h-32 rounded-full border-4 border-primary/20 flex items-center justify-center"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                >
                                    <div className="w-24 h-24 rounded-full border-4 border-t-primary border-transparent animate-spin" />
                                </motion.div>
                                <Bike className="w-12 h-12 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-2">
                                    {orderStatus === 0 && "Order Confirmed"}
                                    {orderStatus === 1 && "Preparing Your Food"}
                                    {orderStatus === 2 && "Out for Delivery"}
                                    {orderStatus === 3 && "Delivered!"}
                                </h2>
                                <p className="text-zinc-500 text-sm max-w-[250px] mx-auto">
                                    {orderStatus < 3 ? "Your delicious meal will be arriving in approx. 12 minutes." : "Enjoy your meal! Please rate your driver."}
                                </p>
                            </div>

                            <div className="w-full space-y-4 text-left">
                                {[
                                    { step: "Order confirmed", done: orderStatus >= 0 },
                                    { step: "Restaurant is preparing", done: orderStatus >= 1 },
                                    { step: "Driver is on the way", done: orderStatus >= 2 },
                                    { step: "Enjoy your food", done: orderStatus >= 3 }
                                ].map((s, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${s.done ? 'bg-primary text-black' : 'bg-zinc-800 text-zinc-600'}`}>
                                            {s.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                                        </div>
                                        <span className={s.done ? 'text-white' : 'text-zinc-600'}>{s.step}</span>
                                    </div>
                                ))}
                            </div>

                            {orderStatus === 3 && (
                                <Button onClick={() => setView("home")} className="w-full rounded-2xl py-6">
                                    BACK TO HOME
                                </Button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Float Cart Button */}
            {cartCount > 0 && view !== "tracking" && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="absolute bottom-6 left-6 right-6"
                >
                    <Button
                        onClick={() => handlePlaceOrder()}
                        className="w-full bg-primary hover:bg-primary/90 text-black py-6 rounded-2xl flex justify-between px-6 font-black shadow-[0_10px_30px_rgba(0,243,255,0.3)]"
                    >
                        <span className="flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5" />
                            {cartCount} {cartCount === 1 ? 'ITEM' : 'ITEMS'}
                        </span>
                        <span>CHECKOUT • ${cartTotal.toFixed(2)}</span>
                    </Button>
                </motion.div>
            )}

            {/* Bottom Bar Styling */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-zinc-800 rounded-full" />
        </div>
    );
}
