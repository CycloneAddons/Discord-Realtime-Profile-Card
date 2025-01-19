import React, { useState, useEffect } from 'react';
import effectConfig from './profile-effects.json'; 
import { LoopEffect, NormalEffect } from './ProfileEffectClasses'; 

const EffectRenderer = ({ selectedId, atroposO }) => {
  const [activeEffects, setActiveEffects] = useState([]);
  const [atropos] = useState(atroposO);
  useEffect(() => {
    const selectedEffect = effectConfig.find(effect => effect.id === selectedId);

    if (!selectedEffect) {
      return;
    }

    const effects = selectedEffect.effects.map(effect => {
      const EffectClass = effect.loop ? LoopEffect : NormalEffect;
      return new EffectClass(effect);
    });

    setActiveEffects(effects);
  }, [selectedId]);

  useEffect(() => {
    if (!activeEffects.length) return;

    const updateEffects = () => {
      const now = performance.now();
      activeEffects.forEach(effect => effect.update(now));
      setActiveEffects([...activeEffects]);
      requestAnimationFrame(updateEffects);
    };

    const animationFrame = requestAnimationFrame(updateEffects);
    return () => cancelAnimationFrame(animationFrame);
  }, [activeEffects]);

  return (
    <div style={{ position: 'relative'}}>
      {activeEffects
        .filter(effect => effect.isVisible)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((effect, index) => (
          <img
            key={index}
            src={effect.src}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: "100%",
              objectFit: "cover",
              zIndex: effect.zIndex,
            }}
            alt="Effect"
            data-atropos-offset={atropos}
          />
        ))}
    </div>
  );
};

export default EffectRenderer;
