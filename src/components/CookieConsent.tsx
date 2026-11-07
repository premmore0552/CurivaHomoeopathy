import React from 'react';

/**
 * No non-essential analytics or advertising cookies are enabled in the current
 * website build. If that changes, add a tested consent manager before activating
 * those vendors. Returning null avoids presenting a false consent interface.
 */
const CookieConsent: React.FC = () => null;

export default CookieConsent;
