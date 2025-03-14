import ControlSection from "@/components/control/ControlSection";
import EmailForm from "@/components/control/account/EmailForm";
import PasswordForm from "@/components/control/account/PasswordForm";
import ControlSubpage from "@/components/control/subpage/ControlSubpage";

export default function AccountPage() {
  return (
    <ControlSubpage title="Ustawienia konta">
      <ControlSection title="Zmień hasło">
        <PasswordForm />
      </ControlSection>
      <ControlSection title="Zmień adres e-mail">
        <EmailForm />
      </ControlSection>
    </ControlSubpage>
  );
}
