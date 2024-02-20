<?php

namespace App\Entity;

use App\Repository\CountryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CountryRepository::class)]
class Country
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["getCountry", "getShippingFees", "getUser"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["getCountry", "getShippingFees"])]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'country', targetEntity: ShippingFees::class)]
    #[Groups(["getCountry"])]
    private Collection $delivery;

    #[ORM\OneToMany(mappedBy: 'country', targetEntity: User::class)]
    private Collection $users;

    public function __construct()
    {
        $this->delivery = new ArrayCollection();
        $this->users = new ArrayCollection();
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

    /**
     * @return Collection<int, ShippingFees>
     */
    public function getDelivery(): Collection
    {
        return $this->delivery;
    }

    public function addDelivery(ShippingFees $delivery): static
    {
        if (!$this->delivery->contains($delivery)) {
            $this->delivery->add($delivery);
            $delivery->setCountry($this);
        }

        return $this;
    }

    public function removeDelivery(ShippingFees $delivery): static
    {
        if ($this->delivery->removeElement($delivery)) {
            // set the owning side to null (unless already changed)
            if ($delivery->getCountry() === $this) {
                $delivery->setCountry(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): static
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->setCountry($this);
        }

        return $this;
    }

    public function removeUser(User $user): static
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getCountry() === $this) {
                $user->setCountry(null);
            }
        }

        return $this;
    }
}
