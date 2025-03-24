import { Search } from "lucide-react";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function BarraDePesquisa({ value, onChange, placeholder }: SearchBarProps) {
    return (
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
                type="text"
                placeholder={placeholder}
                className="w-full pl-10 pr-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
