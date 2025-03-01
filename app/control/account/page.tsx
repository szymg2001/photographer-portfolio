import ControlSection from "@/components/control/ControlSection";
import PasswordForm from "@/components/control/account/PasswordForm";
import ControlSubpage from "@/components/control/subpage/ControlSubpage";

export default function AccountPage() {
  return (
    <ControlSubpage title="Ustawienia konta">
      <ControlSection title="Zmień hasło">
        <PasswordForm />
      </ControlSection>
    </ControlSubpage>
  );
}
