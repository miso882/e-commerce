<?php

namespace App\Controller;
use App\Entity\ShippingFees;
use App\Repository\CountryRepository;
use App\Repository\ShippingFeesRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

class ShippingFeesController extends AbstractController
{
    #[Route('/api/shippingfees', name: 'app_shipping_fees', methods: ['GET'])]
    public function getUserList(SerializerInterface $serializer, ShippingFeesRepository $ShippingFeesRepository): JsonResponse
    {
        $ShippingFeesList = $ShippingFeesRepository->findAll();
        $jsonUserList = $serializer->serialize($ShippingFeesList, 'json', ['groups' => 'getShippingFees']);
        return new JsonResponse($jsonUserList, Response::HTTP_OK, [], true);
    }

    #[Route('/api/shippingfees/{id}', name: 'detailShippingFees', methods: ['GET'])]
    public function getDetailUser(SerializerInterface $serializer, ShippingFees $shippingFees): JsonResponse
    {
        $jsonUser = $serializer->serialize($shippingFees, 'json', ['groups' => 'getShippingFees']);
        return new JsonResponse($jsonUser, Response::HTTP_OK, ['accept' => 'json'], true);
    }

    #[Route('/api/shippingfees', name: "createShippingFees", methods: ['POST'])]
    public function createShippingFees(
        Request $request,
        SerializerInterface $serializer,
        EntityManagerInterface $em,
        UrlGeneratorInterface $urlGenerator,
        CountryRepository $countryRepository
    ): JsonResponse {
        $shippingFees = $serializer->deserialize($request->getContent(), ShippingFees::class, 'json');
        $content = $request->toArray();
        $shippingFees->setCountry($countryRepository->find($content["idCountry"]));
        $em->persist($shippingFees);
        $em->flush();
        $jsonUser = $serializer->serialize($shippingFees, 'json', ['groups' => 'getShippingFees']);
        $location = $urlGenerator->generate('detailUser', ['id' => $shippingFees->getId()], UrlGeneratorInterface::ABSOLUTE_URL);
        return new JsonResponse($jsonUser, Response::HTTP_CREATED, ["Location" => $location], true);
    }


    #[Route('/api/shippingfees/{id}', name: "deleteShippingFees", methods: ['DELETE'])]
    public function deleteShippingFees(ShippingFees $shippingFees,EntityManagerInterface $em): JsonResponse{
        $em->remove($shippingFees);
        $em->flush();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/api/shippingfees/{id}', name: "updateShippingFees", methods: ['PUT'])]
    public function updateShippingFees(ShippingFees $shippingFees,Request $request,SerializerInterface $serializer, EntityManagerInterface $em): JsonResponse{
        $updateShippingFees =  $serializer->deserialize(
            $request->getContent(),
            ShippingFees::class,
            'json',
            [AbstractNormalizer::OBJECT_TO_POPULATE => $shippingFees]
        );
        $em->persist($updateShippingFees);
        $em->flush();
        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
    }
}
