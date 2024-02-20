<?php

namespace App\Entity;

use App\Repository\ItemsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
#[ORM\Entity(repositoryClass: ItemsRepository::class)]
class Items
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["getItems", "getCategories", "getSubCategories", "getImages", "getCaracteristique", "getCompatible"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["getItems", "getCategories", "getSubCategories", "getImages", "getCaracteristique", "getCompatible"])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(["getItems", "getCategories", "getSubCategories", "getImages", "getCaracteristique", "getCompatible"])]
    private ?string $shortdescription = null;

    #[ORM\Column(length: 1500)]
    #[Groups(["getItems", "getCategories", "getSubCategories", "getImages", "getCaracteristique", "getCompatible"])]
    private ?string $description = null;

    #[ORM\Column(length: 500)]
    #[Groups(["getItems", "getCategories", "getSubCategories", "getImages", "getCaracteristique", "getCompatible"])]
    private ?string $image1 = null;

    // #[ORM\Column(length: 500, nullable: true)]
    // #[Groups(["getItems", "getCategories", "getSubCategories", "getImages"])]
    // private ?string $image2 = null;

    // #[ORM\Column(length: 500, nullable: true)]
    // #[Groups(["getItems", "getCategories", "getSubCategories", "getImages"])]
    // private ?string $image3 = null;

    // #[ORM\Column(length: 500, nullable: true)]
    // #[Groups(["getItems", "getCategories", "getSubCategories", "getImages"])]
    // private ?string $image4 = null;
    #[ORM\Column]
    #[Groups(["getItems", "getCategories", "getSubCategories", "getImages"])]
    private ?int $stock = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["getItems", "getCategories", "getSubCategories", "getImages", "getCaracteristique", "getCompatible"])]
    private ?string $socket = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["getItems", "getCategories", "getSubCategories", "getImages", "getCaracteristique", "getCompatible"])]
    private ?string $generation = null;

    #[ORM\ManyToOne(inversedBy: 'items')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["getItems"])]
    private ?Categories $category = null;

    #[ORM\ManyToOne(inversedBy: 'item')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["getItems"])]
    private ?Subcategory $subcategory = null;

    #[ORM\OneToMany(mappedBy: 'items',cascade: ['remove'], orphanRemoval: true, targetEntity: Images::class)]
    #[Groups(["getItems"])]
    private Collection $image;

    #[ORM\OneToMany(mappedBy: 'item', targetEntity: Caracteristique::class, orphanRemoval: true)]
    #[Groups(["getItems"])]
    private Collection $caracteristiques;

    #[ORM\Column(nullable: true)]
    #[Groups(["getItems", "getCategories", "getSubCategories", "getImages", "getCaracteristique", "getCompatible"])]
    private ?int $popularity = null;

    #[ORM\Column]
    #[Groups(["getItems", "getCategories", "getSubCategories", "getImages"])]
    private ?float $price = null;

    #[ORM\ManyToMany(targetEntity: Compatible::class, mappedBy: 'items')]
    #[Groups(["getItems"])]
    private Collection $compatibles;

    #[ORM\Column(nullable: true)]
    #[Groups(["getItems", "getCategories", "getSubCategories", "getImages"])]
    private ?int $weight = null;


    public function __construct()
    {
        $this->image = new ArrayCollection();
        $this->caracteristiques = new ArrayCollection();
        $this->compatibles = new ArrayCollection();
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

    public function getShortdescription(): ?string
    {
        return $this->shortdescription;
    }

    public function setShortdescription(string $shortdescription): static
    {
        $this->shortdescription = $shortdescription;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getImage1(): ?string
    {
        return $this->image1;
    }

    public function setImage1(string $image1): static
    {
        $this->image1 = $image1;

        return $this;
    }

    // public function getImage2(): ?string
    // {
    //     return $this->image2;
    // }

    // public function setImage2(?string $image2): static
    // {
    //     $this->image2 = $image2;

    //     return $this;
    // }

    // public function getImage3(): ?string
    // {
    //     return $this->image3;
    // }

    // public function setImage3(?string $image3): static
    // {
    //     $this->image3 = $image3;

    //     return $this;
    // }

    // public function getImage4(): ?string
    // {
    //     return $this->image4;
    // }

    // public function setImage4(?string $image4): static
    // {
    //     $this->image4 = $image4;

    //     return $this;
    // }


    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(int $stock): static
    {
        $this->stock = $stock;

        return $this;
    }

    public function getSocket(): ?string
    {
        return $this->socket;
    }

    public function setSocket(?string $socket): static
    {
        $this->socket = $socket;

        return $this;
    }

    public function getGeneration(): ?string
    {
        return $this->generation;
    }

    public function setGeneration(?string $generation): static
    {
        $this->generation = $generation;

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

    public function getSubcategory(): ?Subcategory
    {
        return $this->subcategory;
    }

    public function setSubcategory(?Subcategory $subcategory): static
    {
        $this->subcategory = $subcategory;

        return $this;
    }

    /**
     * @return Collection<int, Images>
     */
    public function getImage(): Collection
    {
        return $this->image;
    }

    public function addImage(Images $image): static
    {
        if (!$this->image->contains($image)) {
            $this->image->add($image);
            $image->setItems($this);
        }

        return $this;
    }

    public function removeImage(Images $image): static
    {
        if ($this->image->removeElement($image)) {
            // set the owning side to null (unless already changed)
            if ($image->getItems() === $this) {
                $image->setItems(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Caracteristique>
     */
    public function getCaracteristiques(): Collection
    {
        return $this->caracteristiques;
    }

    public function addCaracteristique(Caracteristique $caracteristique): static
    {
        if (!$this->caracteristiques->contains($caracteristique)) {
            $this->caracteristiques->add($caracteristique);
            $caracteristique->setItem($this);
        }

        return $this;
    }

    public function removeCaracteristique(Caracteristique $caracteristique): static
    {
        if ($this->caracteristiques->removeElement($caracteristique)) {
            // set the owning side to null (unless already changed)
            if ($caracteristique->getItem() === $this) {
                $caracteristique->setItem(null);
            }
        }

        return $this;
    }

    public function getPopularity(): ?int
    {
        return $this->popularity;
    }

    public function setPopularity(?int $popularity): static
    {
        $this->popularity = $popularity;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

        /**
     * @return Collection<int, Compatible>
     */
    public function getCompatibles(): Collection
    {
        return $this->compatibles;
    }

    public function addCompatible(Compatible $compatible): static
    {
        if (!$this->compatibles->contains($compatible)) {
            $this->compatibles->add($compatible);
            $compatible->addItem($this);
        }

        return $this;
    }

    public function removeCompatible(Compatible $compatible): static
    {
        if ($this->compatibles->removeElement($compatible)) {
            $compatible->removeItem($this);
        }

        return $this;
    }

    public function getWeight(): ?int
    {
        return $this->weight;
    }

    public function setWeight(?int $weight): static
    {
        $this->weight = $weight;

        return $this;
    }

  
}
