import { useState } from "react";
import { Monster } from "../types/Monster";

interface Props {
    onAdd: (monstro: Monster) => void;
}

const monsterColors: Record<string, string> = {
    red: "#e53935",
    yellow: "#fdd835",
    gray: "#9e9e9e",
    black: "#212121",
    green: "#43a047",
    pink: "#ec407a",
    blue: "#1e88e5",
    purple: "#8e24aa",
    brown: "#6d4c41"
};

export const MonsterForm = ({ onAdd }: Props) => {
    const [form, setForm] = useState<Omit<Monster, "id">>({
        name: "",
        attack: 0,
        defense: 0,
        speed: 0,
        hp: 0,
        image_url: "",
        color: "#fff"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "name" || name === "image_url") {
            setForm((prev) => ({ ...prev, [name]: value }));
        } else {
            const intValue = parseInt(value);
            setForm((prev) => ({
                ...prev,
                [name]: isNaN(intValue) ? 0 : intValue
            }));
        }
    };

    const handleColorSelect = (colorHex: string) => {
        setForm((prev) => ({ ...prev, color: colorHex }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({ ...form, id: Date.now() });
        setForm({
            name: "",
            attack: 0,
            defense: 0,
            speed: 0,
            hp: 0,
            image_url: "",
            color: "#fff"
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 max-w-md mx-auto bg-white p-4 rounded shadow"
        >
            {["name", "attack", "defense", "speed", "hp", "image_url"].map(
                (field) => (
                    <div key={field}>
                        <label className="block text-sm font-semibold mb-1 capitalize">
                            {field}
                        </label>
                        <input
                            name={field}
                            type={
                                ["attack", "defense", "speed", "hp"].includes(
                                    field
                                )
                                    ? "number"
                                    : "text"
                            }
                            value={form[field as keyof typeof form]}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-1"
                        />
                    </div>
                )
            )}
            <div>
                <label className="block text-sm font-semibold mb-2">
                    Cor do monstro
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {Object.entries(monsterColors).map(([key, color]) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => handleColorSelect(color)}
                            className={`w-12 h-12 rounded-md border-4 transition-transform duration-150
                                ${
                                    form.color === color
                                        ? "border-black scale-110"
                                        : "border-transparent"
                                }
                            `}
                            style={{ backgroundColor: color }}
                            aria-label={`Selecionar cor ${key}`}
                        />
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Cadastrar Monstro
            </button>
        </form>
    );
};
