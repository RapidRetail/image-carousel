DROP INDEX IF EXISTS products_idx;
DROP INDEX IF EXISTS images_idx;
DROP INDEX IF EXISTS product_join_idx;

ALTER TABLE product_image_join 
ADD CONSTRAINT product_fk 
FOREIGN KEY (product_id)
REFERENCES products(id);

ALTER TABLE product_image_join 
ADD CONSTRAINT image_fk
FOREIGN KEY (image_id)
REFERENCES images(id);

-- don't need these to indexes they are implicit with PK
CREATE INDEX products_idx ON products(id);
CREATE INDEX images_idx ON images(id);

CREATE INDEX product_join_idx ON product_image_join(product_id)
