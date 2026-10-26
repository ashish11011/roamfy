# Group tour packages

Trips and group tours have independent storage and admin pages:

| | Trips | Group tours |
| --- | --- | --- |
| Database | `trips` (existing) | `group_trips` (new) |
| Public details | `/trip/<slug>` | `/group-trip/<slug>` |
| Admin list | `/admin` | `/admin/group-trips` |
| Admin create/edit | `/admin/trip` | `/admin/group-trip` |
| Pricing | Single `price` | Per-person sharing prices |

Group tours appear in a separate **Group Tour Package** landing-page section.
Each admin list has its own create, edit, visibility and delete controls.
Group-tour mutations and admin reads require an authorized admin session.

In admin, open **Group Trips** and choose **New Group Tour Package**.
Enable any combination of 2-sharing, 3-sharing, and 4-sharing,
then enter each enabled option's INR price **per person**. At least one positive
price is required. Disabled options are omitted from public pricing.

## Database preparation

Only the Drizzle schema source has been updated. No migration has been generated
or applied. Create the `group_trips` table from `groupTripTable` in `db/schema.js`
before deploying. It includes the trip content, itinerary, images, hotels,
visibility, domestic status and a unique slug. Its `sharing_prices` is a non-null
JSONB object, defaulting to `{}`, containing enabled options only, for example
`{"2":"12000.00","4":"9000.00"}`. No columns were added to the existing
`trips` table. Existing trip records and slugs remain separate.

Run `npm test` for pricing validation, action persistence and admin/public UI
checks using mocked database calls. Build compilation can be checked without
prerendering database pages using
`npm run build -- --experimental-build-mode compile`.
