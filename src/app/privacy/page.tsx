"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import classes from "@/styles/legal.module.css";

function Page() {
  const hasWindow = typeof window !== "undefined";

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(hasWindow);
  }, [hasWindow]);

  if (!isClient) return null;

  return (
    <div className={classes.legal} style={{ color: "black", background: "white", padding: "10px" }}>
      <div className="ce_text privacy_item general_part1 block">
        <h1>Datenschutzerklärung</h1>
        <Link href="legal-notice">https://plyoox.net/legal-notice</Link>
      </div>

      <div className="ce_text privacy_item general_part3 block">
        <div className="text">
          <h2>Ihre Rechte nach der DSGVO</h2>
          <p>
            Nach der DSGVO stehen Ihnen die nachfolgend aufgeführten Rechte zu, die Sie jederzeit bei dem in Ziffer 1.
            dieser Datenschutzerklärung genannten Verantwortlichen geltend machen können:
          </p>
          <ul>
            <li>
              <strong>Recht auf Auskunft:</strong> Sie haben das Recht, von uns Auskunft darüber zu verlangen, ob und
              welche Daten wir von Ihnen verarbeiten.
            </li>
            <li>
              <strong>Recht auf Berichtigung:</strong> Sie haben das Recht, die Berichtigung unrichtiger oder
              Vervollständigung unvollständiger Daten zu verlangen.
            </li>
            <li>
              <strong>Recht auf Löschung:</strong> Sie haben das Recht, die Löschung Ihrer Daten zu verlangen.
            </li>
            <li>
              <strong>Recht auf Einschränkung:</strong> Sie haben in bestimmten Fällen das Recht zu verlangen, dass wir
              Ihre Daten nur noch eingeschränkt bearbeiten.
            </li>
            <li>
              <strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das Recht zu verlangen, dass wir Ihnen oder
              einem anderen Verantwortlichen Ihre Daten in einem strukturierten, gängigen und maschinenlesebaren Format
              übermitteln.
            </li>
            <li>
              <strong>Beschwerderecht</strong>: Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren.
              Zuständig ist die Aufsichtsbehörde Ihres üblichen Aufenthaltsortes, Ihres Arbeitsplatzes oder unseres
              Firmensitzes.
            </li>
          </ul>
          <h3>Widerrufsrecht</h3>
          <p>Sie haben das Recht, die von Ihnen erteilte Einwilligung zur Datenverarbeitung jederzeit zu widerrufen.</p>
          <h3>Widerspruchsrecht</h3>
          <p>
            Sie haben das Recht, jederzeit gegen die Verarbeitung Ihrer Daten, die wir auf unser berechtigtes Interesse
            nach Art. 6 Abs. 1 lit. f DSGVO stützen, Widerspruch einzulegen. Sofern Sie von Ihrem Widerspruchsrecht
            Gebrauch machen, bitten wir Sie um die Darlegung der Gründe. Wir werden Ihre personenbezogenen Daten dann
            nicht mehr verarbeiten, es sei denn, wir können Ihnen gegenüber nachweisen, dass zwingende schutzwürdige
            Gründe an der Datenverarbeitung Ihre Interessen und Rechte überwiegen.
          </p>
          <p>
            <span style={{ textDecoration: "underline" }}>
              <strong>
                Unabhängig vom vorstehend Gesagten, haben Sie das jederzeitige Recht, der Verarbeitung Ihrer
                personenbezogenen Daten für Zwecke der Werbung und Datenanalyse zu widersprechen.
              </strong>
            </span>
          </p>
          <p>Ihren Widerspruch richten Sie bitte an die oben angegebene Kontaktadresse des Verantwortlichen.</p>
          <h2>Wann löschen wir Ihre Daten?</h2>
          <p>
            Wir löschen Ihre Daten dann, wenn wir diese nicht mehr brauchen oder Sie uns dies vorgeben. Das bedeutet,
            dass - sofern sich aus den einzelnen Datenschutzhinweisen dieser Datenschutzerklärung nichts anderes ergibt
            - wir Ihre Daten löschen,
          </p>
          <ul>
            <li>
              wenn der Zweck der Datenverarbeitung weggefallen ist und damit die jeweilige in den einzelnen
              Datenschutzhinweisen genannte Rechtsgrundlage nicht mehr besteht, also bspw.
              <ul>
                <li>
                  nach Beendigung der zwischen uns bestehenden vertraglichen oder mitgliedschaftlichen Beziehungen (Art.
                  6 Abs. 1 lit. a DSGVO) oder
                </li>
                <li>
                  nach Wegfall unseres berechtigten Interesses an der weiteren Verarbeitung oder Speicherung Ihrer Daten
                  (Art. 6 Abs. 1 lit. f DSGVO),
                </li>
              </ul>
            </li>
            <li>
              wenn Sie von Ihrem Widerrufsrecht Gebrauch machen und keine anderweitige gesetzliche Rechtsgrundlage für
              die Verarbeitung im Sinne von Art. 6 Abs. 1 lit. b-f DSGVO eingreift,
            </li>
            <li>
              wenn Sie vom Ihrem Widerspruchsrecht Gebrauch machen und der Löschung keine zwingenden schutzwürdigen
              Gründe entgegenstehen.
            </li>
          </ul>
          <p>
            Sofern wir (bestimmte Teile) Ihre(r) Daten jedoch noch für andere Zwecke vorhalten müssen, weil dies etwa
            steuerliche Aufbewahrungsfristen (in der Regel 6 Jahre für Geschäftskorrespondenz bzw. 10 Jahre für
            Buchungsbelege) oder die Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen aus vertraglichen
            Beziehungen (bis zu vier Jahren) erforderlich machen oder die Daten zum Schutz der Rechte einer anderen
            natürlichen oder juristischen Person gebraucht werden, löschen wir (den Teil) Ihre(r) Daten erst nach Ablauf
            dieser Fristen. Bis zum Ablauf dieser Fristen beschränken wir die Verarbeitung dieser Daten jedoch auf diese
            Zwecke (Erfüllung der Aufbewahrungspflichten).
          </p>
        </div>
      </div>
      <div className="ce_text privacy_item general_part2 block">
        <div className="text">
          <h2>Authentisierungsprovider</h2>
          <p>
            Unsere Webseite speichert keine personalisierten Daten. Alle Daten werden von externen Providern gespeichert
            und können nur teilweise von uns aufgerufen werden. Diese Daten können beim Einloggen angesehen werden und
            müssen bestätigt werden.
          </p>

          <p>Die folgenden Provider werden verwendet:</p>

          <h3>Discord</h3>
          <p>
            <a href="https://discord.com/privacy">https://discord.com/privacy</a>
          </p>

          <h3>Twitch</h3>
          <p>
            <a href="https://www.twitch.tv/p/de-de/legal/privacy-notice/">
              https://www.twitch.tv/p/de-de/legal/privacy-notice/
            </a>
          </p>
        </div>
      </div>
      <div className="ce_text privacy_item general_part2 block">
        <div className="text">
          <h2>Cookies</h2>
          <p>
            Unsere Internetseite nutzt Cookies. Bei Cookies handelt es sich um kleine Textdateien, bestehend aus einer
            Reihe von Zahlen und Buchstaben, die auf dem von Ihnen genutzten Endgerät abgelegt und gespeichert werden.
            Cookies dienen vorrangig dazu, Informationen zwischen dem von Ihnen genutzten Endgerät und unserer Webseite
            auszutauschen. Hierzu gehören u. a. die Spracheinstellungen auf einer Webseite, der Login-Status oder die
            Stelle, an der ein Video geschaut wurde.
          </p>
          <p>Beim Besuch unserer Webseiten werden zwei Typen von Cookies eingesetzt:</p>
          <ul>
            <li>
              <strong>Temporäre Cookies (Session Cookies):</strong> Diese speichern eine sogenannte Session-ID, mit
              welcher sich verschiedene Anfragen Ihres Browsers der gemeinsamen Sitzung zuordnen lassen. Die
              Session-Cookies werden gelöscht, wenn Sie sich ausloggen oder Ihren Browser schließen.
            </li>
            <li>
              <strong>Permanente Cookies: </strong>Permanente Cookies bleiben auch nach dem Schließen des Browsers
              gespeichert. Dadurch erkennt unsere Webseite Ihren Rechner wieder, wenn Sie auf unsere Webseite
              zurückkehren. In diesen Cookies werden beispielsweise Informationen zu Spracheinstellungen oder
              Log-In-Informationen gespeichert. Außerdem kann mit diesen Cookies Ihr Surfverhalten dokumentiert und
              gespeichert werden. Diese Daten können zu Statistik-, Marketing- und Personalisierungs-Zwecken verwendet
              werden.
            </li>
          </ul>
          <p>
            Neben der vorstehenden Einteilung können Cookies auch im Hinblick auf ihren Einsatzzweck unterschieden
            werden:
          </p>
          <ul>
            <li>
              <strong>Notwendige Cookies:</strong> Dies sind Cookies, die für den Betrieb unserer Webseite unbedingt
              erforderlich sind, um Logins oder Warenkörbe für die Dauer Ihrer Sitzung zu speichern oder Cookies, die
              aus Sicherheitsgründen gesetzt werden.
            </li>
            <li>
              <strong>Sonstige-Cookies:</strong> Dies sind Cookies, die für Analysezwecke oder die Reichweitenmessung
              eingesetzt werden. Über solche Tracking-Cookies können insbesondere Informationen zu eingegebenen
              Suchbegriffen oder die Häufigkeit von Seitenaufrufen gespeichert sein. Soweit wir Dienste nutzen, über die
              Cookies zu Statistik-, Marketing-Zwecken auf Ihrem Endgerät gespeichert werden, informieren wir Sie hierzu
              gesondert in den nachfolgenden Abschnitten unserer Datenschutzerklärung oder im Rahmen der Einholung Ihrer
              Einwilligung.
            </li>
          </ul>
          <p>
            <strong>Betroffene Daten:</strong>
          </p>
          <ul>
            <li>Nutzungsdaten (bspw. Zugriffszeiten, angeklickte Webseiten)</li>
            <li>Kommunikationsdaten (bspw. Informationen über das genutzte Gerät, IP-Adresse).</li>
          </ul>
          <p>
            <strong>Betroffene Personen: </strong>Nutzer unserer Onlineangebote
          </p>
          <p>
            <strong>Verarbeitungszweck: </strong>Ausspielen unserer Internetseiten, Gewährleistung des Betriebs unserer
            Internetseiten, Verbesserung unseres Internetangebotes, Kommunikation und Marketig
          </p>
          <p>
            <strong>
              Rechtsgrundlage:
              <br />
              Berechtigtes Interesse, Art. 6 Abs. 1 lit. f DSGVO
            </strong>
            <br />
            Sofern wir von Ihnen keine Einwilligung in das Setzen der Cookies einholen, stützen wir die Verarbeitung
            Ihrer Daten auf unser berechtigtes Interesse, die Qualität und Benutzerfreundlichkeit unseres
            Internetauftritts, insbesondere der Inhalte und Funktionen zu verbessern. Sie haben über die
            Sicherheitseinstellungen Ihres Browsers, dem Einsatz der von uns im Rahmen unseres berechtigten Interesses
            gesetzten Cookies zu widersprechen. Dort haben Sie die Möglichkeit festzulegen, ob Sie etwa von vornherein
            keine oder nur auf Nachfrage Cookies akzeptieren oder aber festlegen, dass Cookies nach jedem Schließen
            Ihres Browsers gelöscht werden. Werden Cookies für unsere Webseite deaktiviert, können möglicherweise nicht
            mehr alle Funktionen der Webseite vollumfänglich genutzt werden.
          </p>
        </div>
      </div>
      <div className="ce_text privacy_item external_hosting block">
        <div className="text">
          <h2>Hosting</h2>
          <p>
            Wir bedienen uns zum Vorhalten unserer Internetseiten eines Anbieters, auf dessen Server unsere
            Internetseiten gespeichert und für den Abruf im Internet verfügbar gemacht werden (Hosting). Hierbei können
            von dem Anbieter all diejenigen über den von Ihnen genutzten Browser übertragenen Daten verarbeitet werden,
            die bei der Nutzung unserer Internetseiten anfallen. Hierzu gehören insbesondere Ihre IP-Adresse, die der
            Anbieter benötigt, um unser Online-Angebot an den von Ihnen genutzten Browser ausliefern zu können sowie
            sämtliche von Ihnen über unsere Internetseite getätigten Eingaben. Daneben kann der von uns genutzte
            Anbieter&nbsp;&nbsp;
          </p>
        </div>
        <div className="ce_text block">
          <div className="text">
            <h3>Hetzner Online</h3>
            <p>
              Wir hosten unsere Website bei Hetzner. Anbieter ist die Hetzner Online GmbH, Industriestr. 25, 91710
              Gunzenhausen (nachfolgend Hetzner).
              <br />
              Details entnehmen Sie der Datenschutzerklärung von Hetzner:
              <a href="https://www.hetzner.de/rechtliches/datenschutz">
                https://www.hetzner.de/rechtliches/datenschutz
              </a>
              .
              <br />
              <br />
              Die Verwendung von Hetzner erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein
              berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website. Sofern eine
              entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art.
              6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG, soweit die Einwilligung die Speicherung von Cookies oder den
              Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TTDSG
              umfasst. Die Einwilligung ist jederzeit widerrufbar.
            </p>
          </div>

          <div className="text">
            <h3>Vercel</h3>
            <p>
              Wir hosten unsere Website bei Vercel. Daten können ins Ausland gelangen (USA).
              <br />
              Details entnehmen Sie der Datenschutzerklärung von Vercel:
              <a href="https://vercel.com/legal/privacy-policy">https://www.hetzner.de/rechtliches/datenschutz</a>
              .
              <br />
            </p>
          </div>
        </div>
        <div className="ce_text block">
          <div className="text">
            <h3>Content-Delivery-Network</h3>
            <p>
              Wir benutzen zum Ausspielen unserer Internetseiten ein Content-Delivery-Network (CDN). Ein CDN ist ein
              Netz regional verteilter und über das Internet verbundener Server. Über das CDN werden skalierende
              Speicher- und Auslieferungskapazitäten zur Verfügung gestellt. Hierdurch werden die Ladezeiten unserer
              Internetseiten optimiert und auch bei großen Lastspitzen ein optimaler Datendurchsatz gewährleistet.
              Nutzeranfragen auf unseren Internetseiten werden über Server des CDN geleitet. Aus diesen Datenströmen
              werden Statistiken erstellt. Dies dient zum einen dazu, potentielle Bedrohungen für unsere Internetseiten
              durch Schadsoftware frühzeitig zu erkennen und zum anderen unser Angebot stetig zu verbessern und unsere
              Internetseiten für Sie als Nutzer nutzerfreundlicher auszugestalten.
            </p>
            <p>
              Wir möchten Sie darauf hinweisen, dass je nach Sitzland des unten genannten Diensteanbieters die über den
              Dienst erfassten Daten außerhalb des Raumes der Europäischen Union übertragen und verarbeitet werden
              können. Es besteht in diesem Fall das Risiko, dass das von der DSGVO vorgeschriebene Datenschutzniveau
              nicht eingehalten und die Durchsetzung Ihrer Rechte nicht oder nur erschwert erfolgen kann.
            </p>
            <p>
              <strong>Betroffene Daten:</strong>
            </p>
            <ul>
              <li>Inhaltsdaten (bspw. Posts, Fotos, Videos)</li>
              <li>Nutzungsdaten (bspw. Zugriffszeiten, angeklickte Webseiten)</li>
              <li>Kommunikationsdaten (bspw. Informationen über das genutzte Gerät, IP-Adresse)</li>
            </ul>
            <p>
              <strong>Verarbeitungszweck: </strong>Technische Optimierung der Internetpräsenz, Analyse von Fehlern und
              Nutzerverhalten
            </p>
            <p>
              <strong>Rechtsgrundlage:</strong> Berechtigtes Interesse, Art. 6 Abs. 1 lit. f DSGVO
            </p>
            <p>
              <strong>Eingesetze CDN-Dienstleister:</strong>
            </p>
          </div>
        </div>
        <div className="ce_text block">
          <div className="text">
            <h2>Cloudflare</h2>
            <p>
              Diensteanbieter: Cloudflare Inc.
              <br />
              Internetseite:
              <a className="externalLink" href="https://www.cloudflare.com/">
                https://www.cloudflare.com/
              </a>
              <br />
              Datenschutzerklärung:
              <a className="externalLink" href="https://www.cloudflare.com/privacypolicy/">
                https://www.cloudflare.com/privacypolicy/
              </a>
              <br />
              Umfang der Datenerfassung:
              <a className="externalLink" href="https://blog.cloudflare.com/what-cloudflare-logs/">
                https://blog.cloudflare.com/what-cloudflare-logs/
              </a>
            </p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h2>Discord</h2>
          <p>Darstellung von User und Server und Avataren.</p>
          <p>
            Die Privacy Policy von Discord kann hier gelesen werden:{" "}
            <a href="https://discord.com/privacy">https://discord.com/privacy</a>
          </p>
        </div>
        <div>
          <h2>Twitch</h2>
          <p>Darstellung von User Avataren.</p>
          <p>
            Die Privacy Policy von Twitch kann hier gelesen werden:
            <a href="https://www.twitch.tv/p/de-de/legal/privacy-notice/">
              https://www.twitch.tv/p/de-de/legal/privacy-notice/
            </a>
          </p>
        </div>
      </div>
      <div className="ce_text block">
        <div className="text">
          <h2>Kontaktaufnahme</h2>
          <p>
            Soweit Sie uns über E-Mail, Soziale Medien, Telefon, Fax, Post, unser Kontaktformular oder sonstwie
            ansprechen und uns hierbei personenbezogene Daten wie Ihren Namen, Ihre Telefonnummer oder Ihre
            E-Mail-Adresse zur Verfügung stellen oder weitere Angaben zur Ihrer Person oder Ihrem Anliegen machen,
            verarbeiten wir diese Daten zur Beantwortung Ihrer Anfrage im Rahmen des zwischen uns bestehenden
            vorvertraglichen oder vertraglichen Beziehungen.
          </p>
          <p>
            <strong>Betroffene Daten:</strong>
          </p>
          <ul>
            <li>Bestandsdaten (bspw. Namen, Adressen)</li>
            <li>Kontakdaten (bspw. E-Mail-Adresse, Telefonnummer, Postanschrift)</li>
            <li>Inhaltsdaten (Texte, Fotos, Videos)</li>
            <li>Vertragsdaten (bspw. Vertragsgegenstand, Vertragsdauer)</li>
          </ul>
          <p>
            <strong>Betroffene Personen: </strong>Interessenten, Kunden, Geschäfts- und Vertragspartner
          </p>
          <p>
            <strong>Verarbeitungszweck: </strong>Kommunikation sowie Beantwortung von Kontaktanfragen, Büro und
            Organisationsverfahren
          </p>
          <p>
            <strong>Rechtsgrundlage:</strong> Vertragserfüllung und vorvertragliche Anfragen, Art. 6 Abs. 1 lit. b
            DSGVO, berechtigtes Interesse, Art. 6 Abs. 1 lit. f DSGVO
          </p>
        </div>
      </div>
      <div className="ce_text block">
        <div className="text">
          <h2>Unsere Onlinepräsenzen bei sozialen Netzwerken</h2>
          <p>
            Wir betreiben Onlinepräsenzen innerhalb der nachfolgend aufgelisteten sozialen Netzwerke. Besuchen Sie eine
            dieser Präsenzen, werden durch den jeweiligen Anbieter die unten näher aufgeführten Daten erhoben und
            verarbeitet. In der Regel werden diese Daten zur Werbe- und Marktforschungszwecke erhoben und hiermit
            Nutzungsprofile angelegt. In den Nutzungsprofilen können Daten unabhängig des von Ihnen verwendeten Gerätes
            gespeichert werden. Dies ist insbesondere dann der Fall, wenn Sie Mitglied der jeweiligen Plattform und bei
            dieser eingeloggt sind. Die Nutzungsprofile können von den Anbietern dazu verwendet werden, um Ihnen
            interessenbezogene Werbung auszuspielen. Gegen die Erstellung von Nutzerprofilen steht Ihnen ein
            Widerrufsrecht zu. Um dieses auszuüben, müssen Sie sich an den jeweiligen Anbieter wenden.
          </p>
          <p>
            Wenn Sie einen Account bei einem der unten aufgeführten Anbieter besitzen und beim Besuch unserer Webseite
            dort eingeloggt sind, kann der jeweilige Anbieter Daten über Ihr Nutzungsverhalten auf unserer Webseite
            erheben. Um eine solche Verknüpfung Ihrer Daten zu verhindern, können Sie sich vor dem Besuch unserer Seite
            bei dem Dienst des Anbieters ausloggen.
          </p>
          <p>
            Zu welchem Zweck und in welchem Umfang Daten von dem Anbieter erhoben werden, können Sie den jeweiligen, im
            Folgenden mitgeteilten, Datenschutzerklärungen der Anbieter entnehmen.
          </p>
          <p>
            Wir möchten Sie darauf hinweisen, dass je nach Sitzland des unten genannten Anbieters die über dessen
            Plattform erfassten Daten außerhalb des Raumes der Europäischen Union übertragen und verarbeitet werden
            können. Es besteht in diesem Fall das Risiko, dass das von der DSGVO vorgeschriebene Datenschutzniveau nicht
            eingehalten und die Durchsetzung Ihrer Rechte nicht oder nur erschwert erfolgen kann.
          </p>
          <p>
            <strong>Betroffene Daten:</strong>
          </p>
          <ul>
            <li>Bestands- und Kontaktdaten (bspw. Name, Adresse, Telefonnummer, E-Mail-Adresse)</li>
            <li>Inhaltsdaten (bspw. Posts, Fotos, Videos)</li>
            <li>Nutzungsdaten (bspw. Zugriffszeiten, angeklickte Webseiten)</li>
            <li>Kommunikationsdaten (bspw. Informationen über das genutzte Gerät, IP-Adresse).</li>
          </ul>
          <p>
            <strong>Verarbeitungszweck: </strong>Kommunikation und Marketing, Verfolgen und Anaylse von Nutzerverhalten
          </p>
          <p>
            <strong>Rechtsgrundlage:</strong> Einwilligung, Art. 6 Abs. 1 lit. a DSGVO, berechtigtes Interessen Art. 6
            Abs. 1 lit. f DSGVO
          </p>
          <p>
            <strong>Widerspruchsmöglichkeiten: </strong>Zu den jeweiligen Widerspruchsmöglichkeiten (Opt-Out) verweisen
            wir auf die nachfolgend verlinkten Angaben der Anbieter.
          </p>
          <p>
            <strong>Wir unterhalten Onlinepräsenzen auf folgenden sozialen Netzwerken:</strong>
          </p>
        </div>
      </div>
      <div className="ce_text privacy_item general_part4 block">
        <div className="text">
          <h2>Sicherheitsmaßnahmen</h2>
          <p>
            Wir treffen im Übrigen technische und organisatorische Sicherheitsmaßnahmen nach dem Stand der Technik, um
            die Vorschriften der Datenschutzgesetze einzuhalten und Ihre Daten gegen zufällige oder vorsätzliche
            Manipulationen, teilweisen oder vollständigen Verlust, Zerstörung oder gegen den unbefugten Zugriff Dritter
            zu schützen.
          </p>
          <h2>Aktualität und Änderung dieser Datenschutzerklärung</h2>
          <p>
            Diese Datenschutzerklärung ist aktuell gültig und hat den Stand August 2022. Aufgrund geänderter
            gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung anzupassen.
          </p>
          <p>
            <strong>
              Diese Datenschutzerklärung wurde mit Hilfe des Datenschutz-Generators von SOS Recht erstellt. SOS Recht
              ist ein Angebot der Mueller.legal Rechtsanwälte Partnerschaft mit Sitz in Berlin.
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
