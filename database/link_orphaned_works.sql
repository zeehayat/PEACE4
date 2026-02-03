-- Link orphaned transmission_and_distribution_works records to mhp_sites based on ID match
-- This assumes that for legacy data, t.id corresponds to m.id

UPDATE transmission_and_distribution_works t
INNER JOIN mhp_sites m ON t.id = m.id
SET t.projectable_id = m.id, 
    t.projectable_type = 'mhp_site'
WHERE t.projectable_id IS NULL;
