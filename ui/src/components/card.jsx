const allowedColors = {
  red1: "red-300",
  red2: "red-600",
  purple1: "purple-300",
  purple2: "purple-600",
  orange1: "orange-300",
  orange2: "orange-600",
};

export default function Card(props) {
  const { icon, title, data, iconColor, iconBgColor } = props;

  const bgClass = allowedColors[iconBgColor] || "red-300";
  const textClass = allowedColors[iconColor] || "red-600";

  return (
    <div className="w-full p-3 text-primaryLight bg-primary flex items-start justify-start gap-2 border-solid border-[1px] border-slate-300 rounded-sm shadow">
      <div className={`px-3 py-2 bg-${bgClass} rounded-sm text-${textClass}`}>
        {icon}
      </div>

      <div className="text-[12px] text-start">
        <h1 className="font-medium">{title}</h1>
        <p className="text-left">{data}</p>
      </div>
    </div>
  );
}
