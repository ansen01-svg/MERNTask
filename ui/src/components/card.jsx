export default function Card(props) {
  const { icon, title, data, iconColor, iconBgColor } = props;

  return (
    <div className="w-full p-3 text-primaryLight bg-primary flex items-start justify-start gap-2 border-solid border-[1px] border-slate-300 rounded-sm shadow">
      <div
        className={`px-3 py-2 bg-${iconBgColor} rounded-sm text-${iconColor}`}
      >
        {icon}
      </div>

      <div className="text-[12px] text-start">
        <h1 className="font-medium">{title}</h1>
        <p className="text-left">{data}</p>
      </div>
    </div>
  );
}
