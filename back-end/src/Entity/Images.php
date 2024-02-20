<?php

namespace App\Entity;

use App\Repository\ImagesRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ImagesRepository::class)]
class Images
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["getItems", "getImages"])]
    private ?int $id = null;

    // #[ORM\ManyToOne]
    // #[ORM\JoinColumn(nullable: false)]
    // #[Groups(["getItems", "getImages"])]
    // private ?Items $item = null;

    #[ORM\Column(length: 255)]
    #[Groups(["getItems", "getImages"])]
    private ?string $url = null;

    #[ORM\ManyToOne(inversedBy: 'image')]
    #[Groups(["getImages"])]
    private ?Items $items = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    // public function getItem(): ?Items
    // {
    //     return $this->item;
    // }

    // public function setItem(?Items $item): static
    // {
    //     $this->item = $item;

    //     return $this;
    // }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): static
    {
        $this->url = $url;

        return $this;
    }

    public function getItems(): ?Items
    {
        return $this->items;
    }

    public function setItems(?Items $items): static
    {
        $this->items = $items;

        return $this;
    }
}
