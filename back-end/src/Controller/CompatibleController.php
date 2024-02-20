<?php

namespace App\Controller;

use App\Entity\Compatible;
use App\Repository\CompatibleRepository;
use App\Repository\ItemsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class CompatibleController extends AbstractController
{
    #[Route('/api/compatible', name: 'compatible', methods: ['GET'])]
    // #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants pour supprimer un utilisateur')]
    public function getUserList(SerializerInterface $serializer, CompatibleRepository $compatibleRepository): JsonResponse
    {
        $compatibleList = $compatibleRepository->findAll();
        $jsonCompatibleList = $serializer->serialize($compatibleList, 'json', ['groups' => 'getCompatible']);
        return new JsonResponse($jsonCompatibleList, Response::HTTP_OK, [], true);
    }

    #[Route('/api/compatible/{id}', name: 'detailCompatible', methods: ['GET'])]
    public function getDetailUser(SerializerInterface $serializer, Compatible $compatible): JsonResponse
    {
        // $user = $userRepository->find($id);
        // if($user){
        $jsonCompatible = $serializer->serialize($compatible, 'json', ['groups' => 'getCompatible']);
        return new JsonResponse($jsonCompatible, Response::HTTP_OK, ['accept' => 'json'], true);
        // return new JsonResponse($jsonCompatible, Response::HTTP_OK, [], true);
        // }
        // return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }

    #[Route('/api/compatible', name: "createCompatible", methods: ['POST'])]
    public function createCompatible(
        Request $request,
        SerializerInterface $serializer,
        EntityManagerInterface $em,
        UrlGeneratorInterface $urlGenerator,
    ): JsonResponse {
        $compatible = $serializer->deserialize($request->getContent(), Compatible::class, 'json');
        $em->persist($compatible);
        $em->flush();
        $jsonCompatible = $serializer->serialize($compatible, 'json', ['groups' => 'getCompatible']);
        $location = $urlGenerator->generate('detailCompatible', ['id' => $compatible->getId()], UrlGeneratorInterface::ABSOLUTE_URL);
        return new JsonResponse($jsonCompatible, Response::HTTP_CREATED, ["Location" => $location], true);
    }


    #[Route('/api/compatible/{id}', name: "deleteCompatible", methods: ['DELETE'])]
    public function deleteCompatible(Compatible $compatible, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($compatible);
        $em->flush();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/api/compatible/{id}', name: "updateCompatible", methods: ['PUT'])]
    public function updatecompatible(Compatible $compatible, Request $request, SerializerInterface $serializer, EntityManagerInterface $em, ItemsRepository $itemsRepository): JsonResponse
    {
        $updatecompatible =  $serializer->deserialize(
            $request->getContent(),
            Compatible::class,
            'json',
            [AbstractNormalizer::OBJECT_TO_POPULATE => $compatible]
        );
        $req = $request->toArray();
        $itemId = isset($req["idItem"]) ? $req["idItem"] : -1;
        $removeItemId = isset($req["removeItemId"]) ? $req["removeItemId"] : -1;
        if ($removeItemId !== -1) {
            $updatecompatible->removeItem($itemsRepository->find($removeItemId));
        }
        if ($itemId !== -1) {
            $updatecompatible->addItem($itemsRepository->find($itemId));
        }
        $em->persist($updatecompatible);
        $em->flush();
        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
    }
}
