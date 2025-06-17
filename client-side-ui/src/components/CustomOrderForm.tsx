// src/components/CustomOrderForm.tsx
import React, { useState } from "react";

interface Props {
  onSubmit: (item: string) => void;
  onClose: () => void;
}

const CustomOrderForm: React.FC<Props> = ({ onSubmit, onClose }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit(input.trim());
      setInput("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add a Custom Drink</h2>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Describe your custom drink..."
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-600">Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomOrderForm;
