import { useRouter } from "next/navigation";

interface ControlMenuButtonI {
  iconName?: string;
  url: string;
  name: string;
}

export default function ControlMenuButton({
  iconName = "add",
  url,
  name,
}: ControlMenuButtonI) {
  const router = useRouter();

  return (
    <div className="control-menu-button" onClick={() => router.push(url)}>
      <img
        src={`/control-${iconName}.svg`}
        className="control-menu-button__icon"
        alt={`${name} button icon`}
      />
      <p className="control-menu-button__name">{name}</p>
    </div>
  );
}
