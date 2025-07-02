import { useState, useEffect, useRef } from "react";
import { Monster, MonsterBattleState, Props } from "../types/Monster";
import { AnimatedMonster } from "./AnimatedMonster";

export const BattleArena = ({ monsters }: Props) => {
    const [selected, setSelected] = useState<Monster[]>([]);
    const [battleLog, setBattleLog] = useState<string[]>([]);
    const [winner, setWinner] = useState<string | null>(null);
    const [fighters, setFighters] = useState<
        [MonsterBattleState, MonsterBattleState] | null
    >(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const toggleSelect = (monstro: Monster) => {
        setSelected((prev) => {
            if (prev.includes(monstro))
                return prev.filter((m) => m !== monstro);
            if (prev.length < 2) return [...prev, monstro];
            return prev;
        });
    };

    const resetBattle = () => {
        setFighters(null);
        setBattleLog([]);
        setWinner(null);
    };

    const startBattle = (mon1: Monster, mon2: Monster) => {
        setBattleLog([]);
        setWinner(null);
        setFighters([
            { monster: mon1, currentHp: mon1.hp },
            { monster: mon2, currentHp: mon2.hp }
        ]);
    };

    useEffect(() => {
        if (!fighters) return;

        intervalRef.current = setInterval(() => {
            const [m1, m2] = fighters;

            let first = m1;
            let second = m2;

            if (
                m2.monster.speed > m1.monster.speed ||
                (m2.monster.speed === m1.monster.speed &&
                    m2.monster.attack > m1.monster.attack)
            ) {
                [first, second] = [m2, m1];
            }

            const dano1 = Math.max(
                1,
                first.monster.attack - second.monster.defense
            );

            let hp2 = second.currentHp - dano1;

            const logs: string[] = [
                `${first.monster.name} atacou ${second.monster.name} causando ${dano1} de dano`
            ];

            let hp1 = first.currentHp;

            if (hp2 > 0) {
                const dano2 = Math.max(
                    1,
                    second.monster.attack - first.monster.defense
                );

                hp1 = first.currentHp - dano2;
                logs.push(
                    `${second.monster.name} atacou ${first.monster.name} causando ${dano2} de dano`
                );
            }

            setBattleLog((prev) => [...prev, ...logs]);

            if (hp1 <= 0 && hp2 <= 0) {
                setWinner("Empate");
                setBattleLog((prev) => [...prev, "⚔️ Batalha empatada!"]);
                clearInterval(intervalRef.current!);
                return;
            }

            if (hp1 <= 0) {
                setWinner(second.monster.name);
                setBattleLog((prev) => [
                    ...prev,
                    `🏆 ${second.monster.name} venceu!`
                ]);
                clearInterval(intervalRef.current!);
                return;
            }

            if (hp2 <= 0) {
                setWinner(first.monster.name);
                setBattleLog((prev) => [
                    ...prev,
                    `🏆 ${first.monster.name} venceu!`
                ]);
                clearInterval(intervalRef.current!);
                return;
            }

            setFighters([
                { ...first, currentHp: hp1 },
                { ...second, currentHp: hp2 }
            ]);
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [fighters]);

    return (
        <div className="max-w-xl mx-auto mt-10 space-y-4">
            <h2 className="text-xl font-bold text-center">
                Escolha 2 monstros:
            </h2>

            <div className="flex flex-wrap gap-2 justify-center">
                {monsters.map((m) => (
                    <button
                        key={m.id}
                        onClick={() => toggleSelect(m)}
                        className={`border px-3 py-1 rounded ${
                            selected.includes(m)
                                ? "bg-green-500 text-white"
                                : "bg-gray-100"
                        }`}
                    >
                        {m.name}
                    </button>
                ))}
            </div>

            {selected.length === 2 && !fighters && (
                <div className="text-center">
                    <button
                        onClick={() => startBattle(selected[0], selected[1])}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-2"
                    >
                        Iniciar Batalha
                    </button>
                </div>
            )}

            {fighters && (
                <div className="flex justify-around mt-6 items-end">
                    {fighters.map((f, index) => {
                        const direction = index === 0 ? "left" : "right";
                        const xAttack = direction === "left" ? 30 : -30;
                        const isDead = f.currentHp <= 0;
                        const isWinner = winner === f.monster.name;

                        return (
                            <div
                                key={f.monster.id}
                                className="flex flex-col items-center"
                            >
                                <h3 className="text-lg font-bold mb-2">
                                    {f.monster.name}
                                </h3>
                                <AnimatedMonster
                                    color={f.monster.color ?? "gray"}
                                    xStart={0}
                                    xAttack={xAttack}
                                    direction={direction}
                                    animate={!winner}
                                    isDead={isDead}
                                    isWinner={isWinner}
                                />
                                <div className="text-sm text-left mt-2 space-y-1">
                                    <p>
                                        <strong>HP:</strong> {f.currentHp} /{" "}
                                        {f.monster.hp}
                                    </p>
                                    <p>
                                        <strong>Ataque:</strong>{" "}
                                        {f.monster.attack}
                                    </p>
                                    <p>
                                        <strong>Defesa:</strong>{" "}
                                        {f.monster.defense}
                                    </p>
                                    <p>
                                        <strong>Velocidade:</strong>{" "}
                                        {f.monster.speed}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {battleLog.length ? (
                <div className="bg-gray-100 p-4 rounded mt-4 max-h-64 overflow-y-auto">
                    <h3 className="text-lg font-bold">📝 Infos da batalha: </h3>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        {battleLog.map((log, i) => (
                            <li key={i}>{log}</li>
                        ))}
                    </ul>
                </div>
            ) : null}

            {winner && (
                <>
                    <div className="text-center mt-4 text-2xl font-bold text-green-600">
                        🎉 {winner} venceu!
                    </div>
                    <button
                        onClick={resetBattle}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Iniciar outra batalha
                    </button>
                </>
            )}
        </div>
    );
};
