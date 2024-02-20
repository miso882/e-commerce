<?php

namespace App\Controller;

use App\Entity\Country;
use App\Repository\CountryRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

class CountriesController extends AbstractController
{
    #[Route('/api/country', name: 'app_countries', methods: ['GET'])]
    public function getCountryList(SerializerInterface $serializer, CountryRepository $CountryRepository): JsonResponse
    {
        $CountriesList = $CountryRepository->findAll();
        $jsonCountryList = $serializer->serialize($CountriesList, 'json', ['groups' => 'getCountry']);
        return new JsonResponse($jsonCountryList, Response::HTTP_OK, [], true);
    }

    #[Route('/api/country/{id}', name: 'detailCountry', methods: ['GET'])]
    public function getDetailCountry(SerializerInterface $serializer, Country $countries): JsonResponse
    {
        $jsonCountry = $serializer->serialize($countries, 'json', ['groups' => 'getCountry']);
        return new JsonResponse($jsonCountry, Response::HTTP_OK, ['accept' => 'json'], true);
    }

    #[Route('/api/country', name: "createCountry", methods: ['POST'])]
    public function createCountry(
        Request $request,
        SerializerInterface $serializer,
        UrlGeneratorInterface $urlGenerator,
        EntityManagerInterface $em
    ): JsonResponse {
        $countries = $serializer->deserialize($request->getContent(), Country::class, 'json');
        $em->persist($countries);
        $em->flush();
        $jsonCountry = $serializer->serialize($countries, 'json', ['groups' => 'getCountry']);
        $location = $urlGenerator->generate('detailCountry', ['id' => $countries->getId()], UrlGeneratorInterface::ABSOLUTE_URL);
        return new JsonResponse($jsonCountry, Response::HTTP_CREATED, ["Location" => $location], true);
    }

    #[Route('/api/country/{id}', name: "deleteCountry", methods: ['DELETE'])]
    public function deleteCountry(Country $countries, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($countries);
        $em->flush();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/api/country/{id}', name: "updateCountry", methods: ['PUT'])]
    public function updateCountry(Country $countries, Request $request, SerializerInterface $serializer, EntityManagerInterface $em): JsonResponse
    {
        $updateCountry = $serializer->deserialize(
            $request->getContent(),
            Country::class,
            'json',
            [AbstractNormalizer::OBJECT_TO_POPULATE => $countries]
        );
        $em->persist($updateCountry);
        $em->flush();
        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
    }
}