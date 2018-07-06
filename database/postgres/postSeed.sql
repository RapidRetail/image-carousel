DROP INDEX IF EXISTS product_join_idx;
ALTER TABLE product_image_join DROP CONSTRAINT IF EXISTS product_fk;
ALTER TABLE product_image_join DROP CONSTRAINT IF EXISTS image_fk;

ALTER TABLE product_image_join 
ADD CONSTRAINT product_fk 
FOREIGN KEY (product_id)
REFERENCES products(id)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE product_image_join 
ADD CONSTRAINT image_fk
FOREIGN KEY (image_id)
REFERENCES images(id)
ON DELETE CASCADE
ON UPDATE CASCADE;

CREATE INDEX product_join_idx ON product_image_join(product_id)
