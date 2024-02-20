<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230725120847 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE category_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE item_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE category (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE item (id INT NOT NULL, id_category_id INT NOT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(1500) NOT NULL, image1 VARCHAR(500) NOT NULL, image2 VARCHAR(500) DEFAULT NULL, image3 VARCHAR(500) DEFAULT NULL, image4 VARCHAR(500) DEFAULT NULL, price INT NOT NULL, stock INT DEFAULT NULL, item_type VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_1F1B251EA545015 ON item (id_category_id)');
        $this->addSql('ALTER TABLE item ADD CONSTRAINT FK_1F1B251EA545015 FOREIGN KEY (id_category_id) REFERENCES category (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE category_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE item_id_seq CASCADE');
        $this->addSql('ALTER TABLE item DROP CONSTRAINT FK_1F1B251EA545015');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE item');
    }
}
