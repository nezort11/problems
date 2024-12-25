-- https://datalemur.com/questions/teams-power-users
SELECT messages.sender_id, COUNT(*) as message_count
FROM messages
WHERE
  EXTRACT(YEAR FROM  messages.sent_date) = 2022
  AND EXTRACT(MONTH FROM  messages.sent_date) = 8
GROUP BY messages.sender_id
ORDER BY message_count DESC
LIMIT 2;
