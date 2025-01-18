-- SELECT candidate_id FROM candidates WHERE skill = 'Python'
-- INTERSECT
-- SELECT candidate_id FROM candidates WHERE skill = 'Tableau'
-- INTERSECT
-- SELECT candidate_id FROM candidates WHERE skill = 'PostgreSQL';

-- SELECT candidate_id FROM (
-- SELECT candidate_id, COUNT(*) as required_skills_count FROM candidates
-- WHERE skill IN ('Python', 'Tableau', 'PostgreSQL')
-- GROUP by candidate_id
-- ) AS required_canidates
-- WHERE required_canidates.required_skills_count = 3;


SELECT candidate_id FROM candidates
WHERE skill IN ('Python', 'Tableau', 'PostgreSQL')
GROUP by candidate_id
HAVING COUNT(*) = 3;
