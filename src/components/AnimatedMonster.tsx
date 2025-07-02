import { motion } from "framer-motion";
import React from "react";

interface AnimatedMonsterProps {
    color: string;
    xStart: number;
    xAttack: number;
    direction: "left" | "right";
    animate?: boolean;
    isDead?: boolean;
    isWinner?: boolean;
}

export const AnimatedMonster: React.FC<AnimatedMonsterProps> = ({
    color,
    xStart,
    xAttack,
    direction,
    animate = true,
    isDead = false,
    isWinner = false
}) => {
    const isLeft = direction === "left";
    const initialRotation = isLeft ? 45 : -45;
    const swingRotation = [initialRotation, 0, initialRotation];
    const transformOrigin = isLeft ? "top left" : "top right";
    const positionLeft = isLeft ? "100%" : "-10px";

    return (
        <motion.div
            initial={{ x: xStart }}
            animate={
                animate
                    ? {
                          x: [xStart, xAttack, xStart],
                          rotate: [0, isLeft ? -5 : 5, 0]
                      }
                    : {}
            }
            transition={
                animate
                    ? {
                          repeat: Infinity,
                          duration: 2,
                          repeatType: "loop"
                      }
                    : undefined
            }
            style={{
                position: "relative",
                width: 100,
                height: 100,
                margin: 20,
                transform: `
                    ${isLeft ? "scaleX(1)" : "scaleX(-1)"}
                    ${isDead ? "rotate(90deg)" : ""}
                `,
                filter: isDead ? "grayscale(100%) brightness(1.3)" : undefined
            }}
        >
            {isWinner && (
                <div
                    style={{
                        position: "absolute",
                        top: -35,
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: 24
                    }}
                >
                    🏆
                </div>
            )}
            <div
                style={{
                    backgroundColor: isDead ? "#ccc" : color,
                    width: "100%",
                    height: "100%",
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 20,
                        left: 20,
                        width: 20,
                        height: 20,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        fontWeight: "bold"
                    }}
                >
                    {isDead ? (
                        "X"
                    ) : (
                        <div
                            style={{
                                width: 10,
                                height: 10,
                                backgroundColor: "blue",
                                borderRadius: "50%"
                            }}
                        />
                    )}
                </div>
                <div
                    style={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                        width: 20,
                        height: 20,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        fontWeight: "bold"
                    }}
                >
                    {isDead ? (
                        "X"
                    ) : (
                        <div
                            style={{
                                width: 10,
                                height: 10,
                                backgroundColor: "blue",
                                borderRadius: "50%"
                            }}
                        />
                    )}
                </div>
            </div>
            {!isDead && (
                <motion.div
                    initial={{ rotate: initialRotation }}
                    animate={animate ? { rotate: swingRotation } : {}}
                    transition={
                        animate
                            ? {
                                  repeat: Infinity,
                                  duration: 2,
                                  repeatType: "loop",
                                  ease: "easeInOut"
                              }
                            : undefined
                    }
                    style={{
                        width: 10,
                        height: 50,
                        background: "linear-gradient(to bottom, #aaa, #666)",
                        position: "absolute",
                        bottom: 20,
                        left: positionLeft,
                        transformOrigin,
                        borderRadius: 4,
                        boxShadow: "0 0 4px rgba(0,0,0,0.3)"
                    }}
                />
            )}
        </motion.div>
    );
};
