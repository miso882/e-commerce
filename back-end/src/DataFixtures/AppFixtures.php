<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\User;
use DateTime;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);
        for ($i = 0; $i < 20; $i++) {
            $user = new User;
            $date = new DateTime("now");
            $plaintextPassword = "password$i";
            $user->setFirstname("Prenom $i");
            $user->setLastname("Nom de famille $i");
            $user->setEmail("email$i@example.com");
            $user->setPassword(password_hash($plaintextPassword, PASSWORD_BCRYPT));
            $user->setBirthdate($date);
            $user->setCountry("France");
            $manager->persist($user);
        }
        $manager->flush();
    }
}
