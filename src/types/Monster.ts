export interface Monster {
    id: number;
    name: string;
    attack: number;
    color: string;
    defense: number;
    speed: number;
    hp: number;
    image_url: string;
}

export interface Props {
    monsters: Monster[];
}

export interface MonsterBattleState {
    monster: Monster;
    currentHp: number;
}

export const monsterColors: Record<string, string> = {
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
