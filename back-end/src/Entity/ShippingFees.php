<?php

namespace App\Entity;

use App\Repository\ShippingFeesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ShippingFeesRepository::class)]
class ShippingFees
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["getShippingFees", "getCountry"])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(["getShippingFees", "getCountry"])]
    private ?int $PriceWeight = null;

    #[ORM\Column(length: 255)]
    #[Groups(["getShippingFees", "getCountry"])]
    private ?string $DeliveryName = null;

    #[ORM\Column]
    #[Groups(["getShippingFees", "getCountry"])]
    private ?int $DeliveryDelay = null;

    #[ORM\ManyToOne(inversedBy: 'delivery')]
    #[Groups(["getShippingFees"])]
    private ?Country $country = null;

    public function __construct()
    {
        $this->countries = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPriceWeight(): ?int
    {
        return $this->PriceWeight;
    }

    public function setPriceWeight(int $PriceWeight): static
    {
        $this->PriceWeight = $PriceWeight;

        return $this;
    }

    public function getDeliveryName(): ?string
    {
        return $this->DeliveryName;
    }

    public function setDeliveryName(string $DeliveryName): static
    {
        $this->DeliveryName = $DeliveryName;

        return $this;
    }

    public function getDeliveryDelay(): ?int
    {
        return $this->DeliveryDelay;
    }

    public function setDeliveryDelay(int $DeliveryDelay): static
    {
        $this->DeliveryDelay = $DeliveryDelay;

        return $this;
    }

    public function getCountry(): ?Country
    {
        return $this->country;
    }

    public function setCountry(?Country $country): static
    {
        $this->country = $country;

        return $this;
    }

}
