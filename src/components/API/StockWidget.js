import React, { useState, useEffect } from "react";
import "./StockWidget.css";

const StockWidget = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Default stocks to track (major tech companies)
  const defaultStocks = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "FB", "AMD"];

  const fetchStockData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const symbols = defaultStocks.join(",");
      const response = await fetch(
        `https://fcsapi.com/api-v3/stock/latest?symbol=${symbols}&access_key=bSvtZH3xxd4YkYUwE66WQrlgLSrr`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status && data.response) {
        // Filter for US market data only to avoid duplicates
        const usStocks = data.response.filter(stock => 
          stock.cty === "united-states" && stock.exch === "NASDAQ"
        );
        
        // If no US stocks found, show any available stocks
        if (usStocks.length === 0) {
          setStockData(data.response);
        } else {
          setStockData(usStocks);
        }
        setLastUpdated(new Date());
      } else {
        setError("Unable to fetch stock data");
      }
    } catch (err) {
      setError("Unable to fetch stock data");
      console.error("Stock API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchStockData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  const getChangeColor = (changePercent) => {
    const change = parseFloat(changePercent);
    return change >= 0 ? "positive" : "negative";
  };

  const getChangeIcon = (changePercent) => {
    const change = parseFloat(changePercent);
    return change >= 0 ? "↗" : "↘";
  };

  if (loading) {
    return (
      <div className="stock-widget">
        <div className="widget-header">
          <h3>Stock Market</h3>
        </div>
        <div className="loading-state">Loading stock data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="stock-widget">
        <div className="widget-header">
          <h3>Stock Market</h3>
        </div>
        <div className="error-state">{error}</div>
        <button onClick={fetchStockData} className="retry-btn">Retry</button>
      </div>
    );
  }

  return (
    <div className="stock-widget">
      <div className="widget-header">
        <h3>Stock Market</h3>
        <div className="stock-controls">
          {lastUpdated && (
            <div className="last-updated">
              Updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
          <button onClick={fetchStockData} className="refresh-btn">↻</button>
        </div>
      </div>
      
      <div className="stock-content">
        {stockData.length === 0 ? (
          <div className="empty-state">
            <p>No stock data available.</p>
          </div>
        ) : (
          <div className="stock-list">
            {stockData.map((stock, index) => (
              <div key={`${stock.s}-${stock.cty}-${index}`} className="stock-item">
                <div className="stock-info">
                  <div className="stock-symbol">{stock.s}</div>
                  <div className="stock-exchange">{stock.exch || stock.cty}</div>
                  <div className="stock-price">
                    {stock.ccy === "USD" ? "$" : stock.ccy === "EUR" ? "€" : stock.ccy === "MXN" ? "MXN " : ""}
                    {formatPrice(stock.c)}
                  </div>
                </div>
                <div className={`stock-change ${getChangeColor(stock.cp)}`}>
                  <span className="change-icon">{getChangeIcon(stock.cp)}</span>
                  <span className="change-amount">{stock.ch}</span>
                  <span className="change-percent">({stock.cp})</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StockWidget; 