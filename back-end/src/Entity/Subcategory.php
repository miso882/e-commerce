<?php

namespace App\Entity;

use App\Repository\SubcategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use PhpParser\Node\Stmt\Catch_;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SubcategoryRepository::class)]
class Subcategory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["getCategories", "getItems", "getSubCategories"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["getCategories", "getItems", "getSubCategories"])]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'subcategories', cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["getSubCategories", "getItems"])]
    private ?Categories $category = null;

    #[ORM\OneToMany(mappedBy: 'subcategory',cascade: ['remove', 'persist'], orphanRemoval: true, targetEntity: Items::class)]
    #[Groups(["getSubCategories"])]
    private Collection $item;

    public function __construct()
    {
        $this->item = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getCategory(): ?Categories
    {
        return $this->category;
    }

    public function setCategory(?Categories $category): static
    {
        $this->category = $category;

        return $this;
    }

    /**
     * @return Collection<int, Items>
     */
    public function getItem(): Collection
    {
        return $this->item;
    }

    public function addItem(Items $item): static
    {
        if (!$this->item->contains($item)) {
            $this->item->add($item);
            $item->setSubcategory($this);
        }

        return $this;
    }

    public function removeItem(Items $item): static
    {
        if ($this->item->removeElement($item)) {
            // set the owning side to null (unless already changed)
            if ($item->getSubcategory() === $this) {
                $item->setSubcategory(null);
            }
        }

        return $this;
    }
}
