import React from 'react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <div className="pt-24 pb-16 bg-bg-primary transition-colors duration-300">
      <SEO
        title="Privacy Policy - Curiva Homoeopathy"
        description="Our commitment to your privacy and data protection at Curiva Homoeopathy."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-serif font-bold text-primary mb-8">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none text-text-secondary space-y-6 dark:prose-invert">
            <p className="text-sm text-text-secondary italic">Last Updated: November 7, 2026</p>

            <p>
              At Curiva Homoeopathy, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard information when you use our website and learning app.
            </p>

            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">1. Information We Collect</h2>
            <p>
              We collect information needed to provide our educational, account, payment, and appointment features. This may include:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong>Account and contact information:</strong> Your account identifier, email address, display name, optional phone number, professional or learner category, and optional profile information such as qualifications, biography, interests, or institution/clinic label when you add them to your account.</li>
              <li><strong>Native learning progress:</strong> Completed lesson identifiers, quiz history (date, subject, score and total), known flashcard identifiers, study-day markers, your most recent lesson, and your daily study-plan date, goal, and completed checklist items. This information is saved locally and, when you are signed in and cloud sync is available, synchronized to a Firestore document associated with your account so your progress can be restored across devices. Guest/offline progress is kept in a separate local workspace on the device and is not automatically merged into a signed-in account.</li>
              <li><strong>Website study workspace:</strong> If you use the Curiva Study Toolkit, it may store your study checklist titles and completion status, study goals, exam date, focus-session duration and topic, personal academic notes, custom flashcards, reading-log entries, and daily study reflections. For signed-in users, this academic workspace is synchronized to a Firestore document associated with that account when cloud sync is available. Guest data is kept in a separate local workspace on the device; it is not automatically merged into an account when you sign in. Public Health eBook bookmarks, completed-chapter markers, and last-read positions are stored in browser local storage on the current device and browser by the eBook reader; this reader does not upload that reading history to your Curiva account. Clearing this browser's site data can remove those local reading markers. Notes and study tools are not intended for patient records, identifiable health information, or confidential clinical case details.</li>
              <li><strong>Simulated academic case logs:</strong> If you create a practice log in your Profile, Curiva stores the selected exercise category, date, institution/classroom label, fictional student-author label, selected study answer, optional notes, and account ID/email in Firestore. These entries are visible to the account owner and authorized administrators; the owner can delete an individual entry. The feature is for fictional textbook exercises only. Do not enter real patient names, contact details, addresses, dates of birth, health/record numbers, photographs, test results, or identifiable clinical details. The form and database rules do not provide automated detection or redaction of such information.</li>
              <li><strong>Mock screening assessment data:</strong> If you use a screening education tool, the assessment may store age range/value, vaccination status, last screening interval, selected symptoms, family-history response, risk category, recommendation, and record timestamps. This can be sensitive personal health information. It is restricted to the account owner and authorized administrators under the configured Firestore rules. It is an educational screening record, not a diagnosis.</li>
              <li><strong>Feedback data:</strong> Comments or error reports you submit through feedback forms. Do not include medical histories or confidential clinical information in feedback forms.</li>
              <li><strong>Appointment request data:</strong> If you use the appointment-request page, Curiva stores your account ID and email (when available), the name you provide, an optional phone number, requested service category, preferred date and time window, time zone, request status, and any administrative response. This request form does not ask for symptoms, diagnoses, or medical documents.</li>
              <li><strong>Purchase and payment records:</strong> When you purchase a resource, Curiva receives and stores order and payment identifiers, the resource purchased, amount, currency, and the contact email used to fulfil the order. Payment processing is handled through the configured payment provider; Curiva does not store full card details.</li>
              <li><strong>AI assistant prompts:</strong> When you use an AI study assistant (including the general study assistant or hair-health assistant), your prompt and recent conversation messages are sent to Curiva's server. For an AI-generated reply, the prompt and recent context are sent to Google Gemini; some keyword matches return study links directly without Gemini generation. Do not include names, contact details, medical-record numbers, photographs, or identifiable or sensitive patient information. AI responses may be inaccurate and are not medical advice.</li>
              <li><strong>Usage data and analytics preference:</strong> Technical information such as browser type and network or device information may be processed by hosting and security services to operate the service. Optional analytics are off by default. If you explicitly opt in, and an analytics provider is configured, only allowlisted generic feature events may be sent; the analytics adapter filters fields likely to contain identity, free text, search, prompt, message, or clinical information. You can change the preference at any time using Privacy settings.</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">2. How We Use Your Information</h2>
            <p>We use the information described above to operate and improve Curiva, including to:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>Provide educational resources, save learning activity, and restore signed-in learning progress across devices.</li>
              <li>Improve educational resources based on user feedback and respond to content suggestions. Optional analytics are used only according to the preference described above.</li>
              <li>Store appointment requests, show their status to the signed-in requester, and allow authorized administrators to review them.</li>
              <li>When email delivery is configured, send an appointment-request notification to the clinic after the requester chooses to notify it, send an email to the requester when an administrator changes the request status, and deliver purchased resources by email. These emails are conditional on the relevant service configuration. The appointment feature does not send SMS messages.</li>
              <li>Verify payments, record orders, and provide secure access to purchased resources.</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">3. Data Security & Integrity</h2>
            <p>
              Learning progress is stored in local device storage and, for signed-in users when sync is available, in Firebase Firestore. Firestore rules restrict account records and study workspaces to their owner and authorized administrators as appropriate. Simulated case logs are owner-readable and owner-deletable; clients cannot edit them after creation. Screening assessment records contain sensitive information and are owner/admin restricted. Appointment requests are stored in Firebase Firestore and are intended to be visible to the signed-in requester and authorized administrators under the configured rules. Purchase records are written by the trusted server after payment verification. Purchased files are kept in a private storage bucket and delivered through time-limited signed URLs. Browser caching is restricted to public static assets; API, account, appointment, and private-download responses are not cached by the Curiva service worker.
            </p>
            <p>
              Do not submit symptoms, medical history, reports, or other clinical details through the scheduling or feedback forms. Do not submit identifiable patient information or sensitive health details to the AI study assistant. Do not use simulated case logs for real patient records. Client-side security error logs avoid recording account identifiers and provider identity details. We do not sell user data to third-party pharmaceutical or medical marketing firms.
            </p>

            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">4. Third-Party Services and Links</h2>
            <p>
              Curiva uses Firebase for account and data storage, Google Gemini when you use the AI study assistant, a payment provider to process purchases, and an email provider when email delivery is configured. When you use the AI assistant, the prompt and recent conversation context are transmitted to Google Gemini for response generation. Do not submit identifiable patient records or sensitive personal health information. These providers process information under their own terms and privacy policies; consult their current privacy information for their handling and retention practices. Our website may also contain links to third-party websites; we are not responsible for the privacy practices or content of those external sites.
            </p>

            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">5. Your Choices and Rights</h2>
            <p>
              You may access or correct account information through the available account features and may contact us to request access to, correction of, or deletion of information where applicable. You can permanently delete individual simulated case logs from your Profile. Use Privacy settings to withdraw optional analytics consent. You can clear browser site data to remove device-local eBook bookmarks, completed-chapter markers and last-read positions. Clearing browser storage does not delete cloud account records. You can unsubscribe from newsletters using the unsubscribe link in the email. Guest progress stays separate from account progress and is not automatically transferred when you sign in; signed-in progress syncs across devices when cloud sync is available.
            </p>

            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">6. Contact Us</h2>
            <p>
              If you have questions or requests concerning this Privacy Policy, please contact us at privacy@curiva.com.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
