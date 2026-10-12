USE sakila;

-- Question1
SELECT COUNT(DISTINCT f.film_id) AS documentary_count
FROM film f
JOIN film_category fc
    ON f.film_id = fc.film_id
JOIN category c
    ON fc.category_id = c.category_id
WHERE c.name = 'Documentary'
  AND f.special_features LIKE '%Deleted Scenes%';
-- Question2 
SELECT COUNT(DISTINCT f.film_id) AS sci_fi_movie_count
FROM staff s
JOIN store st
    ON s.store_id = st.store_id
JOIN inventory i
    ON st.store_id = i.store_id
JOIN rental r
    ON i.inventory_id = r.inventory_id
JOIN film f
    ON i.film_id = f.film_id
JOIN film_category fc
    ON f.film_id = fc.film_id
JOIN category c
    ON fc.category_id = c.category_id
WHERE s.first_name = 'Jon'
  AND s.last_name = 'Stephens'
  AND c.name = 'Sci-Fi';


-- Question3
SELECT SUM(p.amount) AS total_sales
FROM category c
JOIN film_category fc
    ON c.category_id = fc.category_id
JOIN film f
    ON fc.film_id = f.film_id
JOIN inventory i
    ON f.film_id = i.film_id
JOIN rental r
    ON i.inventory_id = r.inventory_id
JOIN payment p
    ON r.rental_id = p.rental_id
WHERE c.name = 'Animation';


-- Question 4
SELECT
    cat.name AS category,
    COUNT(r.rental_id) AS rental_count
FROM customer c
JOIN rental r
    ON c.customer_id = r.customer_id
JOIN inventory i
    ON r.inventory_id = i.inventory_id
JOIN film f
    ON i.film_id = f.film_id
JOIN film_category fc
    ON f.film_id = fc.film_id
JOIN category cat
    ON fc.category_id = cat.category_id
WHERE c.first_name = 'PATRICIA'
  AND c.last_name = 'JOHNSON'
GROUP BY cat.category_id, cat.name
ORDER BY rental_count DESC
LIMIT 3;


-- Question 5
SELECT COUNT(DISTINCT f.film_id) AS r_rated_movie_count
FROM customer c
JOIN rental r
    ON c.customer_id = r.customer_id
JOIN inventory i
    ON r.inventory_id = i.inventory_id
JOIN film f
    ON i.film_id = f.film_id
WHERE c.first_name = 'SUSAN'
  AND c.last_name = 'WILSON'
  AND f.rating = 'R';