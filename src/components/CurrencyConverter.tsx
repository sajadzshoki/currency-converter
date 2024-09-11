import React, { useState } from "react";

const exchangeRates: { [key: string]: number } = {
  USD: 1,
  IRR: 59000, // 1 USD = 59,000 Toman
  EUR: 0.85, // 1 USD = 0.85 Euro
};

const CurrencyConverter2: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("IRR");
  const [amount, setAmount] = useState<number>(0);
  const [convertedAmount, setConvertedAmount] = useState<string>("0");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
    convertCurrency(parseFloat(e.target.value), fromCurrency, toCurrency);
  };
  const handleFromCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = e.target.value;
    setFromCurrency(selectedCurrency);
    convertCurrency(amount, selectedCurrency, toCurrency);
  };
  const handleToCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = e.target.value;
    setToCurrency(selectedCurrency);
    convertCurrency(amount, selectedCurrency, fromCurrency);
  };

  const convertCurrency = (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ) => {
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    const converted = ((amount / fromRate) * toRate).toLocaleString();
    setConvertedAmount(converted);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-gray-400 to-gray-500">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-10 tracking-wide">
          Currency Converter
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xl text-gray-700 font-medium mb-2">
              From:
            </label>
            <select
              value={fromCurrency}
              onChange={handleFromCurrency}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-green-400 transition-all duration-300 mb-4"
            >
              <option value="IRR">Iranian Rial (IRR)</option>
              <option value="USD">US Dollar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
            </select>

            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-green-400 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-xl text-gray-700 font-medium mb-2">
              To:
            </label>
            <select
              value={toCurrency}
              onChange={handleToCurrency}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 mb-4"
            >
              <option value="USD">US Dollar (USD)</option>
              <option value="IRR">Iranian Rial (IRR)</option>
              <option value="EUR">Euro (EUR)</option>
            </select>

            <input
              type="text"
              value={convertedAmount}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed shadow-sm"
              placeholder="Converted amount"
            />
          </div>
        </div>
        <div className="text-center mt-8">
          <span className="text-lg text-gray-600 font-medium">
            1 {fromCurrency} =
            {(
              (1 / exchangeRates[fromCurrency]) *
              exchangeRates[toCurrency]
            ).toFixed(5)}
            {toCurrency}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter2;
