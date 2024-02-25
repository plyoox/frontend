"use client";

import { useEffect, useState } from "react";

function Page() {
  const hasWindow = typeof window !== "undefined";

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(hasWindow);
  }, [hasWindow]);

  if (!isClient) return null;

  return (
    <div style={{ color: "black", background: "white", padding: "10px" }}>
      <h1 className={"text-xl"}>Privacy Policy (Discord Bot)</h1>

      <div>
        <h2 className={"text-lg"}>Login data</h2>
        <p>When you login in our site, we store your username, avatar and locale from Discord.</p>
      </div>

      <div>
        <h2>Data in Discord</h2>
        <h3>Logging data</h3>
        <p>The bot may log following data in a channel of the current guild:</p>
        <ul>
          <li>Content and other message information when editing or deleting a message.</li>
          <li>Date and account age when joining or leaving a guild.</li>
          <li>When you rename your account or change your nickname.</li>
          <li>When you get banned or unbanned from a guild.</li>
          <li>When your role changes.</li>
        </ul>
        <h3>Store data</h3>
        <p>The bot may store following information when:</p>
        <ul>
          <li>
            When the automod catches one of your messages.
            <ul>
              <li>The account id</li>
              <li>Timestamp</li>
              <li>Reason</li>
              <li>Server id</li>
            </ul>
          </li>
          <li>
            When you receive a temporary mute or temporary ban.
            <ul>
              <li>The account id</li>
              <li>Expiring date</li>
              <li>Server id</li>
            </ul>
          </li>
        </ul>
      </div>

      <div>
        <h2>Deleting you data</h2>
        <h4>Login data</h4>
        <p>Your data will be deleted when logging out from the site.</p>
        <h4>Server configuration</h4>
        <p>
          Your configuration will never be automatically deleted. If your information should be deleted, please contact
          me.
        </p>
      </div>

      <div>
        <h2>Twitch data</h2>
        <p>
          Plyoox will only safe publicly available data (username, userid). Everything else will stay in memory for max
          a few seconds.
        </p>
      </div>
    </div>
  );
}

export default Page;
