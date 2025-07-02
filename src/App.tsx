import { useState } from "react";
import { MonsterForm } from "./components/MonsterForm";
import { BattleArena } from "./components/BattleArena";
import { Monster } from "./types/Monster";

const App = () => {
    const [monsters, setMonsters] = useState<Monster[]>([]);

    const handleAdd = (monster: Monster) => {
        setMonsters((prev) => [...prev, monster]);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-6">
                ⚔️ Batalha de Monstros
            </h1>
            <MonsterForm onAdd={handleAdd} />
            <hr className="my-6 border-gray-300" />
            <BattleArena monsters={monsters} />
        </div>
    );
};

export default App;
