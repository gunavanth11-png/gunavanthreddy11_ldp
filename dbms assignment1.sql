USE sakila;

-- Question 1
SELECT 
    f.film_id,
    f.title,
    f.rating,
    c.name AS category
FROM film f
JOIN film_category fc
    ON f.film_id = fc.film_id
JOIN category c
    ON fc.category_id = c.category_id
WHERE f.rating = 'PG-13'
  AND c.name = 'Comedy';
  
-- Question 2
SELECT 
    f.film_id,
    f.title,
    COUNT(r.rental_id) AS rental_count
FROM film f
JOIN film_category fc
    ON f.film_id = fc.film_id
JOIN category c
    ON fc.category_id = c.category_id
JOIN inventory i
    ON f.film_id = i.film_id
JOIN rental r
    ON i.inventory_id = r.inventory_id
WHERE c.name = 'Horror'
GROUP BY f.film_id, f.title
ORDER BY rental_count DESC
LIMIT 3;
-- Question 3
SELECT DISTINCT
    c.customer_id,
    c.first_name,
    c.last_name,
    co.country,
    f.title AS movie
FROM customer c
JOIN address a
    ON c.address_id = a.address_id
JOIN city ci
    ON a.city_id = ci.city_id
JOIN country co
    ON ci.country_id = co.country_id
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
WHERE co.country = 'India'
  AND cat.name = 'Sports'
ORDER BY c.customer_id;
-- Question 4
SELECT DISTINCT
    c.customer_id,
    c.first_name,
    c.last_name,
    co.country,
    f.title AS movie
FROM customer c
JOIN address a
    ON c.address_id = a.address_id
JOIN city ci
    ON a.city_id = ci.city_id
JOIN country co
    ON ci.country_id = co.country_id
JOIN rental r
    ON c.customer_id = r.customer_id
JOIN inventory i
    ON r.inventory_id = i.inventory_id
JOIN film f
    ON i.film_id = f.film_id
JOIN film_actor fa
    ON f.film_id = fa.film_id
JOIN actor act
    ON fa.actor_id = act.actor_id;

-- Question 5
SELECT COUNT(DISTINCT fa.film_id) AS number_of_movies
FROM actor a
JOIN film_actor fa
    ON a.actor_id = fa.actor_id
WHERE a.first_name = 'SEAN'
  AND a.last_name = 'WILLIAMS';
