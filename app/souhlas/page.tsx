"use client"

import { useSearchParams } from "next/navigation"

export default function Souhlas() {
    const params = useSearchParams()
    const lang = params.get("lang") || "cs"
    return(
        <main className="p-5">
        {lang === "cs" ? (<>
            <h1 className="text-3xl font-bold text-center py-4">Souhlas se zpracováním osobních údajů pro marketingové účely</h1>
            <ul className="text-base list-disc px-4">Obchodní společnosti LUMIT company s.r.o. se sídlem Český Herálec 136, 592 01 Herálec, identifikační číslo: 26955091, (dále jen „správce“), ve smyslu nařízení Evropského parlamentu a Rady EU 2016/679 zpracovávala tyto osobní údaje:
                <li>Jméno a příjmení,</li>
                <li>e-mail (dále jen „osobní údaje“)</li>
            </ul>
            <ol className="list-decimal px-8 text-base">
            <li><span>Společnost LUMIT company s.r.o. informuje své zákazníky, že mají právo:</span>
                <ul>
                    <li>získat od Správce potvrzení, zda osobní údaje, které se jich týkají, jsou či nejsou zpracovávány, a pokud je tomu tak, mají právo získat přístup k těmto osobním údajům a k následujícím informacím: účely zpracování, kategorie dotčených osobních údajů, příjemci nebo kategorie příjemců, kterým osobní údaje byly nebo budou zpřístupněny, zejména příjemci ve třetích zemích nebo v mezinárodních organizacích, plánovaná doba, po kterou budou osobní údaje uloženy, nebo není-li ji možné určit, kritéria použitá ke stanovení této doby, existence práva požadovat od správce opravu nebo výmaz osobních údajů týkajících se subjektu údajů nebo omezení jejich zpracování a nebo vznést námitku proti tomuto zpracování, právo podat stížnost u dozorového úřadu.</li>
                    <li>aby Správce bez zbytečného odkladu opravil nepřesné osobní údaje, které se jich týkají. S přihlédnutím k účelům zpracování mají právo na doplnění neúplných osobních údajů, a to i poskytnutím dodatečného prohlášení.</li>
                    <li>aby Správce bez zbytečného odkladu vymazal osobní údaje, které se jich týkají, a Správce má povinnost osobní údaje bez zbytečného odkladu vymazat, pokud je dán jeden z těchto důvodů: osobní údaje již nejsou potřebné pro účely, pro které byly shromážděny nebo jinak zpracovány, zákazník odvolá souhlas a není zde jiný legální titul pro jejich zpracování,  osobní údaje byly zpracovány protiprávně, osobní údaje musí být vymazány ke splnění právní povinnosti stanovené v právu Unie nebo členského státu, které se na správce vztahuje.
                    </li>
                    <li>aby Správce omezil zpracování jejich osobních údajů, pokud popírají jejich přesnost na dobu ověření této skutečnosti Správcem, zpracování je protiprávní, a Správce žádají místo výmazu o jejich omezené zpracování, údaje již nejsou potřebné pro účel zpracování, avšak potřebuji je pro určení, výkon nebo obhajobu právních nároků.
                    </li>
                    <li>aby Správce na jejich žádost předal jejich osobní údaje jinému jimi určenému Správci.
                    </li>
                    <li>vznést námitku proti zpracování mých osobních údajů u Správce.</li>
                    <li>v případě pochybností o tom, zda jsou ze strany Správce zpracovávány jejich osobní údaje ve smyslu výše uvedených právních předpisů obrátit se jak na Správce, tak na Úřad pro ochranu osobních údajů.</li>
                   </ul>
                </li>
            </ol>

            <span>v Havlíčkově Brodě dne 29.08.2025</span>
</>) : (<>
            <h1 className="text-3xl  font-bold text-center py-4">Consent to the Processing of Personal Data for Marketing Purposes</h1>
            <ul className="text-base list-disc px-4">The company LUMIT company, s.r.o., registered at Český Herálec 136, 592 01 Herálec, ID number: 26955091, (hereinafter referred to as the “Controller”), within the meaning of Regulation (EU) 2016/679 of the European Parliament and of the Council, processes the following personal data:
                <li>First and last name,</li>
                <li>email (hereinafter referred to as “personal data”)</li>
            </ul>
            <ol className="list-decimal px-8 text-base">
            <li><span>LUMIT company, s.r.o. informs its customers that they have the right to:</span>
                <ul>
                    <li>obtain confirmation from the Controller as to whether or not personal data concerning them is being processed, and, if so, access such personal data and the following information: the purposes of the processing, the categories of personal data concerned, the recipients or categories of recipients to whom the personal data has been or will be disclosed, in particular recipients in third countries or international organizations, the intended period for which the personal data will be stored, or, if not possible, the criteria used to determine that period, the existence of the right to request from the Controller rectification or erasure of personal data or restriction of processing of personal data concerning the data subject or to object to such processing, and the right to lodge a complaint with a supervisory authority.</li>
                    <li>have the Controller correct inaccurate personal data concerning them without undue delay. Taking into account the purposes of the processing, they also have the right to have incomplete personal data completed, including by means of providing a supplementary statement.</li>
                    <li>have the Controller erase personal data concerning them without undue delay, and the Controller shall have the obligation to erase personal data without undue delay if one of the following grounds applies: the personal data is no longer necessary in relation to the purposes for which it was collected or otherwise processed, the customer withdraws consent and there is no other legal ground for the processing, the personal data has been unlawfully processed, the personal data has to be erased for compliance with a legal obligation under Union or Member State law to which the Controller is subject.</li>
                    <li>have the Controller restrict processing where they contest the accuracy of the personal data for a period enabling the Controller to verify the accuracy of the personal data, the processing is unlawful and they oppose the erasure and request the restriction instead, the Controller no longer needs the personal data for the purposes of the processing, but they are required by the data subject for the establishment, exercise or defence of legal claims.</li>
                    <li>have the Controller transmit their personal data to another controller on request.</li>
                    <li>object to the processing of their personal data by the Controller.</li>
                    <li>in case of doubts about the processing of their personal data in accordance with the aforementioned legal regulations, contact both the Controller and the Office for Personal Data Protection.</li>
                </ul>
            </li>
            </ol>

            <span>in Havlíčkův Brod on 29.08.2025</span>
        </>
    )}
    </main>
    )
}