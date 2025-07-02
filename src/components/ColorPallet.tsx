import React, { useState } from "react";
import { monsterColors } from "../types/Monster";

const ColorSelector: React.FC<{
    onSelect: (colorKey: string) => void;
    selectedColor: string | null;
}> = ({ onSelect, selectedColor }) => {
    return (
        <div className="grid grid-cols-3 gap-3 mt-4">
            {Object.entries(monsterColors).map(([key, color]) => (
                <button
                    key={key}
                    onClick={() => onSelect(key)}
                    className={`w-16 h-16 rounded-md border-4 ${
                        selectedColor === key
                            ? "border-black scale-110"
                            : "border-transparent"
                    } transition-transform duration-150`}
                    style={{ backgroundColor: color }}
                />
            ))}
        </div>
    );
};

export const MonsterColorPicker = () => {
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    return (
        <div className="p-6 max-w-sm mx-auto text-center">
            <h2 className="text-lg font-semibold">Escolha a cor do monstro:</h2>
            <ColorSelector
                selectedColor={selectedColor}
                onSelect={setSelectedColor}
            />

            {selectedColor && (
                <p className="mt-4 text-sm">
                    Cor selecionada:{" "}
                    <span
                        className="font-bold"
                        style={{ color: monsterColors[selectedColor] }}
                    >
                        {selectedColor}
                    </span>
                </p>
            )}
        </div>
    );
};
