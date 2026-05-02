# Security Specification for Curiva Homeopathy

## 1. Data Invariants
- A user document must match the `request.auth.uid`.
- Users cannot modify their own `uid` or `email` once set (immutable fields).
- Favorites must be a list of strings with a maximum size of 100 to prevent resource exhaustion.
- `createdAt` must be the server time of creation.
- `updatedAt` must be the server time of update.

## 2. The "Dirty Dozen" Payloads (Attack Vectors)

1. **Identity Theft**: Creating a user document with a different `uid` than the authenticated user.
2. **Email Spoofing**: Setting an admin-like email on a user profile without verification.
3. **Ghost Field Injection**: Adding an `isAdmin: true` field to a user document.
4. **Denial of Wallet (Array Bloating)**: Attempting to save 10,000 favorites in one list.
5. **Timestamp Manipulation**: Sending a client-side `createdAt` from 1970.
6. **Cross-User Leak**: Reading another user's private favorites list.
7. **Unverified Write**: Writing to the database without a verified email (if strict verification is enforced).
8. **Shadow Update**: Updating a field that shouldn't exist in the schema.
9. **ID Poisoning**: Using a 1MB string as a document ID.
10. **Immutable Hijack**: Changing the `createdAt` date on an existing document.
11. **PII Scraping**: Trying to list all users without a filter.
12. **Metadata Corruption**: Modifying internal system fields.

## 3. Test Runner (Mock)
The `firestore.rules.test.ts` would verify that all above payloads return `PERMISSION_DENIED`.
