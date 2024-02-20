<?php

namespace App\Entity;

use App\Repository\CaracteristiqueRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CaracteristiqueRepository::class)]
class Caracteristique
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["getItems", "getCaracteristique"])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'caracteristiques')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["getCaracteristique"])]
    private ?Items $item = null;

    #[ORM\Column(length: 255)]
    #[Groups(["getItems", "getCaracteristique"])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(["getItems", "getCaracteristique"])]
    private ?string $value = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getItem(): ?Items
    {
        return $this->item;
    }

    public function setItem(?Items $item): static
    {
        $this->item = $item;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(string $value): static
    {
        $this->value = $value;

        return $this;
    }
}
