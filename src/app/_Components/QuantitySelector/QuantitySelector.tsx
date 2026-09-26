"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

interface QuantitySelectorProps {
  stockQuantity: number;
}

export default function QuantitySelector({
  stockQuantity,
}: QuantitySelectorProps) {
  const [qty, setQty] = useState<number>(1);

  const increment = () => {
    if (qty < stockQuantity) setQty((prev) => prev + 1);
  };

  const decrement = () => {
    if (qty > 1) setQty((prev) => prev - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      if (val < 1) setQty(1);
      else if (val > stockQuantity) setQty(stockQuantity);
      else setQty(val);
    } else {
      setQty(1);
    }
  };

  return (
    <div className="mb-6">
      <span className="block text-xs font-semibold text-gray-700 mb-2">
        Quantity
      </span>
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50">
          <button
            type="button"
            onClick={decrement}
            disabled={qty <= 1 || stockQuantity === 0}
            className="px-3.5 py-2 text-gray-500 hover:bg-gray-100 transition text-xs disabled:opacity-30 cursor-pointer"
            aria-label="Decrease quantity"
          >
            <FaMinus />
          </button>

          <input
            type="number"
            value={qty}
            onChange={handleChange}
            min={1}
            max={stockQuantity}
            disabled={stockQuantity === 0}
            className="w-12 text-center text-sm font-semibold text-gray-800 bg-white border-x border-gray-200 py-1.5 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />

          <button
            type="button"
            onClick={increment}
            disabled={qty >= stockQuantity || stockQuantity === 0}
            className="px-3.5 py-2 text-gray-500 hover:bg-gray-100 transition text-xs disabled:opacity-30 cursor-pointer"
            aria-label="Increase quantity"
          >
            <FaPlus />
          </button>
        </div>

        <span className="text-xs text-gray-400 font-medium">
          {stockQuantity} available
        </span>
      </div>
    </div>
  );
}
