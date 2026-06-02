import DonateHero from "@/components/Donations/DonateHero";
import DonationLogistics from "@/components/Donations/DonationLogistics";
import DonorImpact from "@/components/Donations/DonorImpact";
import DonorRegistration from "@/components/Donations/DonorRegistration";
import EligibilityChecker from "@/components/Donations/EligibilityChecker";


export default function Page() {
    return (
        <>
        <DonateHero/>
        <EligibilityChecker/>
        <DonorRegistration/>
        <DonationLogistics/>
        <DonorImpact/>
        </>
    )
}