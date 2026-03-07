import { AIAgentOrchestrator } from "@/components/apps/ai/AIAgentOrchestrator";

export default function Page() {
    return (
        <div className="container mx-auto px-6 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-black text-foreground tracking-tighter sm:text-6xl mb-4 uppercase">
                    AI AGENT <span className="text-primary tracking-normal">ORCHESTRATOR</span>
                </h1>
                <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
                    Visualizing autonomous task decomposition. Watch how a central orchestrator assigns specialized agents to solve complex human requests.
                </p>
            </div>
            <AIAgentOrchestrator />
        </div>
    );
}
