<?php

namespace App\Entity;

use App\Repository\CompatibleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CompatibleRepository::class)]
class Compatible
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["getItems", "getCategories", "getSubCategories", "getImages", "getCaracteristique", "getCompatible"])]
    private ?int $id = null;

    #[ORM\ManyToMany(targetEntity: Items::class, inversedBy: 'compatibles')]
    #[Groups(["getCompatible"])]
    private Collection $items;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["getItems", "getCategories", "getSubCategories", "getImages", "getCaracteristique", "getCompatible"])]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["getItems", "getCategories", "getSubCategories", "getImages", "getCaracteristique", "getCompatible"])]
    private ?string $value = null;

    #[ORM\Column(length: 500, nullable: true)]
    #[Groups(["getItems", "getCategories", "getSubCategories", "getImages", "getCaracteristique", "getCompatible"])]
    private ?string $describe = null;

    public function __construct()
    {
        $this->items = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Items>
     */
    public function getItems(): Collection
    {
        return $this->items;
    }

    public function addItem(Items $item): static
    {
        if (!$this->items->contains($item)) {
            $this->items->add($item);
        }

        return $this;
    }

    public function removeItem(Items $item): static
    {
        $this->items->removeElement($item);

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(?string $value): static
    {
        $this->value = $value;

        return $this;
    }

    public function getDescribe(): ?string
    {
        return $this->describe;
    }

    public function setDescribe(?string $describe): static
    {
        $this->describe = $describe;

        return $this;
    }
}
