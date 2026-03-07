import { SupplyChainResilience } from "@/components/apps/logistics/SupplyChainResilience";

export default function Page() {
    return (
        <div className="container mx-auto px-6 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-black text-foreground tracking-tighter sm:text-6xl mb-4 uppercase">
                    SUPPLY CHAIN <span className="text-primary tracking-normal">DIGITAL TWIN</span>
                </h1>
                <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
                    Advanced resilience modeling for global logistics networks. Simulate shocks and analyze route volatility in real-time.
                </p>
            </div>
            <SupplyChainResilience />
        </div>
    );
}
