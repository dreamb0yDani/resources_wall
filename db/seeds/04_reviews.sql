INSERT INTO reviews (comment, liked, rating, user_id, resource_id)
VALUES
('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ', TRUE, 4, 4, 1),
('Sed ut perspiciatis unde omnis iste natus error sit voluptatem', TRUE, 5, 3, 1),
('quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?', TRUE, 3, 5, 2);


INSERT INTO reviews (liked, rating, user_id, resource_id)
VALUES
(TRUE, 4, 1, 1),
(TRUE, 5, 4, 2);


INSERT INTO reviews (comment, rating, user_id, resource_id)
VALUES
('Excepteur sint occaecat cupidatat non proident', 4, 1, 2),
('vel illum qui dolorem eum fugiat quo voluptas nulla pariatur', 4, 3, 2);


INSERT INTO reviews (rating, user_id, resource_id)
VALUES
(2, 2, 2);
