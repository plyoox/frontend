"use client";

import { useEffect, useState } from "react";
import classes from "@/styles/legal.module.css";

function Page() {
  const hasWindow = typeof window !== "undefined";

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(hasWindow);
  }, [hasWindow]);

  if (!isClient) return <h1>Legal notice</h1>;

  return (
    <div className={classes.legal} style={{ background: "white", color: "black", padding: "10px" }}>
      <a href="#english">English Version (Translated with DeepL)</a>

      <div>
        <h1 className={"text-xl"}>Impressum</h1>

        <p>
          Informationspflicht laut §5 E-Commerce Gesetz, §63 Gewerbeordnung, §14 Unternehmensgesetzbuch und
          Offenlegungspflicht laut §25 Mediengesetz
        </p>

        <ul className={"list-disc pl-5"}>
          <li>Johannes Greuter</li>
          <li>Wiesengasse 8</li>
          <li>6020 Innsbruck</li>
          <li>Österreich</li>
        </ul>
        <p>
          Tel: +4367761071587 <br /> E-Mail: <a href="mailto:mail%40greuter.dev">mail@greuter.dev</a>
        </p>

        <div>
          <h2>Copyright &amp; Urheberrechtshinweis</h2>
          <p>
            Alle Inhalte dieser Webpräsenz, insbesondere Texte und Logo sind urheberrechtlich geschützt und teilweise
            lizensiert. Das Urheberrecht liegt, soweit nicht ausdrücklich anders gekennzeichnet, bei der im Impressum
            angeführten natürlichen bzw. juristischen Person. Bitte fragen Sie uns, falls Sie die Inhalte dieses
            Internetangebotes in irgendeiner Art und Weise verwenden möchten.
          </p>
          <p>
            Unter der „Creative Commons“-Lizenz“ veröffentlichte Inhalte, sind als solche gekennzeichnet. Sie dürfen
            entsprechend den angegebenen Lizenzbedingungen verwendet werden.
          </p>
          <p>
            Wer gegen das Urheberrecht verstößt (z.B. Bilder oder Texte unerlaubt kopiert), macht sich unter Umständen
            gem. UrhG strafbar.
          </p>
        </div>

        <div>
          <h2>Haftungsausschluss für ausgehende Links</h2>
          <p>
            Diese Webpräsenz enthält, so wie viele andere Webseiten ebenfalls, so genannte Links auf andere, fremde
            Webpräsenzen und Inhalte. Das wird als Urgedanke des Internets und des weltweiten Informationsaustauschs als
            gang und gäbe angesehen. Rechtlich und technisch gesehen haben wir als Betreiber unserer Webseite keinen
            Einfluss auf die Gestaltung sowie den Inhalt der verlinkten Webpräsenzen. Aus diesem Grund können wir zu
            keinem Zeitpunkt für diese Webpräsenzen in irgendeiner Art und Weise Haftung oder Gewähr übernehmen, da
            diese im Verantwortungsbereich des jeweiligen Betreibers angesiedelt ist.
          </p>
          <p>
            Zum Zeitpunkt der Verlinkung wurden die fremden Inhalte auf Funktionalität, rechtswidrige Inhalte sowie uns
            möglich auf Schadsoftware überprüft. Als Indiz finden Sie bei einigen Links einen Datumsstempel der auf den
            Zeitpunkt der gesetzten Verlinkung hinweist. Nichts desto trotz sind wir bemüht unsere Besucher vor
            rechtswidrigen Inhalten und Schadsoftware zu schützen weshalb wir stichprobenartig die gesetzten Links in
            wiederkehrenden Intervallen untersuchen. Bei etwaigen Rechtsverletzungen werden die gesetzten Links
            selbstverständlich umgehend entfernt.
          </p>
          <p>
            Sollten Sie einen derartigen Link vor unserer Überprüfung gefunden haben, so bitten wir um umgehende
            Benachrichtigung an die im Impressum angezeigten Kontaktdaten. Bitte übermitteln Sie uns dabei den Link
            unserer Webseite die den fragwürdigen Verweis enthält, sowie die Art der Kennzeichnung (a) rechtwidriger
            Inhalt, b) Schadsoftware oder c) inaktiver Inhalt bzw. Verweis).
          </p>
        </div>

        <div>
          <h2>Ihre Rechte</h2>
          <p>
            Ihnen stehen bezüglich Ihrer bei uns gespeicherten Daten grundsätzlich die Rechte auf Auskunft,
            Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenn Sie glauben,
            dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen
            Ansprüche sonst in einer Weise verletzt worden sind, können Sie sich bei der oben genannten E-Mail-Adresse
            oder Ihrer Datenschutzbehörde beschweren.
          </p>
        </div>

        <div>
          <h2>Teilnahme an Online-Streitbeilegung laut AStG und ODR-VO</h2>
          <p>
            Verbraucher haben die Möglichkeit, Beschwerden direkt an unsere oben genannte E-Mail bzw. Postadresse zu
            richten oder über eine Online-Streitbeilegungsplattform zu melden. Darüber möchten wir Sie gemäß dem
            Alternative-Streitbeilegung-Gesetz (AStG) und der EU-Verordnung Online-Streitbeilegung (ODR-VO) gerne
            informieren.
          </p>
          <p>
            Weiters möchten wir Sie darauf hinweisen, dass die Teilnahme an einer Online-Streitbeilegungsplattform nicht
            verpflichtend ist, sondern lediglich auf freiwilliger Basis erfolgt. Da wir der Überzeugung sind, dass
            Streitereien jedoch weder für die eine, noch für die andere Partei sinnvoll und wir um Lösungen bemüht sind,
            bieten wir Ihnen folgende Plattformen zur Meldung an:
          </p>
          <ul>
            <li>
              <a href="https://ec.europa.eu/odr" target="_blank">
                Online-Streitschlichtungsplattform nach Art 14 ODR-VO
              </a>
            </li>
          </ul>
        </div>
      </div>

      <br />
      <br />
      <div id="english">
        <h1>Legal Notice</h1>
        <p>
          Information obligation according to §5 E-Commerce Act, §63 Industrial Code, §14 Company Code and disclosure
          obligation according to §25 Media Act
        </p>
        <p>
          Johannes Greuter <br />
          Wiesengasse 8 <br />
          6020 Innsbruck <br />
          Austria
        </p>
        <p>
          Tel: +4367761071587 <br /> E-Mail: <a href="mailto:mail%40greuter.dev">mail@greuter.dev</a>
        </p>
        <div>
          <h2>Copyright &amp; Copyright notice</h2>
          <p>
            All contents of this website, especially texts and logo are protected by copyright and partly licensed.
            Unless otherwise expressly indicated, the copyright belongs to the natural or legal person listed in the
            imprint. Please contact us if you wish to use the contents of this website in any way.
          </p>
          <p>
            Content published under the &quot;Creative Commons&quot; license is marked as such. They may be used in
            accordance with the stated license conditions.
          </p>
          <p>
            Whoever violates copyright (e.g. copies images or texts without permission), may be liable to prosecution
            according to UrhG.
          </p>
          <h2>Disclaimer for outgoing links</h2>
          <p>
            This website, like many other websites, contains so-called links to other, external websites and content.
            This is considered to be the original idea of the Internet and the worldwide exchange of information.
            Legally and technically, we as the operator of our website have no influence on the design and content of
            the linked websites. For this reason, we cannot assume any liability or guarantee for these websites at any
            time, as this is the responsibility of the respective operator.
          </p>

          <p>
            At the time of linking, the external content was checked for functionality, illegal content and, if
            possible, for malware. As an indication, you will find a date stamp on some links that indicates the time
            the link was set. Nevertheless, we strive to protect our visitors from illegal content and malware, which is
            why we randomly examine the links set at recurring intervals. In the event of any infringements, the links
            will of course be removed immediately.
          </p>

          <p>
            If you should have found such a link before our examination, we ask for immediate notification to the
            contact data indicated in the imprint. In doing so, please provide us with the link to our website that
            contains the questionable reference, as well as the type of marking (a) illegal content, b) malware or c)
            inactive content or reference).
          </p>
        </div>
        <div>
          <h2>Your rights</h2>
          <p>
            You have the right to request information about your data stored at our website. If you have any questions
            concerning your data, please contact us at the e-mail address or contact data indicated in the imprint.
          </p>
        </div>
        <div>
          <h2>Participation in online dispute resolution</h2>
          <p>
            Consumers have the right to participate in online dispute resolution according to the Alternative Dispute
            Resolution (ADR) and the EU Resolution (ODR) on the basis of the European Commission&apos;s website:
          </p>
          <ul>
            <li>
              <a href="https:///ec.europa.eu/odr" target="_blank">
                Online Dispute Resolution Platform according to Art 14 ODR-VO
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <p>
          <small>
            Generiert mit dem kostenlosen und einfachen{" "}
            <a href="https://idigit.onl/" target="_blank">
              Impressum Generator von idigIT e.U.
            </a>
          </small>
        </p>
      </div>
    </div>
  );
}

export default Page;
