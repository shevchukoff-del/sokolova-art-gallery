"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const pigments = [
  { name: "Коралл", rgb: [224, 99, 83] as const },
  { name: "Лазурный", rgb: [45, 127, 181] as const },
  { name: "Солнечный жёлтый", rgb: [231, 172, 52] as const },
  { name: "Свежий зелёный", rgb: [91, 151, 102] as const },
  { name: "Сиреневый", rgb: [148, 103, 171] as const },
] as const;

export default function Watercolor404() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const previousPoint = useRef<{ x: number; y: number } | null>(null);
  const pigmentRef = useRef(0);
  const [activePigment, setActivePigment] = useState(0);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      const nextWidth = Math.round(width * scale);
      const nextHeight = Math.round(height * scale);
      if (canvas.width === nextWidth && canvas.height === nextHeight) return;
      canvas.width = nextWidth;
      canvas.height = nextHeight;
      canvas.getContext("2d")?.setTransform(scale, 0, 0, scale, 0, 0);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  const paintDab = useCallback((x: number, y: number, pressure: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const [red, green, blue] = pigments[pigmentRef.current].rgb;
    const radius = 28 + Math.max(.25, pressure) * 40;
    context.save();
    context.globalCompositeOperation = "multiply";

    for (let layer = 0; layer < 6; layer += 1) {
      const layerRadius = radius * (.72 + Math.random() * .6);
      const offsetX = (Math.random() - .5) * radius * .42;
      const offsetY = (Math.random() - .5) * radius * .42;
      const gradient = context.createRadialGradient(
        x + offsetX,
        y + offsetY,
        layerRadius * .08,
        x + offsetX,
        y + offsetY,
        layerRadius,
      );
      gradient.addColorStop(0, `rgba(${red}, ${green}, ${blue}, .024)`);
      gradient.addColorStop(.58, `rgba(${red}, ${green}, ${blue}, .013)`);
      gradient.addColorStop(.86, `rgba(${red}, ${green}, ${blue}, .005)`);
      gradient.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`);
      context.fillStyle = gradient;
      context.fillRect(
        x + offsetX - layerRadius,
        y + offsetY - layerRadius,
        layerRadius * 2,
        layerRadius * 2,
      );
    }

    context.restore();
  }, []);

  const paintTo = useCallback((x: number, y: number, pressure: number) => {
    const previous = previousPoint.current;
    if (!previous) {
      paintDab(x, y, pressure);
      previousPoint.current = { x, y };
      return;
    }

    const distance = Math.hypot(x - previous.x, y - previous.y);
    const steps = Math.max(1, Math.ceil(distance / 12));
    for (let step = 1; step <= steps; step += 1) {
      const progress = step / steps;
      paintDab(
        previous.x + (x - previous.x) * progress,
        previous.y + (y - previous.y) * progress,
        pressure,
      );
    }
    previousPoint.current = { x, y };
  }, [paintDab]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="not-found-canvas"
        aria-label="Интерактивный акварельный холст. Рисуйте пальцем или курсором."
        onPointerDown={(event) => {
          drawing.current = true;
          previousPoint.current = null;
          event.currentTarget.setPointerCapture(event.pointerId);
          paintTo(event.clientX, event.clientY, event.pressure || .55);
        }}
        onPointerMove={(event) => {
          if (!drawing.current) return;
          paintTo(event.clientX, event.clientY, event.pressure || .55);
        }}
        onPointerUp={(event) => {
          drawing.current = false;
          previousPoint.current = null;
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => {
          drawing.current = false;
          previousPoint.current = null;
        }}
      />
      <div className="not-found-tools" aria-label="Инструменты акварели">
        <div className="not-found-pigments">
          {pigments.map((pigment, index) => (
            <button
              className={activePigment === index ? "is-active" : undefined}
              type="button"
              aria-label={pigment.name}
              aria-pressed={activePigment === index}
              style={{ "--pigment": `rgb(${pigment.rgb.join(", ")})` } as CSSProperties}
              onClick={() => {
                pigmentRef.current = index;
                setActivePigment(index);
              }}
              key={pigment.name}
            />
          ))}
        </div>
        <button className="not-found-clear" type="button" onClick={clearCanvas}>Очистить</button>
      </div>
    </>
  );
}
