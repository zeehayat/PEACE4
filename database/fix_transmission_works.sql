-- Fix for transmission_and_distribution_works polymorphism mismatch
-- The application uses 'mhp_site' as the morph map key, but some records have 'App\Models\MhpSite'.

UPDATE transmission_and_distribution_works 
SET projectable_type = 'mhp_site' 
WHERE projectable_type = 'App\\Models\\MhpSite';

-- Optional: If you have orphaned records with NULL projectable_id that you want to link
-- You would need to manually update them based on knowledge of which ID belongs to which site.
-- Example (DO NOT RUN BLINDLY):
-- UPDATE transmission_and_distribution_works SET projectable_id = 1, projectable_type = 'mhp_site' WHERE id = 14;
