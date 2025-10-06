import { Switch } from "./ui/switch";

const PermissionToggle = ({
  icon,
  label,
  checked,
  onChange,
}: {
  icon: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <div className="py-3 pr-3 pl-4 flex items-center justify-between rounded-xl border border-bluePrimary">
    <div className="flex items-center gap-2">
      <img src={icon} alt={label} />
      <span className="text-sm font-medium">{label}</span>
    </div>
    <Switch id={label} checked={checked} onCheckedChange={onChange} />
  </div>
);

export default PermissionToggle;