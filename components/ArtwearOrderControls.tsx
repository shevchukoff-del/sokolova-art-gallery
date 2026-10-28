"use client";

import { useState } from "react";
import ArrowIcon from "./ArrowIcon";

type Props = {
  actionLabel: string;
  actionUrl: string;
  sizes?: string[];
};

export default function ArtwearOrderControls({ actionLabel, actionUrl, sizes }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const hasSizes = Boolean(sizes?.length);
  const href = selectedSize
    ? `${actionUrl}&body=${encodeURIComponent(`Размер: ${selectedSize}`)}`
    : actionUrl;

  return (
    <div className="artwear-order-controls">
      {hasSizes && (
        <fieldset className="artwear-size-picker">
          <legend>Размер</legend>
          <div>
            {sizes?.map((size) => (
              <button
                className={selectedSize === size ? "is-selected" : ""}
                type="button"
                aria-pressed={selectedSize === size}
                onClick={() => setSelectedSize(size)}
                key={size}
              >
                {size}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {hasSizes && !selectedSize ? (
        <button className="site-primary-cta artwear-order-button" type="button" disabled>
          <span>Выберите размер</span><i aria-hidden="true"><ArrowIcon /></i>
        </button>
      ) : (
        <a className="site-primary-cta artwear-order-button" href={href}>
          <span>{actionLabel}</span><i aria-hidden="true"><ArrowIcon /></i>
        </a>
      )}
    </div>
  );
}
