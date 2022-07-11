import "./CryptoParam.css";

interface CryptoParamProps {
  tokens: any;
  param: string;
}

const CryptoParam: React.FC<CryptoParamProps> = ({ tokens, param }) => {
  return (
    <div className="param-container">
      <h1>{param}</h1>
      {tokens[1].map((el: any, i: number) => (
        <div key={i}>
          {param === "price" ||
          param === "base_volume" ||
          param === "quote_volume"
            ? parseInt(el[1][`${param}`]).toFixed(4)
            : el[1][`${param}`]}
        </div>
      ))}
    </div>
  );
};

export default CryptoParam;
