<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230826213229 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE category_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE item_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE reminder_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE compatible_id_seq CASCADE');
        $this->addSql('ALTER TABLE item DROP CONSTRAINT fk_1f1b251ea545015');
        $this->addSql('ALTER TABLE compatible_items DROP CONSTRAINT fk_4d1282e27aa87179');
        $this->addSql('ALTER TABLE compatible_items DROP CONSTRAINT fk_4d1282e26bb0ae84');
        $this->addSql('ALTER TABLE reminder DROP CONSTRAINT fk_40374f4067b3b43d');
        $this->addSql('ALTER TABLE reminder DROP CONSTRAINT fk_40374f406bb0ae84');
        $this->addSql('DROP TABLE item');
        $this->addSql('DROP TABLE compatible');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE compatible_items');
        $this->addSql('DROP TABLE reminder');
        $this->addSql('ALTER TABLE shipping_fees DROP country');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE SEQUENCE category_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE item_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE reminder_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE compatible_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE item (id INT NOT NULL, id_category_id INT NOT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(1500) NOT NULL, image1 VARCHAR(500) NOT NULL, image2 VARCHAR(500) DEFAULT NULL, image3 VARCHAR(500) DEFAULT NULL, image4 VARCHAR(500) DEFAULT NULL, price INT NOT NULL, stock INT DEFAULT NULL, item_type VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_1f1b251ea545015 ON item (id_category_id)');
        $this->addSql('CREATE TABLE compatible (id INT NOT NULL, name VARCHAR(255) DEFAULT NULL, value VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE category (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE compatible_items (compatible_id INT NOT NULL, items_id INT NOT NULL, PRIMARY KEY(compatible_id, items_id))');
        $this->addSql('CREATE INDEX idx_4d1282e26bb0ae84 ON compatible_items (items_id)');
        $this->addSql('CREATE INDEX idx_4d1282e27aa87179 ON compatible_items (compatible_id)');
        $this->addSql('CREATE TABLE reminder (id INT NOT NULL, users_id INT DEFAULT NULL, items_id INT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_40374f406bb0ae84 ON reminder (items_id)');
        $this->addSql('CREATE INDEX idx_40374f4067b3b43d ON reminder (users_id)');
        $this->addSql('ALTER TABLE item ADD CONSTRAINT fk_1f1b251ea545015 FOREIGN KEY (id_category_id) REFERENCES category (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE compatible_items ADD CONSTRAINT fk_4d1282e27aa87179 FOREIGN KEY (compatible_id) REFERENCES compatible (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE compatible_items ADD CONSTRAINT fk_4d1282e26bb0ae84 FOREIGN KEY (items_id) REFERENCES items (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reminder ADD CONSTRAINT fk_40374f4067b3b43d FOREIGN KEY (users_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reminder ADD CONSTRAINT fk_40374f406bb0ae84 FOREIGN KEY (items_id) REFERENCES items (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE shipping_fees ADD country VARCHAR(255) NOT NULL');
    }
}
