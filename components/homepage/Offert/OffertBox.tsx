import CornerBox from "@/components/CornerBox";

interface OffertBoxI {
  icon?: string;
  title: string;
  children: React.ReactNode;
}
export function OffertBox({ icon = "", title, children }: OffertBoxI) {
  return (
    <div className="offert-box">
      <img src={icon} className="offert-box__icon" />
      <h6 className="offert-box__title">{title}</h6>
      <p className="offert-box__content">{children}</p>
    </div>
  );
}
