import { FraudDetectionSimulator } from "@/components/apps/fintech/FraudDetectionSimulator";
import { AppleGlassLayout } from "@/components/layout/AppleGlassLayout";

export default function Page() {
    return (
        <AppleGlassLayout>
            <div className="container mx-auto px-6 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-white tracking-tighter sm:text-6xl mb-4 uppercase">
                        SENTINEL <span className="text-primary tracking-normal">FRAUD INTEL</span>
                    </h1>
                    <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed">
                        Real-time transaction monitoring and anomaly detection for high-fidelity fintech applications.
                    </p>
                </div>
                <FraudDetectionSimulator />
            </div>
        </AppleGlassLayout>
    );
}
